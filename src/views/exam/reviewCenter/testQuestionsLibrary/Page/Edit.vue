<template>
  <div class="report">
    <page-header title="创建新试题" :data="[10, 5]" :backOption="backOption"></page-header>
    <el-form :model="form" ref="form" label-width="110px" :rules="rules">
      <div class="select">
        <el-form-item class="item" label="科目：" prop="field">
          <el-select v-model="form.field" size="small" clearable :disabled="flag">
            <el-option
                v-for="(item, index) in res.exms_subjects"
                :key="index"
                :label="item.label"
                :value="item.id"
              ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" label="题类：" prop="kind" style="margin-left:20%;">
          <el-select v-model="form.kind" size="small" clearable :disabled="flag">
            <el-option
                v-for="(item, index) in res.exms_question_category"
                :key="index"
                :label="item.label"
                :value="item.id"
              ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" label="题型：" prop="questionType">
          <el-select v-model="form.questionType" size="small" clearable :disabled="flag" @change="handleChangeQuestionType">
            <el-option
                v-for="(item, index) in res.exms_question_type"
                :key="index"
                :label="item.label"
                :value="item.id"
              ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" label="难度：" prop="difficulty" style="margin-left:20%;">
          <el-select v-model="form.difficulty" size="small" clearable :disabled="flag">
            <el-option
                v-for="(item, index) in res.exms_difficulty"
                :key="index"
                :label="item.label"
                :value="item.id"
              ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" label="关联：" prop="associatedState">
          <el-select v-model="form.associatedState" size="small" clearable :disabled="flag">
            <el-option
              v-for="(item, index) in associatedStateList"
              :key="index"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="item" label="关联标签：" prop="tagLists" style="margin-left:20%;">
          <mutiply-tag-select v-model="form.tagLists" :select-objs="form.tagsList"></mutiply-tag-select>
        </el-form-item>
      </div>
      
    </el-form>
    <div align="center" style="width:100%;margin-top:220px;">
      <iep-button type="primary" @click="saveBothForm" style="margin:0 10px;" :disabled="flag">下一步</iep-button>
      <iep-button @click="resSubjectset" style="margin:0 10px;" :disabled="!flag">重置</iep-button>
      <hr>
    </div>
    <iep-tabs v-if="flag" v-model="tabName" :tab-list="tabList">
      <template v-if="tabName ==='Single'" v-slot:Single>
        <single-dialog ref="single" :shortAnswer="shortAnswer"></single-dialog>
        <div align="center" style="margin-top:2%;">
          <iep-button type="primary" @click="submitSingle">提交</iep-button>
          <!-- <iep-button @click="saveSingle" style="margin:0 10px;">保存</iep-button> -->
        </div>
      </template>
      <template v-if="tabName ==='Batch'" v-slot:Batch>
        <batch-dialog ref="batch"></batch-dialog>
      </template>
    </iep-tabs>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import SingleDialog from './Single.vue'
import BatchDialog from './Batch.vue'
import MutiplyTagSelect from '@/components/deprecated/mutiply-tag-select'
import { getTestOption,postNewTest } from '@/api/exam/createExam/newTest/newTest'
export default {
  name: 'report',
  mixins: [ mixins ],
  components:{
    SingleDialog,
    BatchDialog,
    MutiplyTagSelect,
  },
  data () {
    return {
      shortAnswer: '',
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      res: {},
      flag: false,
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
        {id:'0',label:'不限'},
        {id:'1',label:'限考试'},
      ],
      tabList: [
        {
          label: '单题输入',
          value: 'Single',
        }, 
        {
          label: '批量导入',
          value: 'Batch',
        }, 
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
        associatedState:[
          { required: true, message: '请选择关联', trigger: 'change' },
        ],
      },
    }
  },
  created (){
    this.getTestOption ()
  },
  methods:{
    /**
     *题型选到简答题时
     */
    handleChangeQuestionType (val){
      if (val == 10) {
        this.shortAnswer = true
        return this.shortAnswer
      }
      else {
        this.shortAnswer = false
        return this.shortAnswer
      }
    },
    /**
     * 返回
     */
    handleGoBack () {
      this.$emit('onGoBack')
    },
    /**
     * 保存试题
     */
    // saveSingle (){},
    /**
     * 提交试题
     */
    async submitSingle (){
      if(this.$refs.single.submitForm () == true){
        // this.$refs.single.submitForm ()
        this.form.tag = this.form.tagLists
        let form = this.form
        let ruleForm = this.$refs.single.ruleForm
        let singleBothForm = Object.assign(form,ruleForm)
        delete singleBothForm.options
        delete singleBothForm.tagLists
        let postSingleBothForm = {
          itemBankList: [],
          tag: [],
        }
        postSingleBothForm.itemBankList.push(singleBothForm)
        postSingleBothForm.tag = this.form.tag
        postSingleBothForm = JSON.stringify(postSingleBothForm)
        await postNewTest(postSingleBothForm).then( res => {
          console.log(res)
        })
        this.$message({
          type: 'success',
          message: '提交成功!',
        })
        this.$emit('onGoBack')
        // console.log(postSingleBothForm)
        // this.$router.push('/exam/reviewCenter/testQuestionsLibrary/')
      }
    },
    /**
     * 保存试题选项表单
     */
    saveBothForm (){
      this.$refs.form.validate(async valid => {
        if(valid){
          this.flag = true
        }
        else{
          this.flag = false   
        }
      })
      return this.flag
    },
    /**
     * 重置试题选项表单
     */
    resSubjectset (){
      this.form.field = ''
      this.form.kind = ''
      this.form.questionType = ''
      this.form.difficulty = ''
      this.form.associatedState = ''
      this.form.tagLists = []
      this.flag = false
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
</style>
