<template>
  <div class="brand-banner">
    <div class="banner-item" v-for="(item,index) in banner" :key="index">
      <div class="grid-content">
        <img style="width:100%;height:150px;" :src="item.imgSrc" alt="">
        <div class="masking-layer" v-for="(item,index) in layer" :key="index">
          <p class="title">{{item.title}}</p>
          <p class="time">时间：{{item.time}}</p>
          <p class="space">地点：{{item.space}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      banner: [
        { imgSrc: require('./images/banner1.png') },
        { imgSrc: require('./images/banner2.jpg') },
        { imgSrc: require('./images/banner3.jpg') },
      ],
      layer: [
        {title:'2019珠三角营商环境专题论坛',time:'2019-04-02 13:30',space:'广州大厦（广州市越秀区北京路374号）'},
      ],
    }
  },
}
</script>
<style scoped lang='scss'>
.brand-banner {
  display: flex;
  grid-column-start: 1;
  grid-column-end: 4;
  .banner-item:nth-last-child(1){
    margin-right: 0;
  }
  .banner-item{
    width: 33.333%;
    margin-right: 30px;
        .grid-content:hover .masking-layer{
          display:block;
        }
      .grid-content {
        width: 100%;
        position: relative;
        cursor: pointer;
        .masking-layer{
          display:none;
          position:absolute;
          padding: 33px 20px;
          left:0;
          top:0;
          width:100%;
          height:100%;
          background-color: rgba(255,255,255,.9);
          p{
            margin-bottom: 0;
            font-size: 14px;
            color: #aaa;
          }
          .title{
            font-size: 18px;
            color:#000;

          }
        }
      }
  }
}
</style>
