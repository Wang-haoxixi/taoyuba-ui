<template>
  <gov-layout-main>
    <gov-layout-header>
       <gov-search-bar
        @handleFilter="handleFilter"
        :listQuery="listQuery"
        :formProps="formProps"/>
        <gov-layout-button-group>
          <gov-button type="primary" @click="handleAddModel" v-if="dnaProjectConfigAdd">新增</gov-button>
        </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        :data="projectConfigData"
        :option="projectConfigTableOption"
        :page="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        @selection-change="selectionChange"
        @refresh-change="getList">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <el-button @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
            <el-button @click="handleUpdate(scope.row)" type="text" size="small" v-if="dnaProjectConfigUpdate">修改</el-button>
            <el-button @click="handleDelete(scope.row.id)" type="text" size="small" v-if="dnaProjectConfigDelete">删除</el-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <!-- 弹窗 -->
    <project-config-dialog
      :status="dialogStatus"
      @closed="handleClosed"
      @createSubmit="handleCreateSubmit"
      @editSubmit="handleEditSubmit"
      ref="formDialog"/> 
  </gov-layout-main>      
</template>
<script>
import { getDic } from '@/util/dic'
import mixin from "@/mixins/mixin"
import { getProjectConfigPage, createConfig, deleteConfig, updateConfig } from '@/api/projectManagement/projectConfig'
import { projectConfigTableOption } from './const/index'
import projectConfigDialog from './projectConfigDialog'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixin],
  components: {projectConfigDialog},
  data () {
    return {
      dnaProjectConfigAdd: false,
      dnaProjectConfigUpdate: false,
      dnaProjectConfigDelete: false,
    }
  },
  created () {
    this.getList()
    this.dnaProjectConfigAdd = this.permissions['dna_project_config_add']
    this.dnaProjectConfigUpdate = this.permissions['dna_project_config_update']
    this.dnaProjectConfigDelete = this.permissions['dna_project_config_delete']
  },
  computed: {
    // 查询字段
    formProps () {
      return [
        {
          label: "模块",
          prop: "module_type",
          type: "select",
          data: getDic('PROJECT_MODULE_TYPE'),
        },
      ]
    },
    projectConfigTableOption () {
      return projectConfigTableOption
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  methods: {
    //列表
    getList () {
      this.tableLoading = true
      getProjectConfigPage(this.listQuery).then(({data})=>{
        this.projectConfigData = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      })
    },
    //新增
    handleAddModel () {
      this.dialogStatus = "create"
      this.$refs.formDialog.openDialog()
    },
    handleCreateSubmit (formData) {
      createConfig(formData).then(()=>{
        this.$message.success('新增成功')
        this.$refs['formDialog'].close()
        this.getList()
      })
    },
    //删除
    handleDelete (id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteConfig(id).then(()=>{
          this.$message.success('删除成功')
          this.getList()
        })
      }).catch(()=>{})
    },
    // 查看弹窗
    handleDetail (row) {
      this.dialogStatus = 'detail'
      this.$refs.formDialog.openDialog({...row})
    },
    // 修改弹窗
    handleUpdate (row) {
      this.dialogStatus = 'update'
      this.$refs.formDialog.openDialog({...row})
    },
    //修改
    handleEditSubmit (formData) {
      updateConfig(formData).then(()=>{
        this.$message.success('编辑成功')
        this.$refs['formDialog'].close()
        this.getList()
      })
    },
    handleClosed () {

    },
  },
}
</script>

<style>

</style>
