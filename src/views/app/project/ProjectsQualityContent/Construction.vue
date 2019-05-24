<template>
  <div class="construction">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="项目名称" width="200">
      </el-table-column>
      <el-table-column prop="num" label="项目预算" width="180">
      </el-table-column>
      <el-table-column prop="stage" label="项目阶段">
      </el-table-column>
      <el-table-column prop="department" label="承接部门">
      </el-table-column>
      <el-table-column prop="manager" label="项目经理" width="100">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [
        {
          name: '营商通产品',
          num: '￥ 12000000.00',
          stage: '立项阶段',
          department: '国脉集团研发中心',
          manager: '姚静',
        },
        {
          name: '云南项目',
          num: '￥ 20000000.00',
          stage: '开发中',
          department: '国脉集团研发中心',
          manager: '王丽娜',
        },
        {
          name: '南宁市数据资产登记管理系统',
          num: '￥ 10000000.00',
          stage: '开发中',
          department: '国脉集团研发中心',
          manager: '王玲',
        },
        {
          name: '湘西州政务信息普查系统',
          num: '￥ 8000000.00',
          stage: '开发中',
          department: '国脉集团研发中心',
          manager: '谢海艳',
        },
      ],
    }
  },
}
</script>
<style scoped>
.construction >>> .el-table th {
  background-color: #fafafa;
}
.construction >>> .el-table tr {
  cursor: pointer;
}
.construction >>> .el-card__body {
  height: 332px;
}
.construction >>> .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.construction >>> .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
