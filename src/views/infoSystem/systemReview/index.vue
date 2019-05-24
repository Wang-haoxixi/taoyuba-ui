<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="searchProps"
        :resetIgnore="['status', 'isAsc', 'limit', 'page']"
        @handleFilter="handleFilter">
      </gov-search-bar>
      <gov-layout-button-group>
        <gov-button type="primary" @click="handleAuditPassBatch" text="批量审核通过"></gov-button>
        <gov-button type="default" @click="handleRejectBatch" text="批量驳回"></gov-button>
      </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        :data="mainTableData"
        :page="pagination"
        :option="mainTableOption"
        :table-loading="tableLoading"
        @selection-change="mainTableChange"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button type="text" @click="handleDetail(scope.row)" text="审核"></gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <mainDialog @success="success" ref="mainDialog" :formData="formData" @closed="handleCloseMainDialog"></mainDialog>
  </gov-layout-main>
</template>

<script>
import { getDic } from '@/util/dic'
import mainDialog from './mainDialog'
import allMixin from '@/mixins/mixin'
import {
  getSystemTableData,
  getSystemDetail,
  systemReview,
  systemReject,
} from '@/api/infoSystem'

export default {
  name: 'system_review',
  components: { mainDialog },
  mixins: [allMixin],
  data () {
    return {
      listQuery: {
        status: 'C',
        isAsc: true,
      },
      mainTableData: [],
      changeList: [],
      formData: {},
    }
  },
  computed: {
    searchProps () {
      return [
        {
          label: '信息系统名称',
          prop: 'sysDsgt',
        },
      ]
    },
    mainTableOption () {
      return {
        selection: true,
        page: true,
        menu: false,
        header: false,
        column: [
          {
            label: '区域',
            prop: 'sysDeptArea',
          }, {
            label: '单位名称',
            prop: 'sysDeptName',
          }, {
            label: '信息系统名称',
            prop: 'sysDsgt',
          }, {
            label: '状态',
            prop: 'status',
            type: 'select',
            dicData: getDic('INFO_STATUS'),
          }, {
            label: '操作',
            prop: 'menu',
            solt: true,
          },
        ],
      }
    },
  },
  methods: {
    getList () {
      this.tableLoading = true
      getSystemTableData(this.listQuery).then(res=>{
        this.pagination.total = res.data.data.total
        this.mainTableData = res.data.data.records
        this.tableLoading = false
      })
    },
    // 详情
    handleDetail (row) {
      getSystemDetail(row.id).then(res=>{
        this.formData = res.data.data
        this.$refs['mainDialog'].open()
      })
    },
    handleAuditPassBatch () {
      if (this.changeList.length === 0) {
        this.$message.error('请至少选择一条数据')
      }else {
        this.$confirm('请确认是否通过', '审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        }).then(()=>{
          let list = []
          this.changeList.forEach(item=>{
            list.push(item.id)
          })
          systemReview(list, 'batch').then(()=>{
            this.$message.success('批量审核通过成功')
            this.changeList = []
            this.getList()
          })
        }).catch(()=>{})
      }
    },
    handleRejectBatch () {
      if (this.changeList.length === 0) {
        this.$message.error('请至少选择一条数据')
      }else {
        this.$prompt('请输入驳回理由', '驳回', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: '',
          inputPlaceholder: '请输入100字以内的内容',
          inputValidator: (value) => {
            if(value.length>100){
              return '请输入100字以内的内容'
            }
            return value === '' ? false : true
          },
          inputErrorMessage: '请填写驳回理由',
        }).then(({ value }) => {
          let list = []
          this.changeList.forEach(item=>{
            list.push(item.id)
          })
          systemReject(list, value, 'batch').then(()=>{
            this.$message.success('批量驳回成功')
            this.changeList = []
            this.getList()
          })
        }).catch(() => {})
      }
    },
    // 关闭弹窗 重置数据
    handleCloseMainDialog () {
      this.resetFormData(this.formData)
    },
    // 表格多选
    mainTableChange (list) {
      this.changeList = list
    },
    success () {
      this.getList()
    },
  },
  created () {
    this.getList()
  },
}
</script>
