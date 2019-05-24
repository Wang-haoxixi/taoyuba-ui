<template>
  <IepAppTabCard :title="title" :linkName="linkName">
       <div slot="right" v-for="(item,index) in selectList" :key="index" class="piece-tab" :class="showClass==index?'color':''" @click="tab(index)">{{item}}</div>
      <IepAppListCard :dataList="dataList"></IepAppListCard>
  </IepAppTabCard>
</template>
<script>
export default {
  data () {
    return {
      showClass: 2,
      title:'品牌活动',
      selectList: ['培训', '评估', '会议'],
      linkName:'',
        dataList: [
        '2019首届长三角地区营商环境论坛',
        '2019珠三角营商环境与数字政府理论与实践',
        '2019首届长三角地区营商环境论坛',
        '2019珠三角营商环境与数字政府理论与实践',
        '全球敏捷运维峰会',
        '2019珠三角营商环境与数字政府理论与实践',
        '全球敏捷运维峰会',
        '2019首届长三角地区营商环境专题论坛',
        ],
    }
  },
  methods: {
    tab (val) {
      this.showClass = val
    },
  },
}
</script>
<style lang='scss' scoped>
.piece-tab {
    float:right;
    padding: 2px 10px;
    border-radius: 12px;
    border: 1px solid #ffffff;
    margin: 0 10px;
    cursor: pointer;
    &:hover {
    background-color: #fef6f4;
    border: 1px solid #dc8687;
    color: #dc8687;
    }
}
.color {
    background-color: #fef6f4;
    border: 1px solid #dc8687;
    color: #dc8687;
}
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
