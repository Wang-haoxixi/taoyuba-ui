<template>
  <el-form :model="form" label-width="120px" size="mini">
    <el-form-item label="证书种类：">
      <iep-dict-select v-model="form.certType" dict-name="tyb_crew_cert_type"></iep-dict-select>
    </el-form-item>
    <el-form-item label="证书编号：">
        <el-input v-model="form.certNo"></el-input>
    </el-form-item>
    <el-form-item label="身份证号码：">
        <el-input v-model="form.idCard"></el-input>
    </el-form-item>
     <el-form-item label="姓名：">
        <el-input v-model="form.crewName"></el-input>
    </el-form-item>
     <el-form-item label="签发机构：">
        <el-input v-model="form.certIssueUnit"></el-input>
    </el-form-item>
    <el-form-item label="证书等级：">
     <el-select  placeholder="请选择证书等级" v-model="form.certLevel" size="small">           
              <el-option v-for="item in level"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
              </el-option>
            </el-select>
    </el-form-item>
      <el-form-item label="证书职务：">
      <iep-dict-select v-model="form.certTitle" dict-name="tyb_crew_cert_title"></iep-dict-select>
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
        level: [
        {
          label: '一级',
          value: 1,
        },
        {
          label: '二级',
          value: 2,
        },
        {
          label: '三级',    
          value: 3,
        },
      ],
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
