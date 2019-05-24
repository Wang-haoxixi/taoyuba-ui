<template>
  <div>
    <basic-container>
      <page-header title="资金调拨"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="scope.row.status===0" @click.stop="handleRevoke(scope.row)">撤回</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getFundTransferPage, postFundTransfer, revokeFundTransferById } from '@/api/fams/fund_transfer'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$emit('onEdit', {
        methodName: '新增',
        id: false,
        formRequestFn: postFundTransfer,
      })
    },
    handleRevoke (row) {
      this._handleComfirm(row.id, revokeFundTransferById, '撤销')
    },
    handleDetail (row) {
      this.$router.push({
        path: `/fams_spa/fund_transfer_detail/${row.id}`,
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getFundTransferPage)
    },
  },
}
</script>
<style scoped>
</style>
