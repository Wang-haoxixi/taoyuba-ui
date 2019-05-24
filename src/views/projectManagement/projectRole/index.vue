<template>
  <gov-layout-main>
    <!-- 头部搜索框 -->
    <gov-layout-header>
      <gov-search-bar
        @handleFilter="handleFilter"
        :listQuery="listQuery"
        :formProps="formProps"/>
      <gov-layout-button-group>
        <gov-button type="primary" @click="handleAddModel" v-if="dnaProjectRoleAdd">新增</gov-button>
        <gov-button type="primary" @click="batchUpdateStatus('1')" v-if="dnaProjectRoleDelete">批量启用</gov-button>
        <gov-button type="primary" @click="batchUpdateStatus('2')" v-if="dnaProjectRoleDelete">批量禁用</gov-button>
      </gov-layout-button-group>  
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        :data="projectRoleData"
        :option="projectRoleTableOption"
        :page="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        @selection-change="selectionChange"
        @refresh-change="getList">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <el-button @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
            <el-button @click="handleUpdate(scope.row)" type="text" size="small" v-if="dnaProjectRoleUpdate">修改</el-button>
            <el-button @click="handleDelete(scope.row.id)" type="text" size="small" v-if="dnaProjectRoleDelete">删除</el-button>
            <el-button @click="updateStatus(scope.row)" type="text" size="small" v-if="dnaProjectRoleDelete">{{statusForShow[scope.row.status-1]}}</el-button>
            <el-button @click="handleRole(scope.row)" type="text" size="small" v-if="dnaProjectRolePerm">权限</el-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <!-- 表单 -->
    <main-dialog
      :status="dialogStatus"
      @closed="handleClosed"
      @createSubmit="handleCreateSubmit"
      @editSubmit="handleEditSubmit"
      ref="mainDialog"/>  
    <role-dialog ref="roleDialog"/>  
  </gov-layout-main>      
</template>

<script>
import { getDic } from '@/util/dic'
import mixin from '@/mixins/mixin'
import { projectRoleTableOption } from './const/index'
import { createRole, getProjectRolePage, updateRole, deleteRole, updateStatus, batchChangeStatus } from '@/api/projectManagement/projectRole'
import MainDialog from './mainDialog'
import RoleDialog from './roleDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'projectRole',
  mixins: [mixin],
  components: { MainDialog, RoleDialog},
  data () {
    return {
      statusForShow: ['禁用','启用'],
      tableLoading: false,
      selectedList: [],
      dnaProjectRoleAdd: false,
      dnaProjectRoleUpdate: false,
      dnaProjectRoleDelete: false,
      dnaProjectRolePerm: false,
    }
  },
  computed: {
    // 查询字段
    formProps () {
      return [
        {
          label: "角色名称",
          prop: "roleName",
        }, {
          label: "状态",
          prop: "status",
          type: "select",
          data: getDic('PROJECT_ROLE_STATUS'),
        },
      ]
    },
    projectRoleTableOption () {
      return projectRoleTableOption
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.getList()
    this.dnaProjectRoleAdd = this.permissions['dna_project_role_add']
    this.dnaProjectRoleUpdate = this.permissions['dna_project_role_update']
    this.dnaProjectRoleDelete = this.permissions['dna_project_role_delete']
    this.dnaProjectRolePerm = this.permissions['dna_project_role_perm']
  },
  methods: {
     selectionChange (list) {
      this.selectedList = list
    },
    //列表
    getList () {
      this.tableLoading = true
      getProjectRolePage(this.listQuery).then(({data})=>{
        this.projectRoleData = data.data.records
        this.pagination.total = data.data.total
        this.tableLoading = false
      })
    },
    handleAddModel () {
      this.dialogStatus = 'create'
      this.$refs.mainDialog.openDialog()
    },
    handleCreateSubmit (formData) {
      createRole(formData).then(()=>{
        this.$message.success('新增成功')
        this.$refs['mainDialog'].close()
        this.getList()
      })
    },
    handleDetail (row) {
      this.dialogStatus = 'detail'
      this.$refs.mainDialog.openDialog(row)
    },
    handleUpdate (row) {
      this.dialogStatus = 'update'
      this.$refs.mainDialog.openDialog(row)
    },
    //修改
    handleEditSubmit (formData) {
      updateRole(formData).then(()=>{
        this.$message.success('编辑成功')
        this.$refs['mainDialog'].close()
        this.getList()
      })
    },
    //删除
    handleDelete (id) {
      this.$confirm('确定要删除角色吗').then(() => {
        let item = []
        item.push(id)
        deleteRole({ids : item}).then((response) => {
          let res = response.data
          if (res.code === 0) {
            this.successNotify(this.DELETE)
            this.getList()
          }
        })
      }).catch(() => {})
    },
    //启用禁用
    updateStatus (row) {
      var typeName = this.statusForShow[row.status-1]
      var params = {id: row.id, status: row.status}
      this.$confirm('确定要'+typeName+'角色吗').then(() => {   
        updateStatus(params).then((response) => {
          let res = response.data
          if (res.code === 0) {
            this.$message.success(typeName+'成功')
            this.getList()
          }
        })
      }).catch(() => {})
    },
    //批量启用禁用
    batchUpdateStatus (type) {
      var typeName = "启用"
      if (type == "2") {
        typeName = "禁用"
      }
      if (this.selectedList.length === 0) {
        this.$message.error('请至少选择一条数据')
      } else {
         this.$confirm('确定要批量'+typeName+'么吗').then(() => {
          let ids = []
          this.selectedList.forEach(item=>{
            ids.push(item.id)
          })
          batchChangeStatus({ids: ids, status: type}).then(()=>{
            this.getList()
            this.$message.success('批量'+typeName+'成功')
          })
        }).catch(() => {})
      }
    },
    //权限
    handleRole (row) {
      //this.$refs.roleDialog.dialogVisible = true
      this.$refs.roleDialog.open(row)
    },
  },
}
</script>

<style scoped>

</style>
