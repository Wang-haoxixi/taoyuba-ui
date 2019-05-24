<template>
  <div class="honor">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <IepAppListCard :dataList="dataList"></IepAppListCard>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '文化制度',
      dataList: [
        '制度|国脉互联各子公司相关惩罚管理',
        '文件|薪资福利及股权激励相关通知',
        '制度|国脉互联班委会管理制度',
        '制度|关于加强国脉平台发展的指导意见',
        '文件|关于集团组织架构、五大板块管理',
        '文件|关于项目验收表格材料标准化模版',
        '制度|国脉商务礼仪规范与工作守则',
        '制度|内网个人风采页完善指标项及信息填写规范'],
      linkName: '',
    }
  },
}
</script>
