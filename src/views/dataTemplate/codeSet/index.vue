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
            <gov-button @click="handleUpdate(scope.row)" type="text">编辑</gov-button>
            <gov-button @click="handleDelete(scope.row)" type="text">删除</gov-button>
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
// import {searchOption, tableOption} from './const/index'
// import {getStandard} from '@/api/dataTemplate/standardFile'
import currentMixin from './const/mixin'
import {deleteBatch, getPage} from '@/api/dataTemplate/codeSet'
export default {
  components: { mainDialog },
  mixins: [mixin, currentMixin],
  data () {
    return {
      listQuery: {
        cdCollNm: undefined,
        stdDocId: undefined,
      },
    }
  },
  created () {
    this.initApi()
  },
  methods: {
    initApi () {
      this.getList()
      // this.getStandardData()
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
    // 引用标准
    // getStandardData () {
    //   getStandard().then(({data}) => {
    //     this.$set(this.searchOption[1], 'data', data.data)
    //     this.$set(this.tableOption.column[1], 'dicData', data.data)
    //     this.$set(column[2], 'dicData', data.data)
    //   })
    // },
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
    // 提交成功后
    successForm (msg) {
      msg && this.$message.success(msg)
      this.getList()
    },
  },
}
</script>
