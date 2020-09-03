<template>
  <div>
    <basic-container>
      <page-header :title="title"></page-header>
      <operation-container>
        <template slot="left">    
          <!-- <iep-button v-if="manager" @click="handleAdd($route.params.shipNo)" type="primary" icon="el-icon-plus" plain>新增</iep-button> -->
        </template>
        <template slot="right">
          <el-button @click="backPage">返回</el-button>
        </template>
      </operation-container>
      <iep-table                    
              :pagination="pagination"
              :columnsMap="shareHolderColumnsMap"
              :pagedTable="pagedTable"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              @selection-change="handleSelectionChange"
              is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="200">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button size="mini" plain v-if="!(scope.row.showbtn==1)" @click="handleEdit(scope.row.idcard)">编辑</iep-button>
              <!-- <iep-button size="mini" plain @click="handleView(scope.row.shipName)">查看</iep-button> -->
              <!-- <iep-button size="mini" plain @click="handleDelete(scope.row.id)">删除</iep-button>     -->
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
// import { getOperatorPage, 
// //deleteShipManager 
// } from '@/api/ships/shipoperat/index'
// import { getShipownerByidcard } from '@/api/tmlms/shipowner/index'
import { getHoldersByShip } from '@/api/tmlms/shipshareholder/index'
import { getShipByShipId } from '@/api/ships/index'
import mixins from '@/mixins/mixins'
import { shareHolderColumnsMap } from '../options'
import { getUserInfo } from '@/api/login'
export default {
  mixins: [mixins],
  data () {
    return {
      shareHolderColumnsMap,
      searchData: 'contactName',
      manager:false,
      userData:{},
      phone:'',
      title:'',
      owner:{},
    }
  },
  created () {
    this.loadPage()
    this.isManager()
    this.getTitle()
  },
  methods: {
      getTitle (){
          this.title = this.$route.query.shipName+'股东'
      },
    handleSelectionChange (val) {     
      this.multipleSelection = val.map(m => m.id)
    },
    handleEdit (val) {
    this.$router.push({name: 'detailBoatMan',query:{ edit: val,idcard:'idcard' }})
    },
    // handleDelete (row) {
    //   this._handleGlobalDeleteById(row, deleteShipManager)
    // },
    // handleView (val) {
    //   let shipNo = this.$route.query.shipNo
    //   this.$router.push({path: `/hrms_spa/shipOperat_Detial/${val}`,query:{ see: shipNo }})
    // },
    // getPhone (idcard){
    //   getShipownerByidcard(idcard).then(res=>{
    //         if(res.data.data){
    //           this.phone = res.data.data.phone
    //         }else{
    //           this.phone = '暂无'
    //         }
    //       })
    //     return this.phone
    // },
    // getShipNo (){
    //   return this.$route.query.shipNo
    // },
    async loadPage () { 
      let shipId = this.$route.params.shipId
      let shipowner = await getShipByShipId(this.$route.params.shipId)
      this.owner.address = shipowner.data.data.address
      this.owner.phone = shipowner.data.data.mobile
      this.owner.idcard = shipowner.data.data.shipownerIdcard
      this.owner.positionId = ''
      this.owner.realName = shipowner.data.data.shipowner
      this.owner.shipId = shipId
      this.owner.showbtn = 1
      getHoldersByShip(shipId).then(res=>{
        let alldata = [this.owner,...res.data.data]
        this.pagedTable = alldata
        console.log(this.pagedTable)
      })
    //   let data = await this.loadTable(shipId, getHoldersByShip)
    //   console.log(data)
    //   this.pagedTable = data.records
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