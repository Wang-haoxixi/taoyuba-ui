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
              :isLoadTable="false"
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
              <!-- <iep-button size="mini" plain v-if="!(scope.row.showbtn==1)" @click="handleEdit(scope.row.idcard)">编辑</iep-button> -->
              <iep-button size="mini" plain v-if="scope.$index !== 0 && scope.row.isEdit" @click="handleEdit(scope.row.idcard)">编辑</iep-button>
              <iep-button size="mini" plain @click="handleView(scope.row.idcard)">查看</iep-button>
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
import { getCrew } from '@/api/tmlms/boatMan'
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
    // this.isManager()
    this.getTitle()
  },
  methods: {
    getTitle (){
      this.title = this.$route.query.shipName+'股东'
    },
    getCrewInfo (idcard, row) {
      getCrew({idcard: idcard}).then(({ data }) => {
        if (data.code === 0) {
          if (data.data.records.length > 0) {
            this.$set(row, 'isEdit', true)
            // row.isEdit = true
          }
        }
      })
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
    handleView (val) {
      this.$router.push({path: '/boatMan/detail',query:{ see: val }})
    },
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
        let alldata=[]
        alldata[0] = this.owner
        if(res.data.data.length>0){
          for( let key in res.data.data){
            if(res.data.data[key].positionId == 0){
              res.data.data[key].positionId=''
            }
          }
           alldata = [...alldata,...res.data.data]
        }      
        alldata[0].realName = alldata[0].realName + '(持证人)'
        this.pagedTable = alldata
        this.pagedTable.forEach(async (item, index) => {
          if (index !== 0) {
            await this.getCrewInfo(item.idcard, item)
          }
        })
        // console.log(this.pagedTable)
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