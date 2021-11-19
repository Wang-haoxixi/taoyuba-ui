<template>
<!--船员/实名登记/船员登记 -->
  <div class="contract-box">
    <basic-container>
      <div class="shipowner_title">
        <el-button type="primary" size="small" @click="addShipowner" v-if="manager">新增</el-button>
        <el-button v-if="manager"  type="default" size="small" @click="exportInfo">导出信息</el-button>
        <!-- <el-upload 
        ref="upload"
        class="upload-demo"
    action="/api/tmlms/crewAndShip/import"
    accept="excel"
    :show-file-list="false"
    :headers="headers"
    :on-success="onBeforeUpload"
    :limit="1">
    <el-button  type="default" size="small" :loading='loading'>{{ importA }}</el-button>
</el-upload> -->
      
        <el-button @click="handleFresh" type="default" size="small">刷新</el-button>
        <div style="float:right;display:flex;align-items:center">
          <span style="width:120px"><el-input v-model.trim="params.realName" placeholder="姓名" size="small" clearable></el-input></span>
          <span style="width:120px"><el-input v-model.trim="params.idcard" placeholder="身份证" size="small" clearable></el-input></span>
          <span style="width:120px"><el-input v-model.trim="params.phone" placeholder="联系电话" size="small" clearable></el-input></span>
          <span style="width:10s0px">
            <el-select v-model="params.certLevel" placeholder="证书等级" size="small" clearable>
              <el-option
                v-for="item in certGrade"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
          <span style="width:120px"><iep-dict-select clearable placeholder="证书职位" v-model="params.certTitle" size="small" dict-name="tyb_crew_cert_title"></iep-dict-select></span>
          <span style="width:120px">
            <el-select v-model="params.workStatus" style="width:120px" placeholder="用工状态" size="small" clearable>
              <el-option
                v-for="item in workStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
          <span style="width:120px">
            <el-select v-model="params.provinceId" style="width:120px" placeholder="户籍" size="small" clearable>
              <el-option
                v-for="item in rogionList"
                :key="item.areaCode"
                :label="item.name"
                :value="item.areaCode">
              </el-option>
            </el-select>
          </span>
          <el-button size="small"  @click="getParamData">搜索</el-button>
        </div>
      </div>
        <el-table
          :cell-style="tableCellStyle"
          :data="shipownerList"
          stripe
          style="width: 100%">
          <el-table-column prop="realName" label="姓名" width="150">
            <template slot-scope="scope">
             <el-popover trigger="hover" placement="top" v-if="scope.row.idcard == '' || scope.row.phone == '' || checIdCard(scope.row.idcard) || checkPhone(scope.row.phone)">
                <p v-if="scope.row.idcard == ''|| checIdCard(scope.row.idcard)">身份证缺失或有误</p>
                <p v-if="scope.row.phone == ''|| checkPhone(scope.row.phone)">联系方式缺失或有误</p>
                <div slot="reference" class="name-wrapper">
                  {{ scope.row.realName?scope.row.realName:'--' }}
                </div>
              </el-popover>
              <div v-else>
                {{ scope.row.realName?scope.row.realName:'--' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item,index) in options.columns"
            :key="index"
            :prop="item.value"
            :label="item.text"
            :width="item.css"
          >
          <template slot-scope="scope">
            <template v-if="item.type==='dictGroup'">
            <div>{{dictJS(item, scope)}}</div>
            </template>
            <template v-else-if="item.type==='province'">
            <div>{{provincesName(item,scope)}}</div>
            </template>
            <template v-else>
            <iep-table-detail :value="scope.row[item.value]"></iep-table-detail>
          </template>
          </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="审核操作"
            width="100"
            v-if="manager && showSwith"
          >
          <template slot-scope="scope">
            <div>
              <el-switch
                v-model="scope.row.swith"
                active-color="#13ce66"
                @change="getStatus(scope.row.swith,scope.row.userId)"
                inactive-color="#F00"
                :disabled="scope.row.isDisabled"
                >
              </el-switch>
            </div>
          </template>
          </el-table-column>
          <!-- <el-table-column
            prop="status"
            label="审核状态"
          >
          <template slot-scope="scope">
            {{ scope.row.status | typeFilter}}
          </template>
          </el-table-column> -->
          <el-table-column label="操作" width="400" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleChange(scope.row.idcard)">变更
              </el-button>
              <el-button size="mini" @click="handleView(scope.row.idcard)">查看
              </el-button>
              <el-button size="mini" @click="handleEdit(scope.row.idcard)"  v-if="manager">编辑
              </el-button>
              <el-button v-if="onlyManager" size="mini" @click="handleDel(scope.row.idcard)">删除
              </el-button>
              <el-button v-if="onlyManager" size="mini" @click="handleUpdateCertificate(scope.row.idcard)">证书更新
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="total"
          :page-size="params.size"
          :current-page.sync="params.current"
          @current-change="currentChange">
        </el-pagination>
      </div>
    </basic-container>
    <el-dialog
      title="导出信息"
      :visible.sync="dialogVisible"
      width="45%">
      <div class="export-btn-wrapper">
        <template v-for="(item, index) in (Math.ceil(total / 3000))">
          <template v-if="(Math.ceil(total / 3000)) > index + 1">
            <el-button class="export-btn" :key="index" @click="downloadInfo(`船员信息第${(3000 * index + 1)}条第至${(3000 * (index+1))}条`, index+1)">{{`导出信息第${(3000 * index + 1)}条至第${(3000 * (index+1))}条`}}</el-button>
          </template>
          <template v-else>
            <el-button class="export-btn" :key="index" @click="downloadInfo(`船员信息第${(3000 * index + 1)}条第至${total}条`, index+1)">{{`导出信息第${(3000 * index + 1)}条至第${total}条`}}</el-button>
          </template>
        </template>
      </div>
    </el-dialog>
    <change-man ref="changeMan" @back="getData()"></change-man>
  </div>
</template>
<script>
import { getCrew,deleteCrew,statusCrew,exportExcel, updateCertificate,lookTask } from '@/api/tmlms/boatMan'
import { getUserInfo } from '@/api/login'
import { getArea, getRogionList } from '@/api/post/admin'
import keyBy from 'lodash/keyBy'
import { mapGetters } from 'vuex'
import queryMixin from '@/mixins/query'
import changeMan from '@/components/changeMan/index'
import store from '@/store'
export default {
  mixins: [queryMixin],
  components: { changeMan },
  data () {
    return {
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      importA:'船员证书导入',
      dialogVisible: false,
      rogionList: [],
      shipownerList: [],
      provinces:[],
      total: 10,
      // 查询数据
      params: {
        current: 1,
        size: 10,
        idcard: '',
        realName: '',
        workStatus: '',
        phone: '',
        certLevel: '',
        certTitle: '',
        provinceId: '',
        // timeLists: '',
      },
      exportParams: {
        idcard: '',
        realName: '',
        status: '',
        phone: '',
        remark:'',
        startDate:'',
        endDate:'',
        workStatus:'',
        provinceId: '',
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '身份证号码',
            value: 'idcard',
          },
          {
            text: '年龄',
            value: 'birthday',
            css: '100',
          },
          {
            text: '联系电话',
            value: 'phone',
          },
          {
            text: '用工状态',
            value: 'workStatus',
            css: '150',
          },
          {
            text: '当前职位',
            value: 'positionId',
            dictName: 'tyb_resume_position',
            type: 'dictGroup',
            css: '150',
          },
          {
            text: '证书职位',
            value: 'certTitle',
            dictName: 'tyb_crew_cert_title',
            type: 'dictGroup',
            css: '150',
          },
          {
            text: '证书日期',
            value: 'certDateIssue',
            css: '150',
          },
          {
            text: '户籍',
            value: 'provinceId',
            type:'province',
            css: '150',
          },
        ],
      },
      workStatus:[
        {
          label: '待求职',
          value: 9,
        },
        {
          label: '未用工',
          value: 0,
        },
        {
          label: '上船，已签合同',
          value: 1,
        },
        // {
        //   label: '离船，未解除合同 ',
        //   value: 2,
        // },
        {
          label: '上船，未签合同',
          value: 3,
        },
        // {
        //   label: '离船，未签合同',
        //   value: 4,
        // },
      ],
      status: [
        {
          label: '审核中',
          value: 1,
        },
        {
          label: '审核通过',
          value: 2,
        },
        {
          label: '审核失败',
          value: 3,
        },
      ],
      certGrade: [
        {
          label: '--',
          value: '0',
        },
        {
          label: '一级',
          value: '1',
        },
        {
          label: '二级',
          value: '2',
        },
        {
          label: '三级',
          value: '3',
        },
      ],
      manager: false,
      onlyManager:false,
      showSwith:false,
      userData: {roles: []},
     loading:false,
    }
  },
  methods: {
     checkPhone (value) {
   if (!value.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$/)) {
      return true
    } else {
      return false
    }
  },
  checIdCard (value) {
  if (!value.match(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/)) {
    return true
  } else {
    return false
  }
  },
      tableCellStyle ({row,column}){
      // console.log(row)
      // console.log(column)
      if(column.label == '姓名'){
        // console.log(row)
        // console.log(row.signStatus)
        if(row.idcard == '' || row.phone == '' || this.checIdCard(row.idcard) || this.checkPhone(row.phone) ){
          return 'color:red'
        }
      }
    },
    parseInt (e){
      // console.log(e)
      var top =e.successCount+e.failCount
      
        this.importA=parseInt(top/e.total*100)+'%'
    },
    onBeforeUpload (e){
     this.loading = true
     lookTask(e.data).then(({ data }) => {
        // console.log(data.data)
       this.parseInt(data.data)
       if(data.data.status!=1){
         var that =this
       var id =  setInterval(function (){
           var e = {
           data:data.data.midId,
            }
            lookTask(e.data).then(({ data }) => {
              var e =data.data
               var top =e.successCount+e.failCount
               that.importA=parseInt(top/e.total*100)+'%'
               console.log(this.importA)
              if(data.data.status==1){
                
                clearInterval(id)
                that.$refs.upload.clearFiles()
                that.loading = false
                that.importA='船员证书导入'
              }
             })
          },1000)
        }
      })
      
    },
    handleUpdateCertificate (idcard) {
      this.$confirm('是否更新船员证书', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        updateCertificate({ idcard }).then(({ data }) => {
          if (data.code === 0) {
            this.$message({
              type: 'success',
              message: data.data || '证书更新成功',
            })
          } else {
            this.$message({
              type: 'warning',
              message: '证书更新失败',
            })
          }
        })
      })
    },
    getRogionList () {
      getRogionList(0).then(({ data }) => {
        if (data.code === 0) {
          this.rogionList = data.data
        }
      })
    },
    handleFresh () {
      this.getData()
      this.isManager()
      this.getProvince()
      this.isAdminPath()
    },
    //省
    provincesName (item, scope) {
      if(scope.row[item.value]){
        // console.log(scope.row[item.value])
        let val = keyBy(this.provinces, 'value')
        // console.log(val)
        if (!Object.keys(val).length) {
          return '--'
        }else if(keyBy(this.provinces, 'value') && keyBy(this.provinces, 'value')[scope.row[item.value]]){
          return keyBy(this.provinces, 'value')[scope.row[item.value]].label
        }
      }else{
        return '--'
      }
    },
    //字典
    dictJS (item, scope) {
      // console.log('字典', item, scope)
      if(scope.row[item.value]){
        if(scope.row[item.value] === '0') return '--'
        return keyBy(this.dictGroup[item.dictName], 'value')[scope.row[item.value]].label
      }else{
        return '--'
      }
    },
    // 分页
    currentChange (val) {
      this.params.current = val
      this.setQuery({current: val})
      this.getData()
    },
    // 跳转新增页面
    addShipowner () {
      this.$router.push({name: 'detailBoatMan'})
    },
    // 查看
    handleView (val) {
      this.$router.push({name: 'detailBoatMan',query:{ see: val }})
    },
    // 编辑
    handleEdit (val) {
      this.$router.push({path: '/boatMan/detail',query:{ edit: val }})
    },
    getProvince () {
      getArea(0).then(({ data }) => {
        this.provinces = data.data.map(item=>{
          return {
            label: item.name,
            value: item.areaCode,
          }
        })
      })
    },
    // 获取列表数据
    getData () {
      getCrew(this.params).then(res=>{
        this.shipownerList = res.data.data.records
        // this.shipownerList.map(m => {
        //   return m.remark.substring(0, 20)
        // })
        this.shipownerList.map(item => {
          if(item.remark.length > 19) {
            item.remark = item.remark.substring(0, 20) + '....'
          }
          let now = new Date()
          let year = now.getFullYear()
          item.birthday = year - item.birthday.substring(0,4)
        })
        this.shipownerList.forEach( item=>{
          if(item.status === 2 && item.userId !== 0){
            item.swith = true
          }else{
            item.swith = false
          }
          this.workStatus.map( data  =>{
            if(data.value==item.workStatus){
              item.workStatus=data.label
            }
          })
          if(item.salary==0){
            item.salary='面议'
          }
          // item.certTitle = ''
          // item.certDateIssue =''
          if(item.certList){
            item.certList.forEach(v=>{
              if(v.certTitle==item.certTitle){
                item.certDateIssue=v.certDateIssue.split(' ')[0]
              }
            })
            // item.certTitle = item.certList[0].certTitle
            // item.certDateIssue=item.certList[0].certDateIssue.split(' ')[0]
          }
        })
        this.shipownerList.forEach(v => {
          if (v.swith === false && v.userId === 0) {
            v.isDisabled = true
          } else {
            v.isDisabled = false
          }
        })
        this.total = res.data.data.total
        // console.log('shipownerList', this.shipownerList)
      })
    },
    //搜索
    getParamData () {
      // if (this.params.timeLists) {
      //   this.params.startDate = this.params.timeLists[0]
      //   this.params.endDate = this.params.timeLists[1]
      // }
      this.params.realName = (this.params.realName || '').replace(/\s*/g,'')
      this.params.idcard = (this.params.idcard || '').replace(/\s*/g,'')
      this.params.phone = (this.params.phone || '').replace(/\s*/g,'')
      this.params.current = 1
      this.getData()
    },
    // 删除
    handleDel (id) {
        this.$confirm('此操作将永久删除该船员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteCrew(id).then(res=>{
            this.$message({
              type: 'success',
              message: res.data.msg,
            })
            this.getData()
          }).catch(err=>{
            this.$message.error(err.data.msg)
          })
        }).catch(() => {
        })
    },
    // 审核
    getStatus (switchs,userId) {
      let data = ''
      if(switchs){
        data = 2
      }else{
        data = 3
      }
      statusCrew(data,userId).then( res=>{
          this.$message({
            type: 'success',
            message: res.data.msg,
          })
          this.getData()
      })
    },
    async isManager () {
      this.userData = await getUserInfo().then(res => {
        return res.data.data
      })
      if(this.userData.roles.indexOf(111) !== -1 || this.userData.roles.indexOf(1) !== -1 || this.userData.roles.indexOf(112) !== -1 || this.userData.roles.indexOf(109) !== -1) { 
        this.manager = true
      }
      if(this.userData.roles.indexOf(111) !== -1 || this.userData.roles.indexOf(1) !== -1){
        this.onlyManager = true
      }
    },
    isAdminPath () {
      // console.log(this.$route.path.indexOf('admin'))
      if(this.$route.path.indexOf('admin') == 1){
        this.showSwith=true
      }else{
        this.showSwith=false
      } 
    },
    downloadInfo (title = '', number = undefined) {
      let val = Object.assign({}, this.params)
      console.log()
      if (Math.ceil(this.total / 3000) > 1) {
        val.nowPage = number
      }
      exportExcel (val, title).catch(err => {
          this.$message({
            type: 'warning',
            message: err,
          })
        })
    },
    exportInfo () {
      if (Math.ceil(this.total / 3000) === 1) {
        this.downloadInfo('船员信息')
      } else {
        this.dialogVisible = true
      }
    },
    handleChange (id) {
      this.$refs.changeMan.dialogVisible = true
      this.$refs.changeMan.getOption(id)
    },
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
  },
  created () {
    if (sessionStorage.getItem('query')) {
      var query = sessionStorage.getItem('query')
      this.params = JSON.parse(query)
      this.params.realName = this.$route.query.realName
    } else {
      this.params = {
        current: 1,
        size: 10,
        idcard: '',
        realName: '',
        workStatus: '',
        phone: '',
        certLevel: '',
        certTitle: '',
      }
      this.params.realName = this.$route.query.realName
    }
    this.getData()
    this.isManager()
    this.getProvince()
    this.isAdminPath()
    this.getRogionList()
  },
  filters: {
    typeFilter (type) {
      const typeMap = {
        1: '审核中',
        2: '审核通过',
        3: '审核失败',
      }
      return typeMap[type]
    },
  },
  watch: {
      'params.idcard': function (val) {
            this.exportParams.idcard  = val
      },
      'params.realName': function (val) {
            this.exportParams.realName  = val
      },
      'params.phone': function (val) {
            this.exportParams.phone  = val
      },
      'params.remark': function (val) {
            this.exportParams.remark  = val
      },
      'params.workStatus': function (val) {
            this.exportParams.workStatus  = val
      },
      'params.provinceId': function (val) {
        this.exportParams.provinceId  = val
      },
      params () {
      sessionStorage.setItem('query', JSON.stringify(this.params))
      },
  },
 beforeUpdate () {
    sessionStorage.setItem('query', JSON.stringify(this.params))
  },
  beforeRouteLeave (to, from, next) {
    if (to.path!=='/boatMan/detail') {
    sessionStorage.removeItem('query')
    }
  // 设置下一个路由的 meta
  next()
  },
}
</script>
<style lang="scss" scoped>
.shipowner {
  padding: 20px;
}
.shipowner_title {
   display: inline-block;
   width: 100%;
  span {
    width: 150px;
    display: inline-block;
    margin: 0 5px;
  }
}
.export-btn-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.export-btn {
  margin-bottom: 10px;
  margin-left: 0;
  margin-right: 10px;
}
.upload-demo{
  margin:0 10px;
  display: inline-block;
}
</style>
