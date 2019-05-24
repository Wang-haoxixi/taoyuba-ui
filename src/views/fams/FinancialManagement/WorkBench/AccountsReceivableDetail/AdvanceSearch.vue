<template>
  <el-form :model="form" label-width="100px" size="mini">
    <el-form-item label="项目名称：">
      <iep-cascader v-model="form.position" prefix-url="" clearable></iep-cascader>
    </el-form-item>
    <el-form-item label="项目状态：">
      <iep-cascader v-model="form.dept" prefix-url="" change-on-select clearable></iep-cascader>
    </el-form-item>
    <el-form-item label="合同名称：">
      <iep-cascader v-model="form.name" prefix-url="" clearable></iep-cascader>
    </el-form-item>
    <el-form-item label="回款时间：">
      <iep-date-picker v-model="form.refundTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
      </iep-date-picker>
    </el-form-item>
    <el-form-item label="负责人：">
      <iep-cascader v-model="form.charge" prefix-url="" clearable></iep-cascader>
    </el-form-item>
    <el-form-item label="是否开票：">
      <el-radio-group v-model="form.invoice">
        <el-radio :label="0">是</el-radio>
        <el-radio :label="1">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <operation-wrapper>
        <iep-button type="primary" @click="searchPage">搜索</iep-button>
        <iep-button @click="clearSearchParam">取消</iep-button>
      </operation-wrapper>
    </el-form-item>
  </el-form>
</template>
<script>
import { dictsMap, initSearchForm, toDtoSearchForm } from './options'
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
      this.$emit('search-page', toDtoSearchForm(this.form))
    },
    clearSearchParam () {
      this.form = initSearchForm()
      // this.$emit('clear-search-param')
    },
  },
}
</script>
