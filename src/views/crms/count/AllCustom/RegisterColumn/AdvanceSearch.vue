<template>
  <el-form :model="form" :label-width="'80px'" size="small">
    <el-form-item label="负责部门">
      <!-- <el-input v-model="form.clientName" placeholder="请输入负责部门"></el-input> -->
      <iep-dept-select v-model="form.dept" placeholder="请输入负责部门"></iep-dept-select>
    </el-form-item>
    <el-form-item label="市场经理">
      <iep-contact-select v-model="form.user" placeholder="请输入市场经理"></iep-contact-select>
    </el-form-item>
    <el-form-item label="客户关系">
      <iep-dict-select v-model="form.rela" dict-name="crms_client_relation"></iep-dict-select>
    </el-form-item>
    <el-form-item label="区域类型">
      <iep-dict-select v-model="form.district" dict-name="crms_district_type"></iep-dict-select>
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" @click="searchPage" size="mini">搜索</el-button>
      <el-button @click="clearSearchParam" size="mini">清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapGetters } from 'vuex'
import { searchForm } from './options'
export default {
  props: ['type'],
  data () {
    return {
      form: searchForm(),
      searchData: {
        deptId: null,
        managerId: null,
      },
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  methods: {
    searchPage () {
      this.searchData.deptId = this.form.dept.id
      this.searchData.managerId = this.form.user.id
      if (this.form.district != '') {
        this.searchData.district = this.form.district
      }
      if (this.form.rela != '') {
        this.searchData.rela = this.form.rela
      }

      this.$emit('search-page', this.searchData)
    },
    clearSearchParam () {
      this.form = searchForm()
    },
  },
}
</script>
