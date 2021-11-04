<template>
  <div>
    <basic-container>
      <page-header :title="shipTitle"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="primary">上船登记</iep-button>
          <iep-button
            v-if="relation_ship_add"
            @click="handleAddRelation"
            type="default"
            >新增联系记录</iep-button
          >
        </template>
        <!-- <template slot="right">
          <operation-search @search-page="searchPage" advance-search :prop="searchData">
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template> -->
        <template slot="right">
          <el-button @click="backPage" size="small">返回</el-button>
        </template>
      </operation-container>
      <iep-table
        :cell-style="tableCellStyle"
        :isLoadTable="false"
        :isPagination="false"
        :pagination="pagination"
        :columnsMap="allcrewColumnsMap"
        :dictsMap="dictsMap"
        :pagedTable="pagedTable"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
        :emptyText="message"
        is-mutiple-selection
      >
      <template slot="before-columns">
        <el-table-column
      label="姓名"
      width="180"
      prop="realName">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top" v-if="scope.row.idcard == '' || checIdCard(scope.row.idcard) || scope.row.phone == '' || checkPhone(scope.row.phone)">
          <p v-if="scope.row.idcard == '' || checIdCard(scope.row.idcard)">身份证缺失或有误</p>
          <p v-if="scope.row.phone == '' || checkPhone(scope.row.phone) ">联系方式缺失或有误</p>
          <p v-if="scope.row.workStatus == '上船，未签合同'" >上船未签合同</p>
          <p v-if="scope.row.signStatus == 0">未培训</p>
          <div slot="reference" class="name-wrapper">
            {{ scope.row.realName }}
          </div>
        </el-popover>
      </template>
    </el-table-column>
      </template>
        <el-table-column prop="operation" label="操作" width="300">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button
                size="mini"
                plain
                @click="handleEdit(scope.row.idcard)"
                >编辑</iep-button
              >
              <iep-button
                size="mini"
                plain
                @click="handleChange(scope.row.idcard)"
                >变更</iep-button
              >
              <iep-button
                size="mini"
                plain
                @click="handleView(scope.row.idcard)"
                >查看</iep-button
              >
              <iep-button
                size="mini"
                plain
                v-if="scope.row.sign"
                @click="handleSign(scope.row.idcard)"
                >合同</iep-button
              >
              <iep-button
                size="mini"
                plain
                v-if="!scope.row.sign"
                @click="contractAdd(scope.row.idcard)"
                >签合同</iep-button
              >
              <iep-button
                size="mini"
                plain
                v-if="!roles.includes(115)"
                @click="handleDelete(scope.row.idcard)"
                >删除</iep-button
              >
              <!-- <iep-button size="mini" @click="handleView(scope.row.idcard)">查看</iep-button> -->
              <!-- <iep-button size="mini" plain v-if="scope.row.workStatus!='上船，已签合同'" @click="handleEdit(scope.row.idcard)">编辑</iep-button> -->
              <!-- <iep-button size="mini" type="primary" @click="handleCrew(scope.row.idcard,scope.row.workStatus)">离船</iep-button> -->
            </operation-wrapper>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="particular" label="详情" width="140"  >
          <template slot-scope="scope">
            <operation-wrapper v-if="scope.row.workStatus=='上船，已签合同'">
              <iep-button size="mini" type="primary" @click="handleProtocol(scope.row.idcard)">协议</iep-button>
              <iep-button size="mini" type="primary" @click="handleInsure(scope.row.idcard)">证书</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column> -->
      </iep-table>
    </basic-container>
    <!-- <el-dialog title="船员离船原因" :visible.sync="dialogCrewVisible" width="70%" append-to-body> 
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
    </el-dialog> -->
    <dialog-form-relation
      ref="dialogFormRelation"
      :status="relationStatus"
      v-model="formRelation"
    ></dialog-form-relation>
    <change-man ref="changeMan" @back="getData()"></change-man>
  </div>
