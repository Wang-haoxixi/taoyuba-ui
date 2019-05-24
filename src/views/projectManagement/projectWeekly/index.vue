<template>
  <gov-layout-main>
    <!-- 头部搜索框 -->
    <gov-layout-header>
    <gov-search-bar
    @handleFilter="handleFilter"
    :listQuery="listQuery"
    :formProps="formProps"/>
    <!-- 按钮组 -->
    <gov-button-group>
        <gov-button type="add" @click="handleCreate" v-if="dnaProjectWeeklyAdd"/>
        <gov-button type="export" @click="handleExport" v-if="dnaProjectWeeklyExport"/>
    </gov-button-group>
    </gov-layout-header>
    <!-- 列表 -->
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :page="pagination"
        :data="tableList"
        :option="tableProps">
        <template slot-scope="scope" slot="reportTime">
            {{scope.row.reportStartTime.split(' ')[0]}} - {{scope.row.reportEndTime.split(' ')[0]}}
        </template>
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
              <gov-button type="text" @click="handleDetail(scope.row)" text="详情"></gov-button>
              <gov-button type="text" @click="handleUpdate(scope.row)" text="编辑" v-if="dnaProjectWeeklyUpdate"></gov-button>
              <gov-button type="text" @click="handleDelete(scope.row)" text="删除" v-if="dnaProjectWeeklyDelete"></gov-button>
              <gov-button type="text" @click="importKnowledge(scope.row)" text="导入知识库" v-if="dnaProjectWeeklyImport"></gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <!-- 弹窗 -->
    <weekly-dialog
      :status="dialogStatus"
      :options="projectSelect"
      @closed="handleClosed"
      @createSubmit="handleCreateSubmit"
      @editSubmit="handleEditSubmit"
      ref="formDialog"/>
  </gov-layout-main>
</template>

<script>
import { getDept } from '@/util/dic'
import mixin from '@/mixins/mixin'
import {tableProps} from './const/index'
import {getWeeklyPage, createWeekly, updateWeekly, deleteWeekly, exportExcel} from '@/api/projectManagement/projectWeekly'
import {getProjectSelect} from '@/api/projectManagement/projectMilestone'
import {importKnowledge} from '@/api/projectManagement/projectKnowledgeBase'
import weeklyDialog from './weeklyDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'projectWeekly', // 项目周报
  mixins: [mixin],
  components: {weeklyDialog},
  data () {
    return {
      projectSelect: [],
      dnaProjectWeeklyAdd: false,
      dnaProjectWeeklyUpdate: false,
      dnaProjectWeeklyDelete: false,
      dnaProjectWeeklyImport: false,
      dnaProjectWeeklyExport: false,
    }
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
    tableProps () {
      return tableProps
    },
    formProps () {
      return [
        {
          label: "责任单位",
          prop: "responsibleUnit",
          type: "select",
          data: getDept(),
          filerable: true,
        }, {
          label: "项目名称",
          prop: "projectId",
          type: "select",
          // multiple: true,
          data: this.projectSelect,
        }, {
          label: "报告时间",
          prop: "time",
          type: "date",
          format: 'yyyy-MM-dd',
        },
      ]
    },
  },
  created () {
    this.getList()
    this.getProjectSelect()
    this.dnaProjectWeeklyAdd = this.permissions['dna_project_weekly_add']
    this.dnaProjectWeeklyUpdate = this.permissions['dna_project_weekly_update']
    this.dnaProjectWeeklyDelete = this.permissions['dna_project_weekly_delete']
    this.dnaProjectWeeklyImport = this.permissions['dna_project_weekly_import']
    this.dnaProjectWeeklyExport = this.permissions['dna_project_weekly_export']
  },
  methods: {
    getProjectSelect () {
      getProjectSelect().then(({data}) =>{
        this.projectSelect = data
      })
    },
    getList () {
      this.tableLoading = true
      getWeeklyPage(this.listQuery).then(({data}) => {
        this.tableList = data.data.records
        this.pagination.total = data.data.total
        this.tableLoading = false
      })
    },
    //打开新增弹窗
    handleCreate () {
      this.dialogStatus = 'create'
      this.$refs.formDialog.openDialog({})
    },
    //新增
    handleCreateSubmit (formData) {
      createWeekly(formData).then(()=>{
        this.$message.success('新增成功')
        this.$refs['formDialog'].closeDialog()
        this.getList()
      })
    },
    //打开修改弹窗
    handleUpdate (row) {
      let reportTime = []
      reportTime.push(row.reportStartTime)
      reportTime.push(row.reportEndTime)
      row.reportTime = reportTime
      this.dialogStatus = 'update'
      this.$refs.formDialog.openDialog(row)
    },
    //修改
    handleEditSubmit (formData) {
      updateWeekly(formData).then(()=>{
        this.$message.success('修改成功')
        this.$refs['formDialog'].closeDialog()
        this.getList()
      })
    },
    //查看
    handleDetail (row) {
      if (row.thisWeekProgress) {
        row.thisWeekProgress = row.thisWeekProgress.replace(/<[^>]+>/g,"")
      }
      if (row.nextWeekPlan) {
        row.nextWeekPlan = row.nextWeekPlan.replace(/<[^>]+>/g,"")
      }
      
      let reportTime = []
      reportTime.push(row.reportStartTime)
      reportTime.push(row.reportEndTime)
      row.reportTime = reportTime
      this.dialogStatus = 'detail'
      this.$refs.formDialog.openDialog(row)
    },
    //删除
    handleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        let item = []
        item.push(row.id)
        deleteWeekly({ids : item}).then((response) => {
          let res = response.data
          if (res.code === 0) {
            this.successNotify(this.DELETE)
            this.getList()
          }
        })
      }).catch(() => {})
    },
    //导入至知识库
    importKnowledge (row) {
      this.$confirm('确定要导入至知识库吗').then(() => {
        importKnowledge({id: row.id, type: '1'}).then(({data}) => {
          if (data.code == 1) {
            this.$message.error('操作失败')
          } else {
            this.$message.success('操作成功')
          }
        })
      }).catch(() => {})       
    },
    //导出
    handleExport () {
      this.$confirm("是否导出项目周报？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let listQuery = this.listQuery
        exportExcel(listQuery).then(response=>{
          this.$message.info('正在导出数据...')
          let url = window.URL.createObjectURL(new Blob([response.data], {
              type: "application/vnd.ms-excel;charset=utf-8",
          }))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '项目周报.xls')
          document.body.appendChild(link)
          link.click()
        })
      }).catch(() => {})
    },
  },
}
</script>

<style scoped>

</style>
