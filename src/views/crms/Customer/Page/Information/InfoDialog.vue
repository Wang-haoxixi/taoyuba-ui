<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}资讯`" width="60%" @close="resetForm">
    <el-form :model="formData" :rules="rules" ref="formName" label-width="100px" size="small">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="context">
        <el-input type="textarea" v-model="formData.context"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('formName')">{{methodName}}</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      submitFn: () => { },
      methodName: '',
      formData: initForm(),
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'change' },
        ],
        context: [
          { required: true, message: '请输入内容', trigger: 'change' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.formData = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    resetForm () {
      this.formData = initForm()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.$message.success('功能开发中')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitFn(this.formData).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.loadPage()
            this.dialogShow = false
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>
<style>
.btn {
  margin-right: 10px;
}
</style>

