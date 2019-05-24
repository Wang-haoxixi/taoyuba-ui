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
      <gov-button type="add" @click="handleAdd"></gov-button>
    </gov-layout-button-group>
    <!-- 内容表格 -->
    <gov-layout-body>
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
import { fetchList, sendMsg, getInfo } from '@/api/msgManage/myMsg'
import { tableOption } from './const/index'
import { mapGetters } from 'vuex'
import { getDeptList } from "@/api/element/interface"
import msgDialog from './msgDialog'
export default {
  mixins: [mixin],
  components: {msgDialog},
  name: 'mymsg',
  data () {
    return {
      deptList: [],
      tableData: [],
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
          label: "部门名称",
          prop: "acceptDeptIds",
          props: {
            label: 'name',
            value: 'id',
          },
          type: "select",
          data: this.deptList,
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
      msgData.acceptDeptIds = formData.acceptDeptIdsItem.toString()
      msgData.phone = formData.phone
      msgData.govContent = formData
      sendMsg(msgData).then(()=>{
        this.$message.success('新增成功')
        this.$refs['formDialog'].close()
        this.getList()
      })
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

