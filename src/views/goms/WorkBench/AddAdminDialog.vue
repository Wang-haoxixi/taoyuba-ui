<template>
  <iep-dialog :dialog-show="dialogShow" title="添加管理员" width="400px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <el-form-item label="管理员" prop="userId">
        <iep-select prefix-url="admin/org/no_admin_user" v-model="form.userId"></iep-select>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initAddAdminForm } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      form: initAddAdminForm(),
      rules: {
        userId: [
          { required: true, message: '请选择管理员', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.form = initAddAdminForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form.userId).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: '添加成功',
                type: 'success',
              })
            } else {
              this.$message({
                message: data.msg,
                type: 'error',
              })
            }
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

