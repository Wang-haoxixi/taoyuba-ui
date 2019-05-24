<template>
  <el-dialog :width="width" :visible="dialogShow" :before-close="handleClose" @close="close" :fullscreen="fullscreen" center append-to-body>
    <div slot="title" class="dialog-title-box">
      <div>{{ title }}</div>
      <el-button class="text-icon" type="text" @click="toggleFullscreen">
        <i class="icon-reduction"></i>
      </el-button>
    </div>
    <slot v-if="dialogShow"></slot>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogShow: {
      default: false,
      type: Boolean,
    },
    title: {
      default: '标题',
      type: String,
    },
    width: {
      default: '70%',
      type: String,
    },
    isNeedConfirm: {
      default: true,
      type: Boolean,
    },
  },
  data () {
    return {
      fullscreen: false,
    }
  },
  methods: {
    toggleFullscreen () {
      this.fullscreen = !this.fullscreen
    },
    handleClose (done) {
      // if (this.isNeedConfirm) {
      //   this.$confirm('数据还没保存, 确定关闭?')
      //     .then(() => {
      //       done()
      //     })
      //     .catch(() => { })
      // } else {
      // }
      done()
    },
    close () {
      this.$emit('close', false)
    },
  },
}
</script>
<style lang="scss" scoped>
.dialog-title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 12px;
  height: 12px;
  padding-right: 20px;
  font-size: 18px;
}
.text-icon {
  color: #333;
}
.el-dialog__wrapper /deep/ .el-dialog__header {
  // border-top: 3px solid #2cb7e1;
  box-sizing: border-box;
}
.el-dialog__wrapper /deep/ .el-dialog--center .el-dialog__body {
  text-align: initial;
  padding: 25px 25px 30px;
  max-height: 60vh !important;
  overflow-y: scroll !important;
}
.el-dialog__wrapper /deep/ .is-fullscreen .el-dialog__body {
  text-align: initial;
  max-height: 88vh !important;
}
</style>
