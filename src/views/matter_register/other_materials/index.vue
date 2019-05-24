<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="search">
      </gov-search-bar>
      <gov-layout-button-group>
        <gov-button type="add" @click="handleAddMaterial"></gov-button>
        <gov-button type="queryDelete" @click="handleDeleteBatch" />
      </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <crud-table :is-load-table="isLoadTable" :paged-table="pagedTable" :column-map="columnMap" @handleSelectionChange="handleSelectionChange" :checkbox-init="checkboxInit" is-mutiple-selection>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <audit-state :scope="scope" :audit-status="auditStatus"></audit-state>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="250" align='center'>
          <template slot-scope="scope">
            <template>
              <div class="table-btn-group">
                <gov-button @click="handleSubmit(scope.row)" v-if="([1,4].includes(scope.row.auditState))" type="text" size="small">提交</gov-button>
                <gov-button @click="handleView(scope.row)" v-if="([1,2,3,4,5].includes(scope.row.auditState))" type="text" size="small">详情</gov-button>
                <gov-button @click="handleEdit(scope.row)" v-if="([1,4].includes(scope.row.auditState))" type="text" size="small">编辑</gov-button>
                <gov-button @click="handleDelete(scope.row)" v-if="([1,4].includes(scope.row.auditState))" type="text" size="small">删除</gov-button>
                <gov-button @click="handlePublish(scope.row)" v-if="([3].includes(scope.row.auditState))" type="text" size="small">发布</gov-button>
              </div>
            </template>
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
import _ from 'lodash'
import { auditStatus, checkboxInit } from '../const/mat'
import { mapGetters } from 'vuex'
import crudTable from '@/components/crud-table'
import paginationMixins from '@/mixins/pagination_mixins'
import { getOtherMaterialsPage } from '@/api/cbs/other_materials'
import { submitApplication, getApplicationFormById, deleteMaterialById, deleteMaterial } from '@/api/cbs/application_form'
import { publishForm } from '@/api/cbs/form_review'
import { initOtherMaterial } from '../Components/MaterialForm/other/init'
import auditState from '../Components/auditState'
import mixin from '@/mixins/mixin'
import mainDialog from './mainDialog'
// mockColumnMap
const columnMap = [
  {
    prop: 'materialIder',
    label: '材料标识号',
  },
  {
    prop: 'materialName',
    label: '材料名称',
    width: '300',
  },
  {
    prop: 'materialTypeName',
    label: '材料类型',
  },
]
export default {
  components: {
    crudTable,
    auditState,
    mainDialog,
  },
  mixins: [paginationMixins, mixin],
  data () {
    return {
      columnMap,
      auditStatus,
      checkboxInit,
      formData: initOtherMaterial(),
      formInline: {},
      dialogTitle: '',
    }
  },
  computed: {
    ...mapGetters(['dicList']),
    searchOption () {
      return [
        { label: '材料名称', prop: 'materialName', type: 'input', placeholder: '请输入事项名称' },
        { label: '材料类型', prop: 'materialType', type: 'select', placeholder: '请选择状态', props: {value: 'value', label: 'label'}, data: this.materialTypeMap},
      ]
    },
    materialTypeMap () {
      const allMaterialType = this.dicList['MAT_MATERIAL_FAMILY']
      if (!allMaterialType.length) {
        return []
      } else {
        return allMaterialType.filter(m => m.label !== '表格')
      }
    },
    params () {
      return this.formInline
    },
  },
  created () {
    this.load()
  },
  methods: {
    handleSelectionChange (val) {
      this.mutipleSelection = val.map(m => m.id)
    },
    handleSubmit (row) {
      this._handleComfirm(row.id, submitApplication, '提交')
    },
    handlePublish (row) {
      this._handleComfirm(row.id, publishForm, '发布')
    },
    handleAddMaterial () {
      this.dialogStatus = this.dialog.textName.create
      this.formData = Object.assign({}, {
      })
      this.$refs['mainDialog'].open()
    },
    handleView (row) {
      getApplicationFormById(row.id).then(res => {
        this.dialogStatus = this.dialog.textName.detail
        this.formData = _.merge(initOtherMaterial(), res.data)
        this.$refs['mainDialog'].open()
      })
    },
    handleEdit (row) {
      getApplicationFormById(row.id).then(res => {
        this.dialogStatus = this.dialog.textName.update
        this.formData = _.merge(initOtherMaterial(), res.data)
        this.$refs['mainDialog'].open()
      })
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deleteMaterial)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteMaterialById)
    },

    load (pageOption = this.pageOption, params = this.params) {
      this.isLoadTable = true
      getOtherMaterialsPage({ ...params, ...pageOption }).then(res => {
        const { data } = res
        this.loadTable(data)
      })
    },
    search () {
      this.formInline = {
        materialName:this.listQuery.materialName,
        materialType:this.listQuery.materialType||0,
      }
      this.load()
    },
    //成功之后的
    successForm (msg) {
      this.$message.success(msg)
      this.load()
    },
  },
  watch: {
    'materials': function (n) {
      this.$set(this, 'materiaList', n)
    },
  },
}
</script>
