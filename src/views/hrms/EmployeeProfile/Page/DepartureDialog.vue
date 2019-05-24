<template>
  <iep-dialog :dialog-show="dialogShow" title="离职" width="400px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="离职时间" prop="departureTime">
        <iep-date-picker v-model="form.departureTime" type="date" placeholder="选择日期">
        </iep-date-picker>
      </el-form-item>
      <el-form-item label="离职原因" prop="reason">
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
import { initDepartureForm } from '../options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      form: initDepartureForm(),
      rules: {
        departureTime: [
          { required: true, message: '请选择离职时间', trigger: 'blur' },
        ],
        reason: [
          { required: true, message: '请输入离职原因', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.form = initDepartureForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form).then(() => {
            this.$message({
              message: '离职成功',
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

