<template>
  <div>
    <basic-container>
      <page-header title="提现"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" size="small" plain>提现申请</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle" is-index>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getMyWithdrawPage } from '@/api/fams/withdraw'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      value: '',
      value1: '',
      replaceText: (data) => `（支出：${data[0]}笔${data[0]}贝，收入：${data[0]}笔${data[0]}贝）`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDetail (row) {
      this.$router.push({
        path: '/fams_spa/withdraw_detail/' + row.id,
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getMyWithdrawPage)
    },
    handleAdd () {
      this.$router.push({
        path: '/fams_spa/withdraw_detail/0',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
// .line {
//   text-align: center;
// }
</style>
