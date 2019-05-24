<template>
  <gov-layout-main>
    <!-- 头部搜索框 -->
    <gov-layout-header>
      <gov-search-bar
        @handleFilter="handleFilter"
        :listQuery="listQuery"
        :formProps="formProps"/>
      <gov-layout-button-group>
        <gov-button type="primary" @click="handleAddModel" v-if="dnaProjectTeamAdd">新增</gov-button>
      </gov-layout-button-group>  
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        :data="projectTeamData"
        :option="projectTeamTableOption"
        :page="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        @selection-change="selectionChange"
        @refresh-change="getList">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <el-button @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
            <el-button @click="handleUpdate(scope.row)" type="text" size="small" v-if="dnaProjectTeamUpdate">修改</el-button>
            <el-button @click="handleDelete(scope.row.id)" type="text" size="small" v-if="dnaProjectTeamDelete">删除</el-button>
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
import { projectTeamTableOption } from './const/index'
import MainDialog from './mainDialog'
import { getProjectTeamPage, createTeam, updateTeam, deleteTeam } from '@/api/projectManagement/projectTeam'
import { mapGetters } from 'vuex'
export default {
  name: 'projectTeam',
  mixins: [mixin],
  components: { MainDialog },
  data () {
    return {
      dnaProjectTeamAdd: false,
      dnaProjectTeamUpdate: false,
      dnaProjectTeamDelete: false,
    }
  },
  computed: {
    // 查询字段
    formProps () {
      return [
        {
          label: "团队名称",
          prop: "teamName",
        },
      ]
    },
    projectTeamTableOption () {
      return projectTeamTableOption
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.getList()
    this.dnaProjectTeamAdd = this.permissions['dna_project_team_add']
    this.dnaProjectTeamUpdate = this.permissions['dna_project_team_update']
    this.dnaProjectTeamDelete = this.permissions['dna_project_team_delete']
  },
  methods: {
    //列表
    getList () {
      this.tableLoading = true
      getProjectTeamPage(this.listQuery).then(({data})=>{
        this.projectTeamData = data.data.records
        this.pagination.total = data.data.total
        this.tableLoading = false
      })
    },
    //打开新增弹窗
    handleAddModel () {
      this.dialogStatus = 'create'
      this.$refs.mainDialog.openDialog()
    },
    //新增
    handleCreateSubmit (formData) {
      createTeam(formData).then(()=>{
        this.$message.success('新增成功')
        this.$refs['mainDialog'].close()
        this.getList()
      })
    },
    //查看
    handleDetail (row) {
      this.dialogStatus = 'detail'
      this.$refs.mainDialog.openDialog(row)
    },
    //打开编辑弹窗
    handleUpdate (row) {
      this.dialogStatus = 'update'
      this.$refs.mainDialog.openDialog(row)
    },
    //修改
    handleEditSubmit (formData) {
      updateTeam(formData).then(()=>{
        this.$message.success('编辑成功')
        this.$refs['mainDialog'].close()
        this.getList()
      })
    },
    //删除
    handleDelete (id) {
      this.$confirm('确定要删除团队吗').then(() => {
        let item = []
        item.push(id)
        deleteTeam({ids : item}).then((response) => {
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
