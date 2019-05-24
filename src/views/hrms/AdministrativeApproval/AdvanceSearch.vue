<template>
  <el-form :model="form" label-width="100px" size="mini">
    <el-form-item label="申请人">
      <el-input v-model="form.name" placeholder="请输入申请人姓名"></el-input>
    </el-form-item>
    <el-form-item label="申请类型">
      <iep-dict-select dict-name="hrms_applic_type" v-model="form.type" placeholder="选择申请类型"></iep-dict-select>
    </el-form-item>
    <el-form-item label="审核状态：">
      <el-select v-model="form.status" placeholder="请选择" clearable>
        <el-option v-for="(v,k) in dictsMap.sStatus" :key="k" :label="v" :value="+k">
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
import { dictsMap, initSearchForm } from './options'
export default {
  data () {
    return {
      dictsMap,
      form: initSearchForm(),
    }
  },
  methods: {
    searchPage () {
      this.$emit('search-page', this.form)
    },
    clearSearchParam () {
      this.form = initSearchForm()
      // this.$emit('clear-search-param')
    },
  },
}
</script>
