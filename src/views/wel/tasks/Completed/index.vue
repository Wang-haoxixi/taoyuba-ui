<template>
  <div class="all-tasks">
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>新任务</iep-button>
        <iep-button>排序</iep-button>
        <iep-button>分组</iep-button>
        <iep-button>指派</iep-button>
        <iep-button>筛选</iep-button>
        <el-checkbox>只看今天</el-checkbox>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage"></operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="false" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
      <template slot="before-columns">
      </template>
      <el-table-column prop="operation" label="操作" width="260">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" v-if="scope.row.taskStatus!=='2'" plain>标记完成</iep-button>
              <iep-button>共享</iep-button>
              <iep-button>关注</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      pagedTable:[
          {taskDate:'2019-02-02',taskName:'修改合同的签署部门字段',taskStatus:'0'},
          {taskDate:'2019-02-02',taskName:'修改合同的签署部门字段',taskStatus:'1'},
          {taskDate:'2019-02-02',taskName:'修改合同的签署部门字段',taskStatus:'2'},
          {taskDate:'2019-02-02',taskName:'修改合同的签署部门字段',taskStatus:'0'},
          {taskDate:'2019-02-02',taskName:'修改合同的签署部门字段',taskStatus:'2'},
          {taskDate:'2019-02-02',taskName:'修改合同的签署部门字段',taskStatus:'2'},
      ],
    }
  },
//   created () {
//     this.loadPage()
//   },
  methods: {
    handleSelectionChange () {
    },
    handleAdd () {
    },
    handleDetail () {
    },
    // loadPage (param = this.searchForm) {
    //   this.loadTable(param, getAlreadyApprovalPage)
    // },
  },
}
</script>
<style scoped>
.all-tasks >>> .el-checkbox__label{
    padding-left:5px;
    font-size: 12px;
}
.all-tasks >>> .el-checkbox{
    margin-left: 10px;
}
</style>
