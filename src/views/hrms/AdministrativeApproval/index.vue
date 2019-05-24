<template>
  <div>
    <basic-container>
      <page-header title="行政审批" :replaceText="replaceText" :data="statistics"></page-header>
      <operation-container>
        <template slot="left">
          <!-- <el-button @click="(scope.row)" size="small" class="share"><i class="el-icon-share"></i><span>分享</span></el-button> -->
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="申请人" width="90px">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
          <el-table-column label="申请类型">
            <template slot-scope="scope">
              {{scope.row.applyType}}
            </template>
          </el-table-column>
          <el-table-column label="请假类型">
            <template slot-scope="scope">
              {{scope.row.leavingType || '无'}}
            </template>
          </el-table-column>
          <el-table-column label="部门">
            <template slot-scope="scope">
              <iep-tag-detail :value="scope.row.deptList"></iep-tag-detail>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作">
          <template>
            <el-button size="small" :disabled="true">分享</el-button>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getAdministrativeApprovalPage } from '@/api/hrms/administrative_approval'
import mixins from '@/mixins/mixins'
import AdvanceSearch from './AdvanceSearch'
import { dictsMap, columnsMap } from './options'
export default {
  components: {
    AdvanceSearch,
  },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      statistics: [0, 0, 0, 0, 0, 0],
      replaceText: (data) => `（本周新增${data[0]}条请假申请，${data[1]}条出差申请，${data[2]}条转正申请，${data[3]}条加班申请，${data[4]}条调岗申请，${data[5]}条调离职申请）`,
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          },
        }],
      },
      dateVal: '',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDetail (row) {
      this.$router.push({
        path: `/hrms_spa/approval_detail/${row.id}`,
      })
    },
    // handleShare (row) { },
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable(param, getAdministrativeApprovalPage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
    handleCommandType () {
      // console.log(val)
    },
    handleCommandUser () {
      // console.log(val)
    },
  },
}
</script>
<style scoped>
</style>
