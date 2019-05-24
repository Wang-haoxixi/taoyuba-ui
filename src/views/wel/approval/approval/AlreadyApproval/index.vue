<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>发起申请</iep-button>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage"></operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
      <template slot="before-columns">
        <el-table-column label="申请人" width="120px">
          <template slot-scope="scope">
            <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
          </template>
        </el-table-column>
      </template>
    </iep-table>
    <new-approval ref="NewApproval" @load-page="loadPage"></new-approval>
  </div>
</template>
<script>
import { getAlreadyApprovalPage } from '@/api/hrms/wel'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap } from './options'
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
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleAdd () {
      this.$refs['NewApproval'].dialogShow = true
    },
    handleDetail (row) {
      this.$router.push({
        path: `/hrms_spa/approval_detail/${row.id}`,
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getAlreadyApprovalPage)
    },
  },
}
</script>
