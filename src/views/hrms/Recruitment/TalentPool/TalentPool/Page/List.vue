<template>
  <div>
    <operation-container>
      <template slot="left">
        <el-dropdown size="medium">
          <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item @click.native="handleToResumeBatch()">放入简历库</el-dropdown-item> -->
            <el-dropdown-item @click.native="handleToBlacklistBatch()">拉黑</el-dropdown-item>
            <!-- <el-dropdown-item divided>导入</el-dropdown-item> -->
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
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
      <template slot="before-columns">
        <el-table-column label="姓名" width="90px">
          <template slot-scope="scope">
            <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="250">
        <template slot-scope="scope">
          <operation-wrapper>
            <el-dropdown size="medium">
              <iep-button type="warning" plain>
                {{dictsMap.status[scope.row.status]}}<i class="el-icon-arrow-down el-icon--right"></i>
              </iep-button>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item @click.native="handleRejected(scope.row)">驳回</el-dropdown-item> -->
                <!-- eslint-disable -->
                <el-dropdown-item v-for="(s,i) in dictsMap.status" :key="i" v-if="+i !== scope.row.status" @click.native="handleChangeStatus([scope.row.id], i)">{{s}}</el-dropdown-item>
                <!-- eslint-enable -->
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <iep-button @click="handleEdit(scope.row)">编辑</iep-button> -->
            <el-dropdown size="medium">
              <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item @click.native="handleToResume([scope.row.id])">放入简历库</el-dropdown-item> -->
                <el-dropdown-item @click.native="handleToBlacklist([scope.row.id])">拉黑</el-dropdown-item>
                <!-- <el-dropdown-item divided>分享</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <rejected-dialog ref="RejectedDialog" @load-page="loadPage"></rejected-dialog>
    <to-resume-dialog ref="ToResumeDialog" @load-page="loadPage"></to-resume-dialog>
    <to-blacklist-dialog ref="ToBlacklistDialog" @load-page="loadPage"></to-blacklist-dialog>
    <detail-drawer ref="DetailDrawer" @load-page="loadPage"></detail-drawer>
  </div>
</template>
<script>
import { getTalentPoolPage, postToResume, postToBlacklist, changeTalentPoolStatus } from '@/api/hrms/talent_pool'
import mixins from '@/mixins/mixins'
import AdvanceSearch from './AdvanceSearch'
import { columnsMap, dictsMap } from '../options'
import RejectedDialog from './RejectedDialog'
import ToResumeDialog from './ToResumeDialog'
import ToBlacklistDialog from './ToBlacklistDialog'
import DetailDrawer from './DetailDrawer'
export default {
  mixins: [mixins],
  components: { AdvanceSearch, RejectedDialog, ToResumeDialog, ToBlacklistDialog, DetailDrawer },
  data () {
    return {
      dictsMap,
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleToResumeBatch () {
      // TODO: 是否多选提醒
      if (!this.multipleSelection.length) {
        this.$message('请先选择需要的选项')
        return
      }
      this.handleToResume(this.multipleSelection)
    },
    handleToBlacklistBatch () {
      // TODO: 是否多选提醒
      if (!this.multipleSelection.length) {
        this.$message('请先选择需要的选项')
        return
      }
      this.handleToBlacklist(this.multipleSelection)
    },
    handleChangeStatus (ids, status) {
      changeTalentPoolStatus(ids, status).then(() => {
        this.loadPage()
      })
    },
    handleToResume (ids) {
      this.$refs['ToResumeDialog'].form.ids = ids
      this.$refs['ToResumeDialog'].formRequestFn = postToResume
      this.$refs['ToResumeDialog'].dialogShow = true
    },
    handleToBlacklist (ids) {
      this.$refs['ToBlacklistDialog'].form.ids = ids
      this.$refs['ToBlacklistDialog'].formRequestFn = postToBlacklist
      this.$refs['ToBlacklistDialog'].dialogShow = true
    },
    // handleEdit (row) {
    //   this.$emit('onEdit', {
    //     formRequestFn: putTalentPool,
    //     methodName: '编辑',
    //     id: row.id,
    //   })
    // },
    // handleAdd () {
    //   this.$emit('onEdit', {
    //     formRequestFn: postTalentPool,
    //     methodName: '新增',
    //     id: false,
    //   })
    // },
    handleDetail (row) {
      this.$refs['DetailDrawer'].id = row.id
      this.$refs['DetailDrawer'].loadPage()
      this.$refs['DetailDrawer'].drawerShow = true
    },
    // handleRejected (row) {
    //   console.log(row)
    //   this.$refs['RejectedDialog'].dialogShow = true
    // },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getTalentPoolPage)
    },
  },
}
</script>
