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
          <gov-button v-if="dnaProjectMilestoneAdd" type="add" @click="handleCreate"/>
          <gov-button v-if="dnaProjectMilestoneImport" type="import" @click="handleImport"/>
          <gov-button v-if="dnaProjectMilestoneImport" type="export" @click="handleExport"/>
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
          <template slot-scope="scope" slot="menu">
            <div class="table-btn-group">
              <gov-button type="text" @click="handleDetail(scope.row)" text="详情"></gov-button>
              <gov-button type="text" v-if="dnaProjectMilestoneUpdate" @click="handleUpdate(scope.row)" text="编辑"></gov-button>
              <gov-button type="text" v-if="dnaProjectMilestoneDelete" @click="handleDelete(scope.row)" text="删除"></gov-button>
              <gov-button type="text" @click="handleLog(scope.row)" text="操作日志"></gov-button>
            </div>
          </template>
        </avue-crud>
      </gov-layout-body>
      <milestone-dialog
        @success="handleSuccess"
        :temp="formData"
        :options="projectSelect"
        :status="dialogStatus"
        @createSubmit="handleCreateSubmit"
        @editSubmit="handleEditSubmit"
        ref="formDialog"/>
      <gov-import-dialog
        :action="importData.action"
        :data="importData.data"
        @downLoadDemo="handleDownLoad"
        @importSuccess="importSuccess"
        ref="importDialog"/>
      <oper-log-dialog
        @closed="handleClosed"
        ref="operLogDialog"/>  
  </gov-layout-main>
</template>

<script>
import { getDic } from '@/util/dic'
import {
  getProjectMilestonePage,
  deleteMilestone,
  getProjectSelect,
  exportExcel,
  getExportDemo,
} from '@/api/projectManagement/projectMilestone'
import govImportDialog from "@/components/govDialogImport"
import milestoneDialog from './milestoneDialog'
import operLogDialog from './operLogDialog'
import mixin from '@/mixins/mixin'
import {updateMilestone, createMilestone} from '@/api/projectManagement/projectMilestone'
import { mapGetters } from 'vuex'
export default {
  name: 'projectMilestone', // 项目里程碑
  components: {milestoneDialog, govImportDialog,operLogDialog},
  mixins: [mixin],
  data () {
    return {
      importData: {
        action: "/proj/dnaprojectmilestone/importExcel",
        data: {},
        dnaProjectMilestoneAdd: false,
        dnaProjectMilestoneUpdate: false,
        dnaProjectMilestoneDelete: false,
        dnaProjectMilestoneImport: false,
      },
      projectSelect: [],
    }
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
    formProps () {
      return [
        {
          label: "项目里程碑名称",
          prop: "milestoneName",
        }, {
          label: "所属项目",
          prop: "projectId",
          type: "select",
          //multiple: true,
          data: this.projectSelect,
        }, {
          label: "状态",
          prop: "status",
          type: "select",
          data: getDic('PROJECT_MILESTONE_STATUS'),
        },
      ]
    },
    tableProps () {
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        header: false,
        index: true,
        menuWidth: '180px',
        column: [
          {label:'项目里程碑名称', prop:'milestoneName'},
          {label:'所属项目', prop:'projectName'},
          {label:'进度', prop:'schedule', type: 'dic', dicData: this.getDic('PROJECT_MILESTONE_SCHEDULE')},
          {label:'状态', prop:'status', type: 'dic', dicData: this.getDic('PROJECT_MILESTONE_STATUS')},
        ],
      }
    },
  },
  created () {
    this.dnaProjectMilestoneAdd = this.permissions['dna_project_milestone_add']
    this.dnaProjectMilestoneUpdate = this.permissions['dna_project_milestone_update']
    this.dnaProjectMilestoneDelete = this.permissions['dna_project_milestone_delete']
    this.dnaProjectMilestoneImport = this.permissions['dna_project_milestone_import']
    this.getList()
    this.getProjectSelect()
  },
  methods: {
    getProjectSelect () {
      getProjectSelect().then(({data}) =>{
        this.projectSelect = data
      })
    },
    getList () {
      this.tableLoading = true
      getProjectMilestonePage(this.listQuery).then(({data}) => {
        this.tableList = data.data.records
        this.pagination.total = data.data.total
        this.tableLoading = false
      })
    },
    // 获取状态中文名
    getPeojectStatus (status) {
      let dicData = this.getDic('PROJECT_MILESTONE_STATUS')
      let data = dicData.find((item) => {
        return item.value === status
      })
      return data.label
    },
    // 获取状态对应颜色
    getPeojectStatusColor (status) {
      let colors = ['info', '', 'danger', 'success']
      return colors[Number(status)]
    },
    //新增
    handleCreate () {
      this.formData = {}
      this.dialogStatus = 'create'
      this.$refs.formDialog.openDialog()
    },
    // 导入
    handleImport () {
      this.$refs.importDialog.open()
    },
    // 导出
    handleExport () {
      this.$confirm("是否导出项目里程碑？", "提示", {
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
            link.setAttribute('download', '项目里程碑.xls')
            document.body.appendChild(link)
            link.click()
        })
      }).catch(() => {})
    },
    // 操作日志
    handleLog (row) {
      let data = {}
      data.typeId = row.id
      data.type = "1"
      this.$refs.operLogDialog.openDialog(data)
    },
    // 删除
    handleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        let item = []
        item.push(row.id)
        deleteMilestone({ids : item}).then((response) => {
          let res = response.data
          if (res.code === 0) {
            this.successNotify(this.DELETE)
            this.getList()
          } else {
            this.$message.error("删除失败")
          }
        })
      }).catch(() => {})
    },
    // 修改
    handleUpdate (row) {
      this.dialogStatus = 'update'
      this.$refs.formDialog.openDialog(row)
    },
    // 详情
    handleDetail (row) {
      this.dialogStatus = 'detail'
      this.$refs.formDialog.openDialog(row)
    },
    handleSuccess () {
      this.getList()
    },
    //下载模版
    handleDownLoad () {
      getExportDemo().then(response=>{
        this.$message.info('正在导出数据...')
        let url = window.URL.createObjectURL(new Blob([response.data], {
            type: "application/vnd.ms-excel;charset=utf-8",
        }))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', '项目里程碑模版.xls')
        document.body.appendChild(link)
        link.click()
      })
    },
    // 成功回调
    importSuccess () {
      this.getList()
    },
    //新增
    handleCreateSubmit (formData) {
      createMilestone(formData).then(({data}) => {
        if (data.code === 1) {
          this.$message.error(data.msg)
        } else {
          this.$message.success('新增成功')
          this.$refs['formDialog'].closeDialog()
          this.getList()
        } 
      })
    },
    //修改
    handleEditSubmit (formData) {
      updateMilestone(formData).then(({data}) => {
        if (data.code === 1) {
          this.$message.error(data.msg)
        } else {
          this.$message.success('编辑成功')
          this.$refs['formDialog'].closeDialog()
          this.getList()
        }
      })
    },
  },
}
</script>

<style lang="sass" scoped>

</style>