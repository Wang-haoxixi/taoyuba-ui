<template>
  <div>
    <basic-container v-if="prot && archives">
      <page-header title="一船一档"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button v-if="mlms_ship_add" @click="handleAdd()" type="primary">新增</iep-button>
          <iep-button @click="handleFresh" type="default" >刷新</iep-button>
        </template>
        <template slot="right">
          <!-- <operation-search @search-page="searchPage" advance-search :prop="searchData">
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search> -->
          <span style="width:185px" v-if="!roles.includes(112)">
            <el-select v-model="searchOrg" placeholder="基层组织" size="small" clearable>
              <el-option
                v-for="item in orgSearchList"
                :key="item.index"
                :label="item.villageName"
                :value="item.userId"
                >
              </el-option>
            </el-select>
          </span>
          <span style="width:110px" >
            <el-select v-model="params.status" placeholder="合同状态" size="small" clearable>
              <el-option
                v-for="item in contractList"
                :key="item.index"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </span>
          <span class="width130"><el-input v-model.trim="params.shipName" placeholder="船名号" size="small" clearable></el-input></span>
          <span class="width130"><el-input v-model.trim="params.shipNo" placeholder="渔船编号" size="small" clearable></el-input></span>
          <span class="width130"><el-input v-model.trim="params.shipowner" placeholder="持证人姓名" size="small" clearable></el-input></span>
          <span class="width180"><el-input v-model.trim="params.shipownerIdcard" placeholder="持证人身份证" size="small" clearable></el-input></span>
          <el-button size="small"  @click="getParamData">搜索</el-button>
        </template>
      </operation-container>
      <!-- <iep-table
              :isLoadTable="isLoadTable"
              :pagination="pagination"
              :columnsMap="columnsMap"
              :pagedTable="pagedTable"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              @selection-change="handleSelectionChange"
              is-mutiple-selection> -->
      <el-table
          :data="pagedTable"
          stripe
          style="width: 100%">
        <el-table-column
          v-for="(item,index) in options.columns"
          :key="index"
          :prop="item.value"  
          :label="item.text"
        >
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="180" v-if="!roles.includes(115)">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button  v-if="manager && mlms_ship_edit" size="mini" plain  @click="handleEdit(scope.row.shipId)">编辑</iep-button>   
              <!-- <iep-button size="mini" @click="handleView(scope.row.shipId)">查看</iep-button> -->
              <iep-button size="mini"  @click="handleChange(scope.row.shipId)" v-if="mlms_ship_change && !roles.includes(112)">变更</iep-button>
              <iep-button size="mini"  @click="handleChangeArea(scope.row.shipId,scope.row.orgId)" v-if="mlms_ship_area && !roles.includes(112)">区域</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
        <el-table-column prop="particular" label="详情" width="320">
          <template slot-scope="scope">
            <operation-wrapper>
              <!-- v-if="isExistContract(scope.row.shipName)" -->
              <!-- <iep-button size="mini" type="primary" @click="handleIntoinsure(scope.row.shipName)">保单</iep-button> -->
              <el-dropdown v-if="mlms_ship_template || (mlms_ship_download && scope.row.contractModelStatus)">
                <el-button type="primary" size="mini">
                  模板<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="mlms_ship_template"><span @click="handleTmp(scope.row.shipName,scope.row.contractModelStatus)">生成</span></el-dropdown-item>
                  <el-dropdown-item v-if="mlms_ship_download && scope.row.contractModelStatus"><span @click="handlePrint(scope.row.shipName)">下载</span></el-dropdown-item>
                  <!-- <iep-button size="mini" type="primary"  v-if="mlms_ship_template" @click="handleTmp(scope.row.shipName,scope.row.contractModelStatus)">生成</iep-button> -->
                  <!-- <iep-button size="mini" type="primary" v-if="mlms_ship_download && scope.row.contractModelStatus" @click="handlePrint(scope.row.shipName)">下载</iep-button> -->
                </el-dropdown-menu>
              </el-dropdown>
              <iep-button size="mini" type="primary" v-if="mlms_ship_crew" @click="handleAllCrew(scope.row.shipId,scope.row.shipName, scope.row)">船员</iep-button>
              <iep-button size="mini" type="primary" v-if="mlms_ship_crew" @click="handlePort(scope.row)">进出港</iep-button>
              <iep-button size="mini" type="primary"  @click="boatArchives(scope.row)">渔船档案</iep-button>
              <iep-button size="mini" type="primary" v-if="mlms_ship_shareholder && scope.row.shipShare==1" @click="handleHodler(scope.row.shipId,scope.row.shipName)">股东</iep-button>
              <iep-button size="mini" type="primary" v-if="mlms_ship_contract" @click="handleCrew(scope.row)">合同</iep-button>
              <!-- <iep-button size="mini" type="primary" @click="handleCrew(scope.row.shipNo)">船员</iep-button> -->
              <el-dropdown v-if="mlms_ship_export || mlms_shipname_export">
                <el-button type="primary" size="mini">
                  导出<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="mlms_ship_export"><span @click="exportInfo(scope.row.shipId,scope.row.shipName)">开航登记表</span></el-dropdown-item>
                  <el-dropdown-item v-if="mlms_shipname_export"><span @click="exportShipInfo(scope.row.shipId,scope.row.shipName)">船员登记表</span></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <iep-button size="mini" type="primary" v-if="mlms_ship_danger" @click="handleDanger(scope.row)">隐患排查</iep-button>
              <!-- <iep-button size="mini" type="primary" v-if="mlms_ship_export" @click="exportInfo(scope.row.shipId,scope.row.shipName)">导出</iep-button> -->
              <!-- <iep-button size="mini" type="primary" @click="handleOperat(scope.row.shipId,scope.row.shipNo)">经营人</iep-button> -->
            </operation-wrapper>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="基层组织变更" :visible.sync="dialogVisible" >
        <el-form  ref="form" >
          <el-form-item label="请选择基层组织" :label-width="formLabelWidth">
            <el-select v-model="chooseOrg" placeholder="请选择" width="150">
              <el-option v-for="item in orgList" :key="item.index" :label="item.villageName" :value="item.userId"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="区域组织变更" :visible.sync="areadialogVisible" >
        <el-form  ref="form" >
          <el-form-item label="请选择区域组织" :label-width="formLabelWidth">
            <el-select v-model="areachooseOrg" placeholder="请选择" width="150">
              <el-option v-for="item in areaorgList" :key="item.index" :label="item.name" :value="item.orgId"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="areadialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="savearea">确 定</el-button>
        </div>
      </el-dialog>
      <!-- <el-dialog title="基层组织变更" :visible.sync="dialogVisible" width="70%" append-to-body> 
      <el-form ref="form" label-width="150px" >
          <el-row>
            <el-col :span="8">
              <el-form-item label="请选择基层组织:" prop="reason">
                <el-select v-model="chooseOrg"  placeholder="请选择" reasons>
                  <el-option v-for="item in orgList" :key="item.index" :label="item.villageName" :value="item.userId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>     
        <div style="text-align:center">
          <el-button @click="save" >提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </div>
    </el-dialog> -->
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="total"
          :page-size="params.size"
          :current-page.sync="params.current"
          @size-change="handleSizeChange"
          @current-change="currentChange">
        </el-pagination>
      </div>
    </basic-container>
    <basic-container v-if="!prot">
      <prots :row="row" @back="prot = true"></prots>
    </basic-container>
    <basic-container v-if="!archives">
      <archives  @back="archives = true" :row="row"></archives>
    </basic-container>
  </div>
