<template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column  prop="name"  label="回款金额"></el-table-column>
      <el-table-column  prop="name"  label="合同金额"></el-table-column>
      <el-table-column  prop="name"  label="一月"></el-table-column>
      <el-table-column  prop="name"  label="二月"></el-table-column>
      <el-table-column  prop="name"  label="三月"></el-table-column>
      <el-table-column  prop="name"  label="四月"></el-table-column>
      <el-table-column  prop="name"  label="五月"></el-table-column>
      <el-table-column  prop="name"  label="六月"></el-table-column>
      <el-table-column  prop="name"  label="七月"></el-table-column>
      <el-table-column  prop="name"  label="八月"></el-table-column>
      <el-table-column  prop="name"  label="九月"></el-table-column>
      <el-table-column  prop="name"  label="十月"></el-table-column>
      <el-table-column  prop="name"  label="十一月"></el-table-column>
      <el-table-column  prop="name"  label="十二月"></el-table-column>
      <el-table-column  prop="name"  label="总计"></el-table-column>
      <el-table-column  prop="name"  label="剩余回款"></el-table-column>
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