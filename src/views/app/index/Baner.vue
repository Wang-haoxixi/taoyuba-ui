<template>
  <div class="baner">
    <el-carousel :interval="5000" class="index-card">
        <el-carousel-item v-for="(item,index) in img" :key="index" class="baner-box">
            <img :src="item" class="img">
        </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data () {
    return {
      img: [
        require('./img/baner1.png'),
        require('./img/baner2.jpg'),
        require('./img/baner3.jpg'),
        require('./img/baner4.jpg'),
        require('./img/baner5.jpg'),
      ],
    }
  },
}
</script>
<style scoped>
.el-carousel >>> .el-carousel__container{
  height: 293px;
}
</style>

<style lang="scss" scoped>
.index-card{
  height: 293px;
  .baner-box{
    height: 293px;
    .img{
      width: 100%;
      height: 293px;
    }
  }
}

</style>
