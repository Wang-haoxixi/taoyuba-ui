<template>
  <div>
    <basic-container>
      <page-header title="提现" :replaceText="replaceText" :data="[10 ,300000]"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleGrantBatch">批量发放</iep-button>
          <iep-button @click="handlePassBatch">批量通过</iep-button>
          <iep-button @click="handleRejectBatch">批量拒绝</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection is-index>
        <el-table-column prop="operation" label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="scope.row.status===1" @click="handleGrant(scope.row)">发放</iep-button>
              <iep-button v-if="scope.row.status===0" @click="handlePass(scope.row)">通过</iep-button>
              <iep-button v-if="[0,1].includes(scope.row.status)" @click="handleReject(scope.row)">驳回</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <grant-dialog-form ref="grantDialogForm" @load-page="loadPage"></grant-dialog-form>
    <pass-dialog-form ref="passDialogForm" @load-page="loadPage"></pass-dialog-form>
    <reject-dialog-form ref="rejectDialogForm" @load-page="loadPage"></reject-dialog-form>
  </div>
</template>
<script>
import { getWithdrawPage } from '@/api/fams/withdraw'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap, initGrantForm } from './options.js'
import grantDialogForm from './grantDialogForm'
import passDialogForm from './passDialogForm'
import rejectDialogForm from './rejectDialogForm'
export default {
  mixins: [mixins],
  components: { grantDialogForm, rejectDialogForm, passDialogForm },
  data () {
    return {
      dictsMap,
      columnsMap,
      replaceText: (data) => `（提现数：${data[0]}笔，总金额合计：￥${data[1]}元）`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getWithdrawPage)
    },
    handleAdd () {
      this.$emit('onEdit', {
        methodName: '提现申请',
        id: false,
      })
    },
    handleGrantBatch () {
      // TODO: 是否多选提醒
      if (!this.multipleSelection.length) {
        this.$message('请先选择需要的选项')
        return
      }
      this.$refs['grantDialogForm'].form = initGrantForm()
      this.$refs['grantDialogForm'].form.ids = this.multipleSelection
      this.$refs['grantDialogForm'].dialogShow = true
    },
    handleGrant (row) {
      this.$refs['grantDialogForm'].form = initGrantForm()
      this.$refs['grantDialogForm'].form.ids = [row.id]
      this.$refs['grantDialogForm'].dialogShow = true
    },
    handlePassBatch () {
      // TODO: 是否多选提醒
      if (!this.multipleSelection.length) {
        this.$message('请先选择需要的选项')
        return
      }
      this.$refs['passDialogForm'].ids = this.multipleSelection
      this.$refs['passDialogForm'].content = ''
      this.$refs['passDialogForm'].dialogShow = true
    },
    handlePass (row) {
      this.$refs['passDialogForm'].ids = [row.id]
      this.$refs['passDialogForm'].content = ''
      this.$refs['passDialogForm'].dialogShow = true
    },
    handleRejectBatch () {
      // TODO: 是否多选提醒
      if (!this.multipleSelection.length) {
        this.$message('请先选择需要的选项')
        return
      }
      this.$refs['rejectDialogForm'].ids = this.multipleSelection
      this.$refs['rejectDialogForm'].content = ''
      this.$refs['rejectDialogForm'].dialogShow = true
    },
    handleReject (row) {
      this.$refs['rejectDialogForm'].ids = [row.id]
      this.$refs['rejectDialogForm'].content = ''
      this.$refs['rejectDialogForm'].dialogShow = true
    },
  },
}
</script>