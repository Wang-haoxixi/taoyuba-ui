<template>
  <iep-dialog :dialog-show="dialogShow" title="离职" width="400px" @close="loadPage">
    <el-form :model="rejectedForm" :rules="rules" size="small" ref="rejectedForm" label-width="100px">
      <el-form-item label="备注" prop="msg">
        <el-input v-model="rejectedForm.msg" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('departureForm')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initrejectedForm } from '../options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      rejectedForm: initrejectedForm(),
      rules: {
        msg: [
          { required: true, message: '请输入备注', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.rejectedForm = initrejectedForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.rejectedForm).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
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

