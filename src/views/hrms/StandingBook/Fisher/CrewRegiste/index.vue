<template>
  <div>
    <basic-container>
      <page-header :title="title"></page-header>
      <operation-container>
        <template slot="left">
          <!-- <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain v-if="manager">新增</iep-button> -->
        </template>
        <template slot="right">
          <span><el-input v-model.trim="params.realName" placeholder="请输入姓名" size="small" clearable></el-input></span>
          <span><el-input v-model.trim="params.idcard" placeholder="请输入身份证号" size="small" clearable></el-input></span>
          <el-button size="small"  @click="onSearch(params)">搜索</el-button>
          <!-- <el-button @click="backPage">返回</el-button> -->
        </template>
      </operation-container>
      <!-- <operation-container>
        <template slot="left">     -->
          <!-- <iep-button v-if="manager" @click="handleAdd($route.params.shipNo)" type="primary" icon="el-icon-plus" plain>新增</iep-button> -->
        <!-- </template>
        <template slot="right">
          <span><el-input v-model="params.realname" placeholder="请输入姓名" size="small" clearable></el-input></span>
          <span><el-input v-model="params.idcard" placeholder="请输入身份证号" size="small" clearable></el-input></span>
          <el-button size="small"  @click="loadPage(params)">搜索</el-button>
          <el-button @click="backPage">返回</el-button>
        </template>
      </operation-container> -->
      <iep-table
        :isMutipleSelection="false"
        :isLoadTable = "isLoadTable"
        :pagination="pagination"
        :columnsMap="CrewRegisteColumnsMap"
        :pagedTable="pagedTable"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
        is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="200">
          <template slot-scope="scope">
            <operation-wrapper>
              <!-- <iep-button size="mini" plain @click="handleRecord(scope.row.idcard)">上下船记录</iep-button> -->
              <!-- <iep-button size="mini" plain @click="handleEdit(scope.row.idcard)">编辑</iep-button> -->
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
// import { getHoldersByShip } from '@/api/tmlms/shipshareholder/index'
// import { getShipByShipId } from '@/api/ships/index'
import { getCrewRegiste} from '@/api/tmlms/boatMan'
import mixins from '@/mixins/mixins'
import { CrewRegisteColumnsMap } from '../options'
import { getUserInfo } from '@/api/login'
export default {
  mixins: [mixins],
  data () {
    return {
      CrewRegisteColumnsMap,
      searchData: 'contactName',
      manager:false,
      userData:{},
      phone:'',
      title:'',
      owner:{},
      params:{
        current: 1,
        size: 10,
        realName: '',
        idcard: '',
      },
      certLevel: [
        { value: '0', label: '' },
        { value: '1', label: '一级' },
        { value: '2', label: '二级' },
        { value: '3', label: '三级' },
      ],
    }
  },
  created () {
    let query = sessionStorage.getItem('query')
    if (sessionStorage.getItem('query')) {
      let val = JSON.parse(query)
      for (let key in this.params) {
        if (val[key]) {
          this.params[key] = val[key]
        }
      }
    }
    this.loadPage()
    this.isManager()
    this.getTitle()
  },
  methods: {
      getTitle (){
          this.title = '上船人员登记'
      },
    handleSelectionChange (val) {     
      this.multipleSelection = val.map(m => m.id)
    },
    handleRecord (idcard) {
      this.$router.push({path: `/hrms_spa/CrewRegiste/record/${idcard}`})
    },
    // handleEdit (val) {
    // this.$router.push({name: 'detailBoatMan',query:{ edit: val,idcard:'idcard' }})
    // },
    // handleDelete (row) {
    //   this._handleGlobalDeleteById(row, deleteShipManager)
    // },
    handleView (val) {
      this.$router.push({name: 'detailBoatMan',query:{ see: val }})
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
    onSearch (param) {
      sessionStorage.setItem('query', JSON.stringify(this.params))
      this.loadPage(param)
    },
    async loadPage (param = this.searchForm) { 
      // param.shipNo = this.$route.params.shipNo
      // param.status = 1
      let data = await this.loadTable(param, getCrewRegiste)
      this.pagedTable = data.records.map(item=>{
        let arr = []
        item.certs.forEach(v=>{
          let name = ''
          this.certLevel.map(data=>{
            if (v.certLevel === data.value) {
              name = data.label
            }
          })
          this.$store.getters.dictGroup.tyb_crew_cert_title.map(data=>{
          if(v.certTitle==data.value){
            name += data.label
              // item.certNames=item.certNames+data.label
            }
          })
          if (name) {
            arr.push(name)
          }
        })
        item.certNames = arr.join(',')
        return item 
      })
      console.log(this.pagedTable)
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