<template>
  <div>
    <basic-container>
      <page-header title="渔船船员"></page-header>
      <operation-container>
        <template slot="left" v-if="$route.query.page">
          <iep-button @click="getShipDetail($route.params.shipNo)" type="primary" icon="el-icon-plus" plain>新增</iep-button>
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
        <el-table-column prop="operation" label="操作" width="300">
          <template slot-scope="scope">
            <operation-wrapper>                       
              <!-- <iep-button size="mini" plain @click="handleDelete(scope.row.id)">删除</iep-button> -->
              <iep-button size="mini" @click="handleView(scope.row.idcard)">查看</iep-button>
              <iep-button size="mini" plain v-if="scope.row.workStatus!='上船，已签合同'" @click="handleEdit(scope.row.idcard)">编辑</iep-button>
              <iep-button v-if="$route.query.page" size="mini" type="primary" @click="handleCrew(scope.row.idcard,scope.row.workStatus)">离船</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
        <el-table-column prop="particular" label="详情" width="140"  v-if="!$route.query.page">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button size="mini" type="primary" @click="handleProtocol(scope.row.contractId)">协议</iep-button>
              <iep-button size="mini" type="primary" @click="handleInsure(scope.row.employeeIdcard)">证书</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <el-dialog title="船员离船原因" :visible.sync="dialogCrewVisible" width="70%" append-to-body> 
      <el-form :model="form" ref="form" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="8">
              <el-form-item label="离船原因:" prop="reason">
                <el-select v-model="form.reason"  placeholder="请选择" reasons>
                  <el-option v-for="item in reasons" :key="item.index" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>     
        <div style="text-align:center">
          <el-button @click="save" >提交</el-button>
          <el-button @click="$router.go(-1)">取消</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
// import { getShipCrewList, delShipCrew } from '@/api/ships/shipcrew/index'
// import { getList } from '@/api/tmlms/newContract'
// import { getMyRecruitPage } from '@/api/post/recruit'
import { getShipCrewList } from '@/api/ships/shipcrew'
import { addUpWork } from '@/api/post/admin'
import mixins from '@/mixins/mixins'
import { crewColumnsMap } from '../options'
import { getShipByShipNo } from '@/api/ships'
import { getUserInfo } from '@/api/login'
import keyBy from 'lodash/keyBy'

export default {
  mixins: [mixins],
  data () {
    return {
      form:{
        idcard:'',
        workStatus:'',
        reason:'',
      },
      reasons:[
        {
          label: '船员觉得开船时间太久',
          value: 0,
        },
        {
          label: '船员觉得工资太低',
          value: 1,
        },
        {
          label: '船员工作不认真',
          value: 2,
        },
      ],
      crewColumnsMap,
      searchData: 'contactName',
      message: '此渔船暂无相关网签劳务合同信息',
      manager:false,
      shipId:'',
      userData:{},
      dialogCrewVisible:false,
      workStatus:[
        {
          label: '未用工',
          value: 0,
        },
        {
          label: '上船，已签合同',
          value: 1,
        },
        {
          label: '离船，未解除合同 ',
          value: 2,
        },
        {
          label: '上船，未签合同',
          value: 3,
        },
        {
          label: '离船，未签合同',
          value: 4,
        },
      ],
      rules:{
        reason:[{required: true, message: '该选项必填！', trigger: 'blur'}],
      },
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
    getShipDetail (val){
      getShipByShipNo(val).then(({data})=>{
        this.handleAdd(data.data.shipId)
      })
    },
    handleAdd (val) {
      this.$router.push({path: `/hrms_spa/shipCrew_Detial/${val}`}) 
      // this.$router.push({path: `/hrms_spa/shipCrew_Detial/${val}`, query:{ add: val }}) 
    },
    handleEdit (val) {
      this.$router.push({name: 'detailBoatMan',query:{ edit: val , shipCrew : true}})
      // this.$router.push({path: `/hrms_spa/shipCrew_Detial/${val}`,query:{ edit: val }})
    },
    // handleDelete (row) {
    //   this._handleGlobalDeleteById(row, delShipCrew)
    // },
    handleView (val) {
      // this.$router.push({path: `/hrms_spa/shipCrew_Detial/${val}`,query:{ see: val }})
      // this.$router.push({name: 'detailBoatMan',query:{ edit: val }})
      this.$router.push({name: 'detailBoatMan', query:{ see : val , shipCrew : true}})
      // this.$router.push({path: `/hrms_spa/shipCrew_Detial/${val}`, query:{ see : val}})
    },
    async loadPage (param = this.searchForm) {
      param.shipId = await getShipByShipNo(this.$route.params.shipNo).then(({data})=>{
        return data.data.shipId
      })
      // param.status = 1
      // let data = await this.loadTable(param, getList)
      let data = await this.loadTable(param,  getShipCrewList)
      console.log( data )
      data.records.map(item =>{
        item.workStatus=keyBy(this.workStatus, 'value')[item.workStatus].label
      })
      this.pagedTable = data.records
      console.log('打出来看看')
      console.log(this.pagedTable)
    },
    handleProtocol (contractId) {
      let urlHeade = window.location.href.split('/')[0,2]        
      let dataMap  = '%7B%7D'
      this.$openPage(`//${urlHeade}/api/tmlms/downLoad/intoContractHtml?contractId=${contractId}&dataMap=${dataMap}`,'url') 
    },
    handleInsure (val) {
      this.$router.push({ path: `/hrms_spa/shipCrew_Insure/${val}` })
    },
    handleCrew (idcard, status) {
      this.$confirm('您确定此船员离船?', '提示', {                                            
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(()=>{
          this.form.idcard=idcard.toString()
          this.workStatus.map( item =>{
            if(item.label==status){
            switch (item.value){
              case 1:
                this.form.workStatus=2
                break
              case 3:
                this.form.workStatus=4
                break
            }
            }
          })
        if(this.form){
        let idcard=this.form.idcard
        let status=this.form.workStatus
        addUpWork (this.form,idcard,status).then(()=>{
          console.log(this.form)
            this.$message.success('船员已离船!')
            this.$router.go(0)
        })
      }
        }).catch(() => {         
        })
      // this.dialogCrewVisible = true
    },
    backPage () {
      this.$router.go(-1)
      // this.$router.push({path: '/hrms_spa/shipCrew_list'})
    },
  async isManager () {
      this.userData = await getUserInfo().then(res => {
        return res.data.data
      })
      if(this.userData.roles.indexOf(111) !== -1 || this.userData.roles.indexOf(1) !== -1) {
        this.manager = true
      }
    },
    save () {
      if(this.form){
        let idcard=this.form.idcard
        let status=this.form.workStatus
        addUpWork (this.form,idcard,status).then(()=>{
          console.log(this.form)
            this.$message.success('船员已离船!')
            this.$router.go(-1)
        })
      }
    },
  },
}
</script>