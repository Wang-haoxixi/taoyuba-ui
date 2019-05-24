<template>
<div class="whole">
  <div class="whole-box" v-for="(item,index) in wholeList" :key="index">
    <div class="whole-item">
      <img :src="item.imgSrc" alt="">
    </div>
    <p>{{item.description}}</p>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      wholeList: [
        {imgSrc:require('./image/cert1.png'),description:'舟山市国脉最多跑一次改革研究服务中心--民办非企业单位登记证书'},
        {imgSrc:require('./image/cert2.png'),description:'高新技术企业证书--中通船'},
        {imgSrc:require('./image/cert3.png'),description:'国脉内容管理及发布系统'},
        {imgSrc:require('./image/cert4.png'),description:'数据基因基于应用场景的数据架构管理体系'},
        {imgSrc:require('./image/cert5.png'),description:'DIP栏目及内容管理软件2.0'},
        {imgSrc:require('./image/cert1.png'),description:'舟山市国脉最多跑一次改革研究服务中心--民办非企业单位登记证书'},
        {imgSrc:require('./image/cert2.png'),description:'高新技术企业证书--中通船'},
        {imgSrc:require('./image/cert3.png'),description:'国脉内容管理及发布系统'},
        {imgSrc:require('./image/cert4.png'),description:'数据基因基于应用场景的数据架构管理体系'},
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.whole{
  display:flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .whole-box{
    width:28%;
    margin: 20px 0;
    .whole-item{
     border: 1px solid #ccc;
      img{
        width: 272px;
        height: 250px;
      }
    }
    p{
      font-size: 14px;
      color: #333;
      text-align: center;
    }
  }
}
</style>


