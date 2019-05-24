<template>
  <gov-layout-main>
    <!-- 头部搜索框 -->
    <gov-layout-header>
    <gov-search-bar
    @handleFilter="handleTreeFilter"
    :listQuery="listQuery"
    :formProps="formProps"/>
    </gov-layout-header>
    <!-- 列表 -->
     <gov-layout-body>
      <gov-table-tree
      :data="tableTreeData"
      @handleUpload="handleUpload"
      @handleDetail="handleDetail"
      @handleUpdate="handleUpdate"
      @handleDelete="handleDelete"
      @importKnowledge="importKnowledge"
      @sizeChangeHandle="sizeChangeHandle"
      @currentChangeHandle="currentChangeHandle"
      @setData="getChild"
      :option="tableTree">
      <template slot-scope="scope" slot="progressStatus">
        <el-tag :type="getTag(scope.row.progressStatus)">{{scope.row.progressStatusForShow}}</el-tag>
      </template>
      <template slot-scope="scope" slot="approvalStatus">
        <el-tag :type="getTag(scope.row.approvalStatus)" @click="openApproval(scope.row)" style="cursor:pointer;">{{scope.row.approvalStatusForShow}}</el-tag>
      </template>
      <template slot-scope="scope" slot="procurementStatus">
        <el-tag :type="getTag(scope.row.procurementStatus)" @click="openProcurement(scope.row)" style="cursor:pointer;">{{scope.row.procurementStatusForShow}}</el-tag>
      </template>
      <template slot-scope="scope" slot="implementStatus">
        <el-tag :type="getTag(scope.row.implementStatus)" @click="openImplement(scope.row)" style="cursor:pointer;">{{scope.row.implementStatusForShow}}</el-tag>
      </template>
      <template slot-scope="scope" slot="payStatus">
        <el-tag :type="getTag(scope.row.payStatus)" @click="openPay(scope.row)" style="cursor:pointer;">{{scope.row.payStatusForShow}}</el-tag>
      </template>
      <template slot-scope="scope" slot="performanceStatus">
        <el-tag :type="getTag(scope.row.performanceStatus)" @click="openPerformance(scope.row)" style="cursor:pointer;">{{scope.row.performanceStatusForShow}}</el-tag>
      </template>
      <template slot-scope="scope" slot="trackingStatus">
        <el-tag :type="getTag(scope.row.trackingStatus)" @click="openTracking(scope.row)" style="cursor:pointer;">{{scope.row.trackingStatusForShow}}</el-tag>
      </template>
      </gov-table-tree>
    </gov-layout-body>
    <!-- 弹窗 -->
    <main-dialog
      :status="dialogStatus"
      @closed="handleClosed"
      @editSubmit="handleEditSubmit"
      @editDraftSubmit="handleEditDraftSubmit"
      :moduleType="moduleType"
      ref="formDialog"/>
    <!--上传-->
    <up-load-dialog
      :status="dialogStatus"
      @refreshPage="getList"
      ref="upLoadDialog"
    ></up-load-dialog>
    <!-- 详情弹窗 -->
    <details-dialog
      :status="dialogStatus"
      ref="detailsDialog"
      @closed="handleClosed"
    />
  </gov-layout-main>
</template>

