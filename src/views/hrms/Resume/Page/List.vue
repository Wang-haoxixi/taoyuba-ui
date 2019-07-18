<template>
  <div>
    <basic-container>
      <page-header title="求职简历"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增</iep-button>
          <iep-button @click="handleExport()" type="primary" plain>导出</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search :prop="searchData">
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <el-table-column
            prop="status"  
            label="审核操作"
            v-if="manager"
          >
          <template slot-scope="scope">
            <div>
              <el-switch
                v-model="scope.row.swith"
                active-color="#13ce66"
                @change="getStatus(scope.row.swith,scope.row.resumeId)"
                inactive-color="#ff4949">
              </el-switch>
            </div>
          </template>
          </el-table-column>
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button @click="handleDetail(scope.row)">查看</iep-button>
              <iep-button type="default" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getResumePage, deleteResumeById, getResumeMyCerts, statusAgent, ExportExcel } from '@/api/post/resume'
import AdvanceSearch from './AdvanceSearch'
import { getUserInfo } from '@/api/login'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap} from '../options'
export default {
  components: { AdvanceSearch },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      searchData: 'realName',
      userData: {roles: []},
      pagedTable: [],
      manager: true,
      ids: [],
      roleDate:[],
    }
  },
  created () {
    this.loadPage()
    this.getIds()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.resumeId, deleteResumeById)
    },
    handleAdd () {
      this.$router.push({
        path: '/hrms_spa/resume_post/0',
      })      
    },
    handleEdit (row) {                                                 
      this.$router.push({
        path: `/hrms_spa/resume_post/${row.resumeId}`,
      })    
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    // 审核
    getStatus (switchs,userId) {
      let data = ''
      if(switchs){
        data = 1
      }else{
        data = 2
      }
      statusAgent(data,userId).then( res=>{
          this.$message({
            type: 'success',
            message: res.data.msg,
          })
          this.loadPage()
      })
    },
    handleExport () {
      ExportExcel(this.ids).catch(err => {
        this.$message({
          type: 'warning',
          message: err,
        })
      })
    },
    async getIds () {     
      this.roleDate = await getUserInfo().then(res => {
        return res.data.data.roles
      })
      if (this.roleDate.includes(111) || this.roleDate.includes(1)) {
        getResumePage().then((data) => {
          this.ids = data.data.data.records.map( m => m.resumeId)
        })
      } else {
        getResumeMyCerts().then((data) => {
          this.ids = data.data.data.records.map( m => m.resumeId)
        })
      }
    },
    // 调取接口
    async loadPage (param = this.searchForm) {
      this.userData = await getUserInfo().then(res => {
        return res.data.data
      })
      if(this.userData.roles.indexOf(111) === -1 && this.userData.roles.indexOf(1) === -1){
        let data = await this.loadTable(param, getResumeMyCerts)
        this.pagedTable = data.records
        this.manager = false
        if(columnsMap[0].label === '姓名'){
          columnsMap.splice(0,1)
        }
      } else {
        let data = await this.loadTable(param, getResumePage)
        this.pagedTable = data.records
        this.manager = true
        // 需要给switch一个字段识别
        this.pagedTable.forEach( item=>{
          if(item.resumeStatus === 1){
            item.swith = true
          }else{
            item.swith = false
          }
        })
      }
      //  let dataList = this.loadTable(param, getResumePage)
      //  dataList.then((res) => {
      //    for (let i=0; i< res.records.length; i++) {
      //      res.records[i].job = res.records[i].job.toString()
      //    }
      //    this.pagedTable = res.records
      //    console.log(this.pagedTable)
      //  })
    },
  },
  watch: {
    pagedTable (newVal) {
      this.ids = newVal.map(v => { return v.resumeId })
    },
  },
}
</script>