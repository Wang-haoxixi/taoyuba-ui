<template>
  <gov-layout-main>
    <page-dialog :page-show="complexDialogShow" :title="formTitle" @close="complexDialogShow=false">
      <template slot="page">
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
          <crud-table :is-load-table="isLoadTable" :paged-table="pagedTable" :column-map="columnMap" @handleSelectionChange="handleSelectionChange" :checkbox-init="checkboxInit" is-mutiple-selection border>
            <el-table-column label="审核状态" width="100">
              <template slot-scope="scope">
                <audit-state :scope="scope" :audit-status="auditStatus"></audit-state>
              </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作">
              <template slot-scope="scope">
                <operation-column :scope="scope" type="guide" @submit="handleSubmit" @edit="handleEdit" @view="handleView" @delete="handleDelete" @publish="handlePublish"></operation-column>
              </template>
            </el-table-column>
          </crud-table>
          <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :pagination-option="paginationOption"></pagination>
        </gov-layout-body>
      </template>
      <template slot="form">
        <edit-form :form="matterForm" @hideDialog="load();" @close="complexDialogShow=false" :disabled="disabled" :is-edit="isEdit"></edit-form>
      </template>
    </page-dialog>
  </gov-layout-main>
</template>

<script>
import _ from 'lodash'
import auditState from '../Components/auditState'
import OperationColumn from '../Components/OperationColumn'
import { initForm } from '../Components/GuideForm/initForm'
import editForm from '../Components/GuideForm/edit'
import { auditStatus, checkboxInit } from '../const/mat'
import crudTable from '@/components/crud-table'
import dialogMixins from '@/mixins/dialog_mixins'
import paginationMixins from '@/mixins/pagination_mixins'
import { getRightPage } from '@/api/cbs/right'
import { deleteGuideById, deleteGuide, getGuideById, publishGuide, submitGuide } from '@/api/cbs/guide'
import mixin from '@/mixins/mixin'
const columnMap = [
  {
    prop: 'name',
    label: '事项名称',
  },
  {
    prop: 'encrp',
    label: '事项代码',
    width: 300,
  },
  {
    prop: 'deptName',
    label: '实施机构',
  },
]

export default {
  components: {
    crudTable,
    editForm,
    OperationColumn,
    auditState,
  },
  mixins: [mixin,dialogMixins, paginationMixins],
  data () {
    return {
      columnMap,
      auditStatus,
      checkboxInit,
      matterForm: initForm(),
      formInline: {},
      disabled: true,
      isEdit: false,
      complexDialogShow: false,
      formTitle: '新增',
    }
  },
  computed: {
    params () {
      return this.formInline
    },
    searchOption () {
      return [
        { label: '事项名称', prop: 'matName', type: 'input', placeholder: '请输入事项名称' },
      ]
    },
  },
  created () {
    this.load()
  },
  methods: {
    load (pageOption = this.pageOption, params = this.params) {
      this.isLoadTable = true
      this.complexDialogShow = false
      getRightPage({ ...params, ...pageOption }).then(res => {
        const { data } = res
        this.loadTable(data)
      })
    },
    handleSelectionChange (val) {
      this.mutipleSelection = val.map(m => m.id)
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deleteGuide)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteGuideById)
    },
    handleAdd () {
      this.disabled = false
      this.isEdit = false
      this.formTitle = '新增'
      this.matterForm = initForm()
      // 类型为行政权利
      this.matterForm.type = 1
      this.complexDialogShow = true
    },
    handleEdit (row) {
      getGuideById(row.id).then(res => {
        this.disabled = false
        this.matterForm = _.merge(initForm(), res.data)
        this.matterForm.tmplName = ''
        this.formTitle = '修改'
        this.isEdit = true
        this.complexDialogShow = true
      })
    },
    handleView (row) {
      getGuideById(row.id).then(res => {
        this.matterForm = res.data
        this.formTitle = '详情'
        this.disabled = true
        this.complexDialogShow = true
      })
    },
    search () {
      this.formInline = {
        matName:this.listQuery.matName,
      }
      this.load()
    },
    handlePublish (row) {
      this._handleComfirm(row.id, publishGuide, '发布行政权利')
    },
    handleSubmit (row) {
      this._handleComfirm(row.id, submitGuide, '提交')
    },
  },
}
</script>
