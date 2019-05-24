<template>
  <el-form :model="form" label-width="120px" size="mini">
    <iep-form-item class="form-half" prop="key" label-name="关键词">
      <el-input></el-input>
    </iep-form-item>
    <iep-form-item class="form-half" prop="type" label-name="应收款类型" tip="请务必根据实际情况选择">
      <iep-dict-select v-model="form.type" dict-name="hrms_type_status"></iep-dict-select>
    </iep-form-item>
    <iep-form-item class="form-half" prop="state" label-name="应收款状态" tip="请务必根据实际情况选择">
      <iep-dict-select v-model="form.state" dict-name="hrms_state_status"></iep-dict-select>
    </iep-form-item>
    <el-form-item label="支付时间：">
      <el-date-picker v-model="form.date" type="date" placeholder="选择日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <operation-wrapper>
        <iep-button type="primary" @click="searchPage">搜索</iep-button>
        <iep-button>取消</iep-button>
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
