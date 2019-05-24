<template>
  <div class="bobobx">
    <div class="titleBox">
      <div class="divBox">
        <div class="divone"></div>
        <div class="divtwo"></div>
      </div>
      <p class="tit">信息资源格式分类</p>
    </div>
    <div class="classifya">
      <classi-fy></classi-fy>
    </div>
  </div>
</template>

<script>
  import ClassiFy from './ClassiFy/'
  export default {
    components:{
      ClassiFy,
    },
    data () {
      return {

      }
    },
  }
</script>

<style lang="scss" scoped>
  .font-title{
    width: 100px;
    height: 500px;
    position: absolute;
    left: 0;
    right: 0;
    background: #000;
  }
// titlebox
.bobobx{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.classifya{
  width: 498px;
  height: 470px;
  position: absolute;
  left: 0;
  top: 0;
}
.titleBox{
  color: #fff;
  margin-top: 20px;
  margin-left: 25px;
  position: relative;
  .divBox{
    width: 15px;
    height: 25px;
    // background-color: yellow;
    display: inline-block;
    .divone{
      width: 5px;
      height: 15px;
      margin-top: 5px;
      float: left;
      background-color: #152D67;
    }
    .divtwo{
      width: 5px;
      height: 25px;
      float: right;
      background-color: #154897;
    }
  }
  .tit{
    display: inline-block;
    vertical-align: top;
    padding-left: 10px;
    color: #F9FFFF;
  }
}
</style>
