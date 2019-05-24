<template>
  <iep-dialog :dialog-show="dialogShow" title="拜访日志" width="40%" @close="loadPage">
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px" style="margin-bottom: 50px;" :disabled="disabled">
      <el-form-item label="拜访主题：" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="拜访时间：" prop="meetingTime">
        <time-selector v-model="formData.meetingTime"></time-selector>
      </el-form-item>
      <el-form-item label="拜访内容：" prop="meetingContent">
        <el-input type="textarea" v-model="formData.meetingContent" rows=5></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')" v-if="isShow">保存</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initFormData, dictsMap, rules } from './options'
import { visitSend } from '@/api/crms/visiting_record'
import TimeSelector from '@/views/crms/components/TimeSelector/'
export default {
  components: { TimeSelector },
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      formData: initFormData(),
      rules,
      id: '',
      clientList: [],
      disabled: false,
      isShow: true,
      created: false,
    }
  },
  methods: {
    loadPage () {
      this.formData = initFormData()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm (form) {
      this.formData.visitingUserId = [this.id]
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.formData).then((res) => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            if (this.created) {
              visitSend(res.data.data)
            }
            this.dialogShow = false
            this.$emit('load-page')
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.formData = initFormData()
      this.dialogShow = false
      this.loadPage('load-page')
    },
  },
}
</script>
