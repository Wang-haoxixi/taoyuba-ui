<template>
  <el-form :model="form" label-width="100px" size="mini">
    <el-form-item label="岗位类别：">
      <iep-select v-model="form.typeId" prefix-url="hrms/post_type" clearable></iep-select>
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
import { initSearchForm } from './options'
export default {
  data () {
    return {
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
