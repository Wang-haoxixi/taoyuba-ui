<template>
  <div class="zone">
    <iepAppTabCard :title="title" :linkName="linkName" :data="data" isMore>
      <IepAppAssortCard :dataList="dataList"></IepAppAssortCard>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '互动专区',
      data: '(15次)',
      dataList: [{ assort: '【评选】', desc: '2018年度国脉精彩瞬间评选' }, { assort: '【评选】', desc: '优秀员工评选' }, { assort: '【评选】', desc: '最美国脉人活动评选' }, { assort: '【调研】', desc: '关于财富动态分配的调查问卷' }, { assort: '【调研】', desc: '关于公司产品模块化开发的意见征集' }, { assort: '【调研】', desc: '国脉物联网两大研究中心' }, { assort: '【调研】', desc: '国脉物联网3.0版上线' }],
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
</style>

<style scoped>
.zone >>> .el-card__body {
  height: 270px;
}
</style>
