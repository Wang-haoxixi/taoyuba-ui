<template>
  <!-- 目录数据清单统计 -->
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="handleFilter"
      />
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud :data="mainTableData" :table-loading="tableLoading" :option="mainTableOption"></avue-crud>
    </gov-layout-body>
  </gov-layout-main>
</template>

<script>
import {
  // getDic,
  // getDept,
} from '@/util/dic'

import allMixin from '@/mixins/mixin'
import { searchOption, mainTableOption } from './const/index'
import { getList } from '@/api/element/elementDataList'

export default {
  mixins: [allMixin],
  data () {
    return {
      searchOption,
      mainTableData: [],
      tableLoading: false,
    }
  },
  computed: {
    mainTableOption () {
      return mainTableOption
    },
  },
  methods: {
    getList () {
      this.tableLoading = true
      getList({id: this.listQuery.deptId}).then(res=>{
        this.mainTableData = res.data.data
        this.tableLoading = false
      })
    },
  },
  created () {
    this.getList()
  },
}
</script>

<style>
  .el-table--border th {
    border-right: 1px solid #ebeef5;
  }
</style>
