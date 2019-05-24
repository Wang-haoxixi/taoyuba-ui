<template>
  <gov-layout-main>
    <!-- 头部搜索框 -->
    <gov-layout-header>
      <gov-search-bar label-width="80px" :list-query="listQuery" :form-props="searchOption" @handleFilter="handleFilter" />
      <gov-layout-button-group>
        <gov-button type="export" @click="handleExportQuery" :loading="loading"></gov-button>
      </gov-layout-button-group>
    </gov-layout-header>
    <!-- 列表 -->
    <gov-layout-body>
      <order-table
        @currentChange="handleCurrentChange"
        @sizeChange="handleSizeChange"
        :loading="tableLoading"
        :data="tableList"
        :pagination="pagination">
      </order-table>
    </gov-layout-body>
  </gov-layout-main>
</template>
<script>
import mixin from '@/mixins/mixin'
import orderMixin from '../const/mixin'
import { getPageByDemand } from '@/api/supply/order'
import {searchOption, tableOption, download} from '../const/index'
import orderTable from '../const/table'
export default {
  mixins: [mixin, orderMixin],
  components: {
    orderTable,
  },
  data () {
    return {
      searchOption,
      tableOption,
      excelUrl: '/gvs/excel/demand_export',
      loading: false,
    }
  },
  methods: {
    // 列表
    getList () {
      this.tableLoading = true
      getPageByDemand(this.listQuery).then((res) => {
        this.pagination.total = res.data.data.total
        this.tableList = res.data.data.records
        this.tableLoading = false
      })
    },
    // 批量导出
    handleExportQuery () {
      this.loading = true
      let next = new Promise((resolve) => {
        download({url: this.excelUrl, title: '需求清单', data: this.ignoreData(this.listQuery)})
        resolve()
      })
      next.then(() => {
        this.loading = false
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.fixed-table {
  width: calc(100vw - 336px);
}
</style>
