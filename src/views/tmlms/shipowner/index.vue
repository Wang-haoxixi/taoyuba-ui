<template>
  <div class="contract-box">
    <basic-container>
      <div class="shipowner_title">
        <el-button v-if="manager" type="primary" size="small" @click="addShipowner">新增</el-button>
        <el-button v-if="manager" type="default" size="small" @click="exportInfo">导出信息
          </el-button>
        <div style="float:right">
          <span><el-input v-model.trim="params.idcard" placeholder="请输入身份证" size="small" clearable></el-input></span>
          <span><el-input v-model.trim="params.realName" placeholder="请输入姓名" size="small" clearable></el-input></span>
          <span><el-input v-model.trim="params.phone" placeholder="请输入联系电话" size="small" clearable></el-input></span>
          <!-- <span><el-select v-model.trim="params.status" placeholder="请选择状态" size="small" clearable>
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span> -->
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
            :width="item.width"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="审核操作"
            v-if="smdj"
            width="200"
          >
          <!-- <template slot-scope="scope">
            <div>
              <el-switch
                v-model="scope.row.swith"
                active-color="#13ce66"
                @change="getStatus(scope.row.swith,scope.row.idcard)"
                inactive-color="#ff4949">
              </el-switch>
            </div>
          </template> -->
          <template slot-scope="scope">
            <div>
              <el-switch
                v-model="scope.row.swith"
                active-color="#13ce66"
                @change="getStatus(scope.row.swith,scope.row.idcard)"
                inactive-color="#F00"
                :disabled="scope.row.isDisabled"
                >
              </el-switch>
            </div>
          </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="审核状态"
            v-if="smdj"
            width="200"
          >
          <template slot-scope="scope">
            {{ scope.row.status | typeFilter}}
          </template>
          </el-table-column>
          <el-table-column label="操作" width="220px">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.row.idcard)">查看</el-button>
              <el-button  v-if="manager"  size="mini" @click="handleEdit(scope.row.idcard)">编辑</el-button>
              <el-button v-if="manager" size="mini" @click="handleDel(scope.row.idcard)">删除</el-button>
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
  </div>
</template>
<script>
import { getShipowner,deleteShipowner,statusShipownerByidcard, exportExcel } from '@/api/tmlms/shipowner'
import { getUserInfo } from '@/api/login'
import queryMixin from '@/mixins/query'
export default {
  name: 'shipOwner',
  mixins: [queryMixin],
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
        // status: '',
        phone: '',
      },
      exportParams: {   
        idcard: '',
        realName: '',
        status: '',   
        phone: '',
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '姓名',
            value: 'realName',
            width:200,
          },
          {
            text: '身份证号码',
            value: 'idcard',
            width:300,
          },
          {
            text: '联系地址',
            value: 'address',
          },
          {
            text: '联系电话',
            value: 'phone',
            width:300,
          },
        ],
      },
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
  mounted (){
    this.params.current=1
    this.getData()
  },
  methods: {
    // 分页
    currentChange (val) {
      this.params.current = val
      this.setQuery({ current: this.params.current })
      this.getData()
    },
    // 跳转新增页面
    addShipowner () {
      this.$router.push({name: 'detailShipowner'})
    },
    // 查看
    handleView (val) {
      this.$router.push({name: 'detailShipowner',query:{ see: val }})
    },
    // 编辑
    handleEdit (val) {
      this.$router.push({name: 'detailShipowner',query:{ edit: val }})
    },
    // 获取列表数据
    getData () {
      getShipowner(this.params).then(res=>{
        this.shipownerList = res.data.data.records
        this.shipownerList.forEach( item=>{
          if(item.status === 2 && item.userId !== 0) {
            item.swith = true
          }else{
            item.swith = false
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
    // 删除
    handleDel (id) {
        this.$confirm('此操作将永久删除该船东, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteShipowner(id).then(res=>{
            // console.log(res)
            if(res.data.code == 0){
              this.$message({
              type: 'success',
              message: '删除成功',
            })
            this.getData()
            }else{
              this.$message.error(res.data.msg)
            }
          }).catch(err=>{
            this.$message.error(err.data.msg)
          })
        }).catch(() => {         
        })
    },
    // 审核
    getStatus (switchs,idcard) {
      let data = ''
      if(switchs){
        data = 2
      }else{
        data = 3
      }
      statusShipownerByidcard(data,idcard).then( res=>{
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
    //搜索
    getParamData () {
      this.params.current = 1
      this.setQuery()
      this.getData()
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
      //区分实名登记和会员管理页面
      smdj () {
        // console.log(this.$route.path.indexOf('admin'))
          this.getQuery()
          this.getData()
          this.isManager()
          return  this.$route.path.indexOf('admin') >0
      },
  },
  created () {            
    // console.log(this.smdj) 
    this.getQuery()
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
  watch : {                                   
          'params.idcard' : function (val) {                                           
                this.exportParams.idcard  =  val  
          },
          'params.realName' : function (val) {                                 
                this.exportParams.realName  =  val
          },
           'params.phone' : function (val) {                                               
                this.exportParams.phone  =  val
          },        
          'params.status' : function (val) {                                                            
                this.exportParams.status  =  val
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
