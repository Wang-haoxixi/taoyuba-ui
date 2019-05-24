<template>
  <IepAppTabCard :title="title">
    <div class="empolyee">
      <el-carousel height="200px" :interval="5000" indicator-position="none">
        <el-carousel-item v-for="item in 4" :key="item">
          <div v-for="(item,index) in wonderfulList" :key="index" class="piece">
            <div class="img"><img :src="item.img" class="img"></div>
            <span class="name">{{item.name}}</span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </IepAppTabCard>
</template>

<script>
export default {
  data () {
    return {
      title: '项目团队风采',
      wonderfulList: [
        { name: '数据基因项目组', img: '//183.131.134.242:10060/upload/iep/201904/2cab9b7e-77cd-4e5c-9039-6c05f27e2529_20180709150516_jg3j6m3qre.jpg'},
        { name: '营商通项目组', img: '//183.131.134.242:10060/upload/iep/201904/2cab9b7e-77cd-4e5c-9039-6c05f27e2529_20180709150516_jg3j6m3qre.jpg'},
        { name: '营商通项目组', img: '//183.131.134.242:10060/upload/iep/201904/2cab9b7e-77cd-4e5c-9039-6c05f27e2529_20180709150516_jg3j6m3qre.jpg'},
        { name: '营商环境项目组', img: '//183.131.134.242:10060/upload/iep/201904/2cab9b7e-77cd-4e5c-9039-6c05f27e2529_20180709150516_jg3j6m3qre.jpg' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.empolyee {
  padding-top: 15px;
  .piece {
    text-align: center;
    width: 260px;
    float: left;
    margin: 0 14px;
    cursor: pointer;
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
    &:hover .name {
      color: #cb3737;
    }
    .name {
      line-height: 40px;
    }
  }
}
</style>