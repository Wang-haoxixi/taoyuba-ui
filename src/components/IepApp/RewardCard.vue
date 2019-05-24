<template>
  <div class="box">
    <div class="title">打赏是对分享者的最大赞许</div>
    <iep-button type="danger" round style="padding:8px 40px">打赏</iep-button>
    <span class="total">{{total}}人打赏</span>
    <div v-for="(item,index) in dataList" :key="index" class="avatar">
      <img :src="item.avatar" :alt="item.name">
    </div>
  </div>
</template>
<script>
export default {
  name: 'IepAppRewardCard',
  props: {
    total: {
      type: String,
      default: '0',
    },
    dataList: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data () {
    return {
      
    }
  },
  methods: {
  },
}
</script>
<style lang="scss" scoped>
.box{
  width: 100%;
  padding: 10px 0 20px;
  background-color: #fafafa;
  text-align: center;
  .title{
    height: 50px;
    line-height: 50px;
    color: #333;
    font-size: 16px;
  }
  .total{
    display: block;
    height: 32px;
    line-height: 32px;
  }
  .avatar{
    display: inline-block;
    > img{
      width: 40px;
      height: 40px;
      margin: 5px;
      border-radius: 50%;
    }
  }
}
</style>
