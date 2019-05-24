<template>
  <!-- 模型建库 -->
  <gov-layout-main>
    <!-- 头部按钮组 -->  
    <gov-layout-header>
      <!-- 搜索 -->
      <gov-search-bar
        @handleFilter="handleFilter"
        :listQuery="listQuery"
        :formProps="formProps"/>
      <!-- 新增按钮 -->
      <gov-layout-button-group>
        <gov-button v-if="model_build_add" type="add" @click="handleAdd"></gov-button>
      </gov-layout-button-group>      
    </gov-layout-header>
     <!-- 内容表格 -->
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        :data="tableList"
        :option="modelDb"
        :page="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        @refresh-change="getList">
        <!-- 表格插槽按钮 -->
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <el-button @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
            <el-button v-if="model_build_update" @click="handleUpdate(scope.row)" type="text" size="small">修改</el-button>
            <el-button v-if="model_build_delete" @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <!-- 弹窗 -->
    <modelBuilding-dialog 
      :status="dialogStatus"
      @closed="handleClosed"
      @createSubmit="handleCreateSubmit"
      @editSubmit="handleEditSubmit"
      ref="formDialog"/>    
  </gov-layout-main>    
</template>
<script>
import mixin from "@/mixins/mixin"
import { getDic } from '@/util/dic'
import { getDbPage, modelEditSave, modelCreateSave, modelDbDelete } from "@/api/dataModel/modelBuilding"
import modelBuildingDialog from "./modelBuildingDialog"
import { mapGetters } from 'vuex'
export default {
  mixins: [mixin],
  components: {modelBuildingDialog},
  data () {
    return {
      model_build_add: false,
      model_build_update: false,
      model_build_delete: false,
    }
  },
  computed: {
    // 查询字段
    formProps () {
      return [
        { 
          label: "模型库中文名称", 
          prop: "dbCn", 
          type: "input",
          maxlength: 100,
        },
      ]
    },
    modelDb () {
      return {
        header: false,
        page: true,
        index: true,
        menu: false,
        column: [
          {
            label: "库中文名",
            prop: "dbCn",
          },
          {
            label: "库英文名",
            prop: "dbEn",
          },
          {
            label: "库类型",
            type: 'select',
            dicData: getDic('DATABASE_FORMAT'),
            prop: "dbType",
          },
          {
            label: "操作",
            prop: "menu",
            width: 200,
            solt: true,
            align: 'center',
          },
        ],
      }
    }, 
     ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.getList()
    this.model_build_add = this.permissions['model_build_add']
    this.model_build_update = this.permissions['model_build_update']
    this.model_build_delete = this.permissions['model_build_delete']
  },
  methods: {
    // 获取列表
    getList () {
      this.tableLoading = true
      getDbPage(this.listQuery).then(({ data }) => {
        this.tableList = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      })
    },
     // 查看方法
    handleDetail (row) {
      this.dialogStatus = 'detail'
      this.$refs.formDialog.openDialog({...row})
    },
    // 修改方法
    handleUpdate (row) {
      this.dialogStatus = 'update'
      this.$refs.formDialog.openDialog({...row})
    },
    // 新增方法
    handleAdd () {
      this.dialogStatus = "create"
      this.$refs.formDialog.openDialog()
    },
    handleCreateSubmit (formData) {
      modelCreateSave(formData).then(()=>{
        this.$message.success('新增成功')
        this.$refs['formDialog'].close()
        this.getList()
      })
    },
    handleEditSubmit (formData) {
      modelEditSave(formData).then(()=>{
        this.$message.success('编辑成功')
        this.$refs['formDialog'].close()
        this.getList()
      })
    },
    handleDelete (id) {
      this.$confirm("此操作将永久删除（并且会删除改库下的表）, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        modelDbDelete (id).then(()=>{
          this.$message.success('删除成功')
          this.getList()
        })
      }).catch(()=>{})
    },
  },
}
</script>

