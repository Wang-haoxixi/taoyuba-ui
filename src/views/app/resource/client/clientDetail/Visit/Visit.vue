<template>
  <div class="visit">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="topic"
        label="主题">
      </el-table-column>
      <el-table-column
        prop="time"
        label="拜访时间">
      </el-table-column>
    </el-table>
  </div>
</template>

  <script>
    export default {
      data () {
        return {
          tableData: [{
            topic: '2016-05-02',
            time: '王小虎',
          }, {
            topic: '2016-05-04',
            time: '王小虎',
          }, {
            topic: '2016-05-01',
            time: '王小虎',
          }],
        }
      },
    }
  </script>
  <style scoped lang='scss'>
  .visit{
    margin-bottom: 15px;
  }
</style>
<style scoped>
.visit >>> .el-table th{
  background-color: #f8f8f8;
}
</style>
