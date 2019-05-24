<template>
  <el-form :model="form" label-width="100px" size="mini">
    <el-form-item label="流水号：">
      <el-input v-model="form.name" clearable></el-input>
    </el-form-item>
    <el-form-item label="分类：">
      <el-input v-model="form.type" clearable></el-input>
    </el-form-item>
    <el-form-item label="时间段：">
      <iep-date-picker v-model="form.rangeTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
      </iep-date-picker>
    </el-form-item>
    <el-form-item label="金额：">
      <el-slider v-model="form.rangeAmount" range show-stops :max="100" :format-tooltip="(val) => val+'元'"></el-slider>
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
import { initSearchForm, toDtoSearchForm } from './options'
export default {
  data () {
    return {
      form: initSearchForm(),
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          },
        }],
      },
    }
  },
  methods: {
    searchPage () {
      this.$emit('search-page', toDtoSearchForm(this.form))
    },
    clearSearchParam () {
      this.form = initSearchForm()
    },
  },
}
</script>
