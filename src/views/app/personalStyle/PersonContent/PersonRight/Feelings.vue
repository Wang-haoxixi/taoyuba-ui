<template>
  <div class="feelings">
    <IepAppTabCard :title="title">
      <el-button class="btn" type="text" slot="right">发表感想</el-button>
      <div class="dynamicList">
        <div v-for="(item,index) in dynamicList" :key="index" class="piece">
          <span>{{item.text}}</span>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showClass: 0,
      title: '个人感想',
      dynamicList: [{ text: '执行力胜过一切竞争力！' }, { text: '现实生活的人生感悟短语' }, { text: '人生最大的痛，其实是无奈' }, { text: '有压力不要压抑，有危机感不要有焦虑感' }, { text: '越是折磨自己的，越是自己在乎的' }, { text: '人生最宝贵的不是你拥有的物质，而是…' }],
    }
  },
}
</script>
<style lang="scss" scoped>
.feelings {
  margin-bottom: 30px;
  .btn {
    float: right;
    padding: 5px 0;
    color: #cb3737;
    &:hover {
      color: #f56c6c;
    }
  }
}
.dynamicList {
  .piece {
    position: relative;
    padding-left: 15px;
    cursor: pointer;
    height: 34px;
    line-height: 34px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    &:hover {
      color: #cb3737;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 14px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;
    }
    .dn {
      opacity: 0;
    }
  }
}
</style>
