<template>
  <!-- 台账/电子台账 -->
  <div class="contract-box">
    <basic-container v-if="detailType">
      <page-header title="电子台账管理"></page-header>
      <div class="shipowner_title">
        <el-button @click="getData" type="default" size="small">刷新</el-button>
        <el-button @click="add" type="primary" size="small" v-if="relation_ship_add && roleId.indexOf(112) !== -1">新增</el-button>
        <div style="float:right;display:flex;align-items:center">
          <span style="width:120px" v-if="roleId.indexOf(1) !== -1 || roleId.indexOf(111) !== -1">
              <el-select v-model="params.userId" filterable placeholder="请选择" size="small" clearable>
                <el-option
                  v-for="item in options"
                  :key="item.userId"
                  :label="item.villageName"
                  :value="item.userId">
                </el-option>
              </el-select>
          </span>
          <span style="width:120px">
              <el-select v-model="params.columnId" filterable placeholder="请选择" size="small" clearable>
                    <el-option
                      v-for="item in optionsList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
              </el-select>
          </span>
          <span style="width:120px"><el-input v-model.trim="params.name" placeholder="台账名称" size="small" clearable></el-input></span>
          <span style="width:240px">
            <el-date-picker v-model="params.timeLists" type="daterange" clearable range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" 
            value-format="yyyy-MM-dd"  size="small"></el-date-picker>
          </span>
          <el-button size="small"  @click="getData">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="faceList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label="台账名称"
          >
           <template slot-scope="scope">
              {{scope.row.name?scope.row.name:'--'}}
          </template>
          </el-table-column>
          <el-table-column
            prop="columnName"
            label="类别"
          >
           <template slot-scope="scope">
              {{scope.row.columnName?scope.row.columnName:'--'}}
          </template>
          </el-table-column>
          <el-table-column
            prop="villageName"
            label="基层"
          >
          <template slot-scope="scope">
              {{scope.row.villageName?scope.row.villageName:'--'}}
          </template>
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="上传时间"
          >
          <template slot-scope="scope">
              {{scope.row.updateTime?scope.row.updateTime:'--'}}
          </template>
          </el-table-column>
          <el-table-column label="操作"  fixed="right" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row.id)" v-if="roleId.indexOf(112) !== -1">编辑</el-button>
              <el-button size="mini" @click="handleView(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="page.total"
          :page-size="page.size"
          :current-page.sync="page.current"
          @current-change="currentChange">
        </el-pagination>
      </div>
    </basic-container>
    <detail v-else ref="detail" :disabledStatus="disabledStatus" @back="detailType = true;getData()"></detail>
  </div>
</template>
<script>
import { getPage,getColumnPage } from '@/api/admin/ad.js'
import { getVillage } from '@/api/tmlms/bvillage/index'
import detail from './detail.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'faceList',
  mixins: [],
  data () {
    return {
      page: {
        size: 10,
        current: 1,
        total: 0,
      },
      options:[],
      params: {
        timeLists: [],
      },
      detailType: true,
      faceList: [],
      dialogVisible: false,
      dialogVisiblePeople: false,
      id: 0,
      roleId: [],
      optionsList: [],
      disabledStatus:false,
      relation_ship_add: false,
      relation_ship_edit: false,
      relation_ship_delete: false,
      relation_ship_export: false,
      relation_ship_statistics: false,
    }
  },
  created () {
    this.getData()
    this.roleId = JSON.parse(localStorage.getItem('user')).roles
    getVillage({size: 500,status: 2}).then(res=>{
      this.options = res.data.data.records
    })
    getColumnPage({size: 500}).then(res=>{
      this.optionsList = res.data.data.records
    })
    this.relation_ship_add = this.permissions['relation_ship_add']
    this.relation_ship_edit = this.permissions['relation_ship_edit']
    this.relation_ship_delete = this.permissions['relation_ship_delete']
    this.relation_ship_export = this.permissions['relation_ship_export']
    this.relation_ship_statistics = this.permissions['relation_ship_statistics']
  },
  computed: {
    ...mapGetters([
      'permissions',
      'roles',
      'dictGroup',
    ]),
  },
  methods: {
        // 分页
    currentChange (val) {
      this.page.current = val
      this.getData()
    },
    getData () {
      let data = {}
      if(this.params.timeLists && this.params.timeLists.length>0){
        data = {
                startTimeStr: this.params.timeLists[0],
                endTimeStr: this.params.timeLists[1],
              }
      }else{
        data = {
                startTimeStr:'',
                endTimeStr:'',
              }
      }
      getPage({...this.params,...this.page,...data}).then(res=>{
        this.faceList = res.data.data.records
        this.page = {
          size: res.data.data.size,
          current: res.data.data.current,
          total: res.data.data.total,
        }
      })
    },
    add () {
      this.detailType = false
      this.disabledStatus=false
      this.$nextTick(()=>{
        this.$refs.detail.getDetail()
      })
    },
    handleView (id) {
      this.detailType = false
      this.disabledStatus=true
      this.$nextTick(()=>{
        this.$refs.detail.getDetail(id)
      })
    },
    handleEdit (id) {
      this.detailType = false
      this.disabledStatus=false
      this.$nextTick(()=>{
        this.$refs.detail.getDetail(id)
      })
    },
  },
  components: {
    detail,
  },
  filters: {
  },
  watch: {
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
.export-btn-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.export-btn {
  margin-bottom: 10px;
  margin-left: 0;
  margin-right: 10px;
}
</style>
