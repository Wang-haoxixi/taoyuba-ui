<template>
  <div>
    <basic-container>
      <page-header title="渔船管理"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" v-if="manager">新增</iep-button>
          <el-button v-if="manager"  type="default" size="small" @click="exportInfo">导出信息</el-button>      
        </template>
        <template slot="right">
          <!-- <operation-search @search-page="searchPage" advance-search :prop="searchData">
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search> -->
          <span><el-input v-model="params.shipName" placeholder="请输入船名号" size="small" clearable></el-input></span>
          <span><el-input v-model="params.shipNo" placeholder="请输入渔船编号" size="small" clearable></el-input></span>
          <span><el-input v-model="params.shipowner" placeholder="请输入持证人姓名" size="small" clearable></el-input></span>
          <span><el-input v-model="params.shipownerIdcard" placeholder="请输入持证人身份证" size="small" clearable></el-input></span>
          <el-button size="small"  @click="onSearch(params)">搜索</el-button>
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
        <el-table-column prop="operation" label="操作" width="400">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button size="mini" type="primary" @click="handleShow(scope.row.shipId)" v-if="manager">船员配置</iep-button>
              <iep-button size="mini" type="primary" @click="handleCrew(scope.row.shipNo)" v-if="manager">船员管理</iep-button>
              <!-- <iep-button plain @click="handleEdit(scope.row.shipId)" v-if="manager">编辑</iep-button> -->
              <iep-button @click="handleView(scope.row.shipId)">查看</iep-button>
              <iep-button type="warning" @click="handleDelete(scope.row)" v-if="manager"><i class="el-icon-delete"></i></iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
      <cert-standard  :dialog-certvisible="dialogCertVisible"  :crewcert-standard="crewcertStandard" :real-cert="realCert" :lack-cert="lackCert" @close="close"></cert-standard>
  </div>
</template>
<script>
import { getShipList, deleteShip, getMyShipList,exportExcel,getShipDetail} from '@/api/ships'
import { checkShipCert } from '@/api/post/cert'
import { getPosition} from '@/api/post/admin'
// import advanceSearch from './AdvanceSearch.vue'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
import { getUserInfo } from '@/api/login'
import CertStandard from '../component'
import groupBy from 'lodash/groupBy'
import  { mapGetters } from  'vuex'
import queryMixin from '@/mixins/query'
export default {
  components: { CertStandard },
  mixins: [mixins, queryMixin],
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
        userId: '',
      },
      dialogCertVisible:false,
      lackMap:{},
      crewcertStandard:'',
      realCert:'',
      lackCert:'',
      certTilte:[],
    }
  },
  created () {
    console.log('created...', this.$route.query.shipName)
    this.getQuery()
    this.$set(this.pagination, 'current', this.params.current)
    this.$nextTick(() => {
      // this.pagination.current = this.params.current
      console.log('this.pagination', this.pagination)
    })
    this.params.shipName = this.$route.query.shipName
    this.loadPage(this.params)
  },
computed: {
    ...mapGetters([
      'roles',
      'userInfo',
    ]),
 },
  methods: {
    onSearch (params) {
      params.current = 1
      this.setQuery(params)
      this.loadPage(params)
    },
    handleCurrentChange (val) {
      this.pageOption.current = val
      this.setQuery({current: val})
      this.loadPage()
    },
    handleSizeChange (val) {
      this.pageOption.size = val
      this.setQuery({size: val})
      this.loadPage()
    },
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
    async loadPage (param = this.params) {
      this.userData = await getUserInfo().then(res => {
        return res.data.data
      })
      if(this.userData.roles.indexOf(111) === -1 && this.userData.roles.indexOf(1) === -1 &&  this.userData.roles.indexOf(112) === -1 ){    
        let data = await this.loadTable(param, getMyShipList)
        this.pagedTable = data.records
        this.manager = false
      } else {
        let  data
        if(this.userData.roles.indexOf(112) !== -1 )
             data = await this.loadTable(param, getMyShipList)
        else
             data = await this.loadTable(param, getShipList)
        this.pagedTable = data.records
        this.manager = true
      }
    },
    exportInfo () {
      if(this.roles.indexOf(112) !== -1) this.exportParams.userId = this.userInfo.userId
      exportExcel (this.exportParams).catch(err => {
          this.$message({
            type: 'warning',
            message: err,
          })
      })
    },
    getnewStr (list,certTilte) {
      let arr = []
      if(list.length >0){
           list.forEach(item => {
            //`${str}${item.certLevel === '0' ? '' :  item.certLevel + '级'}${getdictValue(certTilte,item.certTitle)}*${item.number},`
                      let dictValue =   this.getdictValue(certTilte,item.certTitle)
                     // console.log(dictValue)
                      let str = (item.certLevel === '0' ? '' :  `${item.certLevel}级`) + dictValue  + `*${item.number}`   
                       arr.push(str)
            })
            //console.log(arr)
               return  arr.join(',')
      }
    },
   async handleShow (shipId) {
     let pass = true
       await  getShipDetail(shipId).then(res => {
              let  ship  = res.data.data
              if(ship.engineTotalPower === 0.00 || ship.hullLength === 0.00){
                        this.$message.error('请完善渔船的船长或总功率信息!')
                        pass = false
              }
        })
     if(pass){
     const lackMap  =  this.lackMap  =  await  checkShipCert (shipId).then(res => {
             return res.data.data
          }).catch(err => {
              this.$message({
              type: 'warning',
              message: err,
              })
          })
          const  certTilte = this.certTilte = await  getPosition ('tyb_crew_cert_title').then(res => {
                   return res.data.data
            })
          let tybCrewCertStandardList = lackMap['tybCrewCertStandardList']
          let certList = lackMap['certList']
          let  lackList = lackMap['lackList']
          //拼接
         // console.log(certList)
          this.crewcertStandard =  this.getnewStr(tybCrewCertStandardList,certTilte)
          this.realCert = this.getCertMap(certList,certTilte) ||  '无证书'
          this.lackCert = this.getnewStr(lackList,certTilte) || '无'
          this.dialogCertVisible = true
      }
    },
getdictValue (dictList,key) {
        for(var i in dictList){
              if(dictList[i].value === key ){
                    return dictList[i].label
              }
        }
    },
getCertMap (certList,certTilte) {
    let arr = []
      for(var key in certList){
              let dictValue =   this.getdictValue(certTilte,key)
              let  certgroupList  =  certList[key]
              //证书分级
            let  certMap  = groupBy(certgroupList,'certLevel')
            for(var level in certMap){
                    let  levelList = certMap[level]
                    let str  = (level === '0' ? '' :  `${level}级`) + dictValue  + `*${levelList.length}`
                    //console.log(str)
                     arr.push(str)
            }
      }
      return  arr.join(',')
  },
handleCrew (id) {
      this.$router.push({
        path: `/hrms_spa/myship_crew/${id}`,
      })
    },
close (flag) {
        this.dialogCertVisible = flag
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

</style>