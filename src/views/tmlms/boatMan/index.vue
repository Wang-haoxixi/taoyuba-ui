<template>
  <div class="contract-box">
    <basic-container>
      <div class="shipowner_title">
        <el-button type="primary" size="small" icon="el-icon-edit" @click="addShipowner">新增</el-button>                                    
        <el-button v-if="manager"  type="primary" size="small" icon="el-icon-edit" @click="exportInfo">导出信息</el-button>             
        <div style="float:right">                             
          <span style="width:120px"><el-input v-model="params.realName" placeholder="姓名" size="small" clearable></el-input></span>
          <span style="width:120px"><el-input v-model="params.idcard" placeholder="身份证" size="small" clearable></el-input></span>
          <span style="width:120px"><el-input v-model="params.phone" placeholder="联系电话" size="small" clearable></el-input></span>
          <span style="width:120px"><el-input v-model="params.remark" placeholder="备注信息" size="small" clearable></el-input></span>
          <span style="width:240px"><el-date-picker v-model="params.timeLists" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" 
            value-format="yyyy-MM-dd"  size="mini"></el-date-picker>
          </span>                            
          <span style="width:120px"><el-select v-model="params.workStatus" placeholder="请选择状态" size="small">                                                        
              <el-option
                v-for="item in workStatus"    
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>                                                                                                               
          <el-button size="small"  @click="getParamData">搜索</el-button>                          
        </div>
      </div>
        <el-table
          :data="shipownerList"
          stripe
          style="width: 100%">
          <el-table-column
            v-for="(item,index) in options.columns"
            :key="index"
            :prop="item.value"  
            :label="item.text"
            :width="item.css"
          >
          </el-table-column>
          <el-table-column
            prop="status"  
            label="审核操作"
            width="100"
            v-if="manager"
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
          <el-table-column label="操作" width="180">                        
            <template slot-scope="scope">                      
              <el-button type="text" icon="el-icon-view" size="mini" @click="handleView(scope.row.idcard)">查看
              </el-button>
              <el-button type="text" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row.idcard)">编辑
              </el-button>
              <el-button v-if="manager" type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row.idcard)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      <div style="text-align: center;margin: 20px 0;">            
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>                
    </basic-container>        
  </div>          
</template>                                                           
<script>                                                                                                                                                      
import { getCrew,deleteCrew,statusCrew,exportExcel } from '@/api/tmlms/boatMan'                   
import { getUserInfo } from '@/api/login'
export default {
  data () {
    return {
      shipownerList: [],
      total: 10,
      // 查询数据
      params: {
        current: 1,
        size: 10,
        idcard: '',
        realName: '',
        workStatus: '',
        phone: '',
        remark: '',
        timeLists: '',
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
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '姓名',
            value: 'realName',
            css: '100',
          },
          {
            text: '身份证号码',
            value: 'idcard',
            css: '182',
          },
          {
            text: '年龄',
            value: 'birthday',
            css: '80',
          },
          {
            text: '联系电话',
            value: 'phone',
            css: '140',
          },
          {
            text: '用工状态',
            value: 'workStatus',
            css: '140',
          },
          {
            text: '期望薪资',
            value: 'salary',
            css: '140',
          },
          {
            text: '备注信息',
            value: 'remark',
          },
        ],
      },
      workStatus:[
        {
          label: '未用工',
          value: 0,
        },
        {
          label: '合同期中',
          value: 1,
        },
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
      manager: false,
      userData: {roles: []},
    }
  },
  methods: {
    // 分页
    currentChange (val) {                      
      this.params.current = val
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
      this.$router.push({name: 'detailBoatMan',query:{ edit: val }})
    },
    // 获取列表数据
    getData () {
      getCrew(this.params).then(res=>{
        this.shipownerList = res.data.data.records
        // this.shipownerList.map(m => { 
        //   return m.remark.substring(0, 20)
        // })
        this.shipownerList.forEach(item => {
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
          if(item.workStatus==0){
            item.workStatus='未用工'
          }else if(item.workStatus==1){
            item.workStatus='合同期中'
          }
          if(item.salary==0){
            item.salary='面议'
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
      })
    },
    //搜索
    getParamData () {
      if (this.params.timeLists) {
        this.params.startDate = this.params.timeLists[0]
        this.params.endDate = this.params.timeLists[1]
      }
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
      if(this.userData.roles.indexOf(111) !== -1) {
        this.manager = true
      }
    },
    exportInfo () {                               
      exportExcel (this.exportParams).catch(err => {
        this.$message({
          type: 'warning',
          message: err,
        })
   })
    },
  },
  computed: {
  },
  created () {
    this.getData()
    this.isManager()
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
       'params.timeLists': function (val) {                
            this.exportParams.startDate  = val[0]
             this.exportParams.endDate  = val[1]
      },
      'params.remark': function (val) {                
            this.exportParams.remark  = val
      },
      'params.workStatus': function (val) {                          
            this.exportParams.workStatus  = val
      },
  },
}
</script>
<style lang="scss" scoped>
.shipowner {
  padding: 20px;
}
.shipowner_title {
  span {
    width: 150px;
    display: inline-block;
    margin: 0 5px;
  }
}
</style>
