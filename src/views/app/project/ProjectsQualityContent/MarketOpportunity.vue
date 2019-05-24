<template>
  <div class="opportunity">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <div class="opportunity-list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="目名称"></el-table-column>
          <el-table-column prop="degree" label="意向程度" width="80"></el-table-column>
        </el-table>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '市场机会',
      linkName: '',
      tableData: [
        { name: '广州市工信委大数据局政府数据资产登', degree: '高' },
        { name: '湛江市政务服务数据管理局咨询服务', degree: '高' },
        { name: '东莞市滨海湾新区“数字政府”三年规划', degree: '高' },
        { name: '各类技术文档齐全规范，产品模块实现高效的结构化维护。与建立各部门、各委员会协作体系。', degree: '中' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
<style scoped>
.opportunity >>> .el-table th {
  background-color: #fafafa;
}
.opportunity >>> .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
</style>
