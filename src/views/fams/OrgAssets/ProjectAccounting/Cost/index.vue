<template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column  prop="name"  label="月份"></el-table-column>
      <el-table-column  prop="name"  label="人工成本"></el-table-column>
      <el-table-column  prop="name"  label="项目提成"></el-table-column>
      <el-table-column label="项目费用">
        <el-table-column  prop="name"  label="税费"></el-table-column>
        <el-table-column  prop="name"  label="中标服务费"></el-table-column>
        <el-table-column  prop="name"  label="外包费用"></el-table-column>
        <el-table-column  prop="name"  label="项目评审专家费"></el-table-column>
        <el-table-column  prop="name"  label="佣金"></el-table-column>
        <el-table-column  prop="name"  label="其他"></el-table-column>
      </el-table-column>
      <el-table-column  prop="name"  label="项目管理费"></el-table-column>
      <el-table-column  prop="name"  label="开票费用"></el-table-column>
      <el-table-column  prop="name"  label="差旅费"></el-table-column>
      <el-table-column  prop="name"  label="费用总支出"></el-table-column>
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