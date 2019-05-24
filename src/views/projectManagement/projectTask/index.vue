<template>
  <gov-layout-main>
    <gov-layout-header>
       <gov-search-bar
        @handleFilter="handleTreeFilter"
        :listQuery="listQuery"
        :formProps="formProps"/>
        <gov-layout-button-group>
          <gov-button type="primary" @click="handleAddModel">新增</gov-button>
          <gov-button type="export" @click="handleExport"/>
        </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <gov-table-tree
      :data="tableTreeData"
      @handleDetail="handleDetail"
      @handleUpdate="handleUpdate"
      @handleDelete="handleDelete"
      @handleAddSon="handleAddSon"
      @handleOperLog="handleOperLog"
      @sizeChangeHandle="sizeChangeHandle"
      @currentChangeHandle="currentChangeHandle"
      @setData="getChild"
      :option="tableTree">
      <template slot-scope="scope" slot="sex">
        <el-tag>{{scope.data.sexForShow}}</el-tag>
      </template>
      </gov-table-tree>
    </gov-layout-body>
    <!-- 弹窗 -->
    <task-dialog
      :status="dialogStatus"
      :options="projectSelect"
      @closed="handleClosed"
      @createSubmit="handleCreateSubmit"
      @editSubmit="handleEditSubmit"
      ref="formDialog"/>
    <oper-log-dialog
      @closed="handleClosed"
      ref="operLogDialog"/>  
  </gov-layout-main>  
