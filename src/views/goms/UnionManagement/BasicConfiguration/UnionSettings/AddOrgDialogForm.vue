<template>
  <iep-dialog :dialog-show="dialogShow" title="添加组织" width="400px" @close="loadPage">
    <el-form :model="form" size="small" ref="form" label-width="100px">
      <el-form-item label="组织" prop="orgId">
        <iep-select v-model="form.orgId" prefix-url="admin/union/no_union_org"></iep-select>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initOrgForm } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      form: initOrgForm(),
    }
  },
  methods: {
    loadPage () {
      this.form = initOrgForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form.orgId).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: '已向该组织发送邀请',
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

