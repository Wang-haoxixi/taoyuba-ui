<!-- 按钮组 -->
<template>
  <div class="gov-button-group">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'GovLayoutButtonGroup',
  }
</script>
<style lang="scss" scoped>
  .gov-button-group {
    margin: 5px 0;
  }
</style>