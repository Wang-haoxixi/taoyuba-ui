<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        <el-dropdown size="medium">
          <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleDeleteBatch">删除</el-dropdown-item>
            <!-- <el-dropdown-item divided>导入</el-dropdown-item>
            <el-dropdown-item>导出</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage" placeholder="请输入姓名进行搜索"></operation-search>
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
      <el-table-column prop="operation" label="操作" width="150">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" type="warning" plain>编辑</iep-button>
            <iep-button @click="handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <detail-drawer ref="DetailDrawer" @load-page="loadPage"></detail-drawer>
  </div>
</template>
<script>
import { getResumeBlacklistPage, postResumeBlacklist, putTalentPool, deleteTalentPoolById, deleteTalentPoolBatch } from '@/api/hrms/talent_pool'
import DetailDrawer from './DetailDrawer'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
export default {
  components: { DetailDrawer },
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
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deleteTalentPoolBatch)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteTalentPoolById)
    },
    handleDetail (row) {
      this.$refs['DetailDrawer'].id = row.id
      this.$refs['DetailDrawer'].loadPage()
      this.$refs['DetailDrawer'].drawerShow = true
    },
    handleEdit (row) {
      this.$emit('onEdit', {
        formRequestFn: putTalentPool,
        methodName: '编辑',
        id: row.id,
      })
    },
    handleAdd () {
      this.$emit('onEdit', {
        formRequestFn: postResumeBlacklist,
        methodName: '新增',
        id: false,
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getResumeBlacklistPage)
    },
  },
}
</script>
