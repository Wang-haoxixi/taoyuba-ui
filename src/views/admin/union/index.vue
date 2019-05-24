<template>
  <div>
    <basic-container>
      <page-header title="联盟管理"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleReviewDialog">批量审核</iep-button>
        </template>
        <template slot="right">
          <!-- <operation-search @search-page="searchPage">
          </operation-search> -->
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" :checkbox-init="checkboxInit" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection is-index>
        <template slot="before-columns">
          <el-table-column label="联盟名称" width="150px">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" min-width="60">
          <template slot-scope="scope">
            <operation-wrapper>
              <!-- <iep-button type="warning" @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button @click="handleDeleteById(scope.row)">删除</iep-button>
              <iep-button @click="handlePerson(scope.row, scope.index)">人员</iep-button> -->
              <iep-button :disabled="!scope.row.status" type="default" @click="handleReviewDialog(scope.row, scope.index)">审核</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <iep-review-confirm is-inverse ref="iepReviewForm" @load-page="loadPage"></iep-review-confirm>
  </div>
</template>
<script>
import { getUnionPage, reviewById } from '@/api/goms/union'
import { dictsMap, columnsMap, checkboxInit } from './options'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      checkboxInit,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleReviewDialog (row) {
      if (row.unionId) {
        this.$refs['iepReviewForm'].id = row.unionId
      } else {
        this.$refs['iepReviewForm'].ids = this.multipleSelection
      }
      this.$refs['iepReviewForm'].title = '审核'
      this.$refs['iepReviewForm'].formRequestFn = reviewById
      this.$refs['iepReviewForm'].dialogShow = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.unionId)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getUnionPage)
    },
  },
}
</script>
