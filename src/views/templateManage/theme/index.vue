<template>
  <gov-layout-main>
    <collapse-form @clear="formInline=initFormInline()" @search="search()" :show-collapse="false">
      <template slot="search-header">
        <el-form-item label="主题名称：">
          <el-input placeholder="请输入主题名称" v-model="formInline.themeName" :maxlength="50" clearable></el-input>
        </el-form-item>
        <el-form-item label="主题类型：">
          <el-select clearable filterable v-model="formInline.themeType" placeholder="请选择">
            <el-option v-for="item in dicList['MAT_THEME_TYPE']" :label="item.label" :key="item.value" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </collapse-form>
    <el-form :inline="true" size="small">
      <el-form-item>
        <el-button icon="el-icon-upload" @click="handleImport('主题事项')">Excel导入主题模板</el-button>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-remove-outline" @click="handleDelete();">批量取消模板</el-button>
      </el-form-item>
    </el-form>
    <crud-table :is-load-table="isLoadTable" :paged-table="pagedTable" :column-map="columnMap" @handleSelectionChange="handleSelectionChange" is-mutiple-selection border>
      <el-table-column prop="operation" label="操作" width="230">
        <template slot-scope="scope">
          <div class="table-btn-group">
            <el-button @click="handleView(scope.row);" type="text" size="small">详情</el-button>
            <el-button @click="handleProcess(scope.row)" type="text" size="small">流程表</el-button>
            <el-button @click="handleDeleteById(scope.row);" type="text" size="small">取消模板</el-button>
          </div>
        </template>
      </el-table-column>
    </crud-table>
    <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :pagination-option="paginationOption"></pagination>
    <form-dialog :dialog-show="viewDialogShow" title="详情" @close="viewDialogShow=false" width="60%" :is-need-confirm="false">
      <view-form :form="themeForm"></view-form>
    </form-dialog>
    <form-dialog :dialog-show="importDialogShow" title="上传数据" @close="importDialogShow=false" width="500px" :is-need-confirm="false">
      <excel-import :type-name="importTypeName" @close="handleCloseImport"></excel-import>
    </form-dialog>
    <form-dialog :dialog-show="processDialogShow" title="流程表" @close="processDialogShow=false" width="60%" :is-need-confirm="false">
      <ul class="process-wrapper">
        <li class="li-wrapper" v-for="(value, key) in processData" :key="key">
          <div class="li-processData">
            <div class="span-process">流程{{key}}</div>
            <div class="span-processData" v-for="item in value" :key="item">{{item}}</div>
          </div>
          <div class="arrow">
            >
          </div>
        </li>
        <li class="li-wrapper">
          <div class="li-processData">
            <div class="span-process">办事结果</div>
            <div class="span-processData">{{serviceResult}}</div>
          </div>
        </li>
      </ul>
    </form-dialog>
  </gov-layout-main>
</template>

<script>
import { mapGetters } from 'vuex'
import collapseForm from '@/components/collapse-form'
import excelImport from '../excel-import'
import crudTable from '@/components/crud-table'
import dialogMixins from '@/mixins/dialog_mixins'
import paginationMixins from '@/mixins/pagination_mixins'
import importMixins from '../mixin'
import viewForm from '@/views/matter_register/Components/ThemeForm/view'
import { getThemePage, deleteTheme, deleteThemeById, getThemeById, getFlowChartById } from '@/api/mdl/theme'
const columnMap = [
  {
    prop: 'themeName',
    label: '主题名称',
  },
  {
    prop: 'type',
    label: '主题类型',
  },
  {
    prop: 'leadDeptName',
    label: '牵头机构',
  },
  {
    prop: 'deptNames',
    label: '实施机构',
    width: '360',
  },
]
function initFormInline () {
  return {
    themeType: null,
    themeName: null,
  }
}
export default {
  components: {
    crudTable,
    collapseForm,
    excelImport,
    viewForm,
  },
  mixins: [dialogMixins, paginationMixins, importMixins],
  data () {
    return {
      columnMap,
      viewDialogShow: false,
      themeForm: {},
      processData: {},
      processDialogShow: false,
      initFormInline,
      serviceResult: '',
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
      this.dialogShow = false
      getThemePage({ ...params, ...pageOption }).then(res => {
        const { data } = res
        this.loadTable(data)
      })
    },
    handleView (row) {
      getThemeById(row.id).then(res => {
        this.themeForm = { ...res.data }
        console.log(res.data)
        this.viewDialogShow = true
      })
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteThemeById)
    },
    handleDelete () {
      this._handleGlobalDeleteAll(deleteTheme)
    },
    handleProcess (row) {
      console.log(row)
      getFlowChartById(row.id).then(res => {
        this.serviceResult = row.serviceResult
        this.processData = res.data
        this.processDialogShow = true
      })
    },
    handleSelectionChange (val) {
      this.mutipleSelection = val.map(m => m.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.li-wrapper {
  display: flex;
  align-items: center;
  .arrow {
    font-size: 30px;
    padding: 20px;
  }
  &:last-child .arrow {
    display: none;
  }
}
.process-wrapper {
  display: flex;
}
.li-processData {
  /* color: black; */
  display: flex;
  flex-direction: column;
}

.span-process {
  font-size: 15px;
  height: 40px;
  width: 180px;
  line-height: 40px;
  font-weight: bold;
  text-align: center;
  background-color: #f0f0f0;
  border: 1px solid #7b7b7b;
}
.span-processData {
  background-color: white;
  text-align: center;
  border: 1px solid #7b7b7b;
  border-top: none;
  padding: 10px 0;
  width: 180px;
}
</style>

