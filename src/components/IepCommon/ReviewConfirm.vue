<template>
  <iep-dialog :dialog-show="dialogShow" :title="title" width="520px" @close="handleCancel" center>
    <div class="center-box">
      <el-radio-group v-model="status" class="status">
        <el-radio :label="isInverse ? 0 : 1">审核通过</el-radio>
        <el-radio :label="2">审核不通过</el-radio>
      </el-radio-group>
      <iep-input-area v-if="status === 2 && isContent" class="content" v-model="content">
      </iep-input-area>
    </div>
    <template slot="footer">
      <iep-button type="primary" @click="handleSubmit">提交</iep-button>
      <iep-button @click="handleCancel">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
export default {
  name: 'IepReviewConfirm',
  props: {
    isInverse: {
      type: Boolean,
      default: false,
    },
    isContent: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      title: '',
      formRequestFn: () => { },
      dialogShow: false,
      status: this.isInverse ? 0 : 1, // 待审核
      content: '',
      id: null,
      ids: [],
    }
  },
  computed: {
    currentIds () {
      if (this.id) {
        return [this.id]
      } else {
        return this.ids
      }
    },
  },
  methods: {
    loadPage () {
      this.status = 1
      this.content = ''
      this.dialogShow = false
      this.$emit('load-page')
    },
    handleSubmit () {
      if (this.content.length > 2000) {
        this.$message('字数不得超过 2000 !')
        return
      }
      this.formRequestFn({
        ids: this.currentIds,
        status: this.status, // 用来变更状态
        content: this.content,
      }).then(({ data }) => {
        if (data.data) {
          this.$message({
            message: '成功',
            type: 'success',
          })
        } else {
          this.$message({
            message: data.msg,
            type: 'warning',
          })
        }
        this.loadPage()
      })
    },
    handleCancel () {
      this.loadPage()
    },
  },
}
</script>
<style lang="scss" scoped>
.center-box {
  text-align: center;
  padding: 0 20px;
  .status {
    margin-bottom: 20px;
  }
  .content {
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 0 20px;
  }
}
</style>
