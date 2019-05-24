<template>
  <div class="institutional">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <IepAppListCard :dataList="dataList"></IepAppListCard>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '制度文件',
      dataList: ['关于项目验收表格材料标准化模版', '国脉软件项目实施管理规范V1.0', '广东省信息中心全省事项通用实施目', '松原市人民政府网站内容规划总报告', '吉林省安监局政务公开评测报告', '上海市长宁区信息公开第三方评议项报告', '广东省信息中心全省事项通用实施目', '松原市人民政府网站内容规划总报告'],
      linkName: '',
    }
  },
}
</script>
<style scoped>
</style>
