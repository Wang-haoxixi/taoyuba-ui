<template>
  <div class="reward-con">
    <iepAppTabCard :title="title" :linkName="linkName" :data="data" isMore>
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
      title: '悬赏任务',
      data: '(23件)',
      reward: [
        { name: '关于项目验收表格材料标准化模版', money: '2000贝' },
        { name: '微服务设计入门', money: '已结束', bg: 'bgc' },
        { name: '微服务-框架', money: '2000贝' },
        { name: '微服务架构与SpringCloud', money: '2000贝' },
        { name: '浙江省目录系统普查系统业务流程分享', money: '2000贝' },
        { name: '如何使用 Python 语言来编码和解码 ', money: '2000贝' },
        { name: '关于项目验收表格材料标准化模版', money: '已结束', bg: 'bgc' }],
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.reward {
  .piece {
    cursor: pointer;
    position: relative;
    margin-left: 15px;
    .name {
      display: inline-block;
      width: 70%;
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
    &:before {
      content: "";
      position: absolute;
      left: -15px;
      top: 14px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;
    }
  }
}
</style>
<style scoped>
.reward-con >>> .el-card__body {
  height: 270px;
}
</style>
