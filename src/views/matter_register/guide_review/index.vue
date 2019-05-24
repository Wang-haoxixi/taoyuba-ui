<template>
  <gov-layout-main>
    <page-dialog :page-show="editDialogShow" title="详情" @close="editDialogShow=false">
      <template slot="page">
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
          <crud-table :is-load-table="isLoadTable" :paged-table="pagedTable" :column-map="columnMap" @handleSelectionChange="handleSelectionChange" is-mutiple-selection >
            <el-table-column label="状态" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.auditState === 2">待审核</span>
              </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="130">
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
        <examine-dialog
          @successForm="successForm"
          ref="examineDialog"
          :temp="formData"
          :status="dialogStatus"
        ></examine-dialog>
      </template>
      <template slot="form">
        <edit-form guide-type="行政权利" :form="matterForm" @hideDialog="load();" @close="editDialogShow=false" :disabled="disabled" :is-edit="false"></edit-form>
      </template>
    </page-dialog>
  </gov-layout-main>
</template>

<script>
import crudTable from '@/components/crud-table'
import dialogMixins from '@/mixins/dialog_mixins'
import paginationMixins from '@/mixins/pagination_mixins'
import { getGuideReviewPage } from '@/api/cbs/guide_review'
import { getGuideById } from '@/api/cbs/guide'
import { initForm } from '../Components/GuideForm/initForm'
import editForm from '../Components/GuideForm/edit'
import mixin from '@/mixins/mixin'
import examineDialog from './examineDialog'
// mockColumnMap
const columnMap = [
  {
    prop: 'name',
    label: '事项名称',
  },
  {
    prop: 'encrp',
    label: '事项编码',
  },
  {
    prop: 'deptName',
    label: '实施机构',
  },
]
export default {
  components: {
    crudTable,
    editForm,
    examineDialog,
    // matterType,
  },
  mixins: [mixin,dialogMixins, paginationMixins],
  data () {
    return {
      columnMap,
      matterForm: {},
      formInline: {},

      reviewRow: null,
      disabled: true,
      reviewDialogShow: false,
      editDialogShow: false,
      batchReviewDialogShow: false,
      mutipleSelection: [],
    }
  },
  computed: {
    params () {
      return this.formInline
    },
    searchOption () {
      return [
        { label: '事项名称', prop: 'matName', type: 'input', placeholder: '请输入事项名称' },
      ]
    },
  },
  created () {
    this.load()
  },
  methods: {
    handleReviewBatch () {
      let Ids = this.mutipleSelection
      const optName = '审核'
      if (Ids === undefined || Ids.length === 0) {
        this.$message(`请先选择需要${optName}的选项`)
        return
      }
      this.$refs['examineDialog'].open({ids: Ids})
    },
    handleSelectionChange (val) {
      this.mutipleSelection = val.map(m => m.id)
    },
    handleView (row) {
      getGuideById(row.id).then(res => {
        this.disabled = true
        this.matterForm = { ...res.data }
        this.editDialogShow = true
      })
    },
    handleClose () {
      this.reviewDialogShow = false
      this.batchReviewDialogShow = false
      this.matterForm = initForm()
      this.load()
    },
    handleReview (row) {
      this.$refs['examineDialog'].open(row)
    },
    load (pageOption = this.pageOption, params = this.params) {
      this.isLoadTable = true
      this.dialogShow = false
      getGuideReviewPage({ ...params, ...pageOption }).then(res => {
        const { data } = res
        this.loadTable(data)
      })
    },
    search () {
      console.log(this.listQuery)
      this.formInline = {
        matName:this.listQuery.matName,
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
