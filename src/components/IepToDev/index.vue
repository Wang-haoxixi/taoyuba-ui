<template>
  <img :src="fackerImg" />
</template>
<script>
const fackerImg = require('./facker.png')
export default {
  name: 'IepToDev',
  data () {
    return {
      fackerImg,
    }
  },
}
</script>
<style scoped>
img {
  margin: 0 auto;
  width: 500px;
  display: block;
}
</style>
