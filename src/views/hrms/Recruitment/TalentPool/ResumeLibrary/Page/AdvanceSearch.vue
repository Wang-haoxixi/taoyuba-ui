<template>
  <el-form :model="form" label-width="100px" size="mini">
    <el-form-item label="岗位名称：">
      <el-input v-model="form.positionName" clearable></el-input>
    </el-form-item>
    <el-form-item label="岗位：">
      <iep-cascader v-model="form.position" prefix-url="hrms/post_type" clearable></iep-cascader>
    </el-form-item>
    <el-form-item label="最高学历：">
      <iep-dict-select v-model="form.educationId" dict-name="hrms_highest_educational" clearable></iep-dict-select>
    </el-form-item>
    <el-form-item label="性别：">
      <el-radio-group v-model="form.sex">
        <el-radio :label="0">全部</el-radio>
        <el-radio :label="1">男</el-radio>
        <el-radio :label="2">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="年龄：">
      <el-slider v-model="form.rangeAge" range show-stops :max="100" :format-tooltip="(val) => val+'岁'"></el-slider>
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
import { dictsMap, initSearchForm, toDtoSearchForm } from '../options'
export default {
  data () {
    return {
      dictsMap,
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
      // this.$emit('clear-search-param')
    },
  },
}
</script>