<script>
import { getDic } from '@/util/dic'
import mixin from '@/mixins/mixin'
import {tableProps} from './const/index'
import {getDocPage, updateDoc} from '@/api/projectManagement/projectDoc'
import govTableTree from '@/components/govTableTree/index'
import mainDialog from './mainDialog'
import upLoadDialog from './upLoadDialog'
import detailsDialog from './detailsDialog'
import {importKnowledge} from '@/api/projectManagement/projectKnowledgeBase'
import { mapGetters } from 'vuex'
export default {
  name: 'projectDoc', // 项目文档
  mixins: [mixin],
  components: {govTableTree, mainDialog, upLoadDialog, detailsDialog},
  data () {
    return {
      dnaProjectDocUpload: false,
      dnaProjectDocImport: false,
      tableTreeData: [],
      loading: false,
      tableTree: {
        tree: {
          isLazyLoading: true,
          url: '/api/proj/dnaprojectdoc/getDocChildListById',
        },
        iisSelection: false,
        isIndex: true,
        setDataCallback: function (data) {
          return data
        },
        props: [
          {label: 'id', prop: 'id', width: '100px', treeKey: true},
          {label: '项目名称', prop: 'projectName'},
          {label: '所处阶段', prop: 'stage', type: 'dic',dicData: getDic('PROJECT_MODULE_TYPE')},
          {label: '进度状态', prop: 'progressStatus', type: 'dic',dicData: getDic('PROJECT_PROGRESS_STATUS')},
          {label: '立项阶段', prop: 'approvalStatus', type: 'dic', dicData: getDic('PROJECT_PROGRESS_STATUS')},
          {label: '采购阶段', prop: 'procurementStatus', type: 'dic', dicData: getDic('PROJECT_PROGRESS_STATUS')},
          {label: '实施阶段', prop: 'implementStatus', type: 'dic', dicData: getDic('PROJECT_PROGRESS_STATUS')},
          {label: '验收与支付', prop: 'payStatus', type: 'dic', dicData: getDic('PROJECT_PROGRESS_STATUS')},
          {label: '项目绩效', prop: 'performanceStatus', type: 'dic', dicData: getDic('PROJECT_PROGRESS_STATUS')},
          {label: '项目跟踪', prop: 'trackingStatus', type: 'dic', dicData: getDic('PROJECT_PROGRESS_STATUS')},
        ],
        operation: {
          props: [
            { label: '详情', fn: 'handleDetail', show: true, permission: '' },
            { label: '上传', fn: 'handleUpload', show: true, permission: '' },
            { label: '进度', fn: 'handleUpdate', show: true, permission: '' },
            { label: '导入知识库', fn: 'importKnowledge', show: false, permission: '' },
          ],
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
  watch: {
    'dnaProjectDocUpload': {
      handler (val) {
        if (val) {
          this.tableTree.props[3] = {label: '进度状态', prop: 'progressStatus', type: 'dic',dicData: getDic('PROJECT_PROGRESS_STATUS'), slot: true}
          this.tableTree.props[4] = {label: '立项阶段', prop: 'approvalStatus', type: 'dic', dicData: getDic('PROJECT_PROGRESS_STATUS'), slot: true}
          this.tableTree.props[5] = {label: '采购阶段', prop: 'procurementStatus', type: 'dic', dicData: getDic('PROJECT_PROGRESS_STATUS'), slot: true}
          this.tableTree.props[6] = {label: '实施阶段', prop: 'implementStatus', type: 'dic', dicData: getDic('PROJECT_PROGRESS_STATUS'), slot: true}
          this.tableTree.props[7] = {label: '验收与支付', prop: 'payStatus', type: 'dic', dicData: getDic('PROJECT_PROGRESS_STATUS'), slot: true}
          this.tableTree.props[8] = {label: '项目绩效', prop: 'performanceStatus', type: 'dic', dicData: getDic('PROJECT_PROGRESS_STATUS'), slot: true}
          this.tableTree.props[9] = {label: '项目跟踪', prop: 'trackingStatus', type: 'dic', dicData: getDic('PROJECT_PROGRESS_STATUS'), slot: true}
          this.tableTree.operation.props[1] = { label: '上传', fn: 'handleUpload', show: true, permission: '' }
        }
      },
    },
    'dnaProjectDocImport': {
      handler (val) {
        if (val) {
          this.tableTree.operation.props[3] = { label: '导入知识库', fn: 'importKnowledge', show: true, permission: '' }
        }
      },    
    },
  },
  created () {
    this.getList()
    this.dnaProjectDocUpload = this.permissions['dna_project_doc_upload']
    this.dnaProjectDocImport = this.permissions['dna_project_doc_import']
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
          label: "项目类别",
          prop: "projectType",
          type: "select",
          data: getDic('PROJECT_TYPE'),
        }, {
          label: "项目名称",
          prop: "projectName",
        }, {
          label: "项目年份",
          prop: "projectYear",
          type: "year",
          valueFormat: "yyyy",
        }, {
          label: "项目标签",
          prop: "time",
        },
      ]
    },
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
    getTag (progressStatus) {
      let colors = ['info', '', 'warning','danger', 'success']
      return colors[progressStatus-1]
    },
    handleUpload (row){
      this.$refs.upLoadDialog.openDialog(row)
    },
    //打开立项阶段
    openApproval (row) {
      let formData = JSON.parse(row.projectApprovalJson)
      if (!formData) {
        formData = {}
      }
      formData.id = row.id
      formData.parentId = row.parentId
      this.moduleType = 2
      this.dialogStatus = "立项阶段"
      this.$refs.formDialog.openDialog(formData)
    },
    //采购阶段
    openProcurement (row) {
      let formData = JSON.parse(row.procurementJson)
      if (!formData) {
        formData = {}
      }
      formData.id = row.id
      formData.parentId = row.parentId
      this.moduleType = 3
      this.dialogStatus = "采购阶段"
      this.$refs.formDialog.openDialog(formData)
    },
    //实施阶段
    openImplement (row) {
      let formData = JSON.parse(row.implementJson)
      if (!formData) {
        formData = {}
      }
      formData.id = row.id
      formData.parentId = row.parentId
      this.moduleType = 4
      this.dialogStatus = "实施阶段"
      this.$refs.formDialog.openDialog(formData)
    },
    //打开验收与支付
    openPay (row) {
      let formData = JSON.parse(row.acceptanceAndPaymentJson)
      if (!formData) {
        formData = {}
      }
      formData.id = row.id
      formData.parentId = row.parentId
      this.moduleType = 5
      this.dialogStatus = "验收与支付"
      this.$refs.formDialog.openDialog(formData)
    },
    //打开开项目绩效
    openPerformance (row) {
      let formData= JSON.parse(row.projectPerformanceJson)
      if (!formData) {
        formData = {}
      }
      formData.id = row.id
      formData.parentId = row.parentId
      this.moduleType = 6
      this.dialogStatus = "项目绩效"
      this.$refs.formDialog.openDialog(formData)
    },
    //打开项目跟踪
    openTracking (row) {
      let formData= JSON.parse(row.projectTrackingJson)
      if (!formData) {
        formData = {}
      }
      formData.id = row.id
      formData.parentId = row.parentId
      this.moduleType = 7
      this.dialogStatus = "项目跟踪"
      this.$refs.formDialog.openDialog(formData)
    },
    //分页查询
    getList () {
      this.tableLoading = true
      this.listQuery.page = this.tableTree.pagination.currentPage
      this.listQuery.limit = this.tableTree.pagination.pageSize
      getDocPage(this.listQuery).then(({data}) => {
        this.tableTreeData = data.data.records
        this.tableTree.pagination.total = data.data.total
        this.loading = false
      })
    },
    //保存草稿
    handleEditDraftSubmit (formData,moduleType) {
      let id = formData.id
      let parentId = formData.parentId
      delete formData.id
      delete formData.parentId
      var data
      if (moduleType === 2) {
        data = {projectApprovalJson:JSON.stringify(formData)}
        data.approvalStatus = "2"
      }
      if (moduleType === 3) {
        data = {procurementJson:JSON.stringify(formData)}
        data.procurementStatus = "2"
      }  
      if (moduleType === 4) {
        data = {implementJson:JSON.stringify(formData)}
        data.implementStatus = "2"
      }
      if (moduleType === 5) {
        data = {acceptanceAndPaymentJson:JSON.stringify(formData)}
        data.payStatus = "2"
      } else if (moduleType === 6) {
        data = {projectPerformanceJson:JSON.stringify(formData)}
        data.performanceStatus = "2"
      } else if (moduleType === 7) {
        data = {projectTrackingJson:JSON.stringify(formData)}
        data.trackingStatus = "2"
      }
      data.id = id
      data.parentId = parentId
      updateDoc(data).then(()=>{
        this.$message.success('保存草稿成功')
        this.$refs['formDialog'].close()
        this.getList()
      })
    },
    //保存
    handleEditSubmit (formData,moduleType) {
      let id = formData.id
      let parentId = formData.parentId
      delete formData.id
      delete formData.parentId
      var data
      if (moduleType === 2) {
        data = {projectApprovalJson:JSON.stringify(formData)}
        data.approvalStatus = "5"
      } else if (moduleType === 3) {
        data = {procurementJson:JSON.stringify(formData)}
        data.procurementStatus = "5"
      } else if (moduleType === 4) {
        data = {implementJson:JSON.stringify(formData)}
        data.implementStatus = "5"
      } else if (moduleType === 5) {
        data = {acceptanceAndPaymentJson:JSON.stringify(formData)}
        data.payStatus = "5"
      } else if (moduleType === 6) {
        data = {projectPerformanceJson:JSON.stringify(formData)}
        data.performanceStatus = "5"
      } else if (moduleType === 7) {
        data = {projectTrackingJson:JSON.stringify(formData)}
        data.trackingStatus = "5"
      }
      data.id = id
      data.parentId = parentId
      updateDoc(data).then(()=>{
        this.$message.success('保存成功')
        this.$refs['formDialog'].close()
        this.getList()
      })
    },
    handleDetail (row){
      this.dialogStatus = "detail"
      this.$refs['detailsDialog'].openDialog(row)
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
    //导入知识库
    importKnowledge (row) {
      this.$confirm('确定要导入至知识库吗').then(() => {
        importKnowledge({id: row.id, type: '2'}).then(({data}) => {
          if (data.code == 1) {
            this.$message.error('操作失败')
          } else {
            this.$message.success('操作成功')
          }
        })
      }).catch(() => {})    
    },
  },
}
</script>

<style>

</style>
