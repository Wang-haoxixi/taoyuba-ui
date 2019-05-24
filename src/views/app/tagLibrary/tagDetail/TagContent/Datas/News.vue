<template>
<div class="news">
  <div class="news-item" v-for="(item,index) in itemList" :key="index">
    <span class="title">{{item.title}}</span>
    <span class="time fr">{{item.time}}</span>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      itemList:[
        {title:'国脉总经理郑爱军荣获浙江创业女杰',time:'2019-04-17'},
        {title:'2018年度国脉“精彩瞬间评选”活动进入投票环节：请您投票助力国脉精彩',time:'2019-03-08'},
        {title:'2018国脉互联广佛秋季团建活动圆满收官',time:'2018-12-22'},
        {title:'国脉总经理郑爱军荣获浙江创业女杰',time:'2019-04-17'},
        {title:'2018年度国脉“精彩瞬间评选”活动进入投票环节：请您投票助力国脉精彩',time:'2019-03-08'},
        {title:'2018国脉互联广佛秋季团建活动圆满收官',time:'2018-12-22'},
        {title:'国脉总经理郑爱军荣获浙江创业女杰',time:'2019-04-17'},
        {title:'2018年度国脉“精彩瞬间评选”活动进入投票环节：请您投票助力国脉精彩',time:'2019-03-08'},
        {title:'2018国脉互联广佛秋季团建活动圆满收官',time:'2018-12-22'},
      ],
    }
  },
}
</script>
<style scoped lang='scss'>
.fr{
  float:right;
}
.news-item{
  overflow: hidden;
  line-height: 32px;
  font-size: 14px;
  color:#333;
  .time{
    color: #999;
  }
}
</style>
