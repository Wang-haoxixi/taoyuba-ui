<template>
  <el-dialog class="iep-dialog" :width="width" :visible="dialogShow" append-to-body :close-on-click-modal="closeOnClickModal" v-bind="$attrs" v-on="$listeners">
    <div slot="title" class="dialog-title-box">
      <span class="dialog-title">{{title}}</span>
    </div>
    <el-scrollbar v-if="dialogShow" wrap-class="wrap-dialog" view-class="view-dialog">
      <slot></slot>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <OperationWrapper>
        <slot name="footer"></slot>
      </OperationWrapper>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'IepDialog',
  inheritAttrs: false,
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
    closeOnClickModal: {
      default: false,
      type: Boolean,
    },
  },
  data () {
    return {
      fullscreen: false,
    }
  },
  watch: {
    dialogShow (n) {
      if (n) {
        this.$emit('slot-mounted')
      }
    },
  },
}
</script>
<style lang="css" scoped>
.iep-dialog >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.iep-dialog >>> .el-dialog__body {
  padding: 10px 25px;
}
.iep-dialog >>> .el-dialog__footer {
  padding: 10px;
}
</style>

<style lang="scss" >
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
.wrap-dialog {
  max-height: 54vh;
  padding: 8px 0;
  overflow-x: hidden;
}
.view-dialog {
  padding-bottom: 10px;
  padding-right: 10px;
}
.text-icon {
  color: #333;
}
</style>
