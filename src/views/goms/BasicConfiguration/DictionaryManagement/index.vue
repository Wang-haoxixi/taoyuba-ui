<template>
  <div class="execution">
    <basic-container>
      <avue-crud ref="crud" :page="page" :data="tableData" :table-loading="tableLoading" :option="tableOption" @on-load="getList" @row-update="handleUpdate" @row-save="handleSave" @search-change="searchChange" @refresh-change="refreshChange" @row-del="rowDel">
        <template slot-scope="scope" slot="menu">
          <el-button type="text" icon="el-icon-plus" size="mini" @click="handleChild(scope.row, scope.index)">子项
          </el-button>
          <el-button type="text" v-if="permissions.sys_dict_edit" icon="el-icon-check" size="mini" @click="handleEdit(scope.row, scope.index)">编辑
          </el-button>
          <el-button type="text" v-if="permissions.sys_dict_del" icon="el-icon-delete" size="mini" @click="handleDel(scope.row, scope.index)">删除
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog title="字典子项" :visible.sync="dialogDictChildVisible" width="70%" append-to-body>
      <dict-child v-if="dialogDictChildVisible" :current-id="currentId"></dict-child>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDictChildVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addObj, delObj, fetchList, putObj } from '@/api/admin/dict'
import { tableOption } from '@/const/crud/admin/dict'
import { mapGetters } from 'vuex'
import dictChild from './child'

export default {
  name: 'Dict',
  components: { dictChild },
  data () {
    return {
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
      },
      currentId: 1,
      tableLoading: false,
      dialogDictChildVisible: false,
      tableOption: tableOption,
    }
  },
  created () { },
  mounted: function () { },
  computed: {
    ...mapGetters(['permissions']),
  },
  methods: {
    getList (page, params) {
      this.tableLoading = true
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
          },
          params
        )
      ).then(response => {
        this.tableData = response.data.data.records
        this.page.total = response.data.data.total
        this.tableLoading = false
      })
    },
    handleChild (row) {
      this.currentId = row.id
      this.dialogDictChildVisible = true
    },
    /**
     * @title 打开新增窗口
     * @detail 调用crud的handleadd方法即可
     *
     **/
    handleAdd: function () {
      this.$refs.crud.rowAdd()
    },
    handleEdit (row, index) {
      this.$refs.crud.rowEdit(row, index)
    },
    handleDel (row, index) {
      this.$refs.crud.rowDel(row, index)
    },
    rowDel: function (row) {
      var _this = this
      this.$confirm('是否确认删除字典名为"' + row.name + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(function () {
          return delObj(row)
        })
        .then(() => {
          this.getList(this.page)
          _this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success',
          })
        })
        .catch(function () { })
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
        this.tableData.splice(index, 1, Object.assign({}, row))
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success',
        })
        this.getList(this.page)
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
        this.tableData.push(Object.assign({}, row))
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success',
        })
        this.getList(this.page)
        done()
      })
    },
    searchChange (form) {
      this.getList(this.page, form)
    },
    /**
     * 刷新回调
     */
    refreshChange () {
      this.getList(this.page)
    },
  },
}
</script>

<style lang="scss" scoped></style>
