<template>
  <div class="organizational-dynamics-con">
    <div class="organizational-dynamics">
      <div v-for="(item,index) in organizationalDynamics" :key="index" class="piece">
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
      organizationalDynamics: [
        { name: '国脉海南项目获海南省十佳大数据', time: '2019-04-03' },
        { name: '高效支撑海南实现数据共享100%', time: '2019-03-03' },
        { name: '国脉海洋荣获国家高新技术企业认定', time: '2019-04-03' },
        { name: '国脉海洋中标舟山生态环境数字化', time: '2019-04-03' },
        { name: '国脉海洋中标三亚市政务服务事项', time: '2019-04-03' },
        { name: '国脉集团董事长杨冰之出席2018国', time: '2019-01-03' }],
    }
  },
}
</script>
<style lang="scss" scoped>
.organizational-dynamics {
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
.organizational-dynamics-con >>> .el-card__body {
  height: 270px;
}
</style>
