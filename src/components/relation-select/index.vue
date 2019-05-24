<template>
  <div>
    <el-input placeholder="请输入内容" v-model="inputLabel" clearable :disabled="disabled">
    </el-input>
  </div>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    obj: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      inputLabel: this.obj.commonName,
      inputValue: this.obj.commonId,
    }
  },
}
</script>
