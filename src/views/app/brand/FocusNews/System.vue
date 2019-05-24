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
        { name: '中国互联网保险创新峰会2019', color: 'red',isShow:true,imgSrc:require('../images/banner2.jpg') },
        { name: '中国互联网保险创新峰会2019', color: '',isShow:false },
        { name: '中国互联网保险创新峰会2019', color: '',isShow:false },
        { name: '中国互联网保险创新峰会2019', color: '' ,isShow:false},
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
    color: #cb3737;
  }
  img{
    display:block;
    margin-top: 10px;
    width:100%;
    height:120px;
  }
}
</style>
