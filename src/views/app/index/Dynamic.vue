<template>
  <div class="baner">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <IepAppAssortCard :dataList="dataList"></IepAppAssortCard>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '国脉动态',
      dataList: [
        {assort:'【喜报】',desc:'国脉海洋获质量管理体系认证'},
        {assort:'【要闻】',desc:'中国建设银行总行首席经济学专家'},
        {assort:'【喜报】',desc:'热烈庆祝广州国脉公司乔迁开业'},
        {assort:'【喜报】',desc:'国脉总经理郑爱军荣获“浙江创业女杰'},
        {assort:'【要闻】',desc:'国脉总经理郑爱军受邀为长三角地区作'},
        {assort:'【要闻】',desc:'首届长三角营商环境论坛在沪召开'},
      ],
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
