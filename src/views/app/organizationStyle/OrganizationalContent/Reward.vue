<template>
  <div class="reward-con">
    <iepAppTabCard :title="title" :linkName="linkName" icon isMore>
      <div class="reward">
        <div v-for="(item,index) in reward" :key="index" class="piece">
          <span class="name">{{item.name}}</span>
          <span class="money" :class="item.bg">{{item.money}}</span>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '任务悬赏',
      reward: [
        { name: '关于项目验收表格材料标准化模版', money: '2000贝' },
        { name: '微服务设计入门', money: '已结束', bg: 'bgc' },
        { name: '微服务-框架', money: '2000贝' },
        { name: '微服务架构与SpringCloud', money: '2000贝' },
        { name: '浙江省目录系统普查系统业务流程分享', money: '2000贝' },
        { name: '如何使用 Python 语言来编码和解码 ', money: '2000贝' },
        { name: '微服务架构与SpringCloud ', money: '2000贝' },
        { name: '浙江省目录系统普查系统业务流程分享', money: '2000贝' },
        { name: '关于项目验收表格材料标准化模版', money: '已结束', bg: 'bgc' }],
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.reward-con {
  margin-bottom: 30px;
}
.reward {
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
    .money {
      float: right;
      height: 30px;
      line-height: 30px;
      color: #cb3737;
    }
    .bgc {
      padding: 0 5px;
      font-size: 12px;
      border: 1px solid #ddd;
      background-color: #fafafa;
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
.reward-con >>> .el-card__body {
  height: 330px;
}
</style>
