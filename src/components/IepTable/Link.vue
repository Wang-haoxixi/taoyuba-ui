<template>
  <el-badge :hidden="!!isRead" is-dot class="item">
    <el-button :class="{'link-is-read':isRead && !disabled, 'link-btn': true}" type="text" v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </el-button>
  </el-badge>
</template>
<script>
export default {
  name: 'IepTableLink',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    isRead: {
      type: Number,
      default: 1,
    },
  },
}
</script>
<style scoped>
.link-btn {
  padding: 5px 0;
}
</style>

<style lang="scss" scoped>
.link-btn {
  color: #606266;
  &:hover {
    color: #999;
  }
}
.link-is-read {
  color: #999;
  &:hover {
    color: #666;
  }
}
</style>
<style scoped>
.item >>> .is-dot {
  top: 13px;
  right: -3px;
  background: #cb3737;
}
</style>
