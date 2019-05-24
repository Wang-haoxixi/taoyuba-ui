<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="handleFilter">
      </gov-search-bar>
      <gov-layout-button-group>
        <gov-button type="add" @click="handleCreate"/>
        <gov-button type="queryDelete" @click="handleDeleteQuery" />
        <gov-button type="export"  @click="handleExport" />
        <gov-button type="import" @click="handleImport" />
      </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        :data="tableList"
        :option="tableOption"
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :page="pagination"
        @selection-change="selectionChange">
        <template slot-scope="scope"
          slot="menu">
          <div class="table-btn-group">
            <gov-button type="text" @click="handleDetail(scope.row)" text="详情"></gov-button>
            <gov-button type="text" @click="handleUpdate(scope.row)" text="编辑"></gov-button>
            <gov-button type="text" @click="handleDelete(scope.row)" text="删除"></gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>

    <main-dialog
      @successForm="successForm"
      ref="mainDialog"
      :temp="formData"
      :status="dialogStatus">
    </main-dialog>
    <!-- 导出 -->
    <gov-dialog-export
      :params="listQuery"
      :url="exportData.url"
      :data="exportData.data"
      :listQuery="exportData.listQuery"
      title="数据元"
      ref="exportDialog"/>
    <!-- 导入 -->
    <gov-dialog-import
      :btnGroup="btnGroup"
      @downLoadDemo="handleDownLoadDemo"
      :action="importData.action"
      ref="importDialog"
      @importSuccess="handleImportSuccess"/>
  </gov-layout-main>
</template>

<script>
import mixin from '@/mixins/mixin'
import { tableOption } from './const/index'
import mainDialog from './mainDialog'
import { searchOption } from './const/index'
import govDialogExport from '@/components/govDialogExport'
import {getPage, deleteBatch, getExport, getExportDemo} from '@/api/dataTemplate/element'
import {getStandard} from '@/api/dataTemplate/standardFile'
import {getFieldClassify} from '@/api/dataTemplate/domainClassification'
export default {
  mixins: [mixin],
  components: { mainDialog, govDialogExport },
  data () {
    return {
      listQuery: {
        dtEleChnNm: undefined,
        stdDocId: undefined,
        dmnClsId: undefined,
      },
      searchOption,
      tableOption,
      // 导出参数
      exportData: {
        url: '/datamodule/dnadtele/download_data',
        listQuery: {
          dtEle: [],
          infoItem: [],
        },
        data: [
          {
            title: '数据元',
            prop: 'dtEle',
            data: [],
          },
          {
            title: '代码集',
            prop: 'infoItem',
            data: [],
          },
        ],
      },
      // 导入参数
      importData: {
        action: '/datamodule/dnadtele/import_data',
      },
    }
  },
  created () {
    this.initApi()
  },
  methods: {
    initApi () {
      this.getList()
      this.getExportData()
      this.getStandardData()
      this.getFieldClassifyData()
    },
    // 获取下载字段
    getExportData () {
      getExport().then(({data}) => {
        this.$set(this.exportData.data[0], 'data', data.data.dtEle)
        this.$set(this.exportData.data[1], 'data', data.data.infoItem)
      })
    },
    // 引用标准搜索字段
    getStandardData () {
      getStandard().then(({data}) => {
        if (data.code === 0) {
          this.$set(this.searchOption[2], 'data', data.data)
        }
      })
    },
    // 领域分类搜索字段
    getFieldClassifyData () {
      getFieldClassify().then(({data}) => {
        if (data.code === 0) {
          this.$set(this.searchOption[1], 'data', data.data)
          this.$set(this.tableOption.column[1], 'dicData', data.data)
        }
      })
    },
    // 模板下载
    handleDownLoadDemo () {
      getExportDemo()
    },
    // 现在成功之后操作
    handleImportSuccess () {
      this.getList()
    },
    getList () {
      this.tableLoading = true
      getPage(this.listQuery).then(({data}) => {
        if (data.code === 0) {
          this.tableList = data.data.records
          this.pagination.total = data.data.total
        }
        this.tableLoading = false
      })
    },
    // 新增
    handleCreate () {
      this.dialogStatus = this.dialog.textName.create
      this.formData = Object.assign({}, {})
      this.$refs['mainDialog'].open()
    },
    // 查看
    handleDetail (row) {
      this.dialogStatus = this.dialog.textName.detail
      this.formData = Object.assign({}, row)
      this.$refs['mainDialog'].open()
    },
    // 修改
    handleUpdate (row) {
      this.dialogStatus = this.dialog.textName.update
      this.formData = Object.assign({}, row)
      this.$refs['mainDialog'].open()
    },
    // Excel导入
    handleImport () {
      this.$refs.importDialog.open()
    },
    // 批量导出
    handleExport () {
      this.$refs.exportDialog.open()
    },
    // 批量删除
    handleDeleteQuery () {
      if (this.queryData.length === 0) {
        this.$message.error('请至少选择一条数据')
      } else {
        this._delete(this.queryData)
      }
    },
    // 删除
    handleDelete (row) {
      this._delete([row.id])
    },
    // 删除
    _delete (row) {
      this.$confirm(this.IS_DELETE).then(() => {
        deleteBatch({ ids: row }).then(() => {
          this.queryData = []
          this.$message.success('删除成功！')
          this.getList()
        })
      }).catch(() => { })
    },
    // 列表多选
    selectionChange (val) {
      this.queryData = val.map((item) => {
        return item.id
      })
    },
    // 提交成功后
    successForm (msg) {
      msg && this.$message.success(msg)
      this.getList()
    },
  },
}
</script>
