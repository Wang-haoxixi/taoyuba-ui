<template>
  <div>
    <gov-layout-main>
      <avue-crud ref="crud" :page="page" :data="records" :table-loading="tableLoading" :option="tableOption" @current-change="currentChange" @refresh-change="refreshChange" @size-change="sizeChange" @search-change="searchChange" @row-update="handleUpdate" @row-save="handleSave" @row-del="rowDel">
        <template slot-scope="scope" slot="menu">
          <el-button type="primary" v-if="permissions.sys_client_edit" icon="el-icon-check" size="small" plain @click="handleEdit(scope.row, scope.index);">编辑</el-button>
          <el-button type="danger" v-if="permissions.sys_client_del" icon="el-icon-delete" size="small" plain @click="handleDel(scope.row, scope.index);">删除</el-button>
        </template>
      </avue-crud>
    </gov-layout-main>
  </div>
</template>

<script>
import { fetchList, delObj, putObj, addObj } from '@/api/umps/relation'
import { tableOption } from '@/const/crud/relation'
import { mapGetters } from 'vuex'
export default {
  name: 'client',
  data () {
    return {
      records: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
      },
      listQuery: {
        page: 1,
        limit: 20,
        number: undefined,
        name: undefined,
      },
      tableLoading: false,
      tableOption: tableOption,
    }
  },
  created () {
    this.getList()
  },
  computed: {
    ...mapGetters(['permissions']),
  },
  methods: {
    getList () {
      this.tableLoading = true
      fetchList(this.listQuery).then(response => {
        this.records = response.data.records
        this.page.total = response.data.total
        this.tableLoading = false
      })
    },
    currentChange (val) {
      this.page.currentPage = val
      this.listQuery.page = val
      this.getList()
    },
    sizeChange (val) {
      this.page.pageSize = val
      this.listQuery.limit = val
      this.getList()
    },
    /**
     * @title 打开新增窗口
     * @detail 调用crud的handleadd方法即可
     *
     **/
    handleAdd () {
      this.$refs.crud.rowAdd()
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSave (row, done) {
      addObj(row).then(() => {
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success',
        })
        this.refreshChange()
        done()
      })
    },
    handleEdit (row, index) {
      this.$refs.crud.rowEdit(row, index)
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate (row, index, done) {
      putObj(row).then(() => {
        this.records.splice(index, 1, Object.assign({}, row))
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success',
        })
        this.refreshChange()
        done()
      })
    },
    handleDel (row, index) {
      this.$refs.crud.rowDel(row, index)
    },
    rowDel (row) {
      this.$confirm('是否确认删除 number 为' + row.number, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          return delObj(row.id)
        })
        .then(() => {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success',
          })
          this.refreshChange()
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 刷新回调
     */
    refreshChange () {
      this.getList()
    },
    searchChange (form) {
      this.listQuery = { ...this.listQuery, ...form }
      this.getList()
    },
  },
}
</script>

<style lang="scss" scoped></style>
