<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="handleFilter">
      </gov-search-bar>
      <gov-layout-button-group>
        <gov-button type="add" @click="handleCreate"></gov-button>
        <gov-button type="queryDelete" @click="handleDeleteQuery" />
      </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        @selection-change="selectionChange"
        :option="tableOption"
        :data="tableList"
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :page="pagination">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button @click="handleDetail(scope.row)" type="text">详情</gov-button>
            <gov-button @click="handleCancel(scope.row)" type="text" v-if="scope.row.state === btnStatus.release">注销</gov-button>
            <gov-button @click="handleRelease(scope.row)" type="text" v-if="scope.row.state === btnStatus.noRelease">发布</gov-button>
            <gov-button @click="handleReduction(scope.row)" type="text" v-if="scope.row.state === btnStatus.cancellation">还原</gov-button>
            <gov-button @click="handleUpdate(scope.row)" type="text" v-if="scope.row.state === btnStatus.noRelease || scope.row.state === btnStatus.cancellation">编辑</gov-button>
            <gov-button @click="handleDelete(scope.row)" type="text" v-if="scope.row.state === btnStatus.noRelease || scope.row.state === btnStatus.cancellation">删除</gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <main-dialog
      @successForm="successForm"
      ref="mainDialog"
      :temp="formData"
      :status="dialogStatus">
    </main-dialog>
  </gov-layout-main>
</template>
<script>
import mainDialog from './mainDialog'
import mixin from '@/mixins/mixin'
import currentMixin from './const/mixin'
import {getPage, deleteBatch, changeState} from '@/api/dataTemplate/standardFile'
export default {
  mixins: [mixin, currentMixin],
  components: { mainDialog },
  data () {
    return {
      listQuery: {
        stdDocNm: undefined,
        stdDocPrvd: undefined,
      },
      btnStatus: {
        release: '1', // 已发布
        noRelease: '2', // 未发布
        cancellation: '3', // 已注销
      },
    }
  },
  created () {
    this.initApi()
  },
  methods: {
    initApi () {
      this.getList()
      // this.getFieldClassify()
    },
    getList () {
      this.tableLoading = true
      getPage(this.listQuery).then(({data}) => {
        if (data.code === 0) {
          this.tableList = data.data.records
          this.pagination.total = data.data.total
        }
        this.tableLoading = false
      })
    },
    // 新增
    handleCreate () {
      this.dialogStatus = this.dialog.textName.create
      this.formData = Object.assign({}, {})
      this.$refs['mainDialog'].open()
    },
    // 查看
    handleDetail (row) {
      this.dialogStatus = this.dialog.textName.detail
      this.formData = Object.assign({}, row)
      this.$refs['mainDialog'].open()
    },
    // 修改
    handleUpdate (row) {
      this.dialogStatus = this.dialog.textName.update
      this.formData = Object.assign({}, row)
      this.$refs['mainDialog'].open()
    },
    // 删除
    handleDelete (row) {
      this._delete([row.id])
    },
    // 批量删除
    handleDeleteQuery () {
      if (this.queryData.length === 0) {
        this.$message.error('请至少选择一条数据')
      } else {
        this._delete(this.queryData)
      }
    },
    // 删除
    _delete (row) {
      this.$confirm(this.IS_DELETE).then(() => {
        deleteBatch({ids: row}).then(() => {
          this.queryData = []
          this.$message.success('删除成功！')
          this.getList()
        })
      }).catch(() => {})
    },
    // 注销
    handleCancel (row) {
      let data = {id: row.id, state: this.btnStatus.cancellation}
      this.handleChangeState({data, msg: '确定要注销吗', cbmsg: '注销成功'})
    },
    // 发布
    handleRelease (row) {
      let data = {id: row.id, state: this.btnStatus.release}
      this.handleChangeState({data, msg: '确定要发布吗', cbmsg: '发布成功'})
    },
    // 还原
    handleReduction (row) {
      let data = {id: row.id, state: this.btnStatus.release}
      this.handleChangeState({data, msg: '确定要还原吗', cbmsg: '还原成功'})
    },
    // 列表多选
    selectionChange (val) {
      this.queryData = val.map((item) => {
        return item.id
      })
    },
    // 改变状态
    handleChangeState ({data, msg = '', cbmsg}) {
      this.$confirm(msg).then(() => {
        changeState(data).then(() => {
          cbmsg && this.$message.success(cbmsg)
          this.getList()
        })
      })
    },
    // 提交成功后
    successForm (msg) {
      msg && this.$message.success(msg)
      this.getList()
    },
  },
}
</script>