</template>
<script>
// import { getShipCrewList, delShipCrew } from '@/api/ships/shipcrew/index'
// import { getList } from '@/api/tmlms/newContract'
// import { getMyRecruitPage } from '@/api/post/recruit'
import { getCrewByShipId,deleteCrewRelation } from '@/api/tmlms/boatMan'
import changeMan from '@/components/changeMan/index'
// import { getShipCrewList } from '@/api/ships/shipcrew'
import { addUpWork } from '@/api/post/admin'
import { getContractByidcard } from '@/api/tmlms/newContract'
import mixins from '@/mixins/mixins'
import { allcrewColumnsMap,dictsMap,checkPhone,checIdCard } from '../options'
// import { getShipByShipNo } from '@/api/ships'
import { getUserInfo } from '@/api/login'
import keyBy from 'lodash/keyBy'
import { mapGetters } from 'vuex'
import dialogFormRelation from '@/views/tmlms/relation/dialogForm'
import rogionMixin from '../rogionMixin'
export default {
  mixins: [mixins, rogionMixin],
  components: {
    dialogFormRelation,
    changeMan,
  },
  data () {
    return {
      row:'',
      relationStatus: '',
      dictsMap,
      form:{
        idcard:'',
        workStatus:'',
        reason:'',
      },
      certLevel: [
        { value: '0', label: '' },
        { value: '1', label: '一级' },
        { value: '2', label: '二级' },
        { value: '3', label: '三级' },
      ],
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
      allcrewColumnsMap,
      searchData: 'contactName',
      message: '此渔船暂无相关船员',
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
        {
          label: '待求职',
          value: 9,
        },
      ],
      flag:[
        {
          label: '设备',
          value: 1,
        },
        {
          label: '微信',
          value: 2,
        },
        {
          label: '变更登记',
          value: 3,
        },
      ],
      rules:{
        reason:[{required: true, message: '该选项必填！', trigger: 'blur'}],
      },
      conCrew:[],
      shipTitle:'',
      formRelation: {},
      relation_ship_add: false,
    }
  },
  created () {
    this.getData()
  },
  computed: {
    ...mapGetters(['roles', 'permissions']),
  },
  methods: {
    checIdCard,
    checkPhone,
    tableCellStyle ({row,column}){
      // console.log(row)
      // console.log(column)
      if(column.label == '姓名'){
        console.log(row)
        // console.log(row.signStatus)
        if(row.signStatus==0 || row.workStatus == '上船，未签合同' || row.idcard == '' || checIdCard(row.idcard) ||row.phone == ''|| checkPhone(row.phone) ){
          return 'color:red'
        }
      }
    },
    getData () {
            // this.loadPage()
      this.getRogionList().then(() => {
        this.getTableData()
      }).catch(() => {
        this.getTableData()
      })
      this.isManager()
      this.getTitle()
      this.formRelation.shipName = this.$route.query.shipName
      this.formRelation.shipownerName = this.$route.query.shipowner
      this.formRelation.shipownerPhone = this.$route.query.mobile
      this.relation_ship_add = this.permissions['relation_ship_add']
    },
    handleView (val) {
      this.$router.push({name: 'detailBoatMan',query:{ see: val }})
    },
    handleAddRelation () {
      this.relationStatus = 'add'
      this.$refs.dialogFormRelation.open()
    },
    getTitle (){
      this.shipTitle = this.$route.query.shipName+'渔船船员'
    },
    handleChange (id) {
      this.$refs.changeMan.dialogVisible = true
      this.$refs.changeMan.getOption(id)
    },
    handleSelectionChange (val) {     
      this.multipleSelection = val.map(m => m.id)
    },
    handleAdd () {
    //   this.$router.push({path: `/hrms_spa/shipCrew_Detial/${val}`}) 
      this.$router.push({path: `/hrms_spa/ship_allcrew_add/${this.$route.params.shipId}`,query:{shipName:this.$route.query.shipName}}) 
      // this.$router.push({path: `/hrms_spa/shipCrew_Detial/${val}`, query:{ add: val }}) 
    },
    async handleSign (idcard){
      let urlHeade = window.location.href.split('/')[0,2]
      let  dataMap  = '%7B%7D'
      let contractId = await getContractByidcard(idcard).then(res=>{
        return res.data.data.contractId
      })
      this.$openPage(`//${urlHeade}/api/tmlms/downLoad/intoContractHtml?contractId=${contractId}&dataMap=${dataMap}`,'url')
      // this.$router.push({path: '/tmlms_spa/contract_add',query:{see:'see',idcard:val}}) 
      // console.log(val)
      // this.$emit('on-add')
    },
    handleEdit (val) {
      this.$router.push({name: 'detailBoatMan',query:{ edit: val , shipCrew : true}})
      // this.$router.push({path: `/hrms_spa/shipCrew_Detial/${val}`,query:{ edit: val }})
    },
    handleDelete (idcard) {
      this.$confirm('确定删除该船员吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        }).then(()=>{
          deleteCrewRelation(idcard,this.$route.params.shipId).then(data=>{
            console.log(data)
            this.$message.success('船员删除成功!')
            this.getTableData()
          })
        })
    },
    contractAdd (e) {
      console.log(e)
       this.$router.push({
         path: '/tmlms_spa/contract_add',
         query:{
          add:'add',
          hdkId:e,
         },
        })
    },
    // handleView (val) {
    //   // this.$router.push({path: `/hrms_spa/shipCrew_Detial/${val}`,query:{ see: val }})
    //   // this.$router.push({name: 'detailBoatMan',query:{ edit: val }})
    //   this.$router.push({name: 'detailBoatMan', query:{ see : val , shipCrew : true}})
    //   // this.$router.push({path: `/hrms_spa/shipCrew_Detial/${val}`, query:{ see : val}})
    // },
    async getTableData (){
      let data = await getCrewByShipId(this.$route.params.shipId)
      data.data.data.map(item =>{
        if(item.workStatus==1){
          item.sign = 1
        }
        item.workStatus=keyBy(this.workStatus, 'value')[item.workStatus].label
        item.flag=keyBy(this.flag, 'value')[item.flag].label
        // item.certName = ''
        if(item.certList){
          // let certName = []
          let hdk = ''
          item.certName = ''
          item.certList.forEach(v=>{
          this.certLevel.map(iep=>{
            if (v.certLevel === iep.value) {
              hdk = iep.label
              //  console.log(hdk)
            }
          })
          
          this.$store.getters.dictGroup.tyb_crew_cert_title.map(data=>{
          if(v.certTitle==data.value){
                hdk += data.label + ','
            // certName.push(data.label)
              // item.certName=item.certName+' '+data.label
          }
          })
           console.log(hdk)
          if(hdk){
            hdk=hdk.slice(0,hdk.length-1)
          }
          item.certName = hdk
          // console.log(item.certName)
        })
        }
      })
      let result = data.data.data
      result.forEach((item) => {
        if (item.provinceId) {
          item.provinceIdName = this.getProvinceIdName(item.provinceId)
        }
      })
      this.pagedTable = data.data.data
    },
    async loadPage (param = this.searchForm) {
      param.shipId = this.$route.params.shipId
      // console.log(param)
      // param.shipId = await getShipByShipNo(this.$route.params.shipNo).then(({data})=>{
      //   return data.data.shipId
      // })
      // param.status = 1
      // let data = await this.loadTable(param, getList)
      let data = await getCrewByShipId(param.shipId)
      console.log(data)
      // this.conCrew=data.records.filter(res=>{
      //   res.workStatus==1
      // })
      // data.records.map(item =>{
      //   item.workStatus=keyBy(this.workStatus, 'value')[item.workStatus].label
      // })
      // this.pagedTable = data.records
    },
    async handleProtocol (idcard) {
      let urlHeade = window.location.href.split('/')[0,2]        
      let dataMap  = '%7B%7D'
      let contractId = await getContractByidcard(idcard).then(res=>{
        return res.data.data.contractId
      })
      this.$openPage(`//${urlHeade}/api/tmlms/downLoad/intoContractHtml?contractId=${contractId}&dataMap=${dataMap}`,'url') 
    },
    handleInsure (val) {
      console.log(val)
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