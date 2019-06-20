<template>
  <el-form :model="ruleForm" ref="ruleForm" :rules="rules" :label-position="labelPosition" label-width="100px">
    <el-form-item label="面试成绩" prop="mark">
      <el-input v-model="ruleForm.mark" maxlength="255" placeholder="请输入面试成绩" clearable></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleSubmit('ruleForm')">保存</el-button>
      <el-button type="primary" plain @click="$emit('close', false)">关闭</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { passChoiceById } from '@/api/exam/examLibrary/examReading/examReading'

//校验规则
const allRules = {
  mark: [{ required: true, message: '请输入面试成绩', trigger: 'blur' }],
}
export default {
  components: {},
  props: ['formData'],
  data () {
    return {
      labelPosition: 'right',
      ruleForm: {
        mark: '',
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
          passChoiceById(this.ruleForm).then(() => {
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