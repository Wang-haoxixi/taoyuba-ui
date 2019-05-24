<template>
  <span class="headerSearch">
    <i class="el-icon-search icon" @click="toggleSearchMode"></i>
    <el-autocomplete :value="value" :class="['autocomplete', { show: searchMode }]" ref="autocomplete" :fetch-suggestions="querySearch" :select-when-unmatched="true" v-bind="$attrs" @input="onSearchInput" @select="onSearchSelect"></el-autocomplete>
  </span>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      },
    },
  },
  data () {
    return {
      searchMode: false,
      value: '',
    }
  },
  computed: {
    suggestionData () {
      return this.data.map(datum => {
        return { value: datum }
      })
    },
  },
  methods: {
    /**
     * @param queryString { string }
     * @param cb {any}
     */
    querySearch (queryString, cb) {
      const suggestionData = this.suggestionData
      const results = queryString
        ? suggestionData.filter(this.createFilter(queryString))
        : suggestionData
      cb(results)
    },
    /**
     * @param queryString { string }
     */
    createFilter (queryString) {
      return item => {
        return item.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
      }
    },
    toggleSearchMode () {
      this.searchMode = !this.searchMode
      this.$nextTick(() => {
        if (this.searchMode) {
          const ref = this.$refs.autocomplete
          setTimeout(() => {
            ref.$refs.input.focus()
          }, 300)
        }
      })
    },
    onSearchSelect (item) {
      this.searchMode = true
      this.$emit('select', item.value)
    },
    onSearchInput (value) {
      this.value = value
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="scss" scoped>
.headerSearch {
  .icon {
    cursor: pointer;
    font-size: 16px;
  }
  .autocomplete {
    transition: width 0.3s, margin-left 0.3s;
    width: 0;
    background: transparent;
    border-radius: 0;

    /deep/ .el-input {
      /deep/ .el-input__inner {
        border: 0;
        border-radius: 0;
        padding-left: 0;
        padding-right: 0;
        box-shadow: none !important;
        background: transparent;
        border-bottom: 1px solid #d9d9d9;
      }
    }

    &.show {
      width: 210px;
      margin-left: 8px;
    }
  }
}
</style>
