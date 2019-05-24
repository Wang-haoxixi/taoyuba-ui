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
        <gov-button type="queryDelete" @click="handleDeleteAll" />
      </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <div style="padding: 18px 0;">
        <crud-tree-table :is-load-table="isLoadTable" :paged-table="pagedTable" :column-map="columnMap" @handleSelectionChange="handleSelectionChange" is-mutiple-selection border expand-all>
          <el-table-column label="事项类别">
            <template slot-scope="scope">
              <matter-type :current-value="scope.row.typeKey"></matter-type>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <audit-state :scope="scope" :audit-status="auditStatus"></audit-state>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <operation-column :scope="scope" type="matter" @add-child="handleAdd" @submit="handleSubmit" @edit="handleEdit" @view="handleView" @delete="handleDelete" @publish="handlePublish" @template="handleTemplate" @cancel-template="handleCancelTemplate"></operation-column>
            </template>
          </el-table-column>
        </crud-tree-table>
        <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :pagination-option="paginationOption"></pagination>
      </div>
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

import { mapGetters } from 'vuex'
import auditState from '../Components/auditState'
import matterType from '../Components/MatterType'
import { auditStatus, auditStateDic } from '../const/mat'
import OperationColumn from '../Components/OperationColumn'
import { getMatterTree, getMatterById, submitMatter, deleteMatterById, templateMatter, cancelTemplateMatter, publishMatter, deleteMatterByIds } from '@/api/cbs/matter'
import crudTreeTable from '@/components/crud-tree-table'
import dialogMixins from '@/mixins/dialog_mixins'
import paginationMixins from '@/mixins/pagination_mixins'
import mixin from '@/mixins/mixin'
import mainDialog from './mainDialog'
const columnMap = [
  {
    label: '事项名称',
    prop: 'name',
  },
  {
    label: '事项编码',
    prop: 'encrp',
    width: '300',
  },
  {
    label: '行政区划',
    prop: 'division',
    width: '100',
  },
  {
    label: '实施机构',
    prop: 'deptName',
  },
]
export default {
  mixins: [dialogMixins, paginationMixins, mixin],
  components: {
    OperationColumn,
    crudTreeTable,
    matterType,
    auditState,
    mainDialog,
  },
  data () {
    return {
      columnMap,
      auditStatus,
      matterForm: {},
      formInline: {},
      dialogTitle: '',
      disabled: false,
      editDialogShow: false,
      formData:{},
    }
  },
  computed: {
    ...mapGetters(['dicList']),
    params () {
      return this.formInline
    },
    searchOption () {
      return [
        { label: '事项名称', prop: 'matName', type: 'input', placeholder: '请输入事项名称' },
        { label: '状态', prop: 'auditState', type: 'select', placeholder: '请选择状态', props: {value: 'key', label: 'value'}, data: auditStateDic},
        { label: '事项类别', prop: 'type', type: 'cascader', placeholder: '请选择事项类别', data: this.dicList['MAT_ITEM_TYPE']},
      ]
    },
  },
  created () {
    this.load()
  },
  methods: {
    handleAdd (row) {
      // this.handleAdd(row._level + 1, row)
      this.dialogStatus = this.dialog.textName.create
      if(row){
        this.formData = Object.assign({}, {
          level: row._level+1,
          type: row.typeKey,
          parentId: row.id,
          isChild: 1,
        })
      }else{
        this.formData = Object.assign({}, {
          level: 1,
          isChild: 1,
        })
      }
      this.$refs['mainDialog'].open()
    },
    handleTemplate (row) {
      this._handleComfirm(row.id, templateMatter, '设为模板')
    },
    handleCancelTemplate (row) {
      this._handleComfirm(row.id, cancelTemplateMatter, '取消模板')
    },
    handlePublish (row) {
      this._handleComfirm(row.id, publishMatter, '发布事项')
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteMatterById)
    },
    handleDeleteAll () {
      this._handleGlobalDeleteAll(deleteMatterByIds)
    },
    handleSelectionChange (val) {
      this.mutipleSelection = val.map(m => m.id)
    },
    handleEdit (row) {
      getMatterById(row.id).then(res => {
        this.dialogStatus = this.dialog.textName.update
        this.formData = Object.assign({}, res.data)
        this.$refs['mainDialog'].open()
      })
    },
    handleSubmit (row) {
      this._handleComfirm(row.id, submitMatter, '提交事项', null, '提交事项成功，待管理员审核，请耐心等待。')
    },
    handleView (row) {
      getMatterById(row.id).then(res => {
        this.dialogStatus = this.dialog.textName.detail
        this.formData = Object.assign({}, res.data)
        this.$refs['mainDialog'].open()
      })
    },
    load (pageOption = this.pageOption, params = this.params) {
      this.isLoadTable = true
      this.disabled = false
      let query = Object.assign({}, params)
      if (params.type && params.type.length > 1) {
        query.typeSecond = params.type[1]
        delete query.type
      }
      getMatterTree({ ...query, ...pageOption }).then(res => {
        const { data } = res
        this.loadTable(data)
        this.isLoadTable = false
      })
    },
    search () {
      this.formInline = {
        auditState:this.listQuery.auditState,
        matName:this.listQuery.matName,
        type:this.listQuery.type,
      }
      // console.log("formInline",this.formInline)
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
