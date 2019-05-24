<template>
  <div class="recommendable">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <IepAppListCard :dataList="dataList"></IepAppListCard>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '质量管控 ',
      dataList: ['国脉软件项目实施管理规范', '国脉软件项目实施管理规范', '国脉软件项目实施管理规范', '年全国林业信息化率评测', '政务信息资源梳理与目录编制项目合同', '广东省政务服务绩效评估项目', '深圳市政务服务事项数源供需对接', '广州市工信委大数据局政府数据资产登'],
      linkName: '',
    }
  },
}
</script>

<style scoped>
.recommendable >>> .el-card {
  height: 327px;
}
</style>