<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="上船记录"></page-header>
      <div class="shipowner_title">
        <!-- <el-button type="primary" size="small" icon="el-icon-edit" @click="addShipowner" v-if="manager">新增</el-button>                                    
        <el-button v-if="manager"  type="primary" size="small" icon="el-icon-edit" @click="exportInfo">导出信息</el-button>              -->
        <div style="float:right">                             
          <span style="width:120px"><el-input v-model="params.shipName" placeholder="船名号" size="small" clearable></el-input></span>
          <span style="width:120px"><el-input v-model="params.idcard" placeholder="身份证号" size="small" clearable></el-input></span>
          <span style="width:120px"><el-input v-model="params.realName" placeholder="姓名" size="small" clearable></el-input></span>              
          <!-- <span style="width:150px"><el-select v-model="params.status" placeholder="请选择合同状态" size="small">                                                               
              <el-option
                v-for="item in status"    
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>                                                                                                                -->
          <el-button size="small"  @click="getParamData">搜索</el-button>                          
        </div>
      </div>
        <el-table
          :data="crewregisterList"
          stripe
          style="width: 100%">
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
          <!-- <el-table-column
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
          </el-table-column> -->
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
              <el-button type="text" icon="el-icon-view" size="mini" @click="handleView(scope.row.shipName,scope.row.idcard)" v-if="manager">查看
              </el-button>
              <!-- <el-button type="text" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row.idcard)"  v-if="manager">编辑
              </el-button>
              <el-button v-if="manager" type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row.idcard)">删除
              </el-button> -->
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
import { 
  //getCrew,
  deleteCrew,statusCrew,exportExcel } from '@/api/tmlms/boatMan'
import { getCrewAllSyslog } from '@/api/ships/shipsyslog'  
import { getShipByShipId } from '@/api/ships'
import { getUserInfo } from '@/api/login'
import { getArea } from '@/api/post/admin'
import keyBy from 'lodash/keyBy'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      crewregisterList: [],
      provinces:[],
      total: 0,
      // 查询数据
      params: {       
        current: 1,   
        size: 10,
        idcard: '',
        realName: '',
        phone: '',
        status: '',
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
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '船名号',
            value: 'shipName',
            // css: '100',
          },
          {
            text: '身份证号码',
            value: 'idcard',
            // css: '182',
          },
          {
            text: '姓名',
            value: 'realName',
            // css: '60',
          },
          {
            text: '上下船',
            value: 'flag',
            // css: '140',
          },
          {
            text: '职务证书',
            value: 'certNames',
            // css: '140',
          },
          {
            text: '来源',
            value: 'sourceType',
            // css: '140',
          },
          {
            text: '登记时间',
            value: 'leftTime',
            // css: '140',
          },
        ],
      },
      status: [
        {
          label: '未关联合同',
          value: ' ',
        },
        {
          label: '已签合同',
          value: 1,
        },
      ],
      manager: false,
      showSwith:false,
      userData: {roles: []},
    }
  },
  methods: {
    //省
    provincesName (item, scope) {
      if(scope.row[item.value]){
      return keyBy(this.provinces, 'value')[scope.row[item.value]].label
      }else{
        return '暂无'
      }
    },
    //字典
    dictJS (item, scope) {                           
      if(scope.row[item.value]){
          if(scope.row[item.value] === '0')  return '暂无'
      return keyBy(this.dictGroup[item.dictName], 'value')[scope.row[item.value]].label
      }else{
        return '暂无'
      }
    },
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
    handleView (shipName,val) {
      this.$router.push({path:'/crewSyslog/detail',query:{ see: val,shipName:shipName }})
    },
    // 编辑
    handleEdit (val) {
      this.$router.push({name: 'detailBoatMan',query:{ edit: val }})
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
      getCrewAllSyslog(this.params).then(res=>{
        this.crewregisterList = res.data.data.records
        this.total = res.data.data.total
        this.crewregisterList.map(async (item) => {
          item.certs.forEach(v=>{
            this.$store.getters.dictGroup.tyb_crew_cert_title.map(data=>{
            if(v.certTitle==data.value){
                item.certNames=item.certNames+data.label
            }
            })
          }) 
          if(item.sourceType == 1){
            item.sourceType = '合同'
          }else if(item.sourceType == 2){
            item.sourceType = '非合同'
          }
          (item.flag == 1) ? item.flag='上船':item.flag='下船'
          if(!item.shipName){
            item.shipName = await getShipByShipId(item.shipId).then(res=>{
              return res.data.data.shipName
            })
          }
        })
      })
    },
    //搜索
    getParamData () {   
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
      if(this.userData.roles.indexOf(111) !== -1 || this.userData.roles.indexOf(1) !== -1 || this.userData.roles.indexOf(112) !== -1) { 
        this.manager = true
      }
    },
    isAdminPath () {
      if(this.$route.path.indexOf('admin') == 1){
        this.showSwith=true
      }else{
        this.showSwith=false
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
    ...mapGetters([
      'dictGroup',
      'userInfo',
    ]),
  },
  created () {
    this.getData()
    this.isManager()
    this.getProvince()
    this.isAdminPath()
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
