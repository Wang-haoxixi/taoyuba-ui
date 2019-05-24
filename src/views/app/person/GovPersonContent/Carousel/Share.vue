<template>
  <div class="share">
    <el-carousel height="200px" :interval="5000" indicator-position="none">
      <el-carousel-item v-for="item in 4" :key="item">
        <div v-for="(item,index) in wonderfulList" :key="index" class="piece">
          <div class="img"><img :src="item.img" class="img"></div>
          <span class="name">{{item.name}}</span>
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
        { name: '国脉海洋信息发展有限公司', img: '../../img/department/d1.jpg' },
        { name: '国脉湖南子公司', img: '../../img/department/d2.jpg' },
        { name: '集团平台运营中心', img: '../../img/department/d3.jpg' },
        { name: '集团研发中心', img: '../../img/department/d4.jpg' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.share {
  padding-top: 15px;
  .piece {
    text-align: center;
    width: 272px;
    float: left;
    margin: 0 5px;
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
    .name {
      line-height: 40px;
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
