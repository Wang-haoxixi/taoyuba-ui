<template>
  <div>
    <basic-container>
      <page-header title="渔船经营人"></page-header>
      <operation-container>
        <template slot="left">    
          <!-- <iep-button v-if="manager" @click="handleAdd($route.params.shipNo)" type="primary" icon="el-icon-plus" plain>新增</iep-button> -->
        </template>
        <template slot="right">
          <el-button @click="backPage">返回</el-button>
        </template>
      </operation-container>
      <iep-table                    
              :isLoadTable="isLoadTable"
              :pagination="pagination"
              :columnsMap="operatColumnsMap"
              :pagedTable="pagedTable"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              @selection-change="handleSelectionChange"
              is-mutiple-selection>
        <el-table-column prop="shipNo" label="渔船编号">
          <template slot-scope="scope">
            {{getShipNo(scope.row.shipName)}}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="联系电话">
          <template slot-scope="scope">
            {{getPhone(scope.row.idcard)}}
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="200">
          <template slot-scope="scope">
            <operation-wrapper>
              <!-- <iep-button size="mini" plain @click="handleEdit(scope.row.shipName)">编辑</iep-button> -->
              <iep-button size="mini" plain @click="handleView(scope.row.shipName)">查看</iep-button>
              <!-- <iep-button size="mini" plain @click="handleDelete(scope.row.id)">删除</iep-button>     -->
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getOperatorPage, deleteShipManager } from '@/api/ships/shipoperat/index'
import { getShipownerByidcard } from '@/api/tmlms/shipowner/index'
import mixins from '@/mixins/mixins'
import { operatColumnsMap } from '../options'
import { getUserInfo } from '@/api/login'
export default {
  mixins: [mixins],
  data () {
    return {
      operatColumnsMap,
      searchData: 'contactName',
      manager:false,
      userData:{},
      phone:'',
    }
  },
  created () {
    this.loadPage()
    this.isManager()
  },
  methods: {
    handleSelectionChange (val) {     
      this.multipleSelection = val.map(m => m.id)
    },
    handleAdd (val) {
      this.$router.push({path: `/hrms_spa/shipOperat_Detial/${val}`, query:{ add: val }}) 
    },
    handleEdit (val) {
      this.$router.push({path: `/hrms_spa/shipOperat_Detial/${val}`,query:{ edit: val }})
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row, deleteShipManager)
    },
    handleView (val) {
      let shipNo = this.$route.query.shipNo
      this.$router.push({path: `/hrms_spa/shipOperat_Detial/${val}`,query:{ see: shipNo }})
    },
    getPhone (idcard){
      getShipownerByidcard(idcard).then(res=>{
            if(res.data.data){
              this.phone = res.data.data.phone
            }else{
              this.phone = '暂无'
            }
          })
        return this.phone
    },
    getShipNo (){
      return this.$route.query.shipNo
    },
    async loadPage (param = this.searchForm) { 
      param.shipId = this.$route.params.shipId
      let data = await this.loadTable(param, getOperatorPage)
      this.pagedTable = data.records
    },
    backPage () {
      this.$router.push({path: '/hrms_spa/shipCrew_list'})
    },
    async isManager () {
      this.userData = await getUserInfo().then(res => {
        return res.data.data
      })
      if(this.userData.roles.indexOf(111) !== -1 || this.userData.roles.indexOf(1) !== -1) {
        this.manager = true
      }
    },
  },
}
</script>