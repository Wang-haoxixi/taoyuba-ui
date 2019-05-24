<template>
  <gov-layout-main>
    <!-- 头部搜索框 -->
    <gov-layout-header>
      <gov-search-bar
        @handleFilter="handleFilter"
        :listQuery="listQuery"
        :formProps="formProps"/>
      <gov-layout-button-group>
        <gov-button type="primary" @click="handleAddModel" v-if="dnaProjectUserAdd">新增</gov-button>
      </gov-layout-button-group>  
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        :data="projectUserData"
        :option="projectUserTableOption"
        :page="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        @selection-change="selectionChange"
        @refresh-change="getList">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <el-button @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
            <el-button @click="handleUpdate(scope.row)" type="text" size="small" v-if="dnaProjectUserUpdate">修改</el-button>
            <el-button @click="handleDelete(scope.row.id)" type="text" size="small" v-if="dnaProjectUserDelete">删除</el-button>
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
  </gov-layout-main>  
</template>

<script>
import mixin from '@/mixins/mixin'
import { projectUserTableOption } from './const/index'
import { createUser, getProjectUserPage, deleteUser, updateUser} from '@/api/projectManagement/projectUser'
import MainDialog from './mainDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'projectUser',
  mixins: [mixin],
  components: { MainDialog },
  data () {
    return {
      dnaProjectUserAdd: false,
      dnaProjectUserUpdate: false,
      dnaProjectUserDelete: false,
    }
  },
  computed: {
    // 查询字段
    formProps () {
      return [
        {
          label: "姓名",
          prop: "realName",
        }, {
          label: "电话",
          prop: "phone",
        },
      ]
    },
    projectUserTableOption () {
      return projectUserTableOption
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.getList()
    this.dnaProjectUserAdd = this.permissions['dna_project_user_add']
    this.dnaProjectUserUpdate = this.permissions['dna_project_user_update']
    this.dnaProjectUserDelete = this.permissions['dna_project_user_delete']
  },
  methods: {
    //列表
    getList () {
      this.tableLoading = true
      getProjectUserPage(this.listQuery).then(({data})=>{
        this.projectUserData = data.data.records
        this.pagination.total = data.data.total
        this.tableLoading = false
      })
    },
    //打开新增页面
    handleAddModel () {
      this.dialogStatus = 'create'
      this.$refs.mainDialog.openDialog()
    },
    //新增
    handleCreateSubmit (formData) {
      createUser(formData).then(({data})=>{
        if (data.code == 1) {
          this.$message.error(data.msg)
        } else {
          this.$message.success('新增成功')
          this.$refs['mainDialog'].close()
          this.getList()
        }
      })
    },
    //详情
    handleDetail (row) {
      row.id = row.id.toString()
      this.dialogStatus = 'detail'
      this.$refs.mainDialog.openDialog(row)
    },
    //打开编辑
    handleUpdate (row) {
      this.dialogStatus = 'update'
      this.$refs.mainDialog.openDialog(row)
    },
    //保存编辑
    handleEditSubmit (formData) {
      updateUser(formData).then(({data})=>{
        if (data.code == 1) {
          this.$message.error(data.msg)
        } else {
          this.$message.success('编辑成功')
          this.$refs['mainDialog'].close()
          this.getList()
        }
      })
    },
    //删除
    handleDelete (id) {
      this.$confirm('确定要删除用户吗').then(() => {
        let item = []
        item.push(id)
        deleteUser({ids : item}).then((response) => {
          let res = response.data
          if (res.code === 0) {
            this.successNotify(this.DELETE)
            this.getList()
          }
        })
      }).catch(() => {})
    },
  },
}
</script>

<style scoped>

</style>
