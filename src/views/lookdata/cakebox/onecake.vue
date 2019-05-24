<template>
  <div class="onecake">
    <div class="titleBox">
      <div class="divBox">
        <div class="divone"></div>
        <div class="divtwo"></div>
      </div>
      <p class="tit">信息资源主题分类</p>
    </div>
    <div class="plane">
      <message-theme></message-theme>
    </div>
  </div>
</template>

<script>
import MessageTheme from './MessageTheme/'
export default {
  name:'onecake',
  components:{ MessageTheme },
  data () {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
.plane{
  height: 277px;
  width: 100%;
}
// titlebox
.titleBox{
  color: #fff;
  margin-top: 20px;
  margin-left: 25px;
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
