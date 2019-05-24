<template>
   <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        @handleFilter="handleFilter"
        :listQuery="listQuery"
        :formProps="formProps"/>
        <gov-layout-button-group>
          <gov-button v-if="dnaProjectRegistAdd" type="primary" @click="handleAddModel">新增</gov-button>
        </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="项目登记" name="first" v-if="dnaProjectRegistCheck"></el-tab-pane>
        <el-tab-pane label="项目审核" name="second" v-if="dnaProjectAudit"></el-tab-pane>
      </el-tabs>  
      <avue-crud
        :table-loading="tableLoading"
        :data="pageData"
        :option="tableOption"
        :page="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        @selection-change="selectionChange"
        @refresh-change="getList">
        <template slot-scope="scope" slot="approvalStatus">
          <gov-tool-tip :content="scope.row.auditNote" status="error" :tooltip="scope.row.approvalStatus === '4'">
            <label>{{ auditStateComputed(scope.row.approvalStatus) }}</label>
          </gov-tool-tip>
        </template>
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <el-button @click="handleDetail(scope.row)" type="text" size="small" v-if="(index == 1 ? true:false)">详情</el-button>
            <el-button @click="handleUpdate(scope.row)" type="text" size="small" v-if="dnaProjectRegistUpdate && (index == 1 ? true:false) && (scope.row.approvalStatus =='2' || scope.row.approvalStatus =='4') ">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="text" size="small" v-if="dnaProjectRegistDelete && (index == 1 ? true:false) && scope.row.approvalStatus =='2'">删除</el-button>
            <el-button @click="handleAudit(scope.row)" type="text" size="small" v-if="index == 2 ? true:false">审核</el-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <!-- 弹窗 -->
    <project-dialog
      :status="dialogStatus"
      @closed="handleClosed"
      @createSubmit="handleCreateSubmit"
      @editSubmit="handleEditSubmit"
      ref="formDialog"/>
    <!-- 审核 -->
    <audit-project-dialog
      @closedAudit="handleClosedAudit"
      @editAuditSubmit="handleEditAuditSubmit"
      ref="auditDialog"   
    />
   </gov-layout-main>
