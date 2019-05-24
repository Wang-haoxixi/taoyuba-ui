<template>
  <div>
    <basic-container v-if="!pageShow">
      <slot name="page"></slot>
    </basic-container>
    <el-card class="box-card" v-if="pageShow">
      <div slot="header" class="clearfix">
        <span class="dialog-title">{{title}}</span>
        <el-button icon="el-icon-back" style="float: right; padding: 3px 0;" type="text" @click="handleClose">返回</el-button>
      </div>
      <slot name="form"></slot>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    pageShow: {
      type: Boolean,
      require: true,
    },
    title: {
      type: String,
      require: true,
      default: '详情',
    },
  },
  data () {
    return {
      parent: null,
    }
  },
  created () {
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
  },
}
</script>
<style lang="scss" scoped>
.box-card {
  margin: 20px;
  border-radius: 6px;
}
.dialog-title {
  font-size: 16px;
  font-weight: 700;
}
</style>
