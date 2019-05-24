<template>
  <div>
    <el-form :model="form" label-width="80px" size="small">
      <el-form-item label="合同名称">
        <el-input v-model="form.contractName" placeholder="请输入合同名称"></el-input>
      </el-form-item>
      <el-form-item label="市场经理">
        <el-input v-model="form.directorRealName"></el-input>
      </el-form-item>
      <el-form-item label="业务类型">
        <businessType v-model="form.businessType"></businessType>
      </el-form-item>
      <el-form-item label="合同级别">
        <iep-dict-select v-model="form.contractLevel" dict-name="mlms_contract_level"></iep-dict-select>
      </el-form-item>
      <el-form-item label="合同状态">
        <iep-dict-select v-model="form.contractStatus" dict-name="mlms_contract_status"></iep-dict-select>
      </el-form-item>
      <!-- <el-form-item label="签署组织">
        <el-input v-model="form.signDeptName"></el-input>
      </el-form-item> -->
      <el-form-item label="会议开始时间">
        <el-date-picker v-model="form.startTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="会议结束时间">
        <el-date-picker v-model="form.endTime" value-format="yyyy-MM-dd 23:59:59" type="date" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="searchPage" size="mini">搜索</el-button>
        <el-button @click="clearSearchParam" size="mini">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { initSearchForm } from '../options'
import businessType from './businessType'
export default {
  props: ['type'],
  components: { businessType },
  data () {
    return {
      form: initSearchForm(),
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  created () {
  },
  methods: {
    searchPage () {
      this.$emit('search-page', { type: this.type, ...this.form })
    },
    clearSearchParam () {
      this.form = initSearchForm()
    },
  },
}
</script>
