<template>
  <div>
    <div v-for="(item,index) in leaderBoardList" :key="index" class="piece">
      <img :src="item.imgSrc" alt="">
      <div class="expert">
        <p class="name">{{item.name}}</p>
        <p class="des">{{item.des}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      leaderBoardList: [
        { imgSrc: require('../images/expert1.jpg'), name: '杨冰之（文章576）', des: '国脉集团董事长' },
        { imgSrc: require('../images/expert2.png'), name: '郑爱军', des: '国脉集团总经理' },
        { imgSrc: require('../images/expert3.png'), name: '王路燕', des: '国脉集团总助' },
        { imgSrc: require('../images/expert4.png'), name: '刘林英', des: '智慧城市咨询研究专家' },
        { imgSrc: require('../images/expert5.jpg'), name: '谢海艳', des: '信息化研究专家' },
        { imgSrc: require('../images/expert6.jpg'), name: '陈飞娜', des: '互联网+船舶规划咨询师' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.piece:nth-last-child(1),.piece:nth-last-child(2){
  margin-bottom: 0;
}
.piece {
  display: inline-block;
  width: 50%;
  margin-top:8px;
  margin-bottom: 14px;
  img {
    width: 55px;
    height: 60px;
    vertical-align: top;
    margin-right: 10px;
  }
  .expert {
    display: inline-block;
    p:nth-child(1) {
      margin-bottom: 0;
    }
  }
  .des {
    font-size: 14px;
    color: #aaa;
  }
}
</style>