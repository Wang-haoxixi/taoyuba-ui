<template>
  <gov-layout-main>
    <page-dialog :page-show="viewDialogShow" title="详情" @close="viewDialogShow=false">
      <template slot="page">
        <collapse-form @clear="formInline=initFormInline()" @search="search()" :show-collapse="false">
          <template slot="search-header">
            <el-form-item label="事项名称：">
              <el-input placeholder="请输入事项名称" v-model="formInline.name" :maxlength="50" clearable></el-input>
            </el-form-item>
          </template>
        </collapse-form>
        <el-form :inline="true" size="small">
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
      </template>
      <template slot="form">
        <edit-form :form="workForm" :disabled="true" :is-template="true"></edit-form>
      </template>
    </page-dialog>
  </gov-layout-main>
</template>

<script>
import collapseForm from '@/components/collapse-form'
import crudTable from '@/components/crud-table'
import dialogMixins from '@/mixins/dialog_mixins'
import paginationMixins from '@/mixins/pagination_mixins'
import editForm from '@/views/matter_register/Components/GuideForm/edit'
import { initForm } from '@/views/matter_register/Components/GuideForm/initForm'
import { getGuidePage, deleteGuide, deleteGuideById, getGuideById } from '@/api/mdl/guide'
const columnMap = [
  {
    prop: 'name',
    label: '事项名称',
  },
  {
    prop: 'encrp',
    label: '事项编码',
  },
  {
    prop: 'deptName',
    label: '实施机构',
  },
]
function initFormInline () {
  return {
    name: null,
  }
}
export default {
  components: {
    crudTable,
    collapseForm,
    editForm,
  },
  mixins: [dialogMixins, paginationMixins],
  data () {
    return {
      columnMap,
      viewDialogShow: false,
      workForm: initForm(),
      initFormInline,
      formInline: initFormInline(),
    }
  },
  computed: {
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
      getGuidePage({ ...params, ...pageOption }).then(res => {
        const { data } = res
        this.loadTable(data)
      })
    },
    handleView (row) {
      getGuideById(row.id).then(res => {
        this.viewDialogShow = true
        this.workForm = { ...res.data }
      })
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteGuideById)
    },
    handleDelete () {
      this._handleGlobalDeleteAll(deleteGuide)
    },
    handleSelectionChange (val) {
      this.mutipleSelection = val.map(m => m.id)
    },
  },
}
</script>
