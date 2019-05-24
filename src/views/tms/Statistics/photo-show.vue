<template>
  <div class="tag-photo-wrapper">
    <h1>标签生命周期</h1>
    <div class="tag-wrapper" style="height: 275px;">
      <img :src="imgUrl" alt="">
    </div>
  </div>
</template>
<script>
const localImg = require('./example.webp')
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
  .tag-wrapper {
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
