<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd" type="primary" plain>发起考核</iep-button>
        <iep-button type="default" plain @click.native="handleDeleteBatch">删除</iep-button>
      </template>
      <template slot="right">
        <operation-search @search="searchPage" advance-search>
          <el-form :model="paramForm" label-width="80px" size="mini">
            <!-- <el-form-item label="考核时间">
              <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item> -->
            <el-form-item label="被考核人">
              <el-input v-model="paramForm.name"></el-input>
            </el-form-item>
            <el-form-item label="考核名称">
              <el-input v-model="paramForm.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchPage">搜索</el-button>
              <el-button @click="clearSearchParam">清空</el-button>
            </el-form-item>
          </el-form>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :dictsMap="dictsMap" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
      <el-table-column prop="operation" label="操作" width="120">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="default" @click="handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <add-dialog-form ref="AddDialogForm" @load-page="loadPage"></add-dialog-form>
  </div>
</template>
<script>
import { getAssessmentManagementPage, postAssessmentManagement, deletePublishRecruitmentById, deletePublishRecruitment } from '@/api/hrms/assessment_management'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap, initSearchForm } from '../options'
import AddDialogForm from './AddDialogForm'
export default {
  mixins: [mixins],
  components: { AddDialogForm },
  data () {
    return {
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$refs['AddDialogForm'].formRequestFn = postAssessmentManagement
      this.$refs['AddDialogForm'].dialogShow = true
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deletePublishRecruitment)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deletePublishRecruitmentById)
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    loadPage (param = this.paramForm) {
      this.loadTable(param, getAssessmentManagementPage)
    },
  },
}
</script>
