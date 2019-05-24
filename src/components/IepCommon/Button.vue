<template>
  <el-button :size="size" :plain="plain" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-button>
</template>
<script>
export default {
  name: 'IepButton',
  inheritAttrs: false,
  props: {
    size: {
      type: String,
      default: 'small',
    },
    plain: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="css" scoped>
.el-button + .el-button {
  margin-left: 0;
}
</style>