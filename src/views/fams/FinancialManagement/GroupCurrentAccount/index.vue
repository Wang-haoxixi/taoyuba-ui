<template>
  <div>
    <basic-container>
      <page-header title="集团往来账" :replaceText="replaceText" :data="[10 ,5,10,25]"></page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="remarks">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getCurrentBillFlowPage } from '@/api/fams/current_bill_flow'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      replaceText: (data) => `（支出：${data[0]}笔，内部往来帐支出：${data[0]}收入：${data[0]}笔,集团往来账收入：${data[0]}贝，集团往来账：${data[0]}贝）`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, getCurrentBillFlowPage)
    },
  },
}
</script>