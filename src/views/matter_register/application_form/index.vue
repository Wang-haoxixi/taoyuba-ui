<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="search">
      </gov-search-bar>
      <gov-layout-button-group>
        <gov-button type="add" @click="handleAdd"></gov-button>
        <gov-button type="queryDelete" @click="handleDeleteBatch" />
      </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <crud-table :is-load-table="isLoadTable" :paged-table="pagedTable" :column-map="columnMap" @handleSelectionChange="handleSelectionChange" :checkbox-init="checkboxInit" is-mutiple-selection>
        <el-table-column label="状态" width="150">
          <template slot-scope="scope">
            <audit-state :scope="scope" :audit-status="auditStatus"></audit-state>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="300" align='center'>
          <template slot-scope="scope">
            <div class="table-btn-group">
              <gov-button @click="handleSubmit(scope.row)" v-if="([1,4].includes(scope.row.auditState))" type="text" size="small">提交</gov-button>
              <gov-button @click="handleView(scope.row)" v-if="([1,2,3,4,5].includes(scope.row.auditState))" type="text" size="small">详情</gov-button>
              <gov-button @click="handleEdit(scope.row)" v-if="([1,4].includes(scope.row.auditState))" type="text" size="small">编辑</gov-button>
              <gov-button @click="handleDelete(scope.row)" v-if="([1,4].includes(scope.row.auditState))" type="text" size="small">删除</gov-button>
              <gov-button @click="handlePublish(scope.row)" v-if="([3].includes(scope.row.auditState))" type="text" size="small">发布</gov-button>
            </div>
          </template>
        </el-table-column>
      </crud-table>
      <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :pagination-option="paginationOption"></pagination>
    </gov-layout-body>
    <main-dialog
      @successForm="successForm"
      ref="mainDialog"
      :temp="formData"
      :status="dialogStatus"
    ></main-dialog>
  </gov-layout-main>
</template>

<script>
import auditState from '../Components/auditState'
import { auditStatus, checkboxInit } from '../const/mat'
import crudTable from '@/components/crud-table'
import paginationMixins from '@/mixins/pagination_mixins'
import { getApplicationFormPage, getApplicationFormById, deleteMaterialById, deleteMaterial, submitApplication } from '@/api/cbs/application_form'
import { publishForm } from '@/api/cbs/form_review'
import mixin from '@/mixins/mixin'
import mainDialog from './mainDialog'
// mockColumnMap
const columnMap = [
  {
    prop: 'materialName',
    label: '申请表名称',
    width: 350,
  },
  {
    prop: 'deptName',
    label: '实施机构',
  },
]
export default {
  components: {
    crudTable,
    auditState,
    mainDialog,
  },
  mixins: [mixin, paginationMixins],
  data () {
    return {
      columnMap,
      auditStatus,
      checkboxInit,
      materialForm: {},
      formInline: {},
      dialogTitle: '',
    }
  },
  computed: {
    params () {
      return this.formInline
    },
    searchOption () {
      return [
        { label: '申请表名称', prop: 'materialName', type: 'input', placeholder: '请输入事项名称' },
      ]
    },
  },
  created () {
    this.load()
  },
  methods: {
    handleSubmit (row) {
      this._handleComfirm(row.id, submitApplication, '提交')
    },
    handlePublish (row) {
      this._handleComfirm(row.id, publishForm, '发布')
    },
    handleEdit (row) {
      getApplicationFormById(row.id).then(res => {
        this.dialogStatus = this.dialog.textName.update
        this.formData =  { ...res.data }
        this.$refs['mainDialog'].open()
      })
    },
    handleSelectionChange (val) {
      this.mutipleSelection = val.map(m => m.id)
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deleteMaterial)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteMaterialById)
    },
    handleAdd () {
      this.dialogStatus = this.dialog.textName.create
      this.formData = Object.assign({}, {})
      this.$refs['mainDialog'].open()
    },
    load (pageOption = this.pageOption, params = this.params) {
      this.isLoadTable = true
      this.editDialogShow = false
      getApplicationFormPage({ ...params, ...pageOption }).then(res => {
        const { data } = res
        this.loadTable(data)
      })
    },
    handleView (row) {
      getApplicationFormById(row.id).then(res => {
        this.dialogStatus = this.dialog.textName.detail
        this.formData =  { ...res.data }
        this.$refs['mainDialog'].open()
      })
    },
    search () {
      this.formInline = {
        materialName: this.listQuery.materialName,
      }
      this.load()
    },
    //成功之后的
    successForm (msg) {
      this.$message.success(msg)
      this.load()
    },
  },
}
</script>
