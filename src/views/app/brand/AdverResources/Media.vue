<template>
  <div>
    <div v-for="(item,index) in leaderBoardList" :key="index" class="piece">
      <span class="count" :class="item.color">{{item.status}}</span>
      <span class="name">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      leaderBoardList: [
        { name: '首届长三角营商环境论坛在沪召开的', color: 'red', status: '空余' },
        { name: '蟠桃会首页“本月会议”广告', color: 'red', status: '空余' },
        { name: '首届长三角营商环境论坛在沪召开的', color: 'red', status: '空余' },
        { name: '首届长三角营商环境论坛在沪召开的', color: 'gray', status: '排满' },
        { name: '蟠桃会首页“本月会议”广告', color: 'red', status: '空余' },
        { name: '首届长三角营商环境论坛在沪召开的', color: 'red', status: '空余' },
        { name: '首届长三角营商环境论坛在沪召开的', color: 'gray', status: '排满' },
        { name: '首届长三角营商环境论坛在沪召开的', color: 'red', status: '空余' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.piece {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 8px;
  height: 30px;
  cursor: pointer;
  .name {
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .count {
    padding: 3px 5px;
    line-height: 13px;
    text-align: center;
    margin-right: 20px;
    background-color: #fff;
    color: #bb1a20;
    border: 1px solid #bb1a20;
    border-radius: 5px;
    display: inline-block;
  }
  .red {
    background-color: #fff;
  }
  .gray {
    color: gray;
    border: 1px solid gray;
  }
  .grade {
    float: right;
    color: #bb1a20;
  }
  &:hover {
    color: #cb3737;
  }
}
</style>
