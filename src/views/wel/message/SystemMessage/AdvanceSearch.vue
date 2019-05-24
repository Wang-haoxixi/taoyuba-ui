<template>
  <el-form :model="form" label-width="80px" size="mini">
    <el-form-item label="主题">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <!-- <el-form-item label="分类">
      <el-select v-model="form.organization" placeholder="请选择分类">
        <el-option label="全部"></el-option>
        <el-option label="分类一"></el-option>
        <el-option label="分类二"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="发布时间">
      <el-select v-model="form.department" placeholder="请选择发布时间">
        <el-option label="最近三天"></el-option>
        <el-option label="最近一周"></el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item>
      <iep-button type="primary" @click="searchPage">搜索</iep-button>
      <iep-button>取消</iep-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data () {
    return {
      form: {},
    }
  },
  methods: {
    searchPage () {
      this.$emit('search-page', this.form)
    },
  },
  watch: {
    form (n) {
      this.form = n
    },
  },
}
</script>
