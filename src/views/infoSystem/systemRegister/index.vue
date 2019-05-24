<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="searchOption"
        :isString="false"
        :resetIgnore="['isAsc', 'limit', 'page']"
        @handleFilter="handleFilter"
      />
      <gov-layout-button-group>
        <gov-button v-if="dna_sys_add" type="add" @click="handleAdd"></gov-button>
        <gov-button v-if="dna_sys_import" type="import" @click="handleImport"></gov-button>
        <gov-button v-if="dna_sys_export" type="export" @click="handleExport"></gov-button>
      </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        :data="tableList"
        :option="mainTableOption"
        :page="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        @refresh-change="getList">
        <template slot-scope="scope" slot="status">
          <el-tooltip :content="scope.row.checkReject" :disabled="scope.row.status!=='D'" placement="top">
            <span :class="scope.row.status === 'D' ? 'colorRad' : ''">{{scope.row.statusForShow}}</span>
          </el-tooltip>
        </template>
        <template slot-scope="scope" slot="resrcList">
          <div v-if="scope.row.status === 'A'">
            <div class="curP text-green" v-if="!scope.row.resrcList || scope.row.resrcList.length === 0" type="text" @click="handleInfoMenu(scope.row)">
              目录编制
            </div>
            <div class="curP text-blue" v-else @click="handleInfoMenu(scope.row)">
              已编目{{(scope.row.resrcList && scope.row.resrcList.length) ? scope.row.resrcList.length : 0}}条
            </div>
          </div>
        </template>
        <template slot-scope="scope" slot="dbsList">
          <div v-if="scope.row.status === 'A'">
            <div class="curP text-green" v-if="!scope.row.dbsList || scope.row.dbsList.length === 0" type="text" @click="handleDbMenu(scope.row)">
              关联数据库
            </div>
            <div class="curP text-blue" v-else @click="handleDbMenu(scope.row)">
              已关联{{(scope.row.dbsList && scope.row.dbsList.length) ? scope.row.dbsList.length : 0}}个
            </div>
          </div>
        </template>
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button v-if="dna_sys_detail" type="text" @click="handleDetail(scope.row.id)" text="详情"></gov-button>
            <gov-button
              type="text"
              @click="handleEdit(scope.row.id)"
              v-if="dna_sys_update && (scope.row.status === 'E'||scope.row.status !== 'C')"
              text="编辑">
            </gov-button>
            <gov-button
              type="text"
              @click="handleSubmit(scope.row.id)"
              v-if="dna_sys_submit && scope.row.status === 'E'"
              text="提交">
            </gov-button>
            <gov-button
              type="text"
              @click="handleDelete(scope.row.id)"
              v-if="dna_sys_delete && scope.row.status !== 'A'&& scope.row.status !== 'C'"
              text="删除">
            </gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <main-dialog
      ref="mainDialog"
      :option="mainDialogOption"
      :formData="formData"
      :detailData="detailData"
      @closed="mainDialogClosed"
      @edit="handleEditSubmit"
      @newly="handleNewlySubmit"
      @draft="handleDraftSubmit">
    </main-dialog>
    <info-menu-dialog ref="menuDialog" @successForm="successForm" @cancelForm="cancelForm"></info-menu-dialog>
    <db-dialog ref="dbDialog" @successForm="successForm" @cancelForm="cancelForm"></db-dialog>
    <gov-dialog-import
      ref="import"
      :action="importData.action"
      @downLoadDemo="handleDownLoad"
      @importSuccess="handleImportSuccess">
    </gov-dialog-import>
    <gov-dialog-export
      :params="listQuery"
      :url="exportData.url"
      :title="`系统注册${date}`"
      :data="exportData.data"
      :listQuery="exportData.listQuery"
      ref="exportDialog"/>
  </gov-layout-main>
</template>
<script>
import { getDic } from '@/util/dic'
import { downloadExport } from '@/util/util'
import { exportFields } from './const/fields'
import mainDialog from './mainDialog'

import infoMenuDialog from './infoMenuDialog'
import dbDialog from './dbDialog'
import { mapGetters } from 'vuex'

import {
  getSystemTableData,
  getSystemDetail,
  systemSubmit,
  systemDelete,
  systemNewly,
  systemEdit,
  systemDraft,
  // systemExport,
  getExportDemo,
} from '@/api/infoSystem'
import mixin from '@/mixins/mixin'

