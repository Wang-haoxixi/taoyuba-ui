<template>
  <!-- 注销审核 -->
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="handleFilter"
      />
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        :data="mainTableData"
        :option="mainTableOption"
        :page="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        @refresh-change="getList">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button type="text" @click="handleAudit(scope.row)">审核</gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <main-dialog
      ref="mainDialog"
      :formData="formData"
      :loading="btnLoading"
      @auditPass="handleAuditPass"
      @auditReject="handleAuditReject"
      @closed="handleClosed">
    </main-dialog>
  </gov-layout-main>
</template>

<script>
import allMixin from '@/mixins/mixin'
import { searchOption, mainTableOption } from './const/index'
import {
  auditPass,
  auditReject,
  getMainTableData,
} from '@/api/element/auditManagement/cancellation'
import mainDialog from './mainDialog'

export default {
  mixins: [allMixin],
  components: {mainDialog},
  data () {
    return {
      mainTableData: [],
      formData: {},
      btnLoading: false,
    }
  },
  computed: {
    searchOption () {
      return searchOption
    },
    mainTableOption () {
      return mainTableOption
    },
  },
  methods: {
    getList () {
      this.tableLoading = true
      getMainTableData(this.listQuery).then(res=>{
        this.mainTableData = res.data.data.records
        this.pagination.total = res.data.data.total
        this.tableLoading = false
      })
    },
    handleAudit (row) {
      this.formData = { ...row }
      this.$refs['mainDialog'].open()
    },
    handleClosed () {
      this.formData = {}
    },
    handleAuditPass (id) {
      this.btnLoading = true
      auditPass(id).then(()=>{
        this.btnLoading = false
        this.$message({ type: 'success', message: '注销审核通过!' })
        this.$refs['mainDialog'].close()
        this.getList()
      })
    },
    handleAuditReject (data) {
      this.btnLoading = true
      auditReject(data).then(()=>{
        this.btnLoading = false
        this.$message({ type: 'success', message: '已成功驳回!' })
        this.$refs['mainDialog'].close()
        this.getList()
      })
    },
  },
  created () {
    this.getList()
  },
}
</script>