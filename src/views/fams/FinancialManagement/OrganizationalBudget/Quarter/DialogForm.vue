<template>
  <iep-dialog :dialog-show="dialogShow" title="修改预算" width="400px" @close="close">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <iep-form-item label-name="实际(元)" prop="actual">
        <iep-input-number v-model="form.actual" disabled></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="预算(元)" prop="budget">
        <iep-input-number v-model="form.budget"></iep-input-number>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">提交</iep-button>
      <iep-button @click="close">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      form: initForm(),
      rules: {
      },
    }
  },
  methods: {
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: '操作成功',
                type: 'success',
              })
              this.close()
            } else {
              this.$message(data.msg)
            }
          })
        }
      })
    },
  },
}
</script>

