<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="search">
      </gov-search-bar>
      <gov-layout-button-group>
        <gov-button type="primary" @click="handleReviewBatch" text="批量审核"/>
      </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <crud-table :is-load-table="isLoadTable" :paged-table="pagedTable" :column-map="columnMap" @handleSelectionChange="handleSelectionChange" is-mutiple-selection>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.auditState === 2">待审核</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="150">
          <template slot-scope="scope">
            <div class="table-btn-group">
              <gov-button @click="handleView(scope.row);" type="text" size="small">详情</gov-button>
              <gov-button @click="handleReview(scope.row);" type="text" size="small">审核</gov-button>
            </div>
          </template>
        </el-table-column>
      </crud-table>

      <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :pagination-option="paginationOption"></pagination>
    </gov-layout-body>
    <main-dialog
      @successForm="successForm"
      ref="mainDialog"
      :temp="formData"
      :status="dialogStatus"
    ></main-dialog>
    <examine-dialog
      @successForm="successForm"
      ref="examineDialog"
      :temp="formData"
      :status="dialogStatus"
    ></examine-dialog>
  </gov-layout-main>
</template>

<script>
import crudTable from '@/components/crud-table'
import paginationMixins from '@/mixins/pagination_mixins'
import { getApplicationFormPage, getApplicationFormById } from '@/api/cbs/application_form'

import mixin from '@/mixins/mixin'
import mainDialog from '../application_form/mainDialog'
import examineDialog from './examineDialog'
function initFormInline () {
  return {
    materialName: '',
  }
}
// mockColumnMap
const columnMap = [
  {
    prop: 'materialName',
    label: '申请表名称',
  },
  {
    prop: 'deptName',
    label: '实施机构',
  },
]
export default {
  components: {
    crudTable,
    mainDialog,
    examineDialog,
  },
  mixins: [mixin, paginationMixins],
  data () {
    return {
      columnMap,
      initFormInline,
      materialForm: {},
      formInline: initFormInline(),
      mutipleSelection: [],
    }
  },
  computed: {
    params () {
      return this.formInline
    },
    searchOption () {
      return [
        { label: '材料名称', prop: 'materialName', type: 'input', placeholder: '请输入事项名称' },
      ]
    },
  },
  created () {
    this.load()
  },
  methods: {
    handleSelectionChange (val) {
      this.mutipleSelection = val.map(m => m.id)
    },
    handleReviewBatch () {
      const ids = this.mutipleSelection
      const optName = '审核'
      if (ids === undefined || ids.length === 0) {
        this.$message(`请先选择需要${optName}的选项`)
        return
      }
      this.$refs['examineDialog'].open({ids: ids})
    },
    handleView (row) {
      getApplicationFormById(row.id).then(res => {
        this.dialogStatus = this.dialog.textName.detail
        this.formData = Object.assign({}, res.data)
        this.$refs['mainDialog'].open()
      })
    },
    handleReview (row) {
      this.$refs['examineDialog'].open(row)
    },
    load (pageOption = this.pageOption, params = this.params) {
      this.isLoadTable = true
      getApplicationFormPage({ ...params, ...pageOption, auditState: 2 }).then(res => {
        const { data } = res
        this.loadTable(data)
      })
    },
    search () {
      this.formInline = {
        materialName:this.listQuery.materialName,
      }
      this.load()
    },
    successForm (msg) {
      this.$message.success(msg)
      this.load()
    },
  },
}
</script>
