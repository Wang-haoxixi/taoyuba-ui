<template>
  <el-form :model="form" label-width="100px" size="mini">
    <el-form-item label="技术分类：">
      <iep-dict-select v-model="form.type" dict-name="cpms_technology_type" clearable></iep-dict-select>
    </el-form-item>
    <el-form-item label="技术状态：">
      <el-select v-model="form.status" placeholder="请选择技术状态" clearable>
        <el-option v-for="(v,k) in dictsMap.status" :key="k" :label="v" :value="+k">
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
import { dictsMap, initSearchForm } from '../options'
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
    },
  },
}
</script>