</template>
<script>
import { getDic, getDept } from '@/util/dic'
import mixin from "@/mixins/mixin"
import treeTableMixin from "@/mixins/treeTableMixin"
import { taskTableOption } from './const/index'
import govTableTree from '@/components/govTableTree/index'
import { getTaskPage, createTask, updateTask, deleteTask, exportExcel} from '@/api/projectManagement/projectTask'
import taskDialog from './taskDialog'
import { getProjectSelect } from '@/api/projectManagement/projectMilestone'
import operLogDialog from '../projectMilestone/operLogDialog'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixin,treeTableMixin],
  components: {govTableTree, taskDialog, operLogDialog},
  data () {
    return {
      projectSelect: [],
      tableTreeData: [],
      dnaProjectTaskAdd: false,
      dnaProjectTaskUpdate: false,
      dnaProjectTaskDelete: false,
      tableTree: {
        loading: false,
        tree: {
          isLazyLoading: true,
          url: '/api/proj/dnaprojecttask/getListById',
        },
        isSelection: false,
        isIndex: true,
        setDataCallback: function (data) {
          return data
        },
        props: [
          {label: 'id', prop: 'id', width: '100px', treeKey: true},
          {label: '任务名称', prop: 'taskName'},
          {label: '协同部门', prop: 'collaborativeDepartmentId', type: 'dic',dicData: getDept()},
          {label: '状态', prop: 'status', type: 'dic', dicData: getDic('PROJECT_MILESTONE_STATUS')},
          {label: '优先级', prop: 'priority', type: 'dic', dicData: getDic('PROJECT_TASK_PRIORITY')},
        ],
        operation: {
          props: [
            { label: '新增子项', fn: 'handleAddSon', show: false, permission: '' },
            { label: '详情', fn: 'handleDetail', show: true, permission: '' },
            { label: '编辑', fn: 'handleUpdate', show: false, permission: '' },
            { label: '删除', fn: 'handleDelete', show: false, permission: '' },
            { label: '操作日志', fn: 'handleOperLog', show: true, permission: '' },
          ],
          width: '280px',
        },
        // 分页
        pagination: {
          show: true,
          total: 0,
          currentPage: 1,
          pageSize: 10,
          layout: 'total, sizes, prev, pager, next, jumper',
          pageSizes: [10, 20, 30, 50],
        },
      },
    }
  },
  created () {
    this.getList()
    this.getProjectSelect()
    this.dnaProjectTaskAdd = this.permissions['dna_project_task_add']
    this.dnaProjectTaskUpdate = this.permissions['dna_project_task_update']
    this.dnaProjectTaskDelete = this.permissions['dna_project_task_delete']
  },
  watch: {
    'dnaProjectTaskAdd': {
      handler (val) {
        if (val) {
          this.tableTree.operation.props[0] = { label: '新增子项', fn: 'handleAddSon', permission: '',show: true }
        }
      },
    },
    'dnaProjectTaskUpdate': {
      handler (val) {
        if (val) {
          this.tableTree.operation.props[2] = { label: '编辑', fn: 'handleUpdate', permission: '',show: true }
        }
      },
    },
    'dnaProjectTaskDelete': {
      handler (val) {
        if (val) {
          this.tableTree.operation.props[3] = { label: '删除', fn: 'handleDelete', permission: '',show: true }
        }
      },
    },
  },
  computed: {
    // 查询字段
    formProps () {
      return [
        {
          label: "任务名称",
          prop: "taskName",
        }, {
          label: "所属项目",
          prop: "dependentProjectId",
          type: "select",
          data: this.projectSelect,
        },
      ]
    },
    taskTableOption () {
      return taskTableOption
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  methods: {
    // 列表搜索
    handleTreeFilter () {
      for (let key in this.listQuery) {
        if (this.listQuery[key] === '' || this.listQuery[key] === null) {
          this.listQuery[key] = undefined
        }
      }
      this.tableTree.pagination.currentPage = 1
      setTimeout(() => {
        this.getList()
      }, 10)
    },
    getProjectSelect () {
      getProjectSelect().then(({data}) =>{
        this.projectSelect = data
      })
    },
    getList () {
      this.tableTree.loading = true
      getTaskPage(this.listQuery).then(({data})=>{
        this.tableTreeData = data.data.records
        this.tableTree.pagination.total = data.data.total
        this.tableTree.loading = false
      })
    },
    //打开新增弹窗
    handleAddModel () {
      this.dialogStatus = 'create'
      this.$refs.formDialog.openDialog()
    },
    //查看
    handleDetail (row) {
      this.dialogStatus = 'detail'
      this.$refs.formDialog.openDialog({...row})
    },
    //新增
    handleCreateSubmit (formData) {
      createTask(formData).then(()=>{
        this.$message.success('新增成功')
        this.$refs['formDialog'].close()
        this.getList()
      })
    },
    //打开修改弹窗
    handleUpdate (row) {
      this.dialogStatus = 'update'
      this.$refs.formDialog.openDialog({...row})
    },
    //修改
    handleEditSubmit (formData) {
      updateTask(formData).then(()=>{
        this.$message.success('编辑成功')
        this.$refs['formDialog'].close()
        this.getList()
      })
    },
    //删除
    handleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        let item = []
        item.push(row.id)
        deleteTask({ids : item}).then((response) => {
          let res = response.data
          if (res.code === 0) {
            this.successNotify(this.DELETE)
            this.tableTree.pagination.total --
          }
        })
      }).catch(() => {})
    },
    //新增子项
    handleAddSon (row) {
      let formData = {}
      formData.parentId = row.id
      this.dialogStatus = 'create'
      this.$refs.formDialog.openDialog(formData)
    },
    //导出
    handleExport () {
      this.$confirm("是否导出项目任务？", "提示", {
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
            link.setAttribute('download', '项目任务.xls')
            document.body.appendChild(link)
            link.click()
        })
      }).catch(() => {})
    },
    //操作日志查看
    handleOperLog (row) {
      let data = {}
      data.typeId = row.id
      data.type = "2"
      this.$refs.operLogDialog.openDialog(data)
    },
    // 每页条数改变时会触发
    sizeChangeHandle (val) {
      this.tableTree.pagination.pageSize = val
      this.getList()
    },
    // 当前页改变时会触发
    currentChangeHandle (val) {
      this.tableTree.pagination.currentPage = val
      this.getList()
    },
  },
}
</script>

<style>

</style>
