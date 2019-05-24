<template>
  <iep-dialog :dialog-show="dialogShow" title="入职新增" width="400px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="员工状态" prop="position">
        <el-select v-model="form.status">
          <el-option label="试用期员工" :value="2"></el-option>
          <el-option label="实习期员工" :value="3"></el-option>
          <el-option label="兼职员工" :value="4"></el-option>
          <el-option label="其他" :value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入职时间" prop="inductionTime">
        <iep-date-picker v-model="form.inductionTime" type="date" placeholder="选择日期">
        </iep-date-picker>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initInductionForm } from '../options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      form: initInductionForm(),
      rules: {
        status: [
          { required: true, message: '请选择员工状态', trigger: 'blur' },
        ],
        inductionTime: [
          { required: true, message: '请输入入职时间', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.form = initInductionForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form).then(() => {
            this.$message({
              message: '入职成功',
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

