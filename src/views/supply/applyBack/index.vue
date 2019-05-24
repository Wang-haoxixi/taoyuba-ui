<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        label-width="80px"
        :list-query="listQuery"
        :form-props="formProps"
        @handleFilter="handleFilter"
      ></gov-search-bar>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud 
        :data="mainTableData" 
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :option="mainTableOption"
        :page="pagination"
        @refresh-change="getList">
      </avue-crud>
    </gov-layout-body>
  </gov-layout-main>
</template>

<script>
import { getDept } from '@/util/dic'
import mixin from '@/mixins/mixin'
import { getBackData } from '@/api/supply/item'
import { itemTableOption } from './const/index'

export default {
  name: 'Demand',
  mixins: [mixin],
  components: {  },
  computed: {
    formProps () {
      return [
        { label: '事项名称', prop: 'matName' },
        { label: '事项编码', prop: 'matCode' },
        { label: '需求部门', prop: 'deptId', type: 'select', data: getDept() },
      ]
    },
    mainTableOption () {
      return itemTableOption
    },
  },
  data () {
    return {
      deptList: [],
      listQuery: {
        auditState: 3,
      },
      mainTableData: [],
      formData: {},
    }
  },
  methods: {
    // 获取主表数据
    getList () {
      this.tableLoading = true
      getBackData(this.listQuery).then((res) => {
        this.pagination.total = res.data.data.total
        this.mainTableData = res.data.data.records
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      })
    },
    handleCloseMainDialog () {
      this.$refs['mainDialog'].close()
    },
  },
  created () {
    this.getList()
  },
}
</script>

<style lang="scss" scoped>
</style>
