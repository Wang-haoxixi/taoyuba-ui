<template>
  <el-input-number controls-position="right" :min="min" :max="max" v-bind="$attrs" v-on="$listeners"></el-input-number>
</template>
<script>
export default {
  name: 'IepInputNumber',
  inheritAttrs: false,
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 999999999,
    },
  },
}
</script>