</template>
<script>
import { getDic, getDept } from '@/util/dic'
import tabsTableMixin from "@/mixins/tabsTableMixin"
import { getFormProps, getProjectListPage, createProject, getTableProps, updateProject, deleteProject, auditProject} from '@/api/projectManagement/projectList'
import projectDialog from './projectDialog'
import { mapGetters } from 'vuex'
import auditProjectDialog from './auditProjectDialog'
import GovToolTip from '@/components/govToolTip'
export default {
  mixins: [tabsTableMixin],
  components: {projectDialog, auditProjectDialog, GovToolTip},
  data () {
    return {
      index: 1,    
      activeName: 'first',  
      dnaProjectRegistAdd: false,
      dnaProjectRegistUpdate: false,
      dnaProjectRegistDelete: false,
      dnaProjectRegistCheck: false,
      dnaProjectAudit: false,
      queryData: [],
      pageData: [],
      tableOptions: {
        page: true,
        menu: false,
        header: false,
        index: true,
        column: [{
            label: "审核状态",
            prop: "approvalStatus",
            type: "dic",
            dicData: getDic('AUDIT_STATE'),
            solt: true,
          }, {
            label: "操作",
            prop: "menu",
            solt: true,
            width: 180,
          }],    
      },
    }    
  },
  created () {
    this.dnaProjectRegistAdd = this.permissions['dna_project_regist_add']
    this.dnaProjectRegistUpdate = this.permissions['dna_project_regist_update']
    this.dnaProjectRegistDelete = this.permissions['dna_project_regist_delete']
    this.dnaProjectRegistCheck = this.permissions['dna_project_regist_check']
    this.dnaProjectAudit = this.permissions['dna_project_audit']
    this.getTableProps()
    this.getFormProps()
  },
  computed: {
    // 查询字段
    formProps () {
      return this.queryData
    },
    ...mapGetters([
      'permissions',
    ]),
    tableOption () {
      return this.tableOptions
    },
  },
  methods: {
    // 显示未通过理由
    auditStateComputed (auditState) {
      let list = getDic('AUDIT_STATE')
      let outText = ''
      list.forEach(item=>{
        if (item.value === auditState) {
          outText = item.label
        }
      })
      return outText
    },
    // 审核
    handleAudit (data) {
      let formData= JSON.parse(data.dataJson)
      formData.id = data.id
      formData.parentId = data.parentId
      this.$refs.auditDialog.openDialog(formData)
    },
    // 切换
    handleClick (tab) {
      this.index = Number(tab.index)+1
      this.pagination.currentPage = 1
      this.listQuery.page = 1
      this.getList(Number(tab.index)+1)
    },    
    //获取查询字段
    getFormProps () {
      getFormProps().then(({data})=>{        
        data.forEach((item) => {
          if (item.data && item.type != 'tree') {
            if (item.data == 'getDept()') {
              item.data = getDept()
            } else if (item.inputType == 3) {
              item.data = JSON.parse(item.data)
            } else {
              item.data = getDic(item.data)
            }  
          }
          if (item.data && item.type === 'tree') {
            item.data = JSON.parse(item.data)
          }
        })
        this.queryData = data
      })
    },
    //获取显示表字段
    getTableProps () {
      getTableProps().then(({data})=>{
        data.forEach((item,index) => {
          if (item.dicData == 'getDept()') {
            item.dicData = getDept()
          } else {
            item.dicData = getDic(item.dicData)
          }  
          this.tableOptions.column.splice(index,0,item)
        })
        let dnaProjectRegistCheck = this.dnaProjectRegistCheck
        let dnaProjectAudit = this.dnaProjectAudit
        if ((dnaProjectRegistCheck && dnaProjectAudit) || (dnaProjectRegistCheck && !dnaProjectAudit)) {
          this.activeName = "first"
          this.index = 1
          this.getList(this.index)
        } else if (!dnaProjectRegistCheck && dnaProjectAudit){
          this.activeName = "second"
          this.index = 2
          this.getList(this.index)
        }     
      })
    },
    //列表
    getList (sign) {
      this.loading = true
      this.listQuery.sign = sign
      getProjectListPage(this.listQuery).then(({data})=>{
        this.pageData = data.data.records.map( item => Object.assign(item,JSON.parse(item.dataJson)))
        this.pagination.total = data.data.total
        this.loading = false
      })
    },
    //打开新增页面
    handleAddModel () {
      this.dialogStatus = "create"
      this.$refs.formDialog.openDialog()
    },
    //新增
    handleCreateSubmit (formData) {
      var data = {}
      if (formData.parentId) {
        var parentId = formData.parentId
        delete formData.parentId
        data = {dataJson:JSON.stringify(formData)}
        data.parentId = parentId
      } else {
        data = {dataJson:JSON.stringify(formData)}
      }
      createProject(data).then(({data})=>{
        if (data.code == 1) {
          this.$message.error(data.msg)
        } else {
          this.$message.success('新增成功')
          this.$refs['formDialog'].close()
          this.getList(1)
        }
      })
    },
    //编辑
    handleUpdate (data) {
      let formData= JSON.parse(data.dataJson)
      formData.id = data.id
      formData.parentId = data.parentId
      formData.approvalStatus = data.approvalStatus
      this.dialogStatus = "update"
      this.$refs.formDialog.openDialog(formData)
    },
    //保存编辑
    handleEditSubmit (formData) {
      let obj = Object.assign({},formData) 
      let id = obj.id
      let parentId = obj.parentId
      let approvalStatus = obj.approvalStatus
      delete obj.id
      delete obj.parentId
      delete obj.approvalStatus
      var data = {dataJson:JSON.stringify(obj)}
      data.id = id
      data.parentId = parentId
      data.approvalStatus = approvalStatus
      updateProject(data).then(({data})=>{
        if (data.code == 1) {
          this.$message.error(data.msg)
        } else {
          this.$message.success('编辑成功')
          this.$refs['formDialog'].close()
          this.getList(1)
        }
      })
    },
    //审核
    handleEditAuditSubmit (formData) {
      auditProject(formData).then(({data}) => {
        if (data.code == 0) {
          this.$message.success("操作成功")
          this.getList(2)
          this.handleClosedAudit()
        } else {
          this.$message.error("操作失败")
        }
      })
    },
    //删除
    handleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        let item = []
        item.push(row.id)
        deleteProject({ids : item}).then((response) => {
          let res = response.data
          if (res.code === 0) {
            this.successNotify(this.DELETE)
            this.getList(1)
          }
        })
      }).catch(() => {})
    },
    // 详情
    handleDetail (row){
      this.dialogStatus = "detail"
      this.$refs.formDialog.openDialog(row)
    },
    handleClosedAudit () {
      this.$refs.auditDialog.handleClosed()
    },
  },
}
</script>

<style>
.block_div {
  width: 25%;
  float: left;
}

.image {
  width: 40px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.tj_div {
  padding-top: 10px;
  padding-left: 10px;
  color: #999;
}

.tj_div span.num_span {
  color: #444;
  font-weight: normal;
}

.img_div {
  width: 110px;
  float: left;
  padding-left: 10px;
  padding-top: 10px;
}

.el-row {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding-bottom: 20px;
}
</style>
