<template>
  <div class="video-detail">
    <info></info>
    <list></list>
  </div>
</template>
<script>
import Info from './Info'
import List from './List'
export default {
  components: { Info, List },
  data () {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.video-detail {
  padding: 25px;
  width: 400px;
  height: 500px;
  overflow: hidden;
  background-color: #f8f8f8;
}
</style>
