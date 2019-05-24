<template>
  <a-select :value="value" mode="tags" style="width: 100%" :tokenSeparators="[',','；','，',';','、']" @change="handleChange" @search="querySearch" :notFoundContent="fetching ? undefined : null" dropdownClassName="iep-contact-dropdown" :getPopupContainer="getPopupContainer" ref="a-select" :filterOption="filterOption">
    <a-spin v-if="fetching" slot="notFoundContent" size="small" />
    <a-select-option v-for="i in tagResults" :key="i">{{ i }}</a-select-option>
    <div slot="dropdownRender" slot-scope="menu">
      <v-nodes :vnodes="menu" />
      <a-divider style="margin: 4px 0;" />
      <div style="padding: 8px;">
        <a-icon type="tag" /> 共找到 {{count}} 个相关标签
      </div>
    </div>
  </a-select>
</template>
<script>
import { getTagList } from '@/api/tms/index'
import debounce from 'lodash/debounce'
import compact from 'lodash/compact'
export default {
  name: 'IepTag',
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data () {
    this.querySearch = debounce(this.querySearch, 500)
    return {
      fetching: false,
      tagResults: [],
      count: 0,
    }
  },
  created () {
    // this.loadTag()
  },
  methods: {
    filterOption (inputValue, option) {
      console.log(inputValue, option)
      const name = inputValue.toLowerCase().trim()
      if (name) {
        return true
      } else {
        return false
      }
    },
    getPopupContainer () {
      return this.$refs['a-select'].$el
    },
    async loadTag (name = '') {
      const { data } = await getTagList({ name })
      this.tagResults = data.data.tags
    },
    async querySearch (query) {
      this.fetching = true
      const name = query.toLowerCase().trim()
      if (name) {
        const { data } = await getTagList({ name })
        this.tagResults = data.data.tags
        this.count = data.data.count
        this.fetching = false
      }
    },
    handleChange (value) {
      const noTrimValue = value.map(m => m.trim())
      const v = compact(noTrimValue)
      this.fetching = false
      this.tagResults = []
      this.$emit('input', v)
    },
  },
}
</script>