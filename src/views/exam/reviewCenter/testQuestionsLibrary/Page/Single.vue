<template>
  <div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="110px" :rules="rules" style="border:solid 1px #eee;padding:40px 0 20px 0;">
      <el-form-item label="题目：" prop="title">
        <el-input type="textarea" rows="3" v-model="ruleForm.title" style="width:89%;"></el-input>
      </el-form-item>
      <el-form-item
        v-show="index < 26 && !shortAnswer"
        v-for="(option, index) in ruleForm.options"
        :label="'选项 ' + chooseOption[index] + ' ：'"
        :key="option.key"
        :prop="'options.' + index + '.value'">
        <el-input v-model="option.value" style="width:89%;"></el-input>
        <iep-button plain v-show="index > 0" @click="removeOption(option)" icon="el-icon-close" style="margin-left:10px;">移除</iep-button><span v-show="false">{{shortAnswer}}</span>
      </el-form-item>
      <iep-button v-show="clickAdd < 25 && !shortAnswer" icon="el-icon-plus" style="margin:-4px 0 20px 110px;" @click="addOption">添加选项</iep-button>
      <el-form-item label="答案：" prop="answer">
        <el-input type="textarea" rows="3" v-model="ruleForm.answer" style="width:89%;">
        </el-input>
      </el-form-item>
      <el-form-item label="解析：" prop="analysis">
        <el-input type="textarea" rows="3" v-model="ruleForm.analysis" style="width:89%;"></el-input>
      </el-form-item>
    </el-form>
    <!-- <div align="center" style="margin-top:30px;">
      <iep-button type="primary" @click="submitForm('ruleForm')" style="margin:0 10px;">提交</iep-button>
      <iep-button @click="saveForm('ruleForm')" style="margin:0 10px;">保存</iep-button>
    </div> -->
  </div>
</template>

<script>
export default {
  props:['shortAnswer'],
  data (){
    return{
      clickAdd: 0,
      chooseOption: [
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
      ],
      ruleForm:{
        options: [
          {
          value: '',
        }],
        title: '',
        answer: '',
        analysis: '',
      },
      rules: {
        title: [
          { required: true, message: '请填写题目', trigger: 'change' },
        ],
        answer: [
          { required: true, message: '请填写答案', trigger: 'change' },
        ],
        analysis: [
          { required: true, message: '请填写解析', trigger: 'change' },
        ],
      },
    }
  },
  created () {
    this.typeOption ()
  },
  methods:{
    /**
     * 判断选择题还是简答题
     */
    typeOption (){
      if (this.$emit('handleChangeQuestionType') == true) {
        console.log('wew')
      }
      if (this.$emit('handleChangeQuestionType') == false) {
        console.log('rht')
      }
    },
    /**
     * 保存
     */
    saveForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * 提交
     */
    submitForm () {
      let flag = false
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {

          const options = this.ruleForm.options
          for (let index = 0; index < options.length; index++) {
            this.ruleForm.options[index].key = this.chooseOption[index]
          }
          
          this.ruleForm.titleOptions = JSON.stringify(this.ruleForm.options).toString()
          // console.log(this.ruleForm)
          flag = true
        } else {
          // console.log('error submit!!')
          flag = false
        }
      })
      return flag
    },
    /**
     * 添加选项
     */
    addOption (){
      this.ruleForm.options.push({
        value: '',
        // key: Date.now(),
      })
      this.clickAdd++
    },
    /**
     * 移除选项
     */
    removeOption (item) {
      this.$confirm('确定要移除该选项？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '移除成功!',
        })
        var index = this.ruleForm.options.indexOf(item)
        if (index !== 0) {
          this.ruleForm.options.splice(index, 1)
        }
        this.clickAdd--
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消移除!',
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.el-form-item__error {
  padding:4px 4px 0 25px!important;
}
</style>

