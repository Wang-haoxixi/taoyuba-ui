<template>
  <el-form :model="form" :label-width="'80px'" size="small">
    <el-form-item label="负责部门">
      <iep-dept-select v-model="form.deptId"></iep-dept-select>
    </el-form-item>
    <el-form-item label="市场经理">
      <iep-contact-select v-model="form.managerId" placeholder="请输入市场经理"></iep-contact-select>
    </el-form-item>
    <el-form-item label="业务类型">
      <iep-dict-select v-model="form.business" dict-name="crms_business_type" multiple></iep-dict-select>
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
        business: null,

      },
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  methods: {
    searchPage () {
      this.searchData.business = this.form.business
      this.searchData.deptId = this.form.deptId.id
      if (this.form.district !== '') {
        this.searchData.district = this.form.district
      }
      this.searchData.managerId = this.form.managerId.id
      this.$emit('search-page', this.searchData)
    },
    clearSearchParam () {
      this.form = searchForm()
    },
  },
}
</script>
