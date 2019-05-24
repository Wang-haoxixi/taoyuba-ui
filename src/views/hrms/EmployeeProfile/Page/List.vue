<template>
  <div>
    <basic-container>
      <page-header title="员工" :replaceText="replaceText" :data="statistics"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleHeaderSetting">表头设置</iep-button>
          <el-dropdown size="medium">
            <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item>导入</el-dropdown-item> -->
              <el-dropdown-item @click.native="handleDownload">导出</el-dropdown-item>
              <!-- <el-dropdown-item>分享</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="currentColumnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column fixed="left" label="姓名" width="90px">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="入职时间">
          <template slot-scope="scope">
            <div>{{scope.row.entryTime | parseTime('{y}-{m}-{d}')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <el-dropdown size="medium">
                <iep-button type="warning" plain>
                  变更<i class="el-icon-arrow-down el-icon--right"></i>
                </iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="[0,6].includes(scope.row.status)" @click.native="handleInduction(scope.row)">入职</el-dropdown-item>
                  <el-dropdown-item v-if="[2,3,4,5].includes(scope.row.status)" @click.native="handelPositive(scope.row)">转正</el-dropdown-item>
                  <el-dropdown-item v-if="[1,2,3,4,5].includes(scope.row.status)" @click.native="handleTransfer(scope.row)">调动</el-dropdown-item>
                  <el-dropdown-item v-if="[1,2,3,4,5].includes(scope.row.status)" @click.native="handleDeparture(scope.row)">离职</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <iep-button @click="handleOpenGrowthFile(scope.row)">成长档案</iep-button>
              <el-dropdown size="medium">
                <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleEdit(scope.row)">修改</el-dropdown-item>
                  <!-- <el-dropdown-item>分享</el-dropdown-item> -->
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <header-setting ref="HeaderSetting" :default-columns-label="defaultColumnsLabel" @save="setHeaderSetting"></header-setting>
    <transfer-dialog ref="TransferDialog" @load-page="loadPage"></transfer-dialog>
    <departure-dialog ref="DepartureDialog" @load-page="loadPage"></departure-dialog>
    <induction-dialog ref="InductionDialog" @load-page="loadPage"></induction-dialog>
    <positive-dialog ref="PositiveDialog" @load-page="loadPage"></positive-dialog>
    <detail-drawer ref="DetailDrawer"></detail-drawer>
  </div>
</template>
<script>
import { getEmployeeProfilePage, putEmployeeProfile, postInduction, postPositive, postDeparture, postTransfer } from '@/api/hrms/employee_profile'
import { postExcelExport } from '@/api/hrms/excel'
import mixins from '@/mixins/mixins'
import keyBy from 'lodash/keyBy'
import { columnsMap, initSearchForm, dictsMap } from '../options'
import HeaderSetting from './HeaderSetting'
import AdvanceSearch from './AdvanceSearch'
import TransferDialog from './TransferDialog'
import DepartureDialog from './DepartureDialog'
import InductionDialog from './InductionDialog'
import PositiveDialog from './PositiveDialog'
import DetailDrawer from './DetailDrawer'
export default {
  mixins: [mixins],
  components: { HeaderSetting, AdvanceSearch, TransferDialog, DepartureDialog, InductionDialog, PositiveDialog, DetailDrawer },
  data () {
    return {
      dictsMap,
      columnsMap,
      defaultColumnsLabel: columnsMap.filter(m => !m.hidden).map(m => m.label),
      paramForm: initSearchForm(),
      statistics: [0, 0, 0],
      replaceText: (data) => `（本周新增${data[0]}位正式员工，新增${data[1]}位实习生，离职${data[2]}人）`,
    }
  },
  computed: {
    currentColumnsMap () {
      const keyByColumns = keyBy(columnsMap, 'label')
      return this.defaultColumnsLabel.map(m => {
        return keyByColumns[m]
      })
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDownload () {
      const fileds = this.currentColumnsMap.map(m => m.key)
      postExcelExport(fileds)
    },
    handleTransfer (row) {
      this.$refs['TransferDialog'].form.id = row.id
      this.$refs['TransferDialog'].loadData()
      this.$refs['TransferDialog'].formRequestFn = postTransfer
      this.$refs['TransferDialog'].dialogShow = true
    },
    handleDeparture (row) {
      this.$refs['DepartureDialog'].form.id = row.id
      this.$refs['DepartureDialog'].formRequestFn = postDeparture
      this.$refs['DepartureDialog'].dialogShow = true
    },
    handleInduction (row) {
      this.$refs['InductionDialog'].form.id = row.id
      this.$refs['InductionDialog'].formRequestFn = postInduction
      this.$refs['InductionDialog'].dialogShow = true
    },
    handelPositive (row) {
      this.$refs['PositiveDialog'].form.id = row.id
      this.$refs['PositiveDialog'].formRequestFn = postPositive
      this.$refs['PositiveDialog'].dialogShow = true
    },
    setHeaderSetting (col) {
      this.defaultColumnsLabel = col
      this.loadPage()
    },
    handleHeaderSetting () {
      this.$refs['HeaderSetting'].columnsMap = columnsMap
      this.$refs['HeaderSetting'].dialogShow = true
    },
    handleOpenGrowthFile (row) {
      this.$router.push({
        path: `/hrms_spa/growth_file/${row.id}`,
      })
    },
    handleEdit (row) {
      this.$emit('onEdit', {
        formRequestFn: putEmployeeProfile,
        id: row.id,
      })
    },
    handleDetail (row) {
      this.$refs['DetailDrawer'].id = row.id
      this.$refs['DetailDrawer'].loadPage()
      this.$refs['DetailDrawer'].drawerShow = true
    },
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable(param, getEmployeeProfilePage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
  },
}
</script>
