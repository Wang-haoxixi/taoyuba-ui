<template>
  <div>
    <basic-container>
      <page-header title="支出管理" class="data-title" :replaceText="replaceText" :data="[10 ,0, 1,300000,0,0]"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleExpenditure()" type="danger" icon="el-icon-plus" plain>添加支出</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <dialog-detail ref="DialogDetail" @load-page="loadPage"></dialog-detail>
  </div>
</template>
<script>
import { getExpenditurePage, postExpenditure, getExpenditureById } from '@/api/fams/expenditure'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap, initForm } from './options'
import DialogForm from './DialogForm'
import DialogDetail from './DialogDetail'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  components: { DialogForm, DialogDetail },
  data () {
    return {
      dictsMap,
      columnsMap,
      replaceText: (data) => `（支出：${data[0]}笔，支出金额：￥${data[1]}元，收入${data[2]}笔，收入金额￥${data[3]}元，抵扣：${data[4]}笔，抵扣金额${data[5]}元）`,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDetail (row) {
      getExpenditureById(row.expenditureId).then(({ data }) => {
        console.log(data.data)
        this.$refs['DialogDetail'].form = data.data
        this.$refs['DialogDetail'].dialogShow = true
      })
    },
    handleExpenditure () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].formRequestFn = postExpenditure
      this.$refs['DialogForm'].form.orgId = this.userInfo.orgId
      this.$refs['DialogForm'].form.invoiceOrgId = this.userInfo.orgId
      this.$refs['DialogForm'].form.orgName = this.userInfo.orgName
      this.$refs['DialogForm'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getExpenditurePage)
    },
  },
}
</script>
