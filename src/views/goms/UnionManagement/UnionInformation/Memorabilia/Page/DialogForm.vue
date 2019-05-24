<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}大事记`" width="500px" @close="loadPage">
    <el-form :model="form" :rules="rules" ref="form" size="small" label-width="100px">
      <el-form-item label="栏目" prop="name">
        <el-input :maxlength="80" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="日期" prop="releaseTime">
        <iep-date-picker v-model="form.releaseTime"></iep-date-picker>
      </el-form-item>
      <el-form-item label="内容" prop="description">
        <iep-input-area v-model="form.description"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from '../options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules: {
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'change' },
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'change' },
        ],
        releaseTime: [
          { message: '请选择日期', trigger: 'change' },
        ],
        description: [
          { message: '请填写详细内容', trigger: 'change' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form).then(() => {
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
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
