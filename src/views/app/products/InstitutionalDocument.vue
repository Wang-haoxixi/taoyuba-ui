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
      title: '制度文件',
      dataList: [
        '制度|浙江省人民政府办公厅关于加快推进“标准地”改革的实施意见',
        '文件|上海市信息化发展专项资金操作流程图',
        '文件|DB52∕T 1123-2016政府数据 数据分类分级指南',
        '制度|关于印发《武汉市建设工程联合验收暂行规定》的通知',
        '文件|GB_T 32170.2-2015 政务服务中心标准化工作指南__第1部分：标准体系',
        '文件|智慧城市时空大数据平台建设技术大纲',
        '制度|宁波市智慧城市发展总体规划',
        '文件|数据基因白皮书V8.0'],
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
