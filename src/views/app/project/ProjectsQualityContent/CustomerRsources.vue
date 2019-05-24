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
      data: '(14个)',
      title: '客户资源',
      dataList: ['浙江省经信委信息中心', '赣州市行政审批局', '大余县行政服务中心', '赣州市大数据局', '开封市行政服务中心', '日照市东港区人民政府', '江西省政务服务办', '江西三叉数信息科技有限公司'],
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
