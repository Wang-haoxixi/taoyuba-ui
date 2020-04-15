<template>
  <el-form :model="form" label-width="120px" size="mini">
    <el-form-item label="渔船名：">
      <el-input v-model="form.shipName"></el-input>
    </el-form-item>
    <el-form-item label="离船时间区间">
        <el-date-picker v-model="form.timeLists" type="daterange" range-separator="-" start-placeholder="离船时间" end-placeholder="离船时间" 
              value-format="yyyy-MM-dd HH:mm:ss"  size="mini"></el-date-picker>
    </el-form-item>
    <el-form-item label="船员姓名：">
        <el-input v-model="form.realName"></el-input>
    </el-form-item>
    <el-form-item label="船员身份证：">
        <el-input v-model="form.idcard"></el-input>
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
import { initSearchForm, toDtoSearchForm } from '../options'
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
      // this.$emit('clear-search-param')
    },
  },
}
</script>
