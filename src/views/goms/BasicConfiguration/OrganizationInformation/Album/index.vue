<template>
  <div class="album">
    <div class="album-block">
      <div class="title">
        <span>2019年4月</span>
      </div>
      <div class="album-list">
        <el-upload
          class="upload-demo"
          drag
          action=""
          multiple>
          <i class="icon-xinzeng"></i>
          <div class="el-upload__text">上传图片</div>
        </el-upload>
      </div>
    </div>
    <div class="album-block">
      <div class="title">
        <span class="time">2019年3月</span>
        <span class="num">(共{{90}}张)</span>
        <i :class="isRotate" class="el-icon-arrow-down" @click="handleClick"></i>
      </div>
      <div class="album-lib" v-show="isShow">
        <div class="lib-ibox" v-for="(item,index) in imgList" :key="index">
          <img :src="item.imgSrc" alt="">
          <i class="icon-shanchu1 close" @click="handleClose(index)"></i>
          <span>{{item.desc}}</span>
        </div>
      </div>
    </div>
  </div>
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
      isShow: true,
      isRotate: '',
    }
  },
  methods:{
    handleClick () {
      this.isShow = !this.isShow
      this.isRotate = this.isRotate? '':'isRotate'
    },
    handleClose (index) {
      this.imgList.splice(index,1)
    },
  },
}
</script>
<style scoped lang='scss'>
.album{
  .album-block{
    margin-bottom: 30px;
  }
  .title{
    font-size: 16px;
    color:#333;
    .isRotate{
      transform: rotate(-90deg);
      transition: .3s;
    }
    .time{
      margin-right: 5px;
    }
    .num{
      margin-right: 10px;
      color:#999;
    }
    i{
      cursor: pointer;
      color:#999;
      vertical-align: -1px;
    }
  }
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
        width: 260px;
        height:135px;
      }
      span{
        display:block;
      }
      .close{
        position: absolute;
        right:-9px;
        top:-9px;
        width: 18px;
        height: 18px;
        font-size: 14px!important;
        background-color: #fff;
        color:#ccc;
        border-radius: 50%;
        line-height: 18px;
        cursor: pointer;
        &:hover{
          color:#fff;
          background-color: #f9eae7;
        }
      }
    }
  }
}
</style>
<style scoped>
.album >>> .el-upload-dragger{
  padding: 30px 100px 38px;
  width:inherit;
  height:inherit;
}
.album >>> .el-upload__text{
  line-height: 22px;
  color:#999;
}
</style>
