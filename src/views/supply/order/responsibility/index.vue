<template>
  <gov-layout-main>
    <!-- 头部搜索框 -->
    <gov-layout-header>
      <gov-search-bar 
        label-width="80px" 
        :list-query="listQuery" 
        :form-props="searchOption" 
        @handleFilter="handleFilter" />
      <gov-layout-button-group>
        <gov-button type="export" @click="handleExportQuery"></gov-button>
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
import { getConfirmData } from '@/api/supply/item'
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
      excelUrl: '/gvs/excel/responsibility_export',
    }
  },
  methods: {
    // 列表
    getList () {
      this.tableLoading = true
      getConfirmData(this.listQuery).then(({data}) => {
        this.$set(this.pagination, 'total', data.data.total)
        // this.pagination.total = res.data.data.total
        this.tableList = data.data.records
        this.tableLoading = false
      })
    },
    // 批量导出
    handleExportQuery () {
      this.loading = true
      let next = new Promise((resolve) => {
        download({url: this.excelUrl, title: '责任清单', data: this.ignoreData(this.listQuery)})
        resolve()
      })
      next.then(() => {
        this.loading = false
      })
    },
  },
}
</script>