export default {
  mixins: [mixin],
  components: {
    mainDialog,
    infoMenuDialog,
    dbDialog,
  },
  data () {
    return {
      listQuery: {}, // 搜索条件
      mainTableData: [], // 主表数据
      mainDialogOption: {
        title: '',
        status: '',
        isBtnGroup: true,
      },
      formData: {},
      detailData: {},
      exportData: {
        listQuery: {
          fields: [],
        },
        data: exportFields,
        url: '/survey/system/download_data',
      },
      changeList: [],
      // 导入参数
      importData: {
        action: '/survey/system/import_data',
      },
      dna_sys_add: false,
      dna_sys_import: false,
      dna_sys_export: false,
      dna_sys_detail: false,
      dna_sys_delete: false,
      dna_sys_update: false,
      dna_sys_submit: false,
    }
  },
  computed: {
    // 搜索表单curd
    searchOption () {
      return [
        { label: '信息系统名称', prop: 'sysDsgt' },
        { label: '状态', prop: 'status', type: 'select', data: getDic('INFO_STATUS') },
      ]
    },
    // 主表curd
    mainTableOption () {
      return {
        selection: false,
        page: true,
        menu: false,
        header: false,
        column: [
          {label: '区域', prop: 'sysDeptArea'},
          {label: '单位名称', prop: 'sysDeptName'},
          {label: '信息系统名称', prop: 'sysDsgt'},
          // {label: '状态', prop: 'status', type: 'dic', dicData: getDic('INFO_STATUS')},
          {label: '状态', prop: 'status', solt: true},
          {label: '关联目录', prop: 'resrcList', solt: true},
          {label: '数据库', prop: 'dbsList', solt: true},
          {label: '操作', prop: 'menu', solt: true},
        ],
      }
    },
    date () {
      let date = new Date()
      let year = date.getFullYear()
      let mon = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
      let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      return `${year}-${mon}-${day}`
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.getList()
    this.dna_sys_add = this.permissions['dna_sys_add']
    this.dna_sys_import = this.permissions['dna_sys_import']
    this.dna_sys_export = this.permissions['dna_sys_export']
    this.dna_sys_detail = this.permissions['dna_sys_detail']
    this.dna_sys_update = this.permissions['dna_sys_update']
    this.dna_sys_submit = this.permissions['dna_sys_submit']
    this.dna_sys_delete = this.permissions['dna_sys_delete']
  },
  methods: {
    // 新增
    handleAdd () {
      this.mainDialogOption.title = '新增'
      this.mainDialogOption.status = 'newly'
      this.mainDialogOption.isBtnGroup = true
      this.$refs['mainDialog'].open()
    },
    // 导入
    handleImport () {
      this.$refs['import'].open()
    },
    handleDownLoad () {
      getExportDemo().then(response => {
        downloadExport({title: '系统普查excel模板', response})
      })
    },
    handleImportSuccess () {
      // this.$message.success('导入成功')
      this.getList()
    },
    // 导出
    handleExport () {
      this.$refs.exportDialog.open()
    },
    // 编辑
    handleEditSubmit (formData) {
      systemEdit(formData).then(({data})=>{
        if (data.data) {
          this.getList()
          this.$message.success(data.msg)
        } else {
          this.$message.warning(data.msg)
        }
        this.$refs['mainDialog'].close()
      })
    },
    // 新增
    handleNewlySubmit (formData) {
      systemNewly(formData).then(({data})=>{
        if (data.data) {
          this.getList()
          this.$message.success('新增成功！')
        } else {
          this.$message.warning('新增失败！')
        }
        this.$refs['mainDialog'].close()
      })
    },
    // 草稿
    handleDraftSubmit (formData, status) {
      systemDraft(formData, status).then(()=>{
        this.getList()
        this.$message.success('草稿保存成功')
        this.$refs['mainDialog'].close()
      })
    },
    // 获取主表数据
    getList () {
      this.tableLoading = true
      getSystemTableData(this.listQuery).then(({data}) => {
      console.log(data)
        if (data.code === this.SUCCESS) {
          this.tableList = data.data.records
          this.pagination.total = data.data.total
        }
        this.tableLoading = false
      })
    },
    // 查看详情
    handleDetail (id) {
      getSystemDetail(id).then(res => {
        this.detailData = res.data.data
        this.mainDialogOption.title = '详情'
        this.mainDialogOption.status = 'detail'
        this.$refs['mainDialog'].open()
      })
    },
    // 编辑
    handleEdit (id) {
      getSystemDetail(id).then(res=>{
        this.formData = res.data.data
        this.mainDialogOption.title = '编辑'
        this.mainDialogOption.status = 'edit'
        this.$refs['mainDialog'].open()
      })
    },
    // 提交
    handleSubmit (id) {
      this.$confirm('确定要提交吗').then(() => {
        systemSubmit(id).then(()=>{
          this.getList()
          this.$message.success('提交成功！')
        })
      }).catch(() => {})
    },
    // 删除
    handleDelete (id) {
      this.$confirm('确定要删除吗').then(() => {
        systemDelete(id).then(()=>{
          this.getList()
          this.$message.success('删除成功！')
        })
      }).catch(() => {})
    },
    //关联数据库
    handleDbMenu (row) {
      this.$refs['dbDialog'].open(row)
    },
    //关联目录
    handleInfoMenu (row) {
      this.$refs['menuDialog'].open(row)
    },
    mainDialogClosed () {
      this.formData = {}
    },
    cancelForm (){
      this.getList()
    },
    successForm (){
      this.$message.success("保存成功！")
      this.getList()
    },
  },
}
</script>

<style lang="scss">
.colorRad {
  color: red;
}
.text-blue{
  color: #409EFF;
}
.curP{
  cursor: pointer;
}
.text-green{
  color: #67C23A;
}
</style>
