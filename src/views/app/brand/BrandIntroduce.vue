<template>
  <div class="grid-content">
    <iepAppTabCard :title="title" :linkName="linkName">
      <div class="introduce">
        <span v-text="introduce"></span>
        <span class="red" style="display:inline-block;margin-bottom:15px;">【详细】</span>
        <div class="task">
          <i class="el-icon-arrow-left"></i>
          <div class="img-list" v-for="(item,index) in img" :key="index"> 
            <img :src="item.imgSrc">
            <span>{{item.name}}</span>
          </div>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="feedback">
          <span> <i class="icon-custom"></i> 意见与建议</span>
          <span class="fr"> <i class="icon-tousu"></i> 投诉与举报</span>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '品牌、平台与研究委员会介绍',
      linkName: '',
      img: [
        { imgSrc: require('./images/expert1.jpg'),name:'杨冰之' },
        { imgSrc: require('./images/expert2.png'),name:'郑爱军'},
        { imgSrc: require('./images/expert3.png'),name:'王路燕'},
      ],
      introduce: '委员会做出的决策都是经过集体讨论并通过的，因而它有利于避免权力过分集中，防止一个人独断专行。',
    }
  },
}
</script>
<style lang='scss' scoped>
.el-card {
  height: 325px;
}
.title {
  color: #000;
}
.introduce {
  &>span{
    line-height: 25px;
  }
  .task {
    margin-bottom: 15px;
    i {
      display: inline-block;
      font-size: 26px;
      color: #ccc;
      vertical-align: 40px;
    }
    .img-list{
      display:inline-block;
      margin: 0 3px;
      span{
        display:block;
        text-align: center;
      }
    }
    img {
      display: inline-block;
      margin: 8px;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      background-color: #ccc;
    }
  }
}
.feedback {
  display: flex;
  justify-content: space-between;
  span {
    display:inline-block;
    padding-left:5px;
    width:47%;
    background-color: #f2f2f2;
    line-height:35px;
    cursor: pointer;
    i{
      margin-right: 5px;
      font-size: 24px!important;
      color:#aaa;
      vertical-align: -4px;
    }
  }
}
.red {
  color: #bb1a20;
}
</style>
