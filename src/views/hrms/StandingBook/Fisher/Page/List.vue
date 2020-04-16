<template>
  <div>
    <basic-container>
      <page-header title="渔船管理"></page-header>
      <operation-container>
        <template slot="left">
          <!-- <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增</iep-button> -->
        </template>
        <template slot="right">
          <!-- <operation-search @search-page="searchPage" advance-search :prop="searchData">
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search> -->
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
        <el-table-column prop="operation" label="操作" width="140">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button  v-if="manager" size="mini" plain @click="handleEdit(scope.row.shipId)">编辑</iep-button>
              <iep-button size="mini" @click="handleView(scope.row.shipId)">查看</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
        <el-table-column prop="particular" label="详情" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button size="mini" type="primary" @click="handleIntoinsure(scope.row.shipName)">保单</iep-button>
              <iep-button size="mini" type="primary" @click="handleCrew(scope.row.shipNo)">船员</iep-button>
              <iep-button size="mini" type="primary" @click="handleOperat(scope.row.shipNo)">经营人</iep-button>
            </operation-wrapper>
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
// import { getVillageShipList } from '@/api/tmlms/bvillage/index'
import { getVillageShipList } from '@/api/ships'
// import advanceSearch from './AdvanceSearch.vue'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
import { getUserInfo } from '@/api/login'
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
    }
  },
  created () {
    this.getData()
    this.isManager()
  },
  methods: {
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
      })  
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
    handleOperat (id) {
      this.$router.push({       
        path: `/hrms_spa/ship_operat/${id}`,
      })
    },
    //搜索
    getParamData () {
      this.params.current = 1
      this.getData()
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