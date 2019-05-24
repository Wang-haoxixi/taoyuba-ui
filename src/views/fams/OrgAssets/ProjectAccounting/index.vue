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
        {number:'1000231',name:'ss',time:'ss',contractAmount:'',income:'',expenditure:'',billingStatus:'0',settleStatus:'1',profit:'1000'},
        {number:'1000231',name:'ss',time:'ss',contractAmount:'',income:'',expenditure:'',billingStatus:'0',settleStatus:'1',profit:'1000'},
        {number:'1000231',name:'ss',time:'ss',contractAmount:'',income:'',expenditure:'',billingStatus:'0',settleStatus:'1',profit:'1000'},
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      //this.loadTable(param, getBillingPage)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/fams_spa/project_accounting/${row.id}`,
      })
    },
  },
}
</script>
<style scoped>
</style>
