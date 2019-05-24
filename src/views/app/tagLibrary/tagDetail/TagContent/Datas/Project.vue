<template>
  <div class="project">
    <iep-no-data v-if="!data.length"></iep-no-data>
    <div class="project-item" v-for="(item,index) in data" :key="index">
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
.project-item {
  overflow: hidden;
  line-height: 32px;
  font-size: 14px;
  color: #333;
  .time {
    color: #999;
  }
}
</style>
