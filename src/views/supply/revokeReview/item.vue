<template>
  <div>
    <gov-layout-header>
      <gov-search-bar :list-query="listQuery" label-width="80px" :form-props="searchOption" @handleFilter="handleFilter"></gov-search-bar>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud 
        @size-change="sizeChange" 
        @current-change="currentChange" 
        :page="pagination" 
        :table-loading="tableLoading" 
        :data="tableList" 
        :option="mainTableOption"
        @refresh-change="getList">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button type="text" @click="onAgree(scope.row)" text="同意"></gov-button>
            <gov-button type="text" @click="onRefuse(scope.row)" text="拒绝"></gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
  </div>
</template>

<script>
import { auditingRevokePage, agreeRevoke, refuseRevoke } from '@/api/supply/item'
import { itemTableOption } from './const/index'
import mixin from '@/mixins/mixin'
import { getDept } from '@/util/dic'

export default {
  mixins: [mixin],
  data () {
    return {
      // 搜索数据
      listQuery: {
        matName: null,
        matCode: null,
        deptId: null,
        respDeptId: null,
      },
    }
  },
  computed: {
    searchOption () {
      return [
        { label: '事项名称', prop: 'matName' },
        { label: '事项编码', prop: 'matCode' },
        {
          label: '需求部门',
          prop: 'deptId',
          type: 'select',
          data: getDept(),
        },
        {
          label: '数源部门',
          prop: 'dutyId',
          type: 'select',
          data: getDept(),
        },
      ]
    },
    mainTableOption () {
      return itemTableOption
    },
  },
  created () {
  },
  methods: {
    // 同意确认责任
    onAgree (row) {
      this.$confirm('确定同意吗').then(() => {
        agreeRevoke(row.id).then(() => {
          this.$message.success('撤回完成！')
          this.getList()
        })
      }).catch(() => {})
    },
    //拒绝
    onRefuse (row) {
      this.$confirm('确定拒绝吗').then(() => {
        refuseRevoke(row.id).then(() => {
          this.$message.success('拒绝成功！')
          this.getList()
        })
      }).catch(() => {})
    },
    // 获取主表数据
    getList () {
      auditingRevokePage(this.listQuery).then(res => {
        this.tableList = res.data.data.records
        this.pagination.total = res.data.data.total
        this.tableLoading = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
