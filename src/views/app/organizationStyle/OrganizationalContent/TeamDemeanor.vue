<template>
  <div class="empolyee">
    <el-carousel height="165px" :interval="5000" indicator-position="none">
      <el-carousel-item v-for="item in 4" :key="item">
        <div v-for="(item,index) in wonderfulList" :key="index" class="piece">
          <div class="img"><img :src="item.img" class="img"></div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      wonderfulList: [
        { img: require('../img/organization1.jpg') },
        { img: require('../img/organization2.jpg') },
        { img: require('../img/organization3.jpg') },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.empolyee {
  padding-top: 15px;
  .piece {
    float: left;
    margin: 0 5px;
    width: 240px;
    text-align: center;
    overflow: hidden;
    .img {
      width: 100%;
      height: 165px;
      overflow: hidden;
      img {
        width: 100%;
        height: 165px;
        transition: 0.5s;
        &:hover {
          cursor: pointer;
          transform: scale(1.1);
        }
      }
    }
    &:first-child {
      margin: 0 15px 0 10px;
    }
    &:last-child {
      margin: 0 10px 0 15px;
    }
  }
}
</style>