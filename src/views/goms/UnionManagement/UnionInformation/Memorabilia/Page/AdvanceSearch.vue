<template>
  <el-form label-width="100px" size="mini">
    <el-form-item>
      <operation-wrapper>
        <iep-button type="primary" @click="searchPage">搜索</iep-button>
        <iep-button @click="clearSearchParam">清空</iep-button>
      </operation-wrapper>
    </el-form-item>
  </el-form>
</template>
<script>
import { dictsMap } from '../options'
export default {
  data () {
    return {
      dictsMap,
    }
  },
  methods: {
    searchPage () {
    },
    clearSearchParam () {
      // this.$emit('clear-search-param')
    },
  },
}
</script>
