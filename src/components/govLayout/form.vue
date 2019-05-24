<!-- 表单Layout -->
<template>
  <div class="form-layout">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'govLayoutForm',
}
</script>

<style lang="scss" scoped>
  .header-layout {
    padding: 10px 0;
  }
</style>
