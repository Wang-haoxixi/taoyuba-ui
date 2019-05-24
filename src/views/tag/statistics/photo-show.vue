<template>
  <div class="tag-photo-wrapper">
    <h1>标签生命周期</h1>
    <div class="tag-wrapper">
      <img :src="imgUrl" alt="">
    </div>
  </div>
</template>
<script>
const localImg = require('./life.png')
export default {
  data () {
    return {
      imgUrl: localImg,
    }
  },
}
</script>
<style lang="scss" scoped>
.tag-photo-wrapper {
  height: 250px;
  h1 {
    font-size: 20px;
  }
}
.tag-wrapper {
  img {
    width: 100%;
  }
}
</style>
