<!-- 一般是表单 -->
<template>
  <div class="form-layout">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'formLayout',
}
</script>

<style lang="scss" scoped>
.header-layout {
  padding: 10px 0;
}
</style>
