<template>
  <el-form :model="formData" ref="form" :rules="rules" :label-position="labelPosition" label-width="100px">
    <el-form-item label="面试成绩" prop="interviewScore">
      <el-input v-model.number="formData.interviewScore" maxlength="255" placeholder="请输入面试成绩" autocomplete="off" clearable></el-input>
    </el-form-item>
    <!-- <el-form-item label="面试考官" prop="interviewer">
      <el-input v-model="ruleForm.interviewer" maxlength="255" placeholder="请输入面试考官" clearable></el-input>
    </el-form-item> -->
    <el-form-item label="面试评语" prop="comments">
      <el-input v-model="formData.comments" type="textarea" rows="4" maxlength="255" placeholder="请输入面试评语" clearable></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleSubmit('form')">保存</el-button>
      <el-button type="primary" plain @click="$emit('close', false)">关闭</el-button>
    </el-form-item>
  </el-form>

</template>
<script>
import { passInterviewById } from '@/api/exam/examLibrary/examReading/examReading'

//校验规则
const allRules = {
  interviewScore: [{ required: true, message: '面试成绩不能为空' }, { type: 'number', message: '面试成绩必须为数字值' }],
  //interviewScore: [{ required: true, validator: checkInterviewScore, trigger: 'blur' }],
  //interviewer: [{ required: true, message: '请输入面试考官', trigger: 'blur' }],
  comments: [{ required: true, message: '请输入面试评语', trigger: 'blur' }],
}
export default {
  components: {},
  props: ['formData'],
  data () {
    //   var checkInterviewScore = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('分数不能为空'))
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error('请输入数字值'))
    //     } else {
    //       if (value > 101) {
    //         callback(new Error('分数必须在100分之间'))
    //       } else {
    //         callback()
    //       }
    //     }
    //   }, 1000)
    // }
    return {
      labelPosition: 'right',
      // formData: {
      //   id: '',
      //   interviewScore: '',
      //   //interviewer: '',
      //   comments: '',
      // },
      rules: allRules,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    /**
     * 首次进入界面获取面试信息
     */
    loadPage () {
      // getInterviewById(this.formData.examId).then(res => {
      //   this.ruleForm = res.data.data
      // })
    },

    /**
     * 保存提交
     */
    handleSubmit (formName) {
      const submitForm = this.formData
      this.$refs[formName].validate((valid) => {
        if (valid) {
          passInterviewById(submitForm).then(() => {
            this.$emit('close', false)
            this.$message({
              showClose: true,
              message: '面试判分成功',
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