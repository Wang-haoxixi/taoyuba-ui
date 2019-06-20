<template>
  <el-form :form="searchForm" label-width="80px" size="mini">
    <el-form-item label="分类">
      <el-select v-model="searchForm.field" placeholder="请选择分类" clearable>
        <el-option value="0" label="国脉内网"></el-option>
        <el-option value="1" label="数据基因"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="试卷名称">
      <el-input v-model="searchForm.title" placeholder="请输入试卷名称"></el-input>
    </el-form-item>
    <el-form-item>
      <iep-button type="primary" @click="searchPage" style="margin:0 10px;">搜索</iep-button>
      <iep-button style="margin:0 10px">取消</iep-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'AdvanceSearch',
  data () {
    return {
      searchForm: {},
    }
  },
  methods: {
    searchPage () {
      this.$emit('search-page', this.form)
    },
  },
  watch: {
    searchForm (n) {
      this.searchForm = n
    },
  },
}
</script>
