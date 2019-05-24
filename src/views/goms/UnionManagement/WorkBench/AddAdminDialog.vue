<template>
  <iep-dialog :dialog-show="dialogShow" title="添加管理员" width="400px" @close="loadPage">
    <el-form :model="form" size="small" ref="form" label-width="100px">
      <el-form-item label="管理员" prop="user">
        <iep-contact-select v-model="form.user"></iep-contact-select>
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
          this.formRequestFn(this.form.user.id).then(({ data }) => {
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

