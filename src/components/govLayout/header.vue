<!-- 一般是搜索框 -->
<template>
  <div class="header-layout">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'GovLayoutHeader',
}
</script>

<style lang="scss" scoped>
  .header-layout {
    padding-bottom: 10px;
  }
</style>
