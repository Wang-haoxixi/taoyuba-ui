<template>
  <div>
    <basic-container>
      <page-header title="合同应收账款"></page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getBillingPage } from '@/api/fams/billing'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
import AdvanceSearch from './AdvanceSearch'
export default {
  components: { AdvanceSearch },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      pagedTable:[
        {id:'1',signingTime:'',entryName:'',contractName:'',contractAmount:'',amountReached:'',outstandingAmount:'',invoice:'',invoiced:'',status:'1',charge:'',refundTime:'2019-09-20',beOverdue:'11'},
        {id:'2',signingTime:'',entryName:'',contractName:'',contractAmount:'',amountReached:'',outstandingAmount:'',invoice:'',invoiced:'',status:'1',charge:'',refundTime:'2019-09-20',beOverdue:'11'},
        {id:'3',signingTime:'',entryName:'',contractName:'',contractAmount:'',amountReached:'',outstandingAmount:'',invoice:'',invoiced:'',status:'1',charge:'',refundTime:'2019-09-20',beOverdue:'11'},
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, getBillingPage)
    },
  },
}
</script>
<style scoped>
</style>
