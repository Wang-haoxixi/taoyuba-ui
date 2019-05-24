<template>
  <el-dialog :width="width" :visible="dialogShow" :before-close="handleClose" @close="close" :fullscreen="fullscreen" append-to-body>
    <div slot="title" class="dialog-title-box">
      <span class="dialog-title">{{title}}</span>
      <el-button v-if="isNeedRestore" class="text-icon" type="text" @click="toggleFullscreen">
        <i class="icon-huanyuan"></i>
      </el-button>
    </div>
    <div v-if="dialogShow" class="dialog-content">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" slot="footer" class="dialog-footer">
      <slot name="footer"></slot>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'FormDialog',
  props: {
    dialogShow: {
      default: false,
      type: Boolean,
    },
    title: {
      default: '标题',
      type: String,
      required: true,
    },
    width: {
      default: '30%',
      type: String,
    },
    isNeedConfirm: {
      default: true,
      type: Boolean,
    },
    isNeedRestore: {
      default: false,
      type: Boolean,
    },
    reminderText: {
      default: '数据还没保存',
      type: String,
      required: false,
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
      if (this.isNeedConfirm) {
        this.$confirm(`${this.reminderText}，确定关闭？`)
          .then(() => {
            done()
          })
          .catch(() => { })
      } else {
        done()
      }
    },
    close () {
      this.$emit('close', false)
    },
  },
}
</script>
<style lang="scss" scoped>
.dialog-title {
  float: none;
  height: inherit;
  color: #000;
  overflow: hidden;
  margin: 0;
  padding-left: 0;
  font-weight: 700;
  line-height: 26px;
  font-size: 14px;
}
.dialog-title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 24px;
  height: 24px;
  padding-right: 20px;
}
.dialog-content {
  max-height: 54vh;
  overflow-y: scroll;
}
.text-icon {
  color: #333;
}
.el-dialog__wrapper > .el-dialog--center .el-dialog__body {
  text-align: initial;
  padding: 25px 25px 30px;
  max-height: 60vh !important;
  overflow-y: scroll !important;
}
.el-dialog__wrapper > .is-fullscreen .el-dialog__body {
  text-align: initial;
  max-height: 88vh !important;
}
</style>
