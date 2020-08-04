<template>
  <div>
    <basic-container>
      <page-header title="渔船管理"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <!-- <operation-search @search-page="searchPage" advance-search :prop="searchData">
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search> -->
          <span style="width:150px" v-if="!roles.includes(112)"><el-select v-model="searchOrg" placeholder="请选择基层组织" size="small">
              <el-option
                v-for="item in orgSearchList"
                :key="item.index"
                :label="item.villageName"
                :value="item.userId"
                >
              </el-option>
            </el-select>
          </span>
          <span style="width:150px" ><el-select v-model="params.status" placeholder="请选择合同状态" size="small">
              <el-option
                v-for="item in contractList"
                :key="item.index"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </span>
          <span><el-input v-model="params.shipName" placeholder="请输入船名号" size="small" clearable></el-input></span>
          <span><el-input v-model="params.shipNo" placeholder="请输入渔船编号" size="small" clearable></el-input></span>
          <span><el-input v-model="params.shipowner" placeholder="请输入持证人姓名" size="small" clearable></el-input></span>
          <span><el-input v-model="params.shipownerIdcard" placeholder="请输入持证人身份证" size="small" clearable></el-input></span>
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
        <el-table-column prop="operation" label="操作" width="200">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button  v-if="manager" size="mini" plain @click="handleEdit(scope.row.shipId)">编辑</iep-button>   
              <iep-button size="mini" @click="handleView(scope.row.shipId)">查看</iep-button>
              <iep-button size="mini"  @click="handleChange(scope.row.shipId)" v-if="!roles.includes(112)">变更</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
        <el-table-column prop="particular" label="详情" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <!-- <iep-button size="mini" type="primary" @click="handleIntoinsure(scope.row.shipName)">保单</iep-button> -->
              <iep-button size="mini" type="primary" @click="handleCrew(scope.row.shipNo)">船员</iep-button>
              <iep-button size="mini" type="primary" @click="handleOperat(scope.row.shipId,scope.row.shipNo)">经营人</iep-button>
              <iep-button size="mini" type="primary" @click="exportInfo(scope.row.shipId)">导出</iep-button>
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
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getVillageByOrg } from '@/api/tmlms/bvillage/index'
import { getVillageShipList,changeShip,exportShipExcel } from '@/api/ships'
// import { getVillageShipList } from '@/api/ships'
// import advanceSearch from './AdvanceSearch.vue'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
import { getUserInfo } from '@/api/login'
import { mapGetters } from 'vuex'
export default {
  // components: {
  //   advanceSearch,
  // },
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
        ],
      },
      manager:false,
      userData:{},
      dialogVisible:false,
      orgList:[],
      orgSearchList:[],
      chooseOrg:'',
      searchOrg:'',
      formLabelWidth: '120px',
      shipId:'',
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
    }
  },
  created () {
    if (!this.$route.meta.keepAlive) {
      this.getData()
      this.isManager()
      this.getVillageOrg()
    }
    
  },
  computed: {
    ...mapGetters(['userInfo', 'roles']),
  },
  methods: {
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
      // console.log(this.userInfo.userId)
    },
    exportInfo (shipId) {   
      this.exportParams.shipId = shipId                            
      exportShipExcel (this.exportParams).catch(err => {
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
        // this.orgSearchList.unshift({userId:' ',villageName:'全部'})
        // this.orgSearchList.push(res.data.data)
      })
    },
    handleSelectionChange (val) {     
      this.multipleSelection = val.map(m => m.id)
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
    handleChange (shipId){
      this.shipId = shipId
      this.dialogVisible = true
    },
    handleView (val) {
      this.$router.push({path: '/hrms_spa/village_ship_detail', query:{ see: val }})
    },
    handleEdit (val) {
      this.$router.push({path: '/hrms_spa/village_ship_detail', query:{ edit: val }})
    },
    getData () {
      getVillageShipList(this.params).then(data => {
        this.pagedTable = data.data.data.records
        this.pagedTable.forEach(v => {
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
        this.total = data.data.data.total
      })
     
    },
    handleIntoinsure (shipName) {
      this.$router.push({       
        path: `/hrms_spa/ship_insure_list/${shipName}`,
      })
    },
    handleCrew (id) {
      this.$router.push({       
        path: `/hrms_spa/ship_crew/${id}`, 
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
      this.params.current = 1
      this.getData()
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
  beforeRouteLeave (to, from, next) {
    from.meta.keepAlive = false
    this.history.setItem('pageIndex', this.queryForPage.pageIndex)
    next()
  },
}
</script>