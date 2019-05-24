<template>
  <div>
    <basic-container>
      <page-header title="线下公司设置"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" icon="el-icon-plus">新增</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getBankAccountPage, postBankAccount, putBankAccount, deleteBankAccountById } from '@/api/fams/bank_account'
import DialogForm from './DialogForm'
import { columnsMap, initForm } from './options'
export default {
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteBankAccountById)
    },
    handleChild (row) {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].form.parentId = row.id
      this.$refs['DialogForm'].form.parentName = row.name
      this.$refs['DialogForm'].formRequestFn = postBankAccount
      this.$refs['DialogForm'].dialogShow = true
    },
    handleEdit (row) {
      this.$refs['DialogForm'].form = { ...row }
      this.$refs['DialogForm'].formRequestFn = putBankAccount
      this.$refs['DialogForm'].dialogShow = true
    },
    handleAdd () {
      this.$refs['DialogForm'].formRequestFn = postBankAccount
      this.$refs['DialogForm'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getBankAccountPage)
    },
  },
}
</script>