<template>
  <el-form :model="paramForm" label-width="80px" size="mini">
    <el-form-item label="员工姓名">
      <el-input v-model="paramForm.name"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="paramForm.sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="所在组织">
      <el-select v-model="paramForm.organization" placeholder="请选择组织">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所在部门">
      <el-select v-model="paramForm.department" placeholder="请选择部门">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="岗位类别">
      <el-select v-model="paramForm.job_category" placeholder="请选择岗位类别">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="岗位名称">
      <el-select v-model="paramForm.job_name" placeholder="请选择岗位名称">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="在职状态">
      <el-select v-model="paramForm.status" placeholder="请选择在职状态">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="当前职位">
      <el-select v-model="paramForm.position" placeholder="请选择当前职位">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="当前职称">
      <el-select v-model="paramForm.job_title" placeholder="请选择当前职称">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="入职时间">
      <el-select v-model="paramForm.entry_time" placeholder="请选择入职时间">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <iep-button type="primary" @click="searchPage">搜索</iep-button>
      <iep-button @click="clearSearchParam">清空</iep-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      paramForm: this.form,
    }
  },
  methods: {
    searchPage () {
      this.$emit('search-page', this.paramForm)
    },
    clearSearchParam () {
      this.$emit('clear-search-param')
    },
  },
  watch: {
    form (n) {
      this.paramForm = n
    },
  },
}
</script>
