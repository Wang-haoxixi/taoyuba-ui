<template>
  <el-select :placeholder="placeholder" v-bind="$attrs" v-on="$listeners">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
import { getCommonList } from '@/api/common'
export default {
  name: 'IepSelect',
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      default: '请选择',
    },
    prefixUrl: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      options: [],
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      getCommonList(this.prefixUrl).then(({ data }) => {
        this.options = data.data
      })
    },
  },
  watch: {
    'prefixUrl': function () {
      this.load()
    },
  },
}
</script>
