<template>
  <div>
    <basic-container>
      <page-header title="离船管理"></page-header>
      <operation-container>
        <!-- <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain v-if="manager">新增</iep-button>
          <el-button v-if="manager"  type="primary" size="small" icon="el-icon-edit" @click="exportInfo">导出信息</el-button>      
        </template> -->
        <!-- <span><el-input v-model="params.shipName" placeholder="请输入船名号" size="small" clearable></el-input></span> -->
        <template slot="right">
          <span><el-input v-model.trim="params.shipName" placeholder="请输入渔船名" size="small" clearable></el-input></span>
          <span style="width:240px"><el-date-picker v-model="params.timeLists" type="daterange" range-separator="-" start-placeholder="离船时间" end-placeholder="离船时间" 
              value-format="yyyy-MM-dd HH:mm:ss"  size="small"></el-date-picker></span>
          <span><el-input v-model.trim="params.realName" placeholder="请输入船员姓名" size="small" clearable></el-input></span>
          <span><el-input v-model.trim="params.idcard" placeholder="请输入船员身份证" size="small" clearable></el-input></span>
          <el-button size="small" @click="onSearch(params)">搜索</el-button>
        </template>
      </operation-container>
      <iep-table
        :isMutipleSelection="false"
        :isLoadTable="isLoadTable"
        :pagination="pagination"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
        is-mutiple-selection>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getCrewSyslog } from '@/api/ships/shipsyslog'
// import advanceSearch from './AdvanceSearch.vue'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
import queryMixin from '@/mixins/query'
export default {
  components: {
    // advanceSearch,
  },
  mixins: [mixins, queryMixin],
  data () {
    return {
      columnsMap,
      searchData: 'contactName',
      params: {
        current: 1,
        size: 10,
        timeLists:'',
        shipName: '',
        realName: '',
        idcard:'',
      },
    }
  },
  created () {
    this.getQuery()
    this.$set(this.pagination, 'current', this.params.current)
    this.$set(this.pagination, 'size', this.params.size)
    this.loadPage(this.params)
  },
  methods: {
    onSearch (params) {
      params.current = 1
      this.setQuery(params)
      this.loadPage(params)
    },
    handleCurrentChange (val) {
      this.pageOption.current = val
      this.setQuery({current: val})
      this.loadPage()
    },
    handleSizeChange (val) {
      this.pageOption.size = val
      this.setQuery({size: val})
      this.loadPage()
    },
    async loadPage (param = this.searchForm) {
      //  let userId = this.$store.getters.userInfo.userId
      // let idcard = this.$store.getters.userInfo.idCard
      if(param.timeLists){
        param.startDate=this.params.timeLists[0]
        param.endDate=this.params.timeLists[1]
      } else {
        param.startDate= undefined
        param.endDate= undefined
      }
      this.loadTable({ ...param }, getCrewSyslog)
    },
    handleSelectionChange () {},
  },
}
</script>