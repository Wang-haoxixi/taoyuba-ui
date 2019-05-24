<template>
  <iep-dialog :dialog-show="dialogShow" title="领导批示" width="50%" @close="resetForm">
    <el-form :model="formData" :rules="shareRules" ref="form" label-width="100px">

      <el-form-item label="主题：" prop="subject">
        <el-input v-model="formData.subject" readonly maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="收件人：" prop="receiverList">
        <iep-contact-multiple v-model="formData.receiverList"></iep-contact-multiple>
      </el-form-item>
      <el-form-item label="正文：" prop="content">
        <el-input type="textarea" rows=5 placeholder="请在此输入分享说明" v-model="formData.content" maxlength="2000"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initInstrForm, dictsMap, shareRules } from './options'
import { createEmail } from '@/api/mlms/email/index'

export default {
  components: {},
  data () {
    return {
      dictsMap,
      shareRules,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      formData: initInstrForm(),
    }
  },
  methods: {
    open (row) {
      this.dialogShow = true
      this.formData.subject = `对“${row.title}”的批示`
    },
    submitForm (formName) {
      this.formData.receiverIds = this.formData.receiverList.users.map(m => m.id)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createEmail(this.formData).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.dialogShow = false
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.formData = initInstrForm()
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
