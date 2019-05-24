<!-- 按钮组 -->
<template>
  <div class="layout-button-group">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'btnGroupLayout',
  }
</script>
<style lang="scss" scoped>
.layout-button-group {
  margin: 5px 0;
}
</style>
