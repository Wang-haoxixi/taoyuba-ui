<template>
  <gov-layout-main>
    <!-- 头部搜索框 -->
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="formProps"
        @handleFilter="handleFilter"
      />
      <!-- 按钮组 -->
      <gov-layout-button-group>
        <gov-button v-if="ele_database_put" text="数据库连接" @click="handleConnect"/>
        <gov-button v-if="ele_database_import" type="import" @click="handleImport"/>
        <gov-button v-if="ele_database_export" type="export" @click="handleExport"/>
        <gov-button type="primary" @click="handleDeleteIds(list)" text="批量删除"/>
      </gov-layout-button-group>
    </gov-layout-header>
    <!-- 列表 -->
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :page="pagination"
        :data="tableList"
        :option="mainTableOption"
        @selection-change="mainTableSelectionChange">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button v-if="ele_database_selete" type="detail" @click="handleDetail(scope.row)"></gov-button>
            <gov-button v-if="ele_database_update" type="text" @click="handleUpdate(scope.row)" text="编辑"></gov-button>
            <gov-button v-if="ele_database_delete" type="text" @click="handleDelete(scope.row)" text="删除"></gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <!-- 主弹窗 -->
    <information-dialog
      :options="options"
      @success="informationSuccess"
      :temp="formData"
      :status="dialogStatus"
      ref="formDialog"/>
    <!-- 数据库连接 -->
    <connect-dialog
      @connectTest="handleConnectSubmit"
      ref="connectDialog"
      @success="getList"/>
    <!-- 导入 -->
    <gov-dialog-import
      @downLoadDemo="handleDownLoadDemo"
      @downLoadFile="handleDownLoadFile"
      :action="importData.action"
      ref="importDialog"
      @importSuccess="informationSuccess"/>
  </gov-layout-main>
</template>
<script>
import informationDialog from './informationDialog'
import connectDialog from './connectDialog'
import isArray from 'lodash/isArray'
import { mainTableOption } from './const/index'
import {getDept} from '@/util/dic'
import { mapGetters } from 'vuex'

import {
  getSysId,
  getDeptId,
} from '@/api/element/element'

import {
  getTableList,
  testDatabaseConnect,
  deleteBDs,
  getExportDemo,
  exportWrongFile,
  exportData,
  batchDelete,
} from '@/api/infoSystem/dataBase'

import mixin from '@/mixins/mixin'

export default {
  mixins: [mixin],
  components: {
    informationDialog,
    connectDialog,
  },
  data () {
    return {
      mainTableOption,
      // 导入参数
      importData: {
        action: '/survey/dnadbs/importData',
      },
      changeList: [],
      listQuery: {
        name: undefined,
        surveyId: undefined,
        deptId: undefined,
        isOpen: undefined,
        status: undefined,
      },
      refNameDialog: 'formDialog',
      options: {
        surveyIdList: [], // 所属系统名称
        status: [
          {value: '1', label: '待完善'},
          {value: '2', label: '未提交'},
          {value: '3', label: '已提交'},
          {value: '4', label: '注销待审核'},
          {value: '5', label: '审核不通过'},
          {value: '6', label: '已注销'},
        ], // 状态
        isOpen: [], // 开放属性
        deptId: [], // 资源提供方
      },
      ele_database_put: false,
      ele_database_import: false,
      ele_database_export: false,
      ele_database_selete: false,
      ele_database_update: false,
      ele_database_delete: false,
    }
  },
  computed: {
    // 搜索表单参数
    formProps () {
      return [
        { label: '资源提供方', prop: 'deptId', type: 'select', data: getDept() },
        { label: '数据库中文名称', prop: 'nameCn', type: 'input' },
      ]
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.initOptionsData()
    this.getList()
    this.ele_database_put = this.permissions['ele_database_put']
    this.ele_database_import = this.permissions['ele_database_import']
    this.ele_database_export = this.permissions['ele_database_export']
    this.ele_database_selete = this.permissions['ele_database_selete']
    this.ele_database_update = this.permissions['ele_database_update']
    this.ele_database_delete = this.permissions['ele_database_delete']

  },
  methods: {
    initOptionsData () {
      this.getSysIdData()
      this.getDeptIdData()
      this.getDicData()
    },
    // 所属系统名称
    getSysIdData () {
      getSysId().then(({data}) => {
        let res = data
        let arr = []
        for (let key in res) {
          arr.push({value: parseInt(key), label: res[key]})
        }
        this.$set(this.options, 'surveyIdList', arr)
      })
    },
    mainTableSelectionChange (list) {
      this.changeList = list
    },
    getDicData () {
      this.options.isOpen = this.getDic('IS_NOT')
      this.options.status = this.getDic('INFORMATION_STATUS')
    },
    // 资源提供方
    getDeptIdData () {
      getDeptId().then(({data}) => {
        let res = data
        let arr = []
        if (!isArray(res)) {
          return
        }
        res.forEach((item) => {
          arr.push({value: String(item.id), label: item.name})
        })
        this.options.resType = arr
        this.options.deptId = arr
      })
    },
    // 列表
    getList () {
      this.tableLoading = true
      getTableList(this.listQuery).then(({data}) => {
        let res = data
        if (res.code === this.SUCCESS) {
          const data = res.data
          this.tableList = data.records
          this.pagination.total = data.total
        }
        this.tableLoading = false
      })
    },
    //连接数据库
    handleConnect (){
      this.$refs['connectDialog'].open()
    },
    handleConnectSubmit (formData) {
      testDatabaseConnect(formData).then(({data})=>{
        if (data.code === 0 && data.data === true) {
          this.$message.success('连接成功')
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 列表详情
    handleDetail (row) {
      this.dialogStatus = 'detail'
      this.formData = Object.assign({}, row)
      this.$refs["formDialog"].open(this.options.surveyIdList, {...row})
    },
    // 列表编辑
    handleUpdate (row) {
      this.dialogStatus = 'update'
      this.formData = Object.assign({}, row)
      this.$refs["formDialog"].open(this.options.surveyIdList, {...row})
    },
    // 列表单条删除
    handleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        deleteBDs(row.id).then(({data}) => {
          let res = data
          if (res.code === this.SUCCESS) {
            this.successNotify(this.DELETE)
            this.getList()
          }
        })
      }).catch(() => {})
    },
    informationSuccess () {
      this.getList()
    },
    // 导出
    handleExport () {
      this.$confirm('是否导出数据库数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let data = Object.assign({}, this.listQuery)
        delete data.page
        delete data.limit
        exportData(data).then(()=>{
          console.log("ing")
          this.$message.info('正在导出数据...')
        })
      }).catch(() => {})
    },
    // 导入
    handleImport () {
      this.$refs.importDialog.open()
    },
    // 模板下载
    handleDownLoadDemo () {
      getExportDemo()
    },
    // 下载错误文件
    handleDownLoadFile (name) {
      exportWrongFile(name)
    },
    // 批量删除
    handleDeleteIds () {
      if (this.changeList.length > 0) {
        this.$confirm('确定要删除吗').then(() => {
          let ids = this.changeList.map(item => {
            return item.id
          })
          batchDelete(ids).then(()=>{
            this.$message.success("删除成功")
            this.getList()
          })
        }).catch(() => {})
      } else {
        this.warningNotify('请选择数据')
      }
    },
  },
}
</script>
