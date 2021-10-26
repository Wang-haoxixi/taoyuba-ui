<template>
  <div>
    <basic-container>
      <page-header title="港口坐标管理"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="primary" plain>添加港口</iep-button>
          <!-- <iep-button @click="handleReviewDialog">批量审核</iep-button> -->
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="name">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="港口名称" >
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
         <el-table-column label="经度" >
            <template slot-scope="scope">
              <span>{{scope.row.longitude}}</span>
            </template>
          </el-table-column>
          <el-table-column label="纬度" >
            <template slot-scope="scope">
              <span>{{scope.row.latitude}}</span>
            </template>
          </el-table-column>
          <el-table-column label="范围（海里）" >
            <template slot-scope="scope">
              <span>{{scope.row.distance}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="排序">
            <template slot-scope="scope">
              <div class="iep-ellipsis" :title="scope.row.sort">{{scope.row.sort}}</div>
            </template>
          </el-table-column> -->
           <el-table-column label="创建时间" >
            <template slot-scope="scope">
              <span>{{scope.row.createTime.split(' ')[0]}}</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleEdit(scope.row)" plain>编辑</iep-button>
              <!-- <iep-button @click="handlePerson(scope.row, scope.index)">人员</iep-button> -->
              <!-- <iep-button v-if="scope.row.status === 1" type="default" @click="handleReviewDialog(scope.row, scope.index)">审核</iep-button> -->
              <iep-button @click="handleDeleteById(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <add-dialog-form ref="addDialogForm" @load-page="loadPage"></add-dialog-form>
    <person-dialog-form ref="personDialogForm" @load-page="loadPage"></person-dialog-form>
    <iep-review-confirm is-inverse ref="iepReviewForm" @load-page="loadPage"></iep-review-confirm>
  </div>
</template>
<script>
import AddDialogForm from './AddDialogForm'
import PersonDialogForm from './PersonDialogForm'
import {  putObj, delObj, fetchList  } from '@/api/tmlms/port'
import { dictsMap, columnsMap, initForm, initOrgSearchForm } from './options'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  components: { AddDialogForm, PersonDialogForm },
  data () {
    return {
      dictsMap,
      columnsMap,
      paramForm: initOrgSearchForm(),
      param:{
        current:1,
        size:10,
      },
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    clearSearchParam () {
      this.paramForm = initOrgSearchForm()
    },
    // handlePerson (row) {
    //   this.$refs['personDialogForm'].orgId = row.orgId
    //   this.$refs['personDialogForm'].dialogShow = true
    // },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, delObj)
    },
    handleEdit (row) {
      this.$refs['addDialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['addDialogForm'].methodName = '修改'
      this.$refs['addDialogForm'].formRequestFn = putObj
      this.$refs['addDialogForm'].dialogShow = true
    },
    handleAdd () {
      this.$refs['addDialogForm'].methodName = '创建'
      this.$refs['addDialogForm'].formRequestFn = putObj
      this.$refs['addDialogForm'].dialogShow = true
    },
    // handleReviewDialog (row) {
    //   if (row.orgId) {
    //     this.$refs['iepReviewForm'].id = row.orgId
    //   } else {
    //     // TODO: 是否多选提醒
    //     if (!this.multipleSelection.length) {
    //       this.$message('请先选择需要的选项')
    //       return
    //     }
    //     this.$refs['iepReviewForm'].ids = this.multipleSelection
    //   }
    //   this.$refs['iepReviewForm'].title = '审核'
    //   this.$refs['iepReviewForm'].formRequestFn = reviewById
    //   this.$refs['iepReviewForm'].dialogShow = true
    // },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.orgId)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, fetchList)
    },
  },
}
</script>
