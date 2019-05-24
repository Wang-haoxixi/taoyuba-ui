<template>
  <div>
    <basic-container>
      <page-header title="抄送我的"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>发起申请</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="申请人" width="120px">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning" plain size="small" @click="handleDetail(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </iep-table>
      <new-approval ref="NewApproval" @load-page="loadPage"></new-approval>
    </basic-container>
  </div>
</template>

<script>
import { getCCPage } from '@/api/hrms/wel'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../options'
import NewApproval from '@/views/wel/approval/Components/NewApproval.vue'
export default {
  mixins: [mixins],
  components: { NewApproval },
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
    handleDetail (row) {
      this.$router.push({
        path: `/hrms_spa/approval_detail/${row.id}`,
      })
    },
    handleAdd () {
      this.$refs['NewApproval'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getCCPage)
    },
  },
}
</script>
<style scoped>
</style>
