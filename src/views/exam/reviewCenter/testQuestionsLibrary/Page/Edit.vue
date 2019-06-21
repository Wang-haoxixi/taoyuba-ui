<template>
  <div class="report">
    <page-header :title="`${record.methodName}试题`" :data="[10, 5]" :backOption="backOption"></page-header>
    <el-form :model="form" ref="form" label-width="110px" :rules="rules">
      <div class="select">
        <el-form-item class="item" label="题型：" prop="questionType">
          <el-select v-model="form.questionType" size="small" clearable @change="handleChangeQuestionType"
            :disabled="questionTypeDisabled">
            <el-option v-for="(item, index) in res.exms_question_type" :key="index" :label="item.label"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" label="难度：" prop="difficulty" style="margin-left:20%;">
          <el-select v-model="form.difficulty" size="small" clearable :disabled="btnDisabled">
            <el-option v-for="(item, index) in res.exms_difficulty" :key="index" :label="item.label"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" label="科目：" prop="field">
          <el-select v-model="form.field" size="small" clearable :disabled="btnDisabled">
            <el-option v-for="(item, index) in res.exms_subjects" :key="index" :label="item.label"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" label="题类：" prop="kind" style="margin-left:20%;">
          <el-select v-model="form.kind" size="small" clearable :disabled="btnDisabled">
            <el-option v-for="(item, index) in res.exms_question_category" :key="index" :label="item.label"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" label="关联：" prop="associatedState">
          <el-select v-model="form.associatedState" size="small" clearable :disabled="btnDisabled">
            <el-option v-for="(item, index) in associatedStateList" :key="index" :label="item.label"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="item" label="关联标签：" prop="tagKeyWords" style="margin-left:20%;">
          <mutiply-tag-select v-if="btnDisabled == false" v-model="form.tagKeyWords" :select-objs="form.tagKeyWords" width="906px" ></mutiply-tag-select>
          <el-tag v-else class="relatedTag" type="info" :key="tag" v-for="tag in tagsShow" size="medium">{{tag}}</el-tag>
        </el-form-item>
      </div>
    </el-form>

    <div align="center" style="width:100%;margin-top:250px;">
      <hr>
    </div>

    <iep-tabs v-model="tabName" :tab-list="tabList">
      <template v-if="tabName ==='Single'" v-slot:Single>
        <single-dialog ref="single" :postAnswer="postAnswer"></single-dialog>
        <div align="center" style="margin-top:2%;">
          <iep-button v-if="btnSave == 0" type="primary" @click="submitSingle">保存</iep-button>
          <iep-button v-if="btnSave == 1" type="primary" @click="saveSingle" v-show="!btnDisabled">保存</iep-button>
        </div>
      </template>
      <!-- <template v-if="tabName ==='Batch'" v-slot:Batch>
        <batch-dialog ref="batch"></batch-dialog>
      </template> -->
    </iep-tabs>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import SingleDialog from './Single.vue'
// import BatchDialog from './Batch.vue'
import MutiplyTagSelect from '@/components/deprecated/mutiply-tag-select'
import { getTestOption, postNewTest, getExamMsg, postModify } from '@/api/exam/createExam/newTest/newTest'
export default {
  name: 'report',
  mixins: [mixins],
  components: {
    SingleDialog,
    // BatchDialog,
    MutiplyTagSelect,
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      tagsShow: [],
      btnDisabled: false,
      btnSave: '',
      questionTypeDisabled: false,
      postAnswer: '',
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      res: {},
      // fieldList: ['大库','小库'],
      // kindList: ['操作题','客观题'],
      // questionTypeList: ['选择题','判断题'],
      // difficultyList: ['简单','中等','困难'],
      form: {
        field: '',
        questionType: '',
        kind: '',
        difficulty: '',
        associatedState: '',
      },
      tabName: 'Single',
      associatedStateList: [
        { id: 0, label: '不限' },
        { id: 1, label: '限考试' },
      ],
      tabList: [
        {
          label: '单题输入',
          value: 'Single',
        },
        // {
        //   label: '批量导入',
        //   value: 'Batch',
        // },
      ],
      rules: {
        field: [
          { required: true, message: '请选择科目', trigger: 'change' },
        ],
        kind: [
          { required: true, message: '请选择题类', trigger: 'change' },
        ],
        questionType: [
          { required: true, message: '请选择题型', trigger: 'change' },
        ],
        difficulty: [
          { required: true, message: '请选择难度', trigger: 'change' },
        ],
        associatedState: [
          { required: true, message: '请选择关联', trigger: 'change' },
        ],
      },
    }
  },
  created () {
    this.getTestOption()
  },
  watch: {
    res: function () {
      // this.getTestPaper ()
    },
  },
  methods: {
    /**
     * 获取试题
     */
    getTestPaper () {
      const { id } = this.record
      if (this.record.edit == true) {
        this.btnDisabled = this.record.edit
        this.$refs.single.inputDisabled ()
      }
      if (this.record.edit == false) {
        this.btnDisabled = this.record.edit
        this.$refs.single.inputUndisabled ()
      }
      if (id) {
        this.btnSave = 1
        const param = {
          id: this.record.id,
        }
        getExamMsg(param).then(res => {
          this.questionTypeDisabled = true
          this.form = res.data.data
          this.$refs.single.ruleForm.title = res.data.data.title
          this.$refs.single.ruleForm.analysis = res.data.data.analysis
          this.postAnswer = res.data.data.questionType
          this.tagsShow = res.data.data.tagKeyWords
          if (res.data.data.questionType == 13) {
            var arrRadio = JSON.parse(res.data.data.titleOptions)
            // console.log(arrRadio)
            this.$refs.single.ruleForm.radioOptions = arrRadio
            this.$refs.single.ruleForm.radioOption = arrRadio.map(i => i.value)
            this.$refs.single.ruleForm.inputRadioAnswer = res.data.data.answer
          }
          if (res.data.data.questionType == 12) {
            var arrCheckbox = JSON.parse(res.data.data.titleOptions)
            // console.log(arrCheckbox)
            this.$refs.single.ruleForm.checkboxOptions = arrCheckbox
            this.$refs.single.ruleForm.checkboxOption = arrCheckbox.map(i => i.value)
            this.$refs.single.ruleForm.inputCheckboxAnswer = JSON.parse(res.data.data.answer)
          }
          if (res.data.data.questionType == 11) {
            this.$refs.single.ruleForm.inputJudgeAnswer = res.data.data.answer
          }
          if (res.data.data.questionType == 10) {
            this.$refs.single.ruleForm.inputShortAnswer = res.data.data.answer
          }
          // console.log('res.data.data => ',res.data.data)
        })
      }
      if (!id) {
        this.btnSave = 0
      }
    },
    /**
     *判断题型
     */
    handleChangeQuestionType (val) {
      // this.$refs.single.$refs['ruleForm'].resetFields ()
      this.postAnswer = val
    },
    /**
     * 返回
     */
    handleGoBack () {
      this.$emit('onGoBack')
    },
    /**
     * 修改保存试题
     */
    saveSingle (){
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.$refs.single.submitForm() == true) {
            // this.$refs.single.submitForm ()
            this.form.tag = this.form.tagKeyWords
            let form = this.form
            let ruleForm = this.$refs.single.ruleForm
            let singleBothForm = Object.assign(form, ruleForm)
            singleBothForm = JSON.stringify(singleBothForm)
            postModify(singleBothForm).then(res => {
              if (res.data.data == true) {
                this.$message({
                  type: 'success',
                  message: '修改成功!',
                })
                this.$emit('onGoBack')
              }
            })
          }
        }
      })
    },
    /**
     * 提交试题
     */
    submitSingle () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.$refs.single.submitForm() == true) {
            // this.$refs.single.submitForm ()
            this.form.tag = this.form.tagKeyWords
            let form = this.form
            let ruleForm = this.$refs.single.ruleForm
            let singleBothForm = Object.assign(form, ruleForm)
            delete singleBothForm.options
            delete singleBothForm.tagKeyWords
            let postSingleBothForm = {
              itemBankList: [],
              tag: [],
            }
            postSingleBothForm.itemBankList.push(singleBothForm)
            postSingleBothForm.tag = this.form.tag
            postSingleBothForm = JSON.stringify(postSingleBothForm)
            postNewTest(postSingleBothForm).then(res => {
              if (res.data.data == true) {
                this.$message({
                  type: 'success',
                  message: '提交成功!',
                })
                this.$emit('onGoBack')
              }
            })

            // console.log(postSingleBothForm)
            // this.$router.push('/exam/reviewCenter/testQuestionsLibrary/')
          }
        }
      })

    },
    /**
     * 获取试题数据
     */
    async getTestOption () {
      const params = {
        numberList: [
          'exms_subjects',//考试科目
          'exms_question_type',//题型
          'exms_question_category',//题类
          'exms_difficulty',//难度
        ],
      }
      const { data } = await getTestOption(params)
      this.getTestPaper()

      // const { data } = await getTestOption ('exms_subjects')
      this.res = data
      // console.log(this.res)
      // this.res.exms_subjects = this.res.exms_subjects.map(i => i.label)
      // this.res.exms_question_type = this.res.exms_question_type.map(i => i.label)
      // this.res.exms_question_category = this.res.exms_question_category.map(i => i.label)
      // this.res.exms_difficulty = this.res.exms_difficulty.map(i => i.label)
      // console.log(this.res.data.map(i => i.label))
    },
  },
}
</script>

<style lang="scss" scoped>
.report {
  padding: 20px;
  background-color: #fff;
}
.item {
  width: 35%;
  float: left;
}
</style>
<style scoped>
.select >>> .el-input .el-select__caret {
  line-height: 2.9;
}
.relatedTag {
  margin-right: 10px;
}
</style>
