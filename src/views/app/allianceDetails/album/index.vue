<template>
    <el-collapse v-model="activeNames" class="album">
      <el-collapse-item title="2019年4月" name="1" class="album-block">
        <div class="album-lib">
          <div class="lib-ibox" v-for="(item,index) in imgList" :key="index">
            <img :src="item.imgSrc" alt="">
            <span>{{item.desc}}</span>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="2019年3月" name="2" class="album-block">
        <div class="album-lib">
          <div class="lib-ibox" v-for="(item,index) in imgList" :key="index">
            <img :src="item.imgSrc" alt="">
            <span>{{item.desc}}</span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
</template>
<script>
export default {
  data () {
    return {
      imgList:[
        {imgSrc:'//183.131.134.242:10060/upload/iep/201904/11b1fdf3-68a1-41d1-954d-61054b3f9648_20190117093354_036bter376.jpg',desc:'集团平台营运中心'},
        {imgSrc:'//183.131.134.242:10060/upload/iep/201904/11b1fdf3-68a1-41d1-954d-61054b3f9648_20190117093354_036bter376.jpg',desc:'集团平台营运中心'},
        {imgSrc:'//183.131.134.242:10060/upload/iep/201904/11b1fdf3-68a1-41d1-954d-61054b3f9648_20190117093354_036bter376.jpg',desc:'集团平台营运中心'},
        {imgSrc:'//183.131.134.242:10060/upload/iep/201904/11b1fdf3-68a1-41d1-954d-61054b3f9648_20190117093354_036bter376.jpg',desc:'集团平台营运中心'},
        {imgSrc:'//183.131.134.242:10060/upload/iep/201904/11b1fdf3-68a1-41d1-954d-61054b3f9648_20190117093354_036bter376.jpg',desc:'集团平台营运中心'},
      ],
      activeNames: ['1','2'],
    }
  },
  methods:{
  },
}
</script>
<style scoped lang='scss'>
.album{
  padding: 20px;
  .album-list{
    padding: 20px 15px;
    color:#ccc;
    i{
      display:block;
      font-size: 34px!important;
    }
  }
  .album-lib{
    padding: 20px 15px;
    .lib-ibox{
      position: relative;
      display:inline-block;
      margin-bottom: 20px;
      margin-right: 50px;
      text-align: center;
      img{
        margin-bottom: 10px;
        width: 240px;
        height:135px;
      }
      span{
        display:block;
      }
    }
  }
}
</style>
<style scoped>
.album >>> .el-collapse-item__arrow{
  margin: 0 auto 0 8px;
}
.album>>>.el-collapse-item__content{
  padding-bottom: 0;
}
.album>>>.el-collapse-item__wrap{
  border-bottom: none;
}
.album >>> .el-upload-dragger{
  padding: 30px 100px 38px;
  width:inherit;
  height:inherit;
}
.album >>> .el-upload__text{
  line-height: 22px;
  color:#999;
}
.album >>> .el-collapse-item__header{
  font-size: 16px;
  color:#333;
}
</style>
