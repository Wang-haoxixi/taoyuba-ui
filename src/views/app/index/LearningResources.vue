<template>
  <div class="learning-resources">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <IepAppListCard :dataList="dataList"></IepAppListCard>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '学习资源',
      dataList: [
        '关于项目验收表格材料标准化模板',
        '微服务设计入门',
        '微服务-框架',
        '微服务架构与SpringCloud',
        '浙江省目录系统普查系统业务流程分享',
        '如何使用Python语言来编码和解码',
        '微服务架构起源、简介及设计',
        '郑总微信语言培训《品牌活动和客户拜访》'],
      linkName: '',
    }
  },
}
</script>
