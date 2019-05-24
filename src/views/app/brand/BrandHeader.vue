<template>
  <div class="block">
    <el-carousel trigger="click" height="400px">
      <el-carousel-item v-for="(item,index) in header" :key="index">
        <img style="width:100%;heiht:100%;" :src="item.imgSrc" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data () {
    return {
      header: [
        { imgSrc: require('./images/header1.jpg') },
        { imgSrc: require('./images/header1.jpg') },
        { imgSrc: require('./images/header1.jpg') },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
