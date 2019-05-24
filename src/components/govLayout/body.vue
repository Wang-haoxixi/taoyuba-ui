<!-- 一般是列表 -->
<template>
  <div class="body-layout no-border">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'GovLayoutBody',
  }
</script>
<style lang="scss" scoped>
  .body-layout {
    padding: 0 0 10px 0;
  }
</style>