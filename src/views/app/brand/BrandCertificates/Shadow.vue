<template>
  <div class="shadow">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item class="department-con" v-for="(item,index) in itemList" :key="index">
        <div class="department-list piece" v-for="item in item.childList" :key="item.id">
          <div class="img"><img :src="item.img" alt="" class="img"></div>
          <span class="sub-title name">{{ item.subtitle }}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      itemList: [{
        childList: [
          {
            id: '1',
            img: '../../img/department/d1.jpg',
            subtitle: '集团平台运营中心',
          },
          {
            id: '2',
            img: '../../img/department/d2.jpg',
            subtitle: '集团平台运营中心',
          },
          {
            id: '3',
            img: '../../img/department/d3.jpg',
            subtitle: '集团平台运营中心',
          },
          {
            id: '4',
            img: '../../img/department/d4.jpg',
            subtitle: '集团平台运营中心',
          }],
      },
      {
        childList: [
          {
            id: '5',
            img: '../../img/department/d5.jpg',
            subtitle: '集团平台运营中心',
          },
          {
            id: '6',
            img: '../../img/department/d2.jpg',
            subtitle: '集团平台运营中心',
          },
          {
            id: '7',
            img: '../../img/department/d3.jpg',
            subtitle: '集团平台运营中心',
          },
          {
            id: '8',
            img: '../../img/department/d4.jpg',
            subtitle: '集团平台运营中心',
          },
        ],
      }],
    }
  },
}
</script>

<style scoped lang="scss">
.shadow {
  padding-top: 15px;
  .piece {
    text-align: center;
    width: 270px;
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
<style scoped>
.shadow >>> .el-carousel__container{
  height: 200px;
}
</style>
