<template>
  <iep-dialog :dialog-show="dialogShow" title="放入简历库" width="400px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="原因" prop="reason">
        <el-input v-model="form.reason" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initToResumeForm } from '../options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      form: initToResumeForm(),
      rules: {
        reason: [
          { required: true, message: '请输入原因', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.form = initToResumeForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form).then(() => {
            this.$message({
              message: '放入简历库成功',
              type: 'success',
            })
            this.loadPage()
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

