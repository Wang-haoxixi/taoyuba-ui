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
      @submitPass="handleSubmitPass"
      @submitReject="handleSubmitReject"
      @closed="handleClosed">
    </main-dialog>
  </gov-layout-main>
</template>

<script>
import allMixin from '@/mixins/mixin'
import { searchOption, mainTableOption } from './const/index'
import {
  submitPass,
  submitReject,
  getMainTableData,
} from '@/api/element/auditManagement/submit'
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
    handleSubmitPass (id) {
      this.btnLoading = true
      submitPass(id).then(()=>{
        this.btnLoading = false
        this.$message({ type: 'success', message: '信息资源提交审核成功!' })
        this.$refs['mainDialog'].close()
        this.getList()
      })
    },
    handleSubmitReject (data) {
      this.btnLoading = true
      submitReject(data).then(()=>{
        this.btnLoading = false
        this.$message({ type: 'success', message: '信息资源提交审核已驳回!' })
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