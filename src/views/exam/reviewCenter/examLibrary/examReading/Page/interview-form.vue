<template>
  <el-form :model="ruleForm" ref="ruleForm" :rules="rules" :label-position="labelPosition" label-width="100px">
    <el-form-item label="面试成绩" prop="mark">
      <el-input v-model="ruleForm.mark" maxlength="255" placeholder="请输入面试成绩" clearable></el-input>
    </el-form-item>
    <el-form-item label="面试考官" prop="examiner">
      <el-input v-model="ruleForm.examiner" maxlength="255" placeholder="请输入面试考官" clearable></el-input>
    </el-form-item>
    <el-form-item label="面试评语" prop="text">
      <el-input v-model="ruleForm.text" type="textarea" rows="4" maxlength="255" placeholder="请输入面试评语" clearable></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleSubmit('ruleForm')">保存</el-button>
      <el-button type="primary" plain @click="$emit('close', false)">关闭</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { passInterviewById } from '@/api/exam/examLibrary/examReading/examReading'

//校验规则
const allRules = {
  mark: [{ required: true, message: '请输入面试成绩', trigger: 'blur' }],
  examiner: [{ required: true, message: '请输入面试考官', trigger: 'blur' }],
  text: [{ required: true, message: '请输入面试评语', trigger: 'blur' }],
}
export default {
  components: {},
  props: ['formData'],
  data () {
    return {
      labelPosition: 'right',
      ruleForm: {
        mark: '',
        examiner: '',
        text: '',
      },
      rules: allRules,
    }
  },
  methods: {
    /**
     * 保存提交
     */
    handleSubmit (formName) {
      this.ruleForm.id = this.formData.id
      this.ruleForm.deptId = this.formData.deptId
      this.$refs[formName].validate((valid) => {
        if (valid) {
          passInterviewById(this.ruleForm).then(() => {
            this.$emit('close', false)
            this.$message({
              showClose: true,
              message: '成功添加定时',
              type: 'success',
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
</style>