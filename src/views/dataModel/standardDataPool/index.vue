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
    </gov-layout-header>
    <!-- 内容表格 -->
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        :data="tableList"
        :option="standardDataOption"
        :page="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        @refresh-change="getList"
        @selection-change="selectionChange" >
        <!-- 表格插槽按钮 -->
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <el-button @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
            <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <!-- 弹窗 -->
    <standard-data-pool-dialog 
      :exportApi="handleExportApi"
      :formData="formData"
      :status="dialogStatus"
      :informationList="informationList"
      @getList="getList"
      @closed="handleClosed"
      ref="formDialog"/>
  </gov-layout-main>    
</template>

<script>
import mixin from "@/mixins/mixin"
import { getPage, logicDelete} from "@/api/dataModel/standardDataPool"
import { standardDataOption } from "./const/index"
import standardDataPoolDialog from "./standardDataPoolDialog"
import { mapGetters } from 'vuex'
export default {
  mixins: [mixin],
  components: {standardDataPoolDialog},
  data () {
    return {
      informationList:[],
      changeList: [], 
      standardDataOption: standardDataOption,
    }
  },
  computed: {
    // 查询字段
    formProps () {
      return [
        { 
          label: "中文名称", 
          prop: "dataCn", 
          type: "input",
          maxlength: 100,
        },
      ]
    }, 
     ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.getList()
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
  },  
}
</script>