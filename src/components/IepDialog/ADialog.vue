<template>
  <a-modal :title="title" v-bind="$attrs" v-on="$listeners">
    <template slot="footer">
      <slot name="footer"></slot>
    </template>
    <slot></slot>
  </a-modal>
</template>
<script>
export default {
  name: 'IepADialog',
  inheritAttrs: false,
  props: {
    title: {
      default: '标题',
      type: String,
      required: true,
    },
  },
}
</script>
