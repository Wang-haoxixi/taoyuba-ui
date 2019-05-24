<template>
  <a-drawer :title="title" :width="width" @close="close" :visible="drawerShow" :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}" :zIndex="zIndex">
    <el-scrollbar v-if="drawerShow" wrap-class="drawer-content">
      <slot></slot>
    </el-scrollbar>
    <div :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }">
      <slot name="footer"></slot>
    </div>
  </a-drawer>
</template>
<script>
export default {
  name: 'IepDrawer',
  props: {
    drawerShow: {
      default: false,
      type: Boolean,
    },
    title: {
      default: '标题',
      type: String,
      required: true,
    },
    width: {
      default: '500',
      type: String,
    },
    zIndex: {
      type: Number,
      default: 600,
    },
  },
  methods: {
    close () {
      this.$emit('close', false)
    },
  },
  watch: {
    drawerShow (n) {
      if (n) {
        this.$emit('slot-mounted')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.drawer-content {
  max-height: 100vh;
  overflow-x: hidden;
}
</style>
