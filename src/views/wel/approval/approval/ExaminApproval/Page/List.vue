<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>发起申请</iep-button>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage">
        </operation-search>
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
      <el-table-column label="审批时间">
        <template slot-scope="scope">
          <div v-if="scope.row.status!==0">
            {{scope.row.applyEndTime}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审核人">
        <template slot-scope="scope">
          <div>
            <iep-tag-detail v-if="!scope.row.status" :value="scope.row.approverNameList"></iep-tag-detail>
            <span v-else>{{scope.row.approverName}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审批结果">
        <template slot-scope="scope">
          {{dictsMap.status[scope.row.status]}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220px">
        <template slot-scope="scope">
          <operation-wrapper v-if="scope.row.status === 0">
            <iep-button type="warning" @click="handleReview(scope.row)" plain>审核</iep-button>
            <iep-button :disabled="scope.row.status===3" @click="handleDeliver(scope.row)">转交</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <iep-review-confirm ref="iepReviewForm" @load-page="loadPage"></iep-review-confirm>
    <new-approval ref="NewApproval" @load-page="loadPage"></new-approval>
    <deliver-dialog ref="DeliverDialog" @load-page="loadPage"></deliver-dialog>
  </div>
</template>
<script>
import { getExaminApprovalPage, deliverApprovaBatch, reviewApprovaBatch } from '@/api/hrms/wel'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../options'
import NewApproval from '@/views/wel/approval/Components/NewApproval.vue'
import DeliverDialog from './DeliverDialog'
export default {
  mixins: [mixins],
  components: { NewApproval, DeliverDialog },
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
    handleReview (row) {
      this.$refs['iepReviewForm'].title = '审核'
      this.$refs['iepReviewForm'].id = row.id
      this.$refs['iepReviewForm'].formRequestFn = reviewApprovaBatch
      this.$refs['iepReviewForm'].dialogShow = true
    },
    handleDeliver (row) {
      this.$refs['DeliverDialog'].form.ids = [row.id]
      this.$refs['DeliverDialog'].userId = row.userId
      this.$refs['DeliverDialog'].formRequestFn = deliverApprovaBatch
      this.$refs['DeliverDialog'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getExaminApprovalPage)
    },
  },
}
</script>
