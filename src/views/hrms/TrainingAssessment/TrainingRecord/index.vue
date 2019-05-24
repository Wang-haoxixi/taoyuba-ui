<template>
  <div>
    <basic-container>
      <page-header title="培训记录" :replaceText="replaceText" :data="statistics"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
          <el-dropdown size="medium">
            <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDeleteBatch">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="trainingTheme">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="180">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleEdit(scope.row)" type="warning" plain>修改</iep-button>
              <iep-button @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>

<script>
import { getTrainingRecordPage, postTrainingRecord, putTrainingRecord, getTrainingRecordById, deleteTrainingRecordBatch, deleteTrainingRecordById } from '@/api/hrms/training_record'
import mixins from '@/mixins/mixins'
import { columnsMap, initForm, formToVo } from './options'
import DialogForm from './DialogForm'

export default {
  mixins: [mixins],
  components: { DialogForm },
  data () {
    return {
      columnsMap,
      statistics: [0, 0],
      replaceText: (data) => `（本周有${data[0]}个培训记录，下周有${data[1]}个培训计划)`,
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
      this._handleGlobalDeleteAll(deleteTrainingRecordBatch)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteTrainingRecordById)
    },
    handleAdd () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].methodName = '创建'
      this.$refs['DialogForm'].formRequestFn = postTrainingRecord
      this.$refs['DialogForm'].dialogShow = true
    },
    handleEdit (row) {
      getTrainingRecordById(row.id).then(({ data }) => {
        this.$refs['DialogForm'].form = formToVo(data.data)
        this.$refs['DialogForm'].methodName = '编辑'
        this.$refs['DialogForm'].formRequestFn = putTrainingRecord
        this.$refs['DialogForm'].dialogShow = true
      })
    },
    async loadPage (param = this.paramForm) {
      const data = await this.loadTable(param, getTrainingRecordPage)
      this.statistics = this.$fillStatisticsArray(this.statistics, data.statistics)
    },
  },
}
</script>

<style>
</style>

