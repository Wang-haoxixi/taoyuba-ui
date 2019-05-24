<template>
  <div>
    <basic-container>
      <page-header title="我发起的"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>发起申请</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="申请人">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}
                <a-tag v-if="scope.row.isDraft" color="orange">草稿</a-tag>
              </iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="审核人">
          <template slot-scope="scope">
            <div>
              <iep-tag-detail v-if="!scope.row.approveResult" :value="scope.row.approverNameList"></iep-tag-detail>
              <span v-else>{{scope.row.approverName}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="审批结果">
          <template slot-scope="scope">
            {{dictsMap.approveResult[scope.row.approveResult]}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="230px">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="scope.row.isDraft===0 && scope.row.approveResult===0" type="warning" plain @click="handleCancel(scope.row)">撤销</iep-button>
              <iep-button :disabled="scope.row.isDraft===0" type="warning" plain @click="handleEdit(scope.row)">修改</iep-button>
              <iep-button :disabled="scope.row.isDraft===0" plain @click="handleDelete(scope.row)">删除</iep-button>
              <iep-button :disabled="scope.row.isDraft===0" plain @click="handleSubmit(scope.row)">提交</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <new-approval ref="NewApproval" @load-page="loadPage"></new-approval>
  </div>
</template>

<script>
import { getInitiatePage, deleteApprovalById, submitApprovalById, cancelApprovalById } from '@/api/hrms/wel'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../options'
import NewApproval from '@/views/wel/approval/Components/NewApproval.vue'
export default {
  components: {
    NewApproval,
  },
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
    handleCancel (row) {
      this._handleGlobalById(row.id, cancelApprovalById, 'cancel')
    },
    handleSubmit (row) {
      this._handleGlobalById(row.id, submitApprovalById, 'submit')
    },
    handleDetail (row) {
      this.$router.push({
        path: `/hrms_spa/approval_detail/${row.id}`,
      })
    },
    handleEdit (row) {
      this.$router.push({
        path: `/hrms_spa/approval/${row.id}`,
        query: {
          type: row.typeId,
        },
      })
    },
    handleAdd () {
      this.$refs['NewApproval'].dialogShow = true
    },
    handleDelete (row) {
      this._handleComfirm(row.id, deleteApprovalById, '删除')
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getInitiatePage)
    },
  },
}
</script>
<style scoped>
</style>
