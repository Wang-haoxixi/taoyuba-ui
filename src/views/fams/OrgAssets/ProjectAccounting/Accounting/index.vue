<template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column  prop="name"  label="签订时间"></el-table-column>
      <el-table-column  prop="name"  label="合同金额"></el-table-column>
      <el-table-column  prop="name"  label="预计执行时间"></el-table-column>
      <el-table-column  prop="name"  label="预计结束时间"></el-table-column>
      <el-table-column  prop="name"  label="项目收入"></el-table-column>
      <el-table-column  prop="name"  label="项目总支出"></el-table-column>
      <el-table-column  prop="name"  label="人力成本"></el-table-column>
      <el-table-column  prop="name"  label="项目提成"></el-table-column>
      <el-table-column  prop="name"  label="开票金额"></el-table-column>
      <el-table-column  prop="name"  label="是否结清"></el-table-column>
      <el-table-column  prop="name"  label="项目利润"></el-table-column>
    </el-table>
  </template>

  <script>
    export default {
      data () {
        return {
          tableData: [{
            name: 'sss',
          }],
        }
      },
    }
  </script>