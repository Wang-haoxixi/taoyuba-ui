<template>
  <div>
    <div v-for="(item,index) in leaderBoardList" :key="index" class="piece">
      <span class="name">{{item.name}}</span>
      <span class="num fr">{{item.num}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      leaderBoardList: [
        { name: '赵某某', num: 67 },
        { name: '首谋', num: 66 },
        { name: '赵某某', num: 8568 },
        { name: '首谋', num: 6 },
        { name: '楼晓燕', num: 8658 },
        { name: '红某某', num: 88 },
        { name: '楼晓燕', num: 88 },
        { name: '红某某', num: 88 },
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
    display: inline-block;
    width: 30%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .num {
    vertical-align: 5px;
  }
  .fr{
    float:right;
  }
  &:hover {
    color: #cb3737;
  }
}
</style>
