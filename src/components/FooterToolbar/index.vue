<template>
  <div :class="prefixCls" :style="styleOption">
    <div style="float: left">
      <slot name="extra">{{ extra }}</slot>
    </div>
    <div style="float: right" class="right-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import displayMixins from '@/mixins/displayMixins'
export default {
  name: 'FooterToolBar',
  mixins: [displayMixins],
  props: {
    prefixCls: {
      type: String,
      default: 'footer-toolbar',
    },
    extra: {
      type: [String, Object],
      default: '',
    },
  },
  computed: {
    styleOption () {
      const menuWidth = this.isDesktop() ? '200px' : '64px'
      return {
        width: `calc(100% - ${menuWidth})`,
      }
    },
  },
}
</script>
<style scoped>
.right-wrapper > * {
  margin-right: 10px;
}
* {
  outline: none;
  box-sizing: border-box;
}
</style>

<style lang="scss" scoped>
.footer-toolbar {
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
  height: 56px;
  line-height: 56px;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
  background: #fff;
  border-top: 1px solid #e8e8e8;
  padding: 0 24px;
  z-index: 500;

  &:after {
    content: "";
    display: block;
    clear: both;
  }
}
</style>
