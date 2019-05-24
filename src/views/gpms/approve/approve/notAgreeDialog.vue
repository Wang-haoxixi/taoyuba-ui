<template>
  <iep-dialog :dialog-show="dialogShow" title="不同意理由" width="50%" @close="resetForm(false)">
    <el-form :model="formData" :rules="rules" ref="form">
      <el-form-item label="" prop="approvalFailReason">
        <el-input type="textarea" placeholder="请输入不同意的理由" rows=5 v-model="formData.approvalFailReason"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm">确定</iep-button>
      <iep-button @click="resetForm(false)">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogShow: false,
      formData: {
        approvalFailReason: '',
      },
      rules: {
        approvalFailReason: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('submitNotAgree', this.formData.approvalFailReason)
          this.resetForm(true)
        } else {
          return false
        }
      })
    },
    resetForm (state) {
      this.formData = {
        approvalFailReason: '',
      }
      this.$emit('close', state)
      this.dialogShow = false
    },
  },
}
</script>
