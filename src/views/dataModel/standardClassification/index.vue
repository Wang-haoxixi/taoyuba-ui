<template>
  <!-- 标准分类 -->
  <gov-layout-main>
    <!-- 头部按钮组 -->
    <gov-layout-header>
      <!-- 搜索 -->
      <gov-search-bar
        @handleFilter="handleFilter"
        :listQuery="listQuery"
        :formProps="formProps"/>
      <!-- 新增、导入、导出按钮 -->
      <gov-layout-button-group>
        <gov-button v-if="model_classification_add" type="add" @click="handleAdd" plain="true"></gov-button>
        <gov-button v-if="model_classification_batchdel" type="default" @click="handleDeleteAll">批量删除</gov-button>
      </gov-layout-button-group>    
    </gov-layout-header>
    <!-- 内容表格 -->
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        :data="tableList"
        :option="classification"
        :page="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        @refresh-change="getList"
        @selection-change="selectionChange" >
        <!-- 表格插槽按钮 -->
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <el-button @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
            <el-button v-if="model_classification_update" @click="handleUpdate(scope.row)" type="text" size="small">修改</el-button>
            <el-button v-if="model_classification_delete" @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <!-- 弹窗 -->
    <classification-dialog 
      :exportApi="handleExportApi"
      :formData="formData"
      :status="dialogStatus"
      :informationList="informationList"
      @getList="getList"
      @closed="handleClosed"
      @submit="handleSubmit"
      ref="formDialog"/>
  </gov-layout-main>    
</template>

<script>
import mixin from "@/mixins/mixin"
import { getPage, addClassification, updateClassification, logicDelete, batchLogicDelete } from "@/api/dataModel/standardClassification"
import classificationDialog from "./classificationDialog"
import { mapGetters } from 'vuex'
export default {
  mixins: [mixin],
  components: {classificationDialog},
  data () {
    return {
      informationList:[],
      changeList: [], 
      model_classification_add: false,
      model_classification_update: false,
      model_classification_delete: false,
      model_classification_batchdel: false,
    }
  },
  computed: {
    // 查询字段
    formProps () {
      return [
        { 
          label: "分类名称", 
          prop: "classificationName", 
          type: "input",
          maxlength: 100,
        },
      ]
    }, 
    classification () {
      return {
        selection: true,
        header: false,
        page: true,
        index: true,
        menu: false,
        column: [
          {
            label: "分类名称",
            prop: "classificationName",
          },
          {
            label: "数量",
            prop: "dataEleCount",
          },
          {
            label: "操作",
            prop: "menu",
            width: 150,
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
      this.model_classification_add = this.permissions['model_classification_add']
      this.model_classification_update = this.permissions['model_classification_update']
      this.model_classification_delete = this.permissions['model_classification_delete']
      this.model_classification_batchdel = this.permissions['model_classification_batchdel']
  },
  methods : {
    selectionChange (list) {
      this.changeList = list
    },
    // 获取列表
    getList () {
      this.tableLoading = true
      getPage(this.listQuery).then(({ data }) => {
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
    //新增or修改
    handleSubmit (form) {
      if (this.dialogStatus === 'create') {
        addClassification(form).then((result)=>{
          if (result.data.code === 1) {
            this.$message.error(result.data.msg)
          } else {
            this.$message.success('新增成功')
            this.$refs['formDialog'].closeDialog()
            this.getList()
          }
        })
      } else if (this.dialogStatus === 'update') {
        updateClassification(form).then((result)=>{
          if (result.data.code === 1) {
            this.$message.error(result.data.msg)
          } else {
            this.$message.success('修改成功')
            this.$refs['formDialog'].closeDialog()
            this.getList()
          }
        })
      }
    },
    //逻辑删除
    handleDelete (id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        logicDelete(id).then(()=>{
          this.$message.success('删除成功！')
          this.getList()
        })
      }).catch(()=>{})
    },
    //批量逻辑删除
    handleDeleteAll () {
      if (this.changeList.length === 0) {
        this.$message.error('请至少选择一条数据')
      } else {
         this.$confirm('确定要删除吗').then(() => {
          let ids = []
          this.changeList.forEach(item=>{
            ids.push(item.id)
          })
          batchLogicDelete(ids).then(()=>{
            this.getList()
            this.$message.success('批量删除成功')
          })
        }).catch(() => {})
      }
    },
  },  
}
</script>