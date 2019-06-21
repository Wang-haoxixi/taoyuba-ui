<template>
  <div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="110px" :rules="rules" style="border:solid 1px #eee;padding:40px 0 20px 0;">
      <el-form-item label="题目：" prop="title">
        <el-input type="textarea" rows="3" v-model="ruleForm.title" placeholder="请填写题目" style="width:89%;"
          :readonly="btnDisabled" maxlength="250" show-word-limit>
        </el-input>
      </el-form-item>

      <el-form-item v-show="index < 26 && postAnswer == 13" v-for="(option, index) in ruleForm.radioOptions"
        :label="'选项 ' + chooseOption[index] + ' ：'" :key="option.key" :prop="'radioOptions.' + index + '.value'">
        <el-input v-model="option.value" placeholder="请输入选项答案" size="small" style="width:89%;"
          :readonly="btnDisabled"></el-input>
        <iep-button plain v-show="index > 0" @click="removeRadioOption(option)" icon="el-icon-close"
          style="margin-left:10px;" :disabled="btnDisabled">移除
        </iep-button>
        <span v-show="false">{{postAnswer}}</span>
      </el-form-item>
      <iep-button v-show="clickAdd < 25 && postAnswer == 13" icon="el-icon-plus" @click="addRadioOption"
        style="margin:-4px 0 20px 110px;" :disabled="btnDisabled">添加选项
      </iep-button>

      <el-form-item v-show="index < 26 && postAnswer == 12" v-for="(option, index) in ruleForm.checkboxOptions"
        :label="'选项 ' + chooseOption[index] + ' ：'" :key="option.key" :prop="'checkboxOptions.' + index + '.value'">
        <el-input v-model="option.value" placeholder="请输入选项答案" size="small" style="width:89%;"
          :readonly="btnDisabled"></el-input>
        <iep-button plain v-show="index > 0" @click="removeCheckboxOption(option)" icon="el-icon-close"
          style="margin-left:10px;" :disabled="btnDisabled">移除
        </iep-button>
        <span v-show="false">{{postAnswer}}</span>
      </el-form-item>
      <iep-button v-show="clickAdd < 25 && postAnswer == 12" icon="el-icon-plus" @click="addCheckboxOption"
        style="margin:-4px 0 20px 110px;" :disabled="btnDisabled">添加选项
      </iep-button>

      <el-form-item class="item" label="答案：" prop="inputRadioAnswer" v-if="postAnswer == 13">
        <el-select v-model="ruleForm.inputRadioAnswer" clearable size="small" placeholder="请选择答案"
          :disabled="btnDisabled">
          <el-option v-for="(item, index) in ruleForm.radioOption" :key="index" :label="radioList[index].label"
            :value="radioList[index].id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="item" label="答案：" prop="inputCheckboxAnswer" v-if="postAnswer == 12">
        <el-select multiple v-model="ruleForm.inputCheckboxAnswer" clearable size="small"
          placeholder="请选择答案" :disabled="btnDisabled" @change="handleSelectCheckboxAnswer">
          <el-option v-for="(item, index) in ruleForm.checkboxOption" :key="index" :label="checkboxList[index].label"
            :value="checkboxList[index].id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="item" label="答案：" prop="inputJudgeAnswer" v-if="postAnswer == 11">
        <el-select v-model="ruleForm.inputJudgeAnswer" clearable size="small" placeholder="请选择答案"
          :disabled="btnDisabled">
          <el-option v-for="(item, index) in judgeStateList" :key="index" :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="答案：" prop="inputShortAnswer" v-if="postAnswer == 10">
        <el-input type="textarea" rows="3" v-model="ruleForm.inputShortAnswer" placeholder="请填写答案"
          style="width:89%;" :readonly="btnDisabled" maxlength="500" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="解析：" prop="analysis">
        <el-input type="textarea" rows="3" v-model="ruleForm.analysis" placeholder="请填写解析" style="width:89%;"
          :readonly="btnDisabled" maxlength="500" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <!-- <div align="center" style="margin-top:30px;">
      <iep-button type="primary" @click="submitForm('ruleForm')" style="margin:0 10px;">提交</iep-button>
      <iep-button @click="saveForm('ruleForm')" style="margin:0 10px;">保存</iep-button>
    </div> -->
  </div>
</template>

<script>
import { radioList, checkboxList, chooseOption } from './option'
export default {
  props: ['postAnswer'],
  data () {
    return {
      btnDisabled: '',
      radioList,
      checkboxList,
      chooseOption,
      clickAdd: 0,
      ruleForm: {
        answer: '',
        radioOptions: [{
          value: '',
        }],
        checkboxOptions: [{
          value: '',
        }],
        radioOption: [{
          id: '',
          value: '',
        }],
        checkboxOption: [{
          id: '',
          value: '',
        }],
        judgeOption: [{
          id: '',
          value: '',
        }],
        title: '',
        inputRadioAnswer: '',
        inputCheckboxAnswer: [],
        inputJudgeAnswer: '',
        inputShortAnswer: '',
        analysis: '',
      },
      rules: {
        title: [
          { required: true, message: '请填写题目', trigger: 'blur' },
        ],
        inputRadioAnswer: [
          { required: true, message: '请填写答案', trigger: 'change' },
        ],
        inputCheckboxAnswer: [
          { required: true, message: '请填写答案', trigger: 'change' },
        ],
        inputJudgeAnswer: [
          { required: true, message: '请填写答案', trigger: 'change' },
        ],
        inputShortAnswer: [
          { required: true, message: '请填写答案', trigger: 'blur' },
        ],
      },
      judgeStateList: [
        { id: '正确', label: '正确' },
        { id: '错误', label: '错误' },
      ],
    }
  },
  created () {
  },
  methods: {
    /**
     * 保存
     */
    // saveForm (formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('submit!')
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    /**
     * 复选答案正排序
     */
    handleSelectCheckboxAnswer () {
      this.ruleForm.inputCheckboxAnswer = this.ruleForm.inputCheckboxAnswer.sort()
    },
    /**
     * 禁用输入及选择
     */
    inputDisabled () {
      this.btnDisabled = true
    },
    /**
     * 不禁用输入及选择
     */
    inputUndisabled () {
      this.btnDisabled = false
    },
    /**
     * 提交
     */
    submitForm () {
      let flag = false
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.postAnswer == 13) {
            const radioOptions = this.ruleForm.radioOptions
            for (let index = 0; index < radioOptions.length; index++) {
              this.ruleForm.radioOptions[index].key = this.chooseOption[index]
            }
            this.ruleForm.titleOptions = JSON.stringify(this.ruleForm.radioOptions).toString()
            this.ruleForm.answer = this.ruleForm.inputRadioAnswer
            if (this.ruleForm.inputRadioAnswer.length == 0) {
              this.$message.error('请输入答案！')
              flag = false
            }
            else
              flag = true
          }
          if (this.postAnswer == 12) {
            const checkboxOptions = this.ruleForm.checkboxOptions
            for (let index = 0; index < checkboxOptions.length; index++) {
              this.ruleForm.checkboxOptions[index].key = this.chooseOption[index]
            }
            this.ruleForm.titleOptions = JSON.stringify(this.ruleForm.checkboxOptions).toString()
            this.ruleForm.answer = JSON.stringify(this.ruleForm.inputCheckboxAnswer).toString()
            if (this.ruleForm.inputCheckboxAnswer.length == 0) {
              this.$message.error('请输入答案！')
              flag = false
            }
            else
              flag = true
          }
          if (this.postAnswer == 11) {
            this.ruleForm.answer = this.ruleForm.inputJudgeAnswer
            if (this.ruleForm.inputJudgeAnswer.length == 0) {
              this.$message.error('请输入答案！')
              flag = false
            }
            else
              flag = true
          }
          if (this.postAnswer == 10) {
            this.ruleForm.answer = this.ruleForm.inputShortAnswer
            if (this.ruleForm.inputShortAnswer.length == 0) {
              this.$message.error('请输入答案！')
              flag = false
            }
            else
              flag = true
          }
          // console.log(this.ruleForm)
          // flag = true
        } else {
          // console.log('error submit!!')
          flag = false
        }
      })
      return flag
    },
    /**
     * 添加单选选项
     */
    addRadioOption () {
      this.ruleForm.radioOptions.push({
        value: '',
        // key: Date.now(),
      })
      this.clickAdd++
      if (this.postAnswer == 13) {
        this.ruleForm.radioOption.push({
          id: '',
          value: '',
        })
      }
      // console.log(this.ruleForm.radioOptions.length)
    },
    /**
     * 添加复选选项
     */
    addCheckboxOption () {
      this.ruleForm.checkboxOptions.push({
        value: '',
      })
      this.clickAdd++
      if (this.postAnswer == 12) {
        this.ruleForm.checkboxOption.push({
          id: '',
          value: '',
        })
        // this.ruleForm.inputCheckboxAnswer = []
      }
    },
    /**
     * 移除单选选项
     */
    removeRadioOption (item) {
      this.$confirm('确定要移除该选项？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '移除成功!',
        })
        var index = this.ruleForm.radioOptions.indexOf(item)
        var radioIndex = this.ruleForm.radioOption.indexOf(item)
        if (index != 0) {
          this.ruleForm.radioOptions.splice(index, 1)
        }
        if (radioIndex != 0 && this.postAnswer == 13) {
          this.ruleForm.radioOption.splice(radioIndex, 1)
          this.ruleForm.inputRadioAnswer = ''
        }
        this.clickAdd--
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消移除!',
        })
      })
    },
    /**
     * 移除复选选项
     */
    removeCheckboxOption (item) {
      this.$confirm('确定要移除该选项？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '移除成功!',
        })
        var index = this.ruleForm.checkboxOptions.indexOf(item)
        var checkboxIndex = this.ruleForm.checkboxOption.indexOf(item)
        if (index != 0) {
          this.ruleForm.checkboxOptions.splice(index, 1)
        }
        if (checkboxIndex != 0 && this.postAnswer == 12) {
          this.ruleForm.checkboxOption.splice(checkboxIndex, 1)
          this.ruleForm.inputCheckboxAnswer = []
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
  padding: 4px 4px 0 25px !important;
}
.item {
  width: 90%;
}
</style>
<style scoped>
.item >>> .el-input .el-select__caret {
  line-height: 2.9;
}
</style>

