<template>
  <div class="recommendable">
    <IepAppTabCard :title="title" :linkName="linkName" isMore :data="data">
      <IepAppListCard :dataList="dataList"></IepAppListCard>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: '(15个)',
      title: '项目资源',
      dataList: ['内蒙古大数据局信息资源建设项目', '中央政府门户网站内容规划与咨询服务', '事项梳理优化项目', '年全国林业信息化率评测', '政务信息资源梳理与目录编制项目合同', '广东省政务服务绩效评估项目', '深圳市政务服务事项数源供需对接', '广州市工信委大数据局政府数据资产登'],
      linkName: '',
    }
  },
}
</script>

<style scoped>
.recommendable >>> .el-card {
  height: 330px;
}
</style>