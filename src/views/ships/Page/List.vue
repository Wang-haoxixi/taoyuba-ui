<template>
  <div>
    <basic-container>
      <page-header title="渔船管理"></page-header>
      <operation-container>       
        <template slot="left">    
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain v-if="manager">新增</iep-button>
          <el-button v-if="manager"  type="primary" size="small" icon="el-icon-edit" @click="exportInfo">导出信息</el-button>      
        </template>
        <template slot="right">
          <!-- <operation-search @search-page="searchPage" advance-search :prop="searchData">
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search> -->
          <span><el-input v-model="params.shipName" placeholder="请输入船名号" size="small" clearable></el-input></span>
          <span><el-input v-model="params.shipNo" placeholder="请输入渔船编号" size="small" clearable></el-input></span>
          <span><el-input v-model="params.shipowner" placeholder="请输入持证人姓名" size="small" clearable></el-input></span>
          <span><el-input v-model="params.shipownerIdcard" placeholder="请输入持证人身份证" size="small" clearable></el-input></span>
          <el-button size="small"  @click="loadPage(params)">搜索</el-button>
        </template>
      </operation-container>                
      <iep-table                            
              :isLoadTable="isLoadTable"
              :pagination="pagination"
              :columnsMap="columnsMap"
              :pagedTable="pagedTable"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              @selection-change="handleSelectionChange"
              is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>   
              <iep-button plain @click="handleShow(scope.row.shipId)" v-if="manager">职务船员配置</iep-button>
              <iep-button plain @click="handleEdit(scope.row.shipId)" v-if="manager">编辑</iep-button>
              <iep-button @click="handleView(scope.row.shipId)">查看</iep-button>     
              <iep-button type="warning" @click="handleDelete(scope.row)" v-if="manager"><i class="el-icon-delete"></i></iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <el-dialog title="职务船员配置情况" :visible.sync="dialogCertVisible" width="70%" append-to-body>      
      <div  class="certDiv">
          <p>最低配员标准:</p>
          <p>实际配员:</p>
          <p class="lackCert">缺少配员:</p>
      </div>
    </el-dialog>
  </div>
</template>
<script>    
import { getShipList, deleteShip, getMyShipList,exportExcel } from '@/api/ships'
// import advanceSearch from './AdvanceSearch.vue'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
import { getUserInfo } from '@/api/login'
export default {
  // components: {
  //   advanceSearch,
  // },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      // searchData: 'shipName',
      manager: false,
      params: {
        current: 1,
        size: 10,
        shipName: '',
        shipNo: '',
        shipowner: '',
        shipownerIdcard: '',
      },
      exportParams: {
        shipName: '',
        shipNo: '',
        shipowner: '',
        shipownerIdcard: '',
      },
      dialogCertVisible:false,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {     
      this.multipleSelection = val.map(m => m.id)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.shipId, deleteShip)
    },
    handleAdd () {
      this.$router.push({
        path: '/ship_spa/detail/create/0',
      })
    },
    handleView (id) {
      this.$router.push({
        path: `/ship_spa/detail/view/${id}`,
      })
    },
    handleEdit (id) {
      this.$router.push({
        path: `/ship_spa/detail/update/${id}`,
      })
    },
    async loadPage (param = this.searchForm) {
      this.userData = await getUserInfo().then(res => {
        return res.data.data
      })
      if(this.userData.roles.indexOf(111) === -1 && this.userData.roles.indexOf(1) === -1){
        let data = await this.loadTable(param, getMyShipList)
        this.pagedTable = data.records
        this.manager = false
      } else {
        let data = await this.loadTable(param, getShipList)
        this.pagedTable = data.records
        this.manager = true
      }
    },
    exportInfo () {   
      exportExcel (this.exportParams).catch(err => {    
          this.$message({
            type: 'warning',
            message: err,
          })
      })    
    },
    handleShow () {     
          this.dialogCertVisible = true
    },
  },
  watch: {
      'params.shipName': function (val) {          
            this.exportParams.shipName  = val
      },
      'params.shipNo': function (val) {
            this.exportParams.shipNo  = val
      },
      'params.shipowner': function (val) {
            this.exportParams.shipowner  = val
      },    
      'params.shipownerIdcard': function (val) {                   
            this.exportParams.shipownerIdcard  = val      
      },
  },
}
</script>

<style lang="scss" scoped>  
.certDiv{   
      font-weight: bold;
      lackCert{
          color: red;
      }
}

</style>