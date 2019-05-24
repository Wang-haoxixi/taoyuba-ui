<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        <el-dropdown size="medium">
          <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleToTalentBatch()">加入人才库</el-dropdown-item>
            <el-dropdown-item @click.native="handleToBlacklistBatch()">拉黑</el-dropdown-item>
            <el-dropdown-item @click.native="handleDeleteBatch()">删除</el-dropdown-item>
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
      <el-table-column prop="operation" label="操作" width="220">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
            <el-dropdown size="medium">
              <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleToTalent(scope.row)">加入人才库</el-dropdown-item>
                <el-dropdown-item @click.native="handleToBlacklist([scope.row.id])">拉黑</el-dropdown-item>
                <el-dropdown-item @click.native="handleDelete(scope.row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <detail-drawer ref="DetailDrawer"></detail-drawer>
    <to-blacklist-dialog ref="ToBlacklistDialog" @load-page="loadPage"></to-blacklist-dialog>
  </div>
</template>
<script>
import { getResumeLibraryPage, deleteTalentPoolById, deleteTalentPoolBatch, postToTalent, postTalentPool, putTalentPool, postToBlacklist } from '@/api/hrms/talent_pool'
import mixins from '@/mixins/mixins'
import AdvanceSearch from './AdvanceSearch'
import { columnsMap } from '../options'
import DetailDrawer from './DetailDrawer'
import ToBlacklistDialog from './ToBlacklistDialog'
export default {
  components: { AdvanceSearch, DetailDrawer, ToBlacklistDialog },
  mixins: [mixins],
  data () {
    return {
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
    handleToTalentBatch () {
      // TODO: 是否多选提醒
      if (!this.multipleSelection.length) {
        this.$message('请先选择需要的选项')
        return
      }
      this._handleComfirm(this.multipleSelection, postToTalent, '放入人才库')
    },
    handleToTalent (row) {
      this._handleComfirm([row.id], postToTalent, '放入人才库')
    },
    handleToBlacklistBatch () {
      // TODO: 是否多选提醒
      if (!this.multipleSelection.length) {
        this.$message('请先选择需要的选项')
        return
      }
      this.handleToBlacklist(this.multipleSelection)
    },
    handleToBlacklist (ids) {
      this.$refs['ToBlacklistDialog'].form.ids = ids
      this.$refs['ToBlacklistDialog'].formRequestFn = postToBlacklist
      this.$refs['ToBlacklistDialog'].dialogShow = true
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deleteTalentPoolBatch)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteTalentPoolById)
    },
    handleAdd () {
      this.$emit('onEdit', {
        formRequestFn: postTalentPool,
        methodName: '新增',
        id: false,
      })
    },
    handleEdit (row) {
      this.$emit('onEdit', {
        formRequestFn: putTalentPool,
        methodName: '编辑',
        id: row.id,
      })
    },
    handleDetail (row) {
      this.$refs['DetailDrawer'].id = row.id
      this.$refs['DetailDrawer'].loadPage()
      this.$refs['DetailDrawer'].drawerShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getResumeLibraryPage)
    },
  },
}
</script>
