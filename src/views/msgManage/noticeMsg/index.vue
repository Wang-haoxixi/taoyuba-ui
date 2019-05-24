<template>
  <!-- 我的消息 -->
  <gov-layout-main>
    <gov-layout-header>
      <!-- 搜索 -->
      <gov-search-bar
        @handleFilter="handleFilter"
        :listQuery="listQuery"
        :formProps="formProps"/>
    </gov-layout-header>
    <!-- 新增按钮 -->
    <gov-layout-button-group>
      <gov-button v-if="(formType > 1 ? true : false) && gov_notice_msg_add" type="add" @click="handleAdd"></gov-button>
    </gov-layout-button-group>
    <!-- 内容表格 -->
    <gov-layout-body>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我收到的" name="first"></el-tab-pane>
        <el-tab-pane label="我发送的" name="second"></el-tab-pane>
      </el-tabs>
       <avue-crud ref="crud"
          :page="pagination"
          :data="tableData"
          :table-loading="tableLoading"
          :option="tableOption"
          @current-change="currentChange"
          @refresh-change="refreshChange"
          @size-change="sizeChange"
          @row-update="handleUpdate"
          @row-save="handleSave"
          @row-del="rowDel">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <el-button @click="handleDetail(scope.row)" type="text" size="small">查看</el-button>
            <el-button v-if="(formType > 1 ? true : false) && gov_notice_msg_update" @click="handleUpdate(scope.row)" type="text" size="small">修改</el-button>
            <el-button v-if="(formType > 1 ? true : false) && gov_notice_msg_delete" @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <!-- 弹窗 -->
    <msg-dialog
      :status="dialogStatus"
      :type="formType"
      @closed="handleClosed"
      @createSubmit="handleCreateSubmit"
      @editSubmit="handleEditSubmit"
      ref="formDialog"/>
  </gov-layout-main>
</template>
<script>
import mixin from "@/mixins/mixin"
import { fetchList, sendMsg, getInfo, editMsg, deleteMsg } from '@/api/msgManage/noticeMsg'
import { tableReceiveOption, tableSendOption } from './const/index'
import { mapGetters } from 'vuex'
import { getDeptList } from "@/api/element/interface"
import msgDialog from './msgDialog'
export default {
  mixins: [mixin],
  components: {msgDialog},
  name: 'mymsg',
  data () {
    return {
      activeName: 'first',
      deptList: [],
      tableData: [],
      listQuery: {
        type: 1,
      },
      tableLoading: false,
      tableOption: tableReceiveOption,
      formType: 1,
      gov_notice_msg_add: false,
      gov_notice_msg_update: false,
      gov_notice_msg_delete: false,
    }
  },
  created () {
    this.getList()
    getDeptList().then(res=>{
      this.deptList = res.data
    })
    this.gov_notice_msg_add = this.permissions['gov_notice_msg_add']
    this.gov_notice_msg_update = this.permissions['gov_notice_msg_update']
    this.gov_notice_msg_delete = this.permissions['gov_notice_msg_delete']
  },
  mounted: function () { },
  computed: {
    // 查询字段
    formProps () {
      return [
        {
          label: "标题名称",
          prop: "title",
          type: "input",
          maxlength: 100,
        },
      ]
    },
    ...mapGetters(['permissions']),
  },
  methods: {
    getList () {
      this.tableLoading = true
      fetchList(this.listQuery).then(response => {
        this.tableData = response.data.records
        this.pagination.total = response.data.total
        this.tableLoading = false
      })
    },
    //查看
    handleDetail (row) {
      let queryData = {}
      queryData.id = row.id 
      queryData.type = this.listQuery.type
      this.formType = this.listQuery.type
      getInfo(queryData).then(response => {
        row.content = response.data.data.content
        this.dialogStatus = 'detail'
        this.$refs.formDialog.openDialog({...row})
      })
    },
    //新增
    handleAdd () {
      this.dialogStatus = "create"
      this.$refs.formDialog.openDialog()
    },
    //修改
    handleUpdate (row) {
      this.dialogStatus = 'update'
      this.$refs.formDialog.openDialog({...row})
    },
    //删除
    handleDelete (id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteMsg(id).then(()=>{
          this.$message.success('删除成功')
          this.getList()
        })
      }).catch(()=>{})
    },
    handleCreateSubmit (formData) {
      formData.acceptDeptIds = formData.acceptDeptIdsItem.toString()
      sendMsg(formData).then(()=>{
        this.$message.success('新增成功')
        this.$refs['formDialog'].close()
        this.getList()
      })
    },
    handleEditSubmit (formData) {
      formData.acceptDeptIds = formData.acceptDeptIdsItem.toString()
      editMsg(formData).then(()=>{
        this.$message.success('编辑成功')
        this.$refs['formDialog'].close()
        this.getList()
      })
    },
    handleClosed () {
      this.refreshChange()  
    },
    //切换tab
    handleClick (tab) {
      if (tab.index === "0") {
        this.tableOption = tableReceiveOption
      } else {
        this.tableOption = tableSendOption
      }
      this.formType = Number(tab.index)+1
      this.listQuery.type = Number(tab.index)+1
      this.getList()
    },
    /**
     * 刷新回调
     */
    refreshChange () {
      this.getList()
    },
  },
}
</script>

<style lang="scss" scoped>
</style>

