<template>
  <div>
    <iepAppTabCard :title="title" isMore>
      <IepAppListCard :dataList="dataList"></IepAppListCard>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '新人必读',
      dataList: [
        '国脉集团新员工入职指南',
        '国脉商务礼仪规范与工作守则',
        '内网个人风采页完善指标项及信息填写规范',
        '公司文化内容的最新修订稿pdf（新生必读）',
        '山东省营商环境评估指标',
        '智慧城市发展趋势（无锡会议）-杨冰之',
        '2019年北京国脉互联开票通知单（模版）201904',
        '数据基因白皮书V8.0'],
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
