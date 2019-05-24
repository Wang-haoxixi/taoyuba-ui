<template>
  <a-popover :title="obj.name" trigger="hover" :visible="hovered" @visibleChange="handleHoverChange">
    <div slot="content">{{obj.name}}</div>
    <a-popover :title="obj.name" trigger="click" :visible="clicked" @visibleChange="handleClickChange">
      <div slot="content">
        <div>{{obj.name}}的详情信息</div>
        <a @click="hide">关闭</a>
      </div>
      <a-button size="small" :type="type">{{obj.name}}</a-button>
    </a-popover>
  </a-popover>
</template>
<script>
export default {
  name: 'IepHoverCard',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'default',
    },
    obj: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      clicked: false,
      hovered: false,
    }
  },
  methods: {
    hide () {
      this.clicked = false
      this.hovered = false
    },
    handleHoverChange (visible) {
      if (!this.disabled) {
        this.clicked = false
        this.hovered = visible
      }
    },
    handleClickChange (visible) {
      this.clicked = visible
      this.hovered = false
    },
  },
}
</script>
