<template>
  <div>
    <!-- 头部按钮组 -->
    <gov-layout-header>
      <!-- 搜索 -->
      <gov-search-bar
        @handleFilter="handleFilter"
        :listQuery="listQuery"
        :formProps="formProps"
      />
      <!-- 新增、导入、导出按钮 -->
      <gov-layout-button-group>
        <gov-button v-if="gov_table_add" type="add" @click="handleAdd" plain="true"></gov-button>
        <gov-button v-if="gov_table_import" type="import" @click="handleImport"></gov-button>
        <gov-button v-if="gov_table_export" type="export" @click="handleExport"></gov-button>
      </gov-layout-button-group>
    </gov-layout-header>
    <!-- 表格 -->
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        :data="tableList"
        :option="standardata"
        :page="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        @refresh-change="getList"
        @selection-change="selectionChange"
      >
        <!-- 表格插槽按钮 -->
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button v-if="gov_table_update" @click="handleUpdate(scope.row)" type="text">编辑</gov-button>
            <gov-button v-if="gov_table_delete" @click="handleDelete(scope.row.id)" type="text">删除</gov-button>
            <gov-button v-if="gov_table_downloadsql" @click="handleExportSql(scope.row)" type="text">导出sql</gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <!-- 弹窗 -->
    <standardata-dialog
      :status="dialogStatus"
      @closed="handleClosed"
      @refresh="getList"
      @submit="handleSubmit"
      ref="formDialog"
    />
    <!-- 导入 -->
    <gov-dialog-import
      @downLoadDemo="handleDownLoad"
      :action="importData.action"
      :data="importData.data"
      ref="importDialog"
      @importSuccess="importSuccess"
    />
  </div>
</template>
<script>
import mixin from "@/mixins/mixin"
import {
  getTableDataList,
  tableNewly,
  tableEdit,
  tableDelete,
  getExportDemo,
  exportData,
  downloadSql,
} from "@/api/element/standardata"
import { standardata } from "./const/index"
import standardataDialog from "./standardataDialog"
import govDialogImport from "@/components/govDialogImport"
import { downloadExport } from '@/util/util'
import { mapGetters } from 'vuex'

export default {
  mixins: [mixin],
  components: { standardataDialog, govDialogImport },
  props: {
    dataBaseId: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      importData: {
        action: "/directory/govtable/import_data",
        data: {},
      },
      tableList: [],
      tableIds: [],
      gov_table_add: false,
      gov_table_update: false,
      gov_table_delete: false,
      gov_table_downloadsql: false,
      gov_table_import: false,
      gov_table_export: false,
    }
  },
  computed: {
    // 三个按钮信息
    formProps () {
      return [
        {
          label: "表名",
          prop: "tableName",
          type: "input",
          width: 60,
        },
      ]
    },
    // 表单信息
    standardata () {
      return standardata
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  watch: {
    dataBaseId () {
      this.importData.data.dbId = this.dataBaseId
      this.getList()
    },
  },
  created () {
    // this.getList()
    this.gov_table_add = this.permissions['gov_table_add']
    this.gov_table_update = this.permissions['gov_table_update']
    this.gov_table_delete = this.permissions['gov_table_delete']
    this.gov_table_downloadsql = this.permissions['gov_table_downloadsql']
    this.gov_table_import = this.permissions['gov_table_import']
    this.gov_table_export = this.permissions['gov_table_export']
  },
  methods: {
    // 获取列表
    getList () {
      this.tableLoading = true
      this.listQuery.dbId = this.dataBaseId
      getTableDataList(this.listQuery).then(({ data }) => {
        this.tableList = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      })
    },
    // 新增方法
    handleAdd () {
      this.dialogStatus = "create"
      this.$refs.formDialog.openDialog()
    },
    // 编辑方法
    handleUpdate (row) {
      this.dialogStatus = "update"
      this.$refs.formDialog.openDialog({...row})
    },
    // 删除方法
    handleDelete (id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        tableDelete(id).then(()=>{
          this.$message.success('删除成功！')
          this.getList()
        })
      })
    },
    // 数据导入
    handleImport () {
      this.$refs.importDialog.open()
    },
    // 模板下载
    handleDownLoad () {
      getExportDemo().then(response => {
        downloadExport({title: '标准数据池模板',response})
      })
    },
    // 成功回调
    importSuccess (res) {
      console.log('import Success', res)
      this.getList()
    },
    // 数据导出
    handleExport () {
      this.$confirm("是否导出数据池？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let data = {
          tableIds: this.tableIds.toString(),
          dbId: this.dataBaseId,
        }
        exportData(data).then(()=>{
          this.$message.info('正在导出数据...')
        })
      }).catch(() => {})
    },
    // 关闭弹窗清清除数据
    handleClosed () {
      this.formData = {}
    },
    handleSubmit (form) {
      form.dbId = this.dataBaseId
      if (this.dialogStatus === 'create') {
        tableNewly(form).then(()=>{
          this.$message.success('新增成功')
          this.$refs['formDialog'].closeDialog()
          this.getList()
        })
      } else {
        tableEdit(form).then(()=>{
          this.$message.success('编辑成功')
          this.$refs['formDialog'].closeDialog()
          this.getList()
        })
      }
    },
    handleExportSql (row) {
      downloadSql(row.id, row.tableName).then(()=>{
        this.$message.success('导出SQL成功')
        this.getList()
      })
    },
    // 选中项
    selectionChange (list) {
      this.tableIds = list.map(item=>{
        return item.id
      })
    },
  },
}
</script>
