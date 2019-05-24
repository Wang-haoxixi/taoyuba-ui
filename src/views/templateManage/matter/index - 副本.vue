<template>
  <gov-layout-main>
    <collapse-form @clear="formInline=initFormInline()" @search="search()" :show-collapse="false">
      <template slot="search-header">
        <el-form-item label="事项名称：">
          <el-input placeholder="请输入事项名称" v-model="formInline.matName" :maxlength="50" clearable></el-input>
        </el-form-item>
        <el-form-item label="事项类别：" prop="type">
          <el-cascader :options="dicList['MAT_ITEM_TYPE']" v-model="formInline.type" clearable placeholder="请选择事项类别">
          </el-cascader>
        </el-form-item>
      </template>
    </collapse-form>
    <el-form :inline="true" size="small">
      <el-form-item>
        <el-dropdown @command="handleImport" placement="bottom-start">
          <el-button icon="el-icon-upload">
            Excel导入事项模板<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="行政权力"> <i class="el-icon-caret-right"></i>Excel导入行政权力</el-dropdown-item>
            <el-dropdown-item command="公共服务"> <i class="el-icon-caret-right"></i>Excel导入公共服务</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-remove-outline" @click="handleDelete();">批量取消模板</el-button>
      </el-form-item>
    </el-form>
    <crud-tree-table :is-load-table="isLoadTable" :paged-table="pagedTable" :column-map="columnMap" @handleSelectionChange="handleSelectionChange" is-mutiple-selection border expand-all>
      <el-table-column label="事项类别">
        <template slot-scope="scope">
          <matter-type :current-value="scope.row.typeKey"></matter-type>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="handleView(scope.row);" type="text" size="small">详情</el-button>
          <!-- <a-divider type="vertical" /> -->
          <el-button @click="handleDeleteById(scope.row);" v-if="scope.row._level==1" type="text" size="small">取消模板</el-button>
        </template>
      </el-table-column>
    </crud-tree-table>
    <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :pagination-option="paginationOption"></pagination>
    <form-dialog :dialog-show="viewDialogShow" title="详情" @close="viewDialogShow=false" width="60%" :is-need-confirm="false">
      <el-form :model="matterForm" class="form-inline" label-width="160px" size="small">
        <el-form-item label="实施机构：">
          <relation-select :obj="matterForm.dept" disabled></relation-select>
        </el-form-item>
        <el-form-item label="事项类别：">
          <el-cascader :options="dicList['MAT_ITEM_TYPE']" v-model="matterForm.type" disabled>
          </el-cascader>
        </el-form-item>
        <el-form-item label="事项名称：" class="formWidth">
          <el-input v-model="matterForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="事项基本编码：" class="formWidth">
          <el-input v-model="matterForm.encrp" disabled></el-input>
        </el-form-item>
      </el-form>
    </form-dialog>
    <form-dialog :dialog-show="importDialogShow" :title="importTypeName" @close="importDialogShow=false" width="500px" :is-need-confirm="false">
      <excel-import :type-name="importTypeName" @close="handleCloseImport"></excel-import>
    </form-dialog>
  </gov-layout-main>
</template>

<script>
import matterType from '@/views/matter_register/Components/MatterType'
import { mapGetters } from 'vuex'
import collapseForm from '@/components/collapse-form'
import relationSelect from '@/components/relation-select'
import excelImport from '../excel-import'
import crudTreeTable from '@/components/crud-tree-table'
import dialogMixins from '@/mixins/dialog_mixins'
import paginationMixins from '@/mixins/pagination_mixins'
import importMixins from '../mixin'
import { getMatterPage, deleteMatterById, deleteMatter, getMatterById } from '@/api/mdl/matter'
function initFormInline () {
  return {
    name: null,
  }
}
const columnMap = [
  {
    prop: 'name',
    label: '事项名称',
    width: '230',
  },
  {
    prop: 'encrp',
    label: '事项编码',
  },
  {
    prop: 'division',
    label: '行政区划',
    width: '120',
  },
  {
    prop: 'deptName',
    label: '实施机构',
    width: '150',
  },
]
export default {
  components: {
    crudTreeTable,
    collapseForm,
    excelImport,
    relationSelect,
    matterType,
  },
  mixins: [dialogMixins, paginationMixins, importMixins],
  data () {
    return {
      columnMap,
      viewDialogShow: false,
      importDialogShow: false,
      matterForm: {},
      initFormInline,
      formInline: initFormInline(),
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
      this.viewDialogShow = false
      let query = Object.assign({}, params)
      if (params.type && params.type.length > 1) {
        query.typeSecond = params.type[1]
        delete query.type
      }
      getMatterPage({ ...query, ...pageOption }).then(res => {
        const { data } = res
        this.loadTable(data)
      })
    },
    handleView (row) {
      getMatterById(row.id).then(res => {
        this.matterForm = { ...res.data }
        this.viewDialogShow = true
      })
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteMatterById)
    },
    handleDelete () {
      this._handleGlobalDeleteAll(deleteMatter)
    },
    handleSelectionChange (val) {
      this.mutipleSelection = val.map(m => m.id)
    },
  },
}
</script>
