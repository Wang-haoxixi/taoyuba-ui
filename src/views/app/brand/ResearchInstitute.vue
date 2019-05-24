<template>
  <IepAppTabCard :title="title" :linkName="linkName">
      <el-button style="float: right; padding: 5px 0;" type="text" slot="right">我要发表</el-button>
      <IepAppListCard :dataList="dataList"></IepAppListCard>
  </IepAppTabCard>
</template>
<script>
export default {
  data () {
    return {
      title:'国脉研究院',
      linkName:'',
      dataList: ['数据治理研究院（16篇）', '智慧城市研究中心（12篇）', '数据治理研究院（16篇）', '智慧城市研究中心（12篇）', '数据治理研究院（16篇）','营商环境评价中心（8篇）', '数字经济研究所（11篇）', '最多跑一次研究改革中心（3篇）'],
    }
  },
}
</script>
<style lang='scss' scoped>
</style>
<style scoped>
.index-card >>> .el-card__header {
  padding: 13px 0;
}
.index-card >>> .el-card__body{
  padding: 16px 0 2px;
}
.el-card{
  padding: 0 20px;
}
</style>
