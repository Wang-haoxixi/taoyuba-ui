<template>
  <el-form :model="form" label-width="100px" size="mini">
    <el-form-item>
      <operation-wrapper>
        <iep-button type="primary" @click="searchPage">搜索</iep-button>
        <iep-button @click="clearSearchParam">取消</iep-button>
      </operation-wrapper>
    </el-form-item>
  </el-form>
</template>
<script>
import { dictsMap, initSearchForm } from './options'
import { pickerOptions } from '@/const/formConfig.js'
export default {
  data () {
    return {
      dictsMap,
      form: initSearchForm(),
      pickerOptions,
    }
  },
  methods: {
    searchPage () {
      //this.$emit('search-page', toDtoSearchForm(this.form))
    },
    clearSearchParam () {
      this.form = initSearchForm()
      // this.$emit('clear-search-param')
    },
  },
}
</script>
