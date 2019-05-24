<template>
  <div class="events-con">
    <div class="events">
      <div v-for="(item,index) in eventsList" :key="index" class="piece">
        <span class="name">{{item.name}}</span>
        <span class="time">{{item.time}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: '（10条）',
      eventsList: [
        { name: '国脉集团助力首届“数字舟山，智慧海洋”论坛', time: '2019-04-28' },
        { name: '海淀区政务服务数据分析项目顺利通过专家评审', time: '2019-03-03' },
        { name: '国脉海洋荣获国家高新技术企业认定', time: '2019-04-24' },
        { name: '2019第四期政务大数据、数字政府高级研修班成功举办', time: '2019-04-21' },
        { name: '2019国脉春季中高层研讨会在舟山圆满举行', time: '2019-04-17' },
        { name: '国脉海洋获质量管理体系认证', time: '2019-03-29' }],
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.events {
  .piece {
    cursor: pointer;
    position: relative;
    .name {
      display: inline-block;
      width: 200px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .time {
      float: right;
      height: 30px;
      line-height: 30px;
      color: #999;
    }
    &:hover {
      color: #cb3737;
      &:before {
        background-color: #cb3737;
      }
    }
  }
}
</style>
<style scoped>
.events-con >>> .el-card__body {
  height: 270px;
}
</style>
