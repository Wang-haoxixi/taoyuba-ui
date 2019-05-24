<template>
  <iep-dialog :dialog-show="dialogShow" :title="`分享${shareType[this.type].name}`" width="50%" @close="resetForm">
    <el-form :model="formData" :rules="shareRules" ref="form" label-width="100px" style="margin-right: 20px;">

      <el-form-item label="主题：" prop="subject">
        <el-input v-model="formData.subject" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="收件人：" prop="receiverList">
        <iep-contact-multiple v-model="formData.receiverList"></iep-contact-multiple>
      </el-form-item>
      <el-form-item label="正文：" prop="content">
        <!-- <el-input type="textarea" rows=5 placeholder="请在此输入分享说明" v-model="formData.content" maxlength="2000"></el-input> -->
        <iep-froala-editor v-model="formData.content"></iep-froala-editor>
      </el-form-item>
      <el-form-item label="已添加纪要：" v-if="type==='summary'">
        <div class="item" v-for="(item, index) in formData.summaryList" :key="index">
          {{item.title}}<i class="el-icon-close"></i>
        </div>
      </el-form-item>
      <el-form-item label="已添加材料：" v-if="type==='material'">
        <div class="item" v-for="(item, index) in formData.materialList" :key="index">
          {{item.name}}<i class="el-icon-close"></i>
        </div>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">分享</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initShareForm, dictsMap, shareRules, shareType } from './options'
import { createEmail } from '@/api/mlms/email/index'

export default {
  components: {},
  props: {
    type: {
      type: String,
      default: 'summary',
    },
  },
  data () {
    return {
      dictsMap,
      shareRules,
      dialogShow: false,
      formRequestFn: () => { },
      formData: initShareForm(),
      list: [],
      shareType,
    }
  },
  methods: {
    open (list, title) {
      this.dialogShow = true
      this.formData[shareType[this.type].list] = list
      if (title) {
        this.formData.subject = title
      }
    },
    loadPage () {
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.formData[shareType[this.type].ids] = this.formData[shareType[this.type].list].map(m => m.id)
      this.formData.receiverIds = this.formData.receiverList.users.map(m => m.id)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createEmail(this.formData).then(() => {
            this.$message({
              message: '分享成功',
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
