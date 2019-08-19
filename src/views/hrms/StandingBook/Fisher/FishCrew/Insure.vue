<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="船员证书"></page-header>
      <operation-container>
        <template slot="right">
          <el-button @click="backPage">返回</el-button>
        </template>
      </operation-container>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="certNo" label="证书编码"></el-table-column>
        <el-table-column prop="certType" label="证书类型"></el-table-column>
        <el-table-column prop="certTitle" label="证书职务"></el-table-column>
        <el-table-column prop="certLevel" label="证书等级"></el-table-column>
        <el-table-column prop="createTime" label="日期"></el-table-column>
      </el-table>
    </basic-container>
  </div>
</template>
<script>
import { getMyCretList } from '@/api/post/cert'
import { remote } from '@/api/admin/dict'
export default {
  data () {
    return {
      tableData: [],
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      getMyCretList(this.$route.params.idcard).then(data => {  
        this.tableData = data.data.data
        console.log(this.tableData)
        this.tableData.forEach(v => {
          if (v.certType) {
             this.getDict('tyb_crew_cert_type', v.certType).then(res => { v.certType = res })
          }
          if (v.certLevel) {
             this.getDict('tyb_crew_cert_level', v.certLevel).then(res => { v.certLevel = res })
          }
          if (v.certTitle) {
             this.getDict('tyb_crew_cert_title', v.certTitle).then(res => { v.certTitle = res })
          }
        })
      })
    },
    getDict (name, val) {
      return remote(name).then(res =>{
        let dicName = ''
        res.data.data.forEach(m => {
          if (m.value === val) {
            dicName = m.label
          }         
        })
        return dicName
      })
    },
    backPage () {
      this.$router.go(-1)
    },
  },
}
</script>