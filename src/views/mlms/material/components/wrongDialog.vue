<template>
  <iep-dialog :dialog-show="dialogShow" title="材料纠错" width="50%" @close="resetForm">
    <el-form :model="formData" :rules="wrongRules" ref="form" label-width="100px">

      <el-form-item label="主题：">
        <el-input v-model="formData.subject" readonly />
      </el-form-item>
      <el-form-item label="收件人：">
        <!-- <iep-contact-multiple v-model="formData.receiverList"></iep-contact-multiple> -->
        <el-input type="text" v-model="formData.receiverName" readonly />
      </el-form-item>
      <el-form-item label="正文：" prop="content">
        <el-input type="textarea" rows=5 placeholder="请在此输入纠错说明" v-model="formData.content" maxlength="2000"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initWrongForm, wrongRules } from './options'
import { createEmail } from '@/api/mlms/email/index'

export default {
  props: {
    type: {
      type: String,
      default: 'summary',
    },
  },
  data () {
    return {
      wrongRules,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '发送',
      formData: initWrongForm(),
      list: [],
    }
  },
  methods: {
    open (row) {
      this.dialogShow = true
      this.formData = Object.assign({}, this.formData, row)
    },
    loadPage () {
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createEmail(this.formData).then(() => {
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
    resetForm () {
      this.formData = initWrongForm()
      this.dialogShow = false
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  line-height: 40px;
  i {
    cursor: pointer;
    margin-left: 20px;
  }
}
</style>
