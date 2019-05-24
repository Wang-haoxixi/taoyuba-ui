<template>
  <!-- 系统消息-->
  <gov-layout-main>
    <gov-layout-header>
      <!-- 搜索 -->
      <gov-search-bar
        @handleFilter="handleFilter"
        :listQuery="listQuery"
        :formProps="formProps"/>
    </gov-layout-header>
    <!-- 内容表格 -->
    <gov-layout-body>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="信息系统" name="first"></el-tab-pane>
        <el-tab-pane label="数据目录" name="second"></el-tab-pane>
        <el-tab-pane label="事项目录" name="third"></el-tab-pane>
        <el-tab-pane label="供需对接" name="fourth"></el-tab-pane>
      </el-tabs>
      <avue-crud
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
            </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <!-- 弹窗 -->
    <msg-dialog
      :status="dialogStatus"
      @closed="handleClosed"
      @createSubmit="handleCreateSubmit"
      @editSubmit="handleEditSubmit"
      ref="formDialog"/>
  </gov-layout-main>
</template>
<script>
import mixin from "@/mixins/mixin"
import { fetchList, getInfo} from '@/api/msgManage/sysMsg'
import { tableOption } from './const/index'
import { mapGetters } from 'vuex'
import { getDeptList } from "@/api/element/interface"
import { getDic } from '@/util/dic'
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
        msgType: 1,
      },
      tableLoading: false,
      tableOption: tableOption,
    }
  },
  created () {
    this.getList()
    getDeptList().then(res=>{
      this.deptList = res.data
    })
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
        }, {
          label: "状态",
          prop: "status",
          type: "select",
          data: getDic('READ_STATUS'),
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
    handleDetail (row) {
      getInfo(row.id).then(response => {
        row.content = response.data.data.content
        this.dialogStatus = 'detail'
        this.$refs.formDialog.openDialog({...row})
      })
    },
    handleAdd () {
      this.dialogStatus = "create"
      this.$refs.formDialog.openDialog()
    },
    handleCreateSubmit (formData) {
      var msgData = {}
      msgData.acceptDeptIdsItem = formData.acceptDeptIdsItem
      msgData.phone = formData.phone
      msgData.govContent = formData
      // sendMsg(msgData).then(()=>{
      //   this.$message.success('新增成功')
      //   this.$refs['formDialog'].close()
      //   this.getList()
      // })
    },
    handleClick (tab) {
      this.listQuery.msgType = Number(tab.index)+1
      this.getList()
    },
    handleClosed () {
      this.refreshChange()
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

