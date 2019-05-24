<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        @handleFilter="handleFilter"
        :listQuery="listQuery"
        :formProps="formProps"/>
      <gov-layout-button-group>
        <gov-button v-if="model_design_add" type="primary" @click="handleAddModel">模型表模板新增</gov-button>
        <gov-button v-if="model_design_add" type="primary" @click="handleAddStandard">模型表标准新增</gov-button>
        <!-- <gov-button type="primary" @click="handleRelationSetting">表关系设置</gov-button> -->
        <gov-button v-if="model_design_export" type="export" @click="handleExport"></gov-button>
      </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        :data="mainTableData"
        :option="mainTableOption"
        :page="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        @selection-change="selectionChange"
        @refresh-change="getList">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <el-button @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
            <el-button v-if="model_design_update" @click="handleUpdate(scope.row)" type="text" size="small">修改</el-button>
            <el-button v-if="model_design_delete" @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
            <el-button v-if="model_design_getsql" @click="handleViewSQL(scope.row.id)" type="text" size="small">查看SQL</el-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <modelDialog ref="modelDialog" :status="modelDialogStatus" @submit="modelDialogSubmit"></modelDialog>
    <modelSheetDialog ref="modelSheetDialog" :status="modelSheetDialogStatus" @submit="modelSheetDialogSubmit" @update="modelSheetDialogUpdate"></modelSheetDialog>
  </gov-layout-main>
</template>

<script>
import mixin from "@/mixins/mixin"
import constMixin from "./const/mixin"
import { mainTableOption } from "./const/index"
import {
  getMainTableData,
  saveTableField,
  updateTableField,
  getDbList,
  deleteTableField,
  querySql,
  exportExcel,
} from '@/api/dataModel/modelDesign'

import modelDialog from './modelDialog'
import modelSheetDialog from './modelSheetDialog.vue'
import { mapGetters } from 'vuex'

export default {
  mixins: [mixin, constMixin],
  components: { modelDialog, modelSheetDialog },
  data () {
    return {
      mainTableData: [],
      modelDialogStatus: 'detail',
      modelSheetDialogStatus: 'detail',
      dbList: [],
      tableIds: [],
      model_design_add: false,
      model_design_update: false,
      model_design_delete: false,
      model_design_getsql: false,
      model_design_export: false,
    }
  },
  computed: {
    mainTableOption () {
      return mainTableOption
    },
     ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.getList()
    getDbList().then(({data})=>{
      let dbListMap = []
      for (let item in data.data) {
        dbListMap.push({
          value: item,
          label: data.data[item],
        })
      }
      this.dbList = dbListMap
    })
    this.model_design_add = this.permissions['model_design_add']
    this.model_design_update = this.permissions['model_design_update']
    this.model_design_delete = this.permissions['model_design_delete']
    this.model_design_getsql = this.permissions['model_design_getsql']
    this.model_design_export = this.permissions['model_design_export']
  },
  methods: {
    getList () {
      this.tableLoading = true
      getMainTableData(this.listQuery).then(({data})=>{
        this.mainTableData = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      })
    },
    // 模型表模板新增
    handleAddModel () {
      this.modelDialogStatus = 'create'
      this.$nextTick(()=>{
        this.$refs["modelDialog"].open()
      })
    },
    // 模型表标准新增
    handleAddStandard () {
      this.modelSheetDialogStatus = 'create'
      this.$refs['modelSheetDialog'].open({})
    },
    // 表关系设置
    handleRelationSetting () {
      
    },
    // 导出
    handleExport () {
      this.$confirm("是否导出模型设计？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let data = {
          tableIds: this.tableIds,
          dbId: this.listQuery.dbId,
          tableCn: this.listQuery.tableCn,
          page: this.listQuery.page,
          limit: this.listQuery.limit,
        }
        exportExcel(data).then(()=>{
          this.$message.info('正在导出数据...')
        })
      }).catch(() => {})

    },
    // 查看详情
    handleDetail (formData) {
      this.modelSheetDialogStatus = 'detail'
      this.$refs['modelSheetDialog'].open({...formData})
    },
    // 编辑数据
    handleUpdate (formData) {
      this.modelSheetDialogStatus = 'update'
      this.$refs['modelSheetDialog'].open({...formData})
    },
    // 删除
    handleDelete (id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteTableField(id).then(()=>{
          this.$message.success('删除成功！')
          this.getList()
        })
      }).catch(()=>{})
    },
    // 查看SQL
    handleViewSQL (id) {
      querySql(id).then(({data})=>{
        this.$alert(data.data, '查看SQL', {
          dangerouslyUseHTMLString: true,
        })
      })
    },
    // 模型表模板新增 提交
    modelDialogSubmit (formData) {
      this.modelSheetDialogStatus = 'create'
      this.$refs['modelDialog'].close()
      this.$refs['modelSheetDialog'].open(formData)
    },
    modelSheetDialogSubmit (formData) {
      saveTableField(formData).then((data)=>{
        if (data.data.code === 1) {
          this.$message.error(data.data.msg)
        } else {
          this.$message.success('新增成功')
          this.getList()
          this.$refs['modelSheetDialog'].close()
        }
        
      })
    },
    modelSheetDialogUpdate (formData) {
      updateTableField(formData).then((data)=>{
        if (data.data.code === 1) {
          this.$message.error(data.data.msg)
        } else {
          this.$message.success('修改成功')
          this.getList()
          this.$refs['modelSheetDialog'].close()
        }
      })
    },
    // 选中项
    selectionChange (list) {
      this.tableIds = list.map(item=>{
        return item.id
      })
    },
  },
}
</script>
