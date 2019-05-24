<template>
  <div>
    <basic-container>
      <page-header title="发票审批" :replaceText="replaceText" :data="[10 ,5,10,25,15,31421.00,4733.00,355]"></page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="scope.row.financialAudit===0" @click.stop="handlePass(scope.row)">通过</iep-button>
              <iep-button v-if="scope.row.financialAudit===0" @click.stop="handleReject(scope.row)">驳回</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <pass-dialog-form ref="passDialogForm" @load-page="loadPage"></pass-dialog-form>
    <reject-dialog-form ref="rejectDialogForm" @load-page="loadPage"></reject-dialog-form>
  </div>
</template>

<script>
import { getInvoicePage } from '@/api/fams/invoice'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
import passDialogForm from './passDialogForm'
import rejectDialogForm from './rejectDialogForm'
export default {
  components: { rejectDialogForm, passDialogForm },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      replaceText: (data) => `（待审核：${data[0]}笔，已通过：${data[1]}笔，未通过：${data[2]}笔，废弃：${data[3]}笔，总计：${data[4]}，有效发票：￥${data[5]}元，已用发票：￥${data[6]}元，剩余发票：￥${data[7]}元）`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handlePass (row) {
      this.$refs['passDialogForm'].id = row.id
      this.$refs['passDialogForm'].content = ''
      this.$refs['passDialogForm'].dialogShow = true
    },
    handleReject (row) {
      this.$refs['rejectDialogForm'].id = row.id
      this.$refs['rejectDialogForm'].content = ''
      this.$refs['rejectDialogForm'].dialogShow = true
    },
    handleDetail (row) {
      this.$router.push({
        path: `/fams_spa/invoice_detail/${row.id}`,
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getInvoicePage)
    },
  },
}
</script>
<style scoped>
</style>
