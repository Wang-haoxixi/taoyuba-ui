<template>
  <div class="originzation">
    <iep-no-data v-if="!data.length"></iep-no-data>
    <div class="originzation-item" v-for="(item,index) in data" :key="index">
      <span class="title">{{item.commonName}}</span>
      <span class="time fr">{{item.commonTime}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['data'],
}
</script>
<style scoped lang='scss'>
.fr {
  float: right;
}
.originzation-item {
  overflow: hidden;
  line-height: 32px;
  font-size: 14px;
  color: #333;
  .time {
    color: #999;
  }
}
</style>
