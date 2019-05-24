<template>
  <iep-dialog :dialog-show="dialogShow" title="发送祝福" width="50%" @close="resetForm">
    <el-form :model="formData" :rules="shareRules" ref="form" label-width="100px" style="margin-right: 20px;">

      <el-form-item label="主题：">
        <el-input v-model="formData.subject" maxlength="50" readonly />
      </el-form-item>
      <el-form-item label="收件人：">
        <!-- <iep-contact-multiple v-model="formData.receiverList"></iep-contact-multiple> -->
        <el-input type="text" v-model="formData.receiverName" readonly />
      </el-form-item>
      <el-form-item label="正文：" prop="content">
        <iep-froala-editor v-model="formData.content"></iep-froala-editor>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">分享</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { createEmail } from '@/api/mlms/email/index'

// 分享
function initShareForm () {
  return {
    attachmentIds: [],
    content: '',
    emailId: 0,
    materialIds: [],
    projectIds: [],
    receiverIds: [],
    receiverName: '',
    receiverList: {
      unions: [],
      orgs: [],
      users: [],
    },
    reportIds: [],
    status: 1,
    subject: '生日祝福',
    summaryIds: [],
    summaryList: [],
    tagKeyWords: [],
    type: 2, // 类型为分享
    kind: 0,
  }
}

export const shareRules = {
  subject: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
}

export default {
  data () {
    return {
      shareRules,
      dialogShow: false,
      formData: initShareForm(),
    }
  },
  methods: {
    open (receiver) {
      this.formData.receiverIds = [receiver.id]
      this.formData.receiverName = receiver.name
      this.dialogShow = true
    },
    loadPage () {
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createEmail(this.formData).then(() => {
            this.$message({
              message: '祝福成功',
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
      this.formData = initShareForm()
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
