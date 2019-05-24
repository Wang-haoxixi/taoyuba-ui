<template>
  <div class="banner">
    <el-card class="banner-list" shadow="hover" v-for="banner in bannerList" :key="banner.id">
      <span class="title">{{banner.title}}</span>
      <img class="img" :src="banner.img" alt="">
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      bannerList: [
        {
          id: '1',
          img: '../img/bg/banner1.jpg',
          title: '中国建设银行总行首席经济学家黄志凌一行莅临舟山国脉考察',
        },
        {
          id: '2',
          img: '../img/bg/banner2.jpg',
          title: '国脉总经理郑爱军荣获“浙江创业女杰',
        },
        {
          id: '3',
          img: '../img/bg/banner3.jpg',
          title: '热烈庆祝广州国脉公司乔迁开业',
        },
      ],
    }
  },
}
</script>
  <style lang="scss" scoped>
.banner {
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 5px;
  grid-column-gap: 5px;
  .banner-list {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
    .title {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0 20px;
      height: 30px;
      line-height: 30px;
      background-color: rgba(0, 0, 0, 0.7);
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      z-index: 10;
    }
  }
  .banner-list:nth-child(1) {
    grid-column: 1 / 5;
    grid-row: 1 / 9;
  }
  .banner-list:nth-child(2) {
    grid-column: 6 / 8;
    grid-row: 1 / 4;
  }
  .banner-list:nth-child(3) {
    grid-column: 6 / 8;
    height: 170px;
    grid-row: 6/ 9;
  }
}
</style>
<style scoped>
.banner >>> .el-card {
  border-radius: 0;
}
.banner >>> .el-card__body {
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>

