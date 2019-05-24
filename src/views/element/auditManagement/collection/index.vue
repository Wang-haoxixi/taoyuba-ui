<template>
  <!-- 归集审核 -->
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
            <!-- <gov-button type="text" @click="handleDetail(scope.row)">查看</gov-button> -->
            <gov-button type="text" @click="handleAudit(scope.row)">审核</gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <main-dialog
      ref="mainDialog"
      :dialogOption="mainDialogOption"
      :btnGroup="btnGroup"
      :formData="formData"
      @auditPass="handleAuditPass"
      @auditRejected="handleAuditReject"
      @closed="handleClosed"
      ></main-dialog>
  </gov-layout-main>
</template>

<script>
import allMixin from '@/mixins/mixin'
import mainDialog from '../../collectionRegister/mainDialog'

import {
  searchOption,
  mainTableOption,
} from './const'

import {
  getMainTableData,
  auditPass,
  auditReject,
} from '@/api/element/auditManagement/collection'

export default {
  mixins: [allMixin],
  components: {mainDialog},
  data () {
    return {
      mainTableData: [],
      formData: {},
      loading:false,
      mainDialogOption: {
        title: '详情',
        state: 'detail',
      },
    }
  },
  computed: {
    searchOption () {
      return searchOption
    },
    mainTableOption () {
      return mainTableOption
    },
    btnGroup () {
      return [
        {
        label: '审核通过',
        type: 'primary',
        loading:this.loading,
        fn: 'auditPass',
      }, {
        label: '审核驳回',
        type: 'warning',
        loading:this.loading,
        fn: 'auditRejected',
      }, {
        label: '取消',
        type: 'default',
        fn: 'handleCancel',
      },
      ]
    },
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取主表数据
    getList () {
      this.tableLoading = true
      getMainTableData(this.listQuery).then( res =>{
        this.mainTableData = res.data.data.records
        this.pagination.total = res.data.data.total
        this.tableLoading = false
      })
    },
    handleDetail (row) {
      this.formData = { ...row }
      this.mainDialogOption.title = '详情'
      this.mainDialogOption.state = 'detail'
      this.$refs['mainDialog'].open()
    },
    handleAudit (row) {
      this.formData = { ...row }
      this.formData.dnaCollitems.forEach(item=>{
        item.disabled = true
      })
      this.mainDialogOption.title = '审核'
      this.mainDialogOption.state = 'auditDetail'
      this.$refs['mainDialog'].open()
    },
    // 审核通过
    handleAuditPass () {
      console.log('pass')
      this.loading = true
      this.$confirm('是否审核通过?', '审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.loading = true
        auditPass({
          id: this.formData.id,
          collectStatus: '3',
        }).then(()=>{
          this.loading = false
          this.$refs['mainDialog'].close()
          this.$message.success('归集审核通过')
          this.getList()
          this.loading = false
        }, 1000)
      }).catch(() => {this.loading = false})
    },
    // 审核驳回
    handleAuditReject () {
      this.loading = true
      this.$prompt('请输入驳回理由', '驳回', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputValidator: (val) => {
          if (val.length > 100) {
            return '请控制驳回理由长度在100个字符内'
          }
        },
        inputErrorMessage: '驳回理由不能为空',
      }).then(({ value }) => {
        this.loading = true
        auditReject({
          reason: value,
          id: this.formData.id,
          collectStatus: '4',
        }).then(()=>{
          this.loading = false
          this.$message.success('已成功驳回!')
          this.$refs['mainDialog'].close()
          this.getList()
        }).catch(()=>{
          this.loading = false
        })
        this.$refs['mainDialog'].close()
        this.getList()
        this.loading = false
      }).catch(() => {this.loading = false})
    },
  },
}
</script>