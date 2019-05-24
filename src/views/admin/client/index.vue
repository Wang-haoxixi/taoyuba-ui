<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-layout-button-group>
        <gov-button type="add" permission="sys_client_add" @click="handleAdd"></gov-button>
      </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud ref="crud"
        :page="pagination"
        :data="records"
        :table-loading="tableLoading"
        :option="tableOption"
        @current-change="currentChange"
        @size-change="sizeChange">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button type="text" permission="sys_client_edit" @click="handleEdit(scope.row, scope.index)">编辑</gov-button>
            <gov-button type="text" permission="sys_client_del" @click="handleDel(scope.row, scope.index)">删除</gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <main-dialog
      ref="mainDialog"
      :formData="formData"
      @closed="mainDialogClosed"
      @okClosed = "submitClose">
    </main-dialog>
  </gov-layout-main>
</template>

<script>
import { fetchList, addObj, putObj } from '@/api/umps/client'
import { deleteClient } from '@/api/admin/client'
import mainDialog from './mainDialog'
import { tableOption } from '@/const/crud/client'
import allMixin from '@/mixins/mixin'

export default {
  name: 'client',
  mixins: [allMixin],
  components: {
    mainDialog,
  },
  data () {
    return {
      records: [],
      tableLoading: false,
      tableOption: tableOption,
      formData: {},
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.tableLoading = true
      fetchList(this.listQuery).then(response => {
        this.records = response.data.records
        this.pagination.total = response.data.total
        this.tableLoading = false
      })
    },
    // 新增
    handleAdd: function () {
      this.$refs['mainDialog'].open()
    },
    // 编辑
    handleEdit (row) {
      this.formData = {...row}
      this.$nextTick(()=>{
        this.$refs['mainDialog'].open()
      })
    },
    // 删除
    handleDel (row) {
      this.$confirm('是否确认删除此数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteClient(row.clientId).then(()=>{
          this.$message.success('删除成功！')
          this.getList()
        })
      })
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate: function (row, index, done) {
      putObj(row).then(() => {
        this.records.splice(index, 1, Object.assign({}, row))
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success',
        })
        done()
      })
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSave: function (row, done) {
      addObj(row).then(() => {
        this.records.push(Object.assign({}, row))
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success',
        })
        done()
      })
    },
    mainDialogClosed () {
      this.formData = {}
    },
    // 提交关闭弹窗
    submitClose (){
      this.getList()
    },
  },
}
</script>

<style lang="scss" scoped></style>
