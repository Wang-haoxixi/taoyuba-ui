<template>
  <el-form :model="form" :label-width="'80px'" size="small">
    <el-form-item label="业务类型">
      <iep-dict-select v-model="form.businessTypeKey" dict-name="crms_business_type" multiple></iep-dict-select>
    </el-form-item>
    <el-form-item label="区域类型">
      <iep-dict-select v-model="form.districtType" dict-name="crms_district_type"></iep-dict-select>
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
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  methods: {
    searchPage () {
      this.$emit('search-page', this.form)
    },
    clearSearchParam () {
      this.form = searchForm()
    },
  },
}
</script>
