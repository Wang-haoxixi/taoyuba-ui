<template>
  <iep-dialog :dialog-show="dialogShow" title="部门移动" width="400px" @close="close">
    <el-form :model="moveForm" :rules="rules" size="small" ref="moveForm" label-width="100px">
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('moveForm')">提交</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initmoveForm } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      moveForm: initmoveForm(),
      rules: {
        msg: [
          { required: true, message: '请输入备注', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    close () {
      this.moveForm = initmoveForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.moveForm).then(() => {
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

