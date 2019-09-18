<template>
  <div>
    <basic-container>
      <page-header title="渔船船员"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd($route.params.shipId)" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <!-- <template slot="right">
          <operation-search @search-page="searchPage" advance-search :prop="searchData">
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template> -->
        <template slot="right">
          <el-button @click="backPage">返回</el-button>
        </template>
      </operation-container>
      <iep-table                    
              :isLoadTable="isLoadTable"
              :pagination="pagination"
              :columnsMap="crewColumnsMap"
              :pagedTable="pagedTable"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              @selection-change="handleSelectionChange"
              :emptyText="message"
              is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="140">
          <template slot-scope="scope">
            <operation-wrapper>
              <!-- <iep-button size="mini" plain @click="handleEdit(scope.row.idcard)">编辑</iep-button> -->
              <!-- <iep-button size="mini" plain @click="handleDelete(scope.row.id)">删除</iep-button> -->
              <iep-button size="mini" @click="handleView(scope.row.employeeIdcard)">查看</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
        <el-table-column prop="particular" label="详情" width="140">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button size="mini" type="primary" @click="handleProtocol(scope.row.contractId)">协议</iep-button>
              <iep-button size="mini" type="primary" @click="handleInsure(scope.row.employeeIdcard)">证书</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
// import { getShipCrewList, delShipCrew } from '@/api/ships/shipcrew/index'
import { getList } from '@/api/tmlms/newContract'
import mixins from '@/mixins/mixins'
import { crewColumnsMap } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      crewColumnsMap,
      searchData: 'contactName',
      message: '此渔船暂无相关网签劳务合同信息',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {     
      this.multipleSelection = val.map(m => m.id)
    },
    handleAdd (val) {
      this.$router.push({path: `/hrms_spa/shipCrew_Detial/${val}`, query:{ edit: val }}) 
    },
    // handleEdit (val) {
    //   this.$router.push({path: `/hrms_spa/shipCrew_Detial/${val}`,query:{ edit: val }})
    // },
    // handleDelete (row) {
    //   this._handleGlobalDeleteById(row, delShipCrew)
    // },
    handleView (val) {
      // this.$router.push({path: `/hrms_spa/shipCrew_Detial/${val}`,query:{ see: val }})
      this.$router.push({name: 'detailBoatMan',query:{ see: val }})
    },
    async loadPage (param = this.searchForm) {
      param.shipNo = this.$route.params.shipNo
      param.status = 1
      let data = await this.loadTable(param, getList)
      this.pagedTable = data.records
    },
    handleProtocol (contractId) {
      let urlHeade = window.location.href.split('/')[0,2]        
      let dataMap  = '%7B%7D'
      this.$openPage(`//${urlHeade}/api/tmlms/downLoad/intoContractHtml?contractId=${contractId}&dataMap=${dataMap}`,'url') 
    },
    handleInsure (val) {
      this.$router.push({ path: `/hrms_spa/shipCrew_Insure/${val}` })
    },
    backPage () {
      this.$router.push({path: '/hrms_spa/shipCrew_list'})
    },
  },
}
</script>