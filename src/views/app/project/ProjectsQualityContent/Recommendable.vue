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
      data: '(10个)',
      title: '重点推荐项目',
      dataList: ['国脉内部智慧平台IOA', '仓颉数源', 'AI协作平台', '中免集团项目', '数据采集项目', '国策数据平台', '石景山评测通部署项目', '营商通', '上海三清单管理系统', '数字云南事项梳理项目'],
      linkName: '',
    }
  },
}
</script>
<style scoped>
.recommendable >>> .el-card {
  height: 346px;
}
</style>
