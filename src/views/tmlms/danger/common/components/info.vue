<template>
  <div class="info-wrapper">
    <div class="item">船名号：{{value.shipName}}</div>
    <div class="item">排查单位：{{value.enterprise}}</div>
    <div class="item">排查人员：{{value.registrant}}</div>
    <div class="item">排查时间：{{value.updateTime}}</div>
    <div class="item">排查地点：{{value.address}}</div>
  </div>
</template>
<script>
export default {
  props: {
    value: Object,
  },
}
</script>
<style scoped lang="scss">
  .info-wrapper {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
  }
</style>