<template>
  <div>
    <div v-for="(item,index) in leaderBoardList" :key="index" class="piece">
      <span class="count" :class="item.color">{{index+1}}</span>
      <span class="name">{{item.name}}</span>
      <img v-if="item.isShow" :src="item.imgSrc" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      leaderBoardList: [
        { name: '第九届现代都市农业高层论坛', color: 'red',isShow:true,imgSrc:require('../images/banner3.jpg') },
        { name: '第九届现代都市农业高层论坛', color: '',isShow:false },
        { name: '第九届现代都市农业高层论坛', color: '',isShow:false },
        { name: '第九届现代都市农业高层论坛', color: '' ,isShow:false},
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
  margin-bottom: 10px;
  cursor: pointer;
  .name {
    height: 26px;
    line-height: 26px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .count {
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    margin-right: 15px;
    background-color: #ccc;
    color: #fff;
    display: inline-block;
  }
  .red {
    background-color: #bb1a20;
  }
  .grade {
    float: right;
    color: #bb1a20;
  }
  &:hover {
    color: #0185d8;
  }
  img{
    display:block;
    margin-top: 10px;
    width:100%;
    height:120px;
  }
}
</style>