</template>
<script>
import { getVillageByOrg } from '@/api/tmlms/bvillage/index'
import { countCrew } from '@/api/tmlms/boatMan/index'
import { getVillageShipList,changeShip,exportShipExcel, exportShipNameExcel,exportContractModel,getFixOrgIds,changeOrgIds } from '@/api/ships'
// import { getVillageShipList } from '@/api/ships'
import prots from './Prot.vue'
import archives from './Archives.vue'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
import { getUserInfo } from '@/api/login'
// import { checkIsExist } from '@/api/tmlms/contractModel'
import { mapGetters } from 'vuex'
export default {
  components: {
    prots,
    archives,
  },
  mixins: [mixins],
  data () {
    return {
      pagedTabl: [],
      columnsMap,
      // searchData: 'shipName',
      total: 10,
      params: {
        current: 1,
        size: 10,
        shipName: '',
        shipNo: '',
        shipowner: '',
        shipownerIdcard: '',
        status: '',
      },
      options: {
        expandAll: false,
        columns: [
          {
            value: 'villageId',
            text: '基层组织',
          },
          {
            value: 'shipName',
            text: '渔船名',
          },
          {
            value: 'shipNo',
            text: '渔船编号',
          },
          {
            value: 'shipowner',
            text: '持证人',
          },
          {
            value: 'shipownerIdcard',
            text: '持证人身份证',
          },
          {
            value: 'licensesOwnerShip',
            text: '所有权登记证',
          },
          {
            value: 'countCrews',
            text: '合同/人数',
          },
        ],
      },
      manager:false,
      userData:{},
      dialogVisible:false,
      areadialogVisible:false,
      orgList:[],
      areaorgList:[],
      orgSearchList:[],
      chooseOrg:'',
      areachooseOrg:'',
      searchOrg:'',
      formLabelWidth: '120px',
      shipId:'',
      areaShipId:'',
      villageId:'',
      contractList: [
          {
            value: ' ',
            label: '全部',
          },
          {
            value: 1,
            label:  '已签合同',
          },

      ],
      contractStatus: '',
      exportParams: {
        shipId: '',
      },
      exist:'',
      modelParams:{
        shipName:'',
      },
      mlms_ship_add: false,
      mlms_ship_edit: false,
      mlms_ship_change: false,
      mlms_ship_area: false,
      mlms_ship_template: false,
      mlms_ship_crew: false,
      mlms_ship_contract: false,
      mlms_ship_shareholder: false,
      mlms_ship_download: false,
      mlms_ship_export: false,
      mlms_shipname_export: false,
      mlms_ship_danger: false,
      isqushan: '',
      prot: true,
      archives: true,
      row: {},
    }
  },
  created () {
    // this.isqushan = JSON.parse(localStorage.getItem('user')).sysUser.orgId
    let user = localStorage.getItem('orgId')
    this.isqushan = JSON.parse(user)
    if (sessionStorage.getItem('query')) {
      var query = sessionStorage.getItem('query')
      this.params = JSON.parse(query)
    } else {
      this.params = {
        current: 1,
        size: 10,
        shipName: '',
        shipNo: '',
        shipowner: '',
        shipownerIdcard: '',
        status: '',
      }
    }
    this.getData()
    this.isManager()
    this.getVillageOrg()
    this.mlms_ship_add = this.permissions['mlms_ship_add']
    this.mlms_ship_edit = this.permissions['mlms_ship_edit']
    this.mlms_ship_change = this.permissions['mlms_ship_change']
    this.mlms_ship_area = this.permissions['mlms_ship_area']
    this.mlms_ship_template = this.permissions['mlms_ship_template']
    this.mlms_ship_crew = this.permissions['mlms_ship_crew']
    this.mlms_ship_contract = this.permissions['mlms_ship_contract']
    this.mlms_ship_shareholder = this.permissions['mlms_ship_shareholder']
    this.mlms_ship_download = this.permissions['mlms_ship_download']
    this.mlms_ship_export = this.permissions['mlms_ship_export']
    this.mlms_shipname_export = this.permissions['mlms_shipname_export']
    this.mlms_ship_danger = this.permissions['mlms_ship_danger']
  },
  computed: {
    ...mapGetters(['userInfo', 'roles','permissions']),
  },
  methods: {
    // 进出港
    handlePort (row) {
      this.row = row
      this.prot = false
    },
    handleDanger (row) {
      this.$router.push({
        path: `/danger/all?shipName=${row.shipName}`,
      })
    },
    handleFresh () {
      this.getData()
    },
    savearea () {
      changeOrgIds(this.areaShipId,this.areachooseOrg).then(res=>{
        if(res.data.data){
            this.$message.success('区域组织变更成功')
            this.areadialogVisible = false
          }
      })
    },
    save () {
      if(this.userInfo.userId && this.shipId){
        let shipId =this.shipId
        changeShip(shipId,this.chooseOrg).then(res=>{
          if(res.data.data){
            this.$message.success('变更成功')
            this.dialogVisible = false
          }
        })
      }
    },
    exportInfo (shipId,shipName) {   
      this.exportParams.shipId = shipId
      this.exportParams.shipName = shipName                         
      exportShipExcel (this.exportParams).catch(err => {
        this.$message({
          type: 'warning',
          message: err,
        })
    })
    },
    exportShipInfo (shipId,shipName) {   
      this.exportParams.shipId = shipId
      this.exportParams.shipName = shipName                         
      exportShipNameExcel (this.exportParams).catch(err => {
        this.$message({
          type: 'warning',
          message: err,
        })
    })
    },
    getVillageOrg () {
      getVillageByOrg().then(res=>{
        this.orgList = res.data.data
        this.orgSearchList = this.orgList.slice()
        this.orgSearchList.unshift({userId:' ',villageName:'全部'})
      })
    },
    handleSelectionChange (val) {     
      this.multipleSelection = val.map(m => m.id)
    },
    handleSizeChange (val) {
      this.params.size = val
      this.params.current = 1
      this.getData()
    },
    currentChange (val) {
      this.params.current = val
      this.getData()
    },
    handleAdd () {
      this.$router.push({
        path: '/hrms_spa/village_ship_detail',
        query:{ add: 'add' },
      })  
    },
    handleHodler (shipId,shipName){
      // console.log(shipId)
      this.$router.push({path: `/hrms_spa/shipShareHolder/${shipId}`,query:{shipName:shipName}})
    },
    handleChange (shipId){
      this.shipId = shipId
      this.dialogVisible = true
    },
    handleChangeArea (shipId,orgId){
      orgId = 0
      this.areaShipId = shipId
      getFixOrgIds(shipId,orgId).then(res=>{
        this.areaorgList = res.data.data
      })  
      // console.log(villageId)
      // this.shipId = shipId
      this.areadialogVisible = true
    },
    handleView (val) {
      this.$router.push({path: '/hrms_spa/village_ship_detail', query:{ see: val }})
    },
    handleEdit (val) {
      this.$router.push({path: '/hrms_spa/village_ship_detail', query:{ edit: val }})
    },
    handleTmp (name,model) {
      let operate
      if(model){
        operate = 'edit'
      }else{
        operate = 'add'
      }
      this.$router.push({path:`/tmlms_spa/contract_tmp/${name}`,query: {operate:`${operate}`}})
    },
    handlePrint (val) {
      this.modelParams.shipName = val
      exportContractModel(this.modelParams).catch(err => {
        this.$message({
          type: 'warning',
          message: err,
        })
      })
    },
    getData () {
      getVillageShipList(this.params).then(data => {
        // this.pagedTable =  JSON.parse(JSON.stringify(data.data.data.records))
        data.data.data.records.forEach(async (v) => {
          // v.countCrews = ''
          if (v.villageId == 0) {
            v.villageId = '--'
            // v.villageId = '--'
          }else{
            getVillageByOrg().then(res=>{
              res.data.data.map(item=>{
                if(item.userId == v.villageId){
                  v.villageId = item.villageName
                }
              })
            })
          }
          v.countCrews = ''
          v.countCrews = await countCrew(v.shipId).then(res=>{
            return res.data.data. contract+'/'+res.data.data.crew
          })
          if (v.shipNo === '0') {
            v.shipNo = '请完善'
          }
          if (v.shipowner === '') {
            v.shipowner = '请完善'
          }
          if (v.shipownerIdcard === '0') {
            v.shipownerIdcard = '请完善'
          }
          if (v.hullLength === 0) {
            v.hullLength = '请完善'
          }
          })
        this.$nextTick(()=>{
          this.pagedTable = data.data.data.records
        })
        this.total = data.data.data.total
      })
      
    },
    handleIntoinsure (shipName) {
      this.$router.push({       
        path: `/hrms_spa/ship_insure_list/${shipName}`,
      })
    },
    handleCrew (row) {
      this.$router.push({       
        path: `/hrms_spa/ship_crew/${row.shipNo}`,
        query: {
          shipName: row.shipName,
        },
      })
    },
    handleAllCrew (shipId,shipName, row) {
      this.$router.push({       
        path: `/hrms_spa/ship_allcrew/${shipId}`, 
        query:{
          shipName:`${shipName}`,
          shipowner: row.shipowner,
          mobile: row.mobile,
        },
      })
    },
    handleOperat (id,No) {
      this.$router.push({       
        path: `/hrms_spa/ship_operat/${id}`,
        query:{shipNo:No},
      })
    },
    //搜索
    getParamData () {       
      this.params.userId = this.searchOrg
      this.params.shipName = this.params.shipName.replace(/\s*/g,'')
      this.params.shipNo = this.params.shipNo.replace(/\s*/g,'')
      this.params.shipowner = this.params.shipowner.replace(/\s*/g,'')
      this.params.shipownerIdcard = this.params.shipownerIdcard.replace(/\s*/g,'')
      this.params.current = 1
      this.getData()
    },
    boatArchives (row) {
      console.log(row)
      this.row = row
      this.archives = false
    },
    async isManager () {
      this.userData = await getUserInfo().then(res => {
        return res.data.data
      })
      if(this.userData.roles.indexOf(111) !== -1 || this.userData.roles.indexOf(1) !== -1 || this.userData.roles.indexOf(112) !== -1) {
        this.manager = true
      }
    },
  },
 activated () {
      let pageIndex = parseInt(this.history.getItem('pageIndex')) || 1
      this.searchData(pageIndex) // 这是我们获取数据的函数
  },
  watch: {
    params () {
      sessionStorage.setItem('query', JSON.stringify(this.params))
    },
  },
  beforeUpdate () {
    sessionStorage.setItem('query', JSON.stringify(this.params))
  },
}
</script>
<style lang="scss" scoped>
.width130{
  width:130px;
}
.width180{
  width:180px;
}
</style>