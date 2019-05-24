<template>
  <el-form :model="form" label-width="100px" size="mini">
    <el-form-item label="模块分类：">
      <iep-dict-select v-model="form.type" dict-name="cpms_module_type" clearable></iep-dict-select>
    </el-form-item>
    <el-form-item label="研发状态：">
      <el-select v-model="form.schedule" placeholder="请选择研发状态" clearable>
        <el-option v-for="(v,k) in dictsMap.schedule" :key="k" :label="v" :value="+k">
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
