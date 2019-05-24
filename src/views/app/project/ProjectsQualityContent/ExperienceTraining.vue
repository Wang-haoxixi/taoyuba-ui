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
      title: '经验培训',
      data: '(15次)',
      dataList: ['肇庆市政务信息资产梳理培训', '数据基因微服务版培训', '佛山市税务局政务信息资产梳理清查', '中山市政务数据资源整合及管理项目', '海南省政务信息资源共享采集云项目', '宁波保税区政务公开咨询项目', '徐州市发改委营商环境评估项目', '江西省工信厅江西省政府网站群绩'],
      linkName: '',
    }
  },
}
</script>
