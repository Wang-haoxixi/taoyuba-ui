<template>
  <div>
    <basic-container>
      <page-header title="开票通知"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增</iep-button>
          <!-- <iep-button>发送</iep-button>
          <iep-button>撤回</iep-button>
          <iep-button>删除</iep-button> -->
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="scope.row.status===0" @click.stop="handleSend(scope.row)">发送</iep-button>
              <iep-button v-if="scope.row.status===0" @click.stop="handleEdit(scope.row)">编辑</iep-button>
              <iep-button v-if="scope.row.status===1" @click.stop="handleCancel(scope.row)">撤回</iep-button>
              <iep-button v-if="scope.row.status!==2" @click.stop="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getMyBillingPage, postBilling, referBillingById, withdrawBillingById, deleteBillingById, deleteBillingBatch } from '@/api/fams/billing'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dictsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSend (row) {
      this._handleComfirm(row.id, referBillingById, '发送')
    },
    handleCancel (row) {
      this._handleComfirm(row.id, withdrawBillingById, '撤回')
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteBillingById)
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deleteBillingBatch)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/fams_spa/billing_detail/${row.id}`,
      })
    },
    handleAdd () {
      this.$emit('onEdit', {
        methodName: '新增',
        id: false,
        formRequestFn: postBilling,
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getMyBillingPage)
    },
  },
}
</script>
