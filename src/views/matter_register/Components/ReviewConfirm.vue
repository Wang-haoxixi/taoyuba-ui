<template>
  <div>
    <el-radio-group v-model="status" class="status">
      <el-radio :label="3">审核通过</el-radio>
      <el-radio :label="4">驳回</el-radio>
    </el-radio-group>
    <el-input v-if="status===4" class="content" type="textarea" :rows="4" :maxlength="50" placeholder="请输入驳回内容" v-model="content">
    </el-input>
    <div class="button-group">
      <el-button type="primary" size="small" @click="handleSubmit">提交</el-button>
      <el-button size="small" @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    functionName: {
      type: Function,
      default: () => { },
    },
    reviewRow: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      status: this.reviewRow.auditState,
      content: '',
    }
  },
  methods: {
    handleSubmit () {
      if (this.status === 3 || this.status === 4) {
        if (!this.content && this.status === 4) {
          this.$message({
            message: '请输入驳回理由',
            type: 'warning',
          })
          return
        }
        this.functionName(this.reviewRow.id, {
          status: this.status,
          content: this.content,
        }).then(() => {
          this.status = this.reviewRow.auditState
          this.$emit('close')
        })
      } else {
        this.$message('请选择审核状态')
      }
    },
    handleCancel () {
      this.status = this.reviewRow.auditState
      this.$emit('close')
    },
  },
}
</script>
<style lang="scss" scoped>
.status {
  margin: 0 10px;
  margin-bottom: 10px;
}
.content {
  margin-bottom: 20px;
}
.button-group {
  display: flex;
  margin-top: 10px;
  justify-content: center;
}
</style>
