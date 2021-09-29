<template>
  <div>
    <basic-container v-if="detail">
      <page-header title="交易审核"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleRefresh()" type="primary">刷新</iep-button>  
        </template>
        <template slot="right">
          <span><el-input v-model="params.shipName" placeholder="请输入船名" size="small" clearable></el-input></span>
          <span><el-input v-model="params.certificateHolderIdCard" placeholder="请输入持证人身份证" size="small" clearable></el-input></span>
          <el-button size="small"  @click="onSearch(params)">搜索</el-button>
        </template>
      </operation-container>
      <iep-table
        :isLoadTable="isLoadTable"
        :pagination="pagination"
        :columnsMap="columnsAudit"
        :pagedTable="pagedTable"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
        <el-table-column prop="operation" label="操作" width="400">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleView(scope.row.id)" v-if="scope.row.auditState === '2'">审核</iep-button>
              <iep-button @click="handleView(scope.row.id,true)">查看</iep-button>
              <iep-button @click="watch(scope.row.id)">查看当前进度</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <detail v-else @back="back" ref="detail" @getList="loadPage"></detail>
   <dialogArchar  :dialogCertvisible='dialogCertvisible' @close="close" :list="list" ref="dialog"></dialogArchar>
  </div>
  
</template>
<script>
import { tybOrderPage,tybOrderPageDetail,getById } from '@/api/ships'
import mixins from '@/mixins/mixins'
import { columnsAudit } from '../options'
import detail from './detail'
import dialogArchar from './dialog'

import queryMixin from '@/mixins/query'
export default {
  components: { detail , dialogArchar },
  mixins: [mixins, queryMixin],
  data () {
    return {
      dialogCertvisible:false,
      columnsAudit,
      params: {
        current: 1,
        size: 10,
      },
      isLoadTable: false,
      detail: true,
      list:{},
    }
  },
  created () {
    this.loadPage(this.params)
  },
  computed: {
  },
  methods: {
    onSearch (params) {
      params.current = 1
      this.loadPage(params)
    },
    handleCurrentChange (val) {
      this.pageOption.current = val
      this.loadPage()
    },
    handleSizeChange (val) {
      this.pageOption.size = val
      this.loadPage()
    },
    loadPage (param = this.searchForm) {
        tybOrderPage({...param,...this.pageOption}).then(({data})=>{
          this.pagedTable = data.data.records
          this.pageOption.total = data.data.total
        })
    },
    handleView (id,val) {
      tybOrderPageDetail({ id: id }).then(res=>{
        this.detail = false
        this.$nextTick(()=>{
          this.$refs.detail.form = res.data.data
          console.log(this.$refs.detail.form)
          this.$refs.detail.disabled = val || false
        })
      })
    },
    back () {
      this.detail = true
    },
    close () {
      this.dialogCertvisible = false
    },
    handleRefresh () {
      this.pagination.current = 1
      this.loadPage()
    },
    watch (id) {
      console.log(id)
      this.dialogCertvisible=true
       getById({ id }).then(res=>{
        console.log(res.data.data)
      this.list=res.data.data
      })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>