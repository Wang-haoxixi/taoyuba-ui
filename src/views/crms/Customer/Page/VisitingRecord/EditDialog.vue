<template>
  <iep-dialog :dialog-show="dialogShow" title="联系记录" width="40%" @close="loadPage">
    <el-form :model="formData" :rules="rules" ref="formName" size="small" label-width="100px" class="contract" :disabled="disabled">
      <el-form-item label="联系主题：" prop="theme">
        <el-input v-model="formData.theme"></el-input>
      </el-form-item>
      <el-form-item label="联系时间：" prop="visitTime">
        <time-selector v-model="formData.visitTime" type="date" placeholder="选择日期"></time-selector>
      </el-form-item>
      <el-form-item label="联系记录：" prop="contactRecord">
        <el-input type="textarea" v-model="formData.contactRecord" rows=5></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button class="btn" type="primary" @click="submitForm('formName')" v-if="isShow">保存</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from './options'
import TimeSelector from '@/views/crms/components/TimeSelector/'
export default {
  components: { TimeSelector },
  data () {
    return {
      dialogShow: false,
      submitFn: () => { },
      methodName: '创建',
      formData: {},
      record: {},
      id: '',
      rules: {
        theme: [
          { required: true, message: '请输入主题', trigger: 'change' },
          { max: 20, message: '长度不可超过20个字符', trigger: 'blur' },
        ],
        visitTime: [
          { required: true, message: '请选择时间', trigger: 'change' },
        ],
        contactRecord: [{ required: true, message: '请填写拜访记录', trigger: 'change' },
        { max: 255, message: '长度不可超过255个字符', trigger: 'blur' },
        ],
      },
      disabled: false,
      isShow: true,
    }
  },
  methods: {
    loadPage () {
      this.formData = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    resetForm () {
      this.formData = initForm()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.formData.clientId = this.id
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitFn({ ...this.formData }).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.dialogShow = false
            this.$emit('load-page')
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>
<style>
.btn {
  margin-right: 10px;
}
.contract {
  padding-bottom: 10px;
}
</style>

