<template>
  <operation-search @search-page="searchPage" :paramForm="paramForm" advance-search>
    <el-form :model="paramForm" label-width="100px" size="small">
      <el-form-item label="荣誉资质名称">
        <el-input v-model="paramForm.name"></el-input>
      </el-form-item>
      <el-form-item label="分类：">
        <iep-dict-select v-model="paramForm.honorQualType" dict-name="mlms_honor_qual_type"></iep-dict-select>
      </el-form-item>
      <el-form-item label="是否免费">
        <el-radio-group v-model="paramForm.downloadCost">
          <el-radio label="0">是</el-radio>
          <el-radio label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上传人">
        <el-input v-model="paramForm.creatorRealName"></el-input>
      </el-form-item>
      <el-form-item label="上传人组织">
        <el-input v-model="paramForm.orgName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchPage()">搜索</el-button>
        <el-button @click="clearSearchParam">清空</el-button>
      </el-form-item>
    </el-form>
  </operation-search>
</template>

<script>
import { initSearchForm } from './option'

export default {
  data () {
    return {
      paramForm: initSearchForm(),
      firstClass: [],
      secondClass: [],
    }
  },
  methods: {
    searchPage (val) {
      let obj = val ? val : this.paramForm
      this.$emit('searchPage', obj)
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
  },
}
</script>
