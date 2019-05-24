<template>
  <el-form :model="form" label-width="100px" size="mini">
    <el-form-item label="岗位名称：">
      <iep-cascader v-model="form.position" prefix-url="hrms/post_type" clearable></iep-cascader>
    </el-form-item>
    <el-form-item label="所属部门：">
      <iep-cascader v-model="form.dept" prefix-url="admin/dept" change-on-select clearable></iep-cascader>
    </el-form-item>
    <el-form-item label="现住城市：">
      <iep-cascader v-model="form.cities" prefix-url="admin/city" clearable></iep-cascader>
    </el-form-item>
    <el-form-item label="性别：">
      <el-radio-group v-model="form.sex">
        <el-radio :label="0">全部</el-radio>
        <el-radio :label="1">男</el-radio>
        <el-radio :label="2">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="入职时间：">
      <iep-date-picker v-model="form.rangeTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
      </iep-date-picker>
    </el-form-item>
    <el-form-item label="员工状态：">
      <el-select v-model="form.status" placeholder="请选择" clearable>
        <el-option v-for="(v,k) in dictsMap.status" :key="k" :label="v" :value="+k">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="锁定状态：">
      <el-select v-model="form.lockOrg" placeholder="请选择" clearable>
        <el-option v-for="(v,k) in dictsMap.lockOrg" :key="k" :label="v" :value="+k">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <operation-wrapper>
        <iep-button type="primary" @click="searchPage">搜索</iep-button>
        <iep-button @click="clearSearchParam">清空</iep-button>
      </operation-wrapper>
    </el-form-item>
  </el-form>
</template>
<script>
import { dictsMap, initSearchForm, toDtoSearchForm } from '../options'
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
