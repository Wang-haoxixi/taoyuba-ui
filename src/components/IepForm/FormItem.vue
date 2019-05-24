<template>
  <el-form-item v-bind="$attrs" v-on="$listeners">
    <span slot="label">
      {{labelName}}
      <iep-tip v-if="tip" :content="tip"></iep-tip>
      ：
    </span>
    <slot></slot>
  </el-form-item>
</template>
<script>
export default {
  name: 'IepFormItem',
  inheritAttrs: false,
  props: {
    tip: {
      type: String,
      default: '',
    },
    labelName: {
      type: String,
      required: false,
    },
  },
}
</script>
