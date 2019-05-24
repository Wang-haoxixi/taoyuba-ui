<template>
  <iep-dialog :dialog-show="dialogShow" title="部门合并" width="400px" @close="close">
    <el-form :model="mergeForm" :rules="rules" size="small" ref="mergeForm" label-width="100px">

    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('mergeForm')">提交</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initmergeForm } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      mergeForm: initmergeForm(),
      rules: {
        msg: [
          { required: true, message: '请输入备注', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    close () {
      this.mergeForm = initmergeForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.mergeForm).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.close()
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

