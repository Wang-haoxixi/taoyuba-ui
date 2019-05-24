<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar :list-query="listQuery" label-width="80px" :form-props="searchOption" :is-string="false" :reset-ignore="['isAsc', 'limit', 'page']" @handleFilter="handleFilter"></gov-search-bar>
      <gov-layout-button-group>
        <gov-button type="export" @click="handleExport" />
      </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud @size-change="sizeChange" @current-change="currentChange" :page="pagination" :table-loading="tableLoading" :data="tableList" :option="mainTableOption">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button type="text" @click="onAgree(scope.row)" text="已确认"></gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <main-dialog ref="mainDialog" :form-data="formData"></main-dialog>
    <gov-dialog-export @submit="handleExportSubmit" :list-query="exportData.listQuery" :data="exportData.data" ref="exportDialog" />
  </gov-layout-main>
</template>

<script>
import mainDialog from '../confirm/mainDialog'
import { getListDetail, getExport } from '@/api/gvs/matterManager'
import mixin from '@/mixins/mixin'
import { getConfirmDetailData } from '@/api/supply/confirm'
export default {
  mixins: [mixin],
  components: { mainDialog },
  data () {
    return {
      deptList: [],
      listQuery: {
        matterName: null,
        matterCode: null,
      }, // 搜索数据
      exportData: {
        listQuery: {
          data: [],
        },
        data: [
          {
            prop: 'data',
            data: [
              { value: 'matterName', label: '事项名称' },
              { value: 'matterCode', label: '事项编码' },
              { value: 'deptId', label: '需求部门' },
              { value: 'respDeptId', label: '数源部门' },
            ],
          },
        ],
      },
    }
  },
  computed: {
    searchOption () {
      return [
        {
          label: '事项名称',
          prop: 'matterName',
        },
        {
          label: '事项编码',
          prop: 'matterCode',
        },
        {
          label: '需求部门',
          prop: 'deptId',
          type: 'select',
          data: this.deptList,
        },
        {
          label: '数源部门',
          prop: 'respDeptId',
          type: 'select',
          data: this.deptList,
        },
      ]
    },
    mainTableOption () {
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        selection: false,
        page: false,
        header: false,
        menu: false,
        border: true,
        align: 'center',
        menuAlign: 'center',
        indexLabel: '序号',
        index: true,
        column: [
          {
            label: '需求部门',
            prop: 'deptName',
          },
          {
            label: '事项名称',
            prop: 'matName',
          },
          {
            label: '材料类型',
            prop: 'materialType',
            type: 'dic',
            dicData: [],
            width: 120,
          },
          {
            label: '涉及信息项',
            prop: 'itemName',
          },
          {
            label: '数源部门',
            prop: 'respDeptName',
          },
          {
            label: '备注',
            prop: 'comment',
          },
          {
            label: '确认情况',
            prop: 'menu',
            width: 200,
            solt: true,
          },

        ],
      }
    },
  },
  created () {
    this.getList()
  },
  methods: {
    // 是数源部门
    onAgree (row) {
      getConfirmDetailData(row.materialId).then((res) => {
        this.dialogStatus = 'detail'
        this.formData = Object.assign({}, res.data.data)
        this.openDialog('mainDialog')
      })
    },
    // 获取主表数据
    getList () {
      getListDetail(this.listQuery).then(res => {
        this.tableList = res.data.data
        this.pagination.total = res.data.total
        this.tableLoading = false
      })
    },
    // 导出弹框
    handleExport () {
      this.$refs.exportDialog.open()
    },
    handleExportSubmit (val) {
      console.log(val)
      getExport()
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
