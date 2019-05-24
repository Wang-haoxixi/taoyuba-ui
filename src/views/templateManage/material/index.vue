<template>
  <gov-layout-main>
    <collapse-form @clear="formInline=initFormInline()" @search="search()" :show-collapse="false">
      <template slot="search-header">
        <el-form-item label="材料名称：">
          <el-input placeholder="请输入材料名称" v-model="formInline.materialName" :maxlength="50" clearable></el-input>
        </el-form-item>
        <el-form-item label="材料类型：">
          <el-select clearable filterable v-model="formInline.materialType" placeholder="请选择材料类型">
            <el-option v-for="item in dicList['MAT_MATERIAL_FAMILY']" :key=" item.value" :label="item.label" :value="+item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
    </collapse-form>
    <el-form :inline="true" size="small">
      <el-form-item>
        <el-button icon="el-icon-upload" @click="handleImport('信息项')">Excel导入信息项模板</el-button>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-remove-outline" @click="handleDelete();">批量取消模板</el-button>
      </el-form-item>
    </el-form>
    <crud-table :is-load-table="isLoadTable" :paged-table="pagedTable" :column-map="columnMap" @handleSelectionChange="handleSelectionChange" is-mutiple-selection border>
      <el-table-column prop="operation" label="操作" width="150">
        <template slot-scope="scope">
          <div class="table-btn-group">
            <el-button @click="handleView(scope.row);" type="text" size="small">详情</el-button>
            <el-button @click="handleDeleteById(scope.row);" type="text" size="small">取消模板</el-button>
          </div>
        </template>
      </el-table-column>
    </crud-table>
    <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :pagination-option="paginationOption"></pagination>
    <form-dialog :dialog-show="viewDialogShow" title="详情" @close="viewDialogShow=false" width="60%" :is-need-confirm="false">
      <edit-form :form="materialForm" :disabled="disabled"></edit-form>
    </form-dialog>
    <form-dialog :dialog-show="importDialogShow" title="上传数据" @close="importDialogShow=false" width="500px" :is-need-confirm="false">
      <excel-import :type-name="importTypeName" @close="handleCloseImport"></excel-import>
    </form-dialog>
  </gov-layout-main>
</template>

<script>
import { mapGetters } from 'vuex'
import collapseForm from '@/components/collapse-form'
import excelImport from '../excel-import'
import editForm from '@/views/matter_register/Components/MaterialForm'
import crudTable from '@/components/crud-table'
import dialogMixins from '@/mixins/dialog_mixins'
import paginationMixins from '@/mixins/pagination_mixins'
import importMixins from '../mixin'
import { getMaterialPage, deleteMaterial, deleteMaterialById, getMaterialFormById } from '@/api/mdl/material'
// mockColumnMap
const columnMap = [
  {
    prop: 'materialIder',
    label: '材料标识号',
  },
  {
    prop: 'materialName',
    label: '材料名称',
    width: 400,
  },
  {
    prop: 'sourceChannel',
    label: '材料来源',
  },
  {
    prop: 'materialTypeName',
    label: '材料类型',
  },
]
function initFormInline () {
  return {
    materialName: null,
  }
}
export default {
  components: {
    crudTable,
    collapseForm,
    excelImport,
    editForm,
  },
  mixins: [dialogMixins, paginationMixins, importMixins],
  data () {
    return {
      columnMap,
      viewDialogShow: false,
      materialForm: {},
      initFormInline,
      formInline: initFormInline(),
      disabled: false,
    }
  },
  computed: {
    ...mapGetters(['dicList']),
    params () {
      return this.formInline
    },
  },
  created () {
    this.load()
  },
  methods: {
    load (pageOption = this.pageOption, params = this.params) {
      this.isLoadTable = true
      this.dialogShow = false
      getMaterialPage({ ...params, ...pageOption }).then(res => {
        const { data } = res
        this.loadTable(data)
      })
    },
    handleView (row) {
      getMaterialFormById(row.id).then(res => {
        this.materialForm = { ...res.data }
        this.viewDialogShow = true
        this.disabled = true
      })
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteMaterialById)
    },
    handleDelete () {
      this._handleGlobalDeleteAll(deleteMaterial)
    },
    handleSelectionChange (val) {
      this.mutipleSelection = val.map(m => m.id)
    },
  },
}
</script>
