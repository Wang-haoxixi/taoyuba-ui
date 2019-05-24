<template>
  <el-table
    ref='multipleTable'
    :data='tableData'
    :show-header="false"
    @selection-change='handleSelectionChange'>
    <el-table-column
      prop='taskName'
      label='任务名称'
      show-overflow-tooltip
      width="360px">
      <template slot-scope='scope'>
        <i class="iconfont icon-cz-tijiao"></i>
        {{scope.row.taskName}}
      </template>
    </el-table-column>
    <el-table-column
      prop='deptName'
      label='协同部门'
      show-overflow-tooltip>
      <template slot-scope='scope'>
        <i class="iconfont icon-cz-tijiao"></i>
        {{scope.row.deptName}}
      </template>
    </el-table-column>
    <el-table-column
      prop='status'
      label='任务进度'>
      <template slot-scope='scope'>
        <i :class="type[scope.row.status-1].icon" :style="{color:type[scope.row.status-1].color}"></i>
        {{ type[scope.row.status-1].label }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data () {
      return {
        multipleSelection: [],
        type:[
          {
            label:'未开始',
            color:'#979797',
            icon:'iconfont icon-cz-tijiao',
          },
          {
            label:'进行中',
            color:'#71acf2',
            icon:'iconfont icon-cz-tijiao',
          },
          {
            label:'已完成',
            color:'#1afa29',
            icon:'iconfont icon-cz-tijiao',
          },
          {
            label:'进行中（逾期5天之内）',
            color:'#ffe252',
            icon:'iconfont icon-cz-tijiao',
          },
          {
            label:'进行中（逾期5天以上）',
            color:'#e57369',
            icon:'iconfont icon-cz-tijiao',
          },
        ],
      }
    },
    props:{
      tableData:{
        type:Array,
        default: () => [],
      },
    },
    methods: {
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
    },
  }
</script>

<style>

</style>
