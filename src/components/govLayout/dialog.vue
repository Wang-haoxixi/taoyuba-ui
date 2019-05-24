<!-- 弹窗Layout -->
<template>
  <div class="dialog-layout" :class="classname">
    <div ref="body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GovLayoutDialog',
  props: {
    classname: {
      type: String,
      default: '', // auto/''
    },
  },
}
</script>
<style lang="scss">
  .dialog-layout {
    &.auto {
      height: calc(55vh);
    }
    margin: 0 -20px;
    padding: 0px 20px;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
