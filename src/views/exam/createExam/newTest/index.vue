<template>
  <div class="report">
    <page-header title="创建新试题" :data="[10, 5]"></page-header>
    <el-form :model="form" ref="form" label-width="110px" :rules="rules">
      <el-form-item label="题库：" prop="field" style="width:35%;float:left;">
        <el-select v-model="form.field" size="small" clearable :disabled="flag">
          <el-option
              v-for="(item, index) in res.exms_subjects"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题类：" prop="kind" style="width:35%;float:left;margin-left:20%;">
        <el-select v-model="form.kind" size="small" clearable :disabled="flag">
          <el-option
              v-for="(item, index) in res.exms_question_category"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题型：" prop="questionType" style="width:35%;float:left;">
        <el-select v-model="form.questionType" size="small" clearable :disabled="flag">
          <el-option
              v-for="(item, index) in res.exms_question_type"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="难度：" prop="difficulty" style="width:35%;float:left;margin-left:20%;">
        <el-select v-model="form.difficulty" size="small" clearable :disabled="flag">
          <el-option
              v-for="(item, index) in res.exms_difficulty"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联标签：" prop="tagLists" style="width:100%;float:left;">
        <mutiply-tag-select v-model="form.tagLists" :select-objs="form.tagsList"></mutiply-tag-select>
      </el-form-item>
    </el-form>
    <div align="center" style="width:100%;margin-top:200px;">
      <iep-button type="primary" @click="saveBothForm" style="margin:0 10px;" :disabled="flag">确定</iep-button>
      <iep-button @click="resSubjectset" style="margin:0 10px;" :disabled="!flag">重置</iep-button>
      <hr>
    </div>
    <iep-tabs v-if="flag" v-model="tabName" :tab-list="tabList">
      <template v-if="tabName ==='singleTab'" v-slot:singleTab>
        <single-dialog ref="single"></single-dialog>
        <div align="center" style="margin-top:30px;">
          <iep-button type="primary" style="margin:0 10px;" @click="submitSingle">提交</iep-button>
          <iep-button @click="saveSingle" style="margin:0 10px;">保存</iep-button>
        </div>
      </template>
      <template v-if="tabName ==='batchTab'" v-slot:batchTab>
        <batch-dialog ref="batch"></batch-dialog>
      </template>
    </iep-tabs>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import SingleDialog from './singleTab/index.vue'
import BatchDialog from './batchTab/index.vue'
import MutiplyTagSelect from '@/components/deprecated/mutiply-tag-select'
import {getTestOption} from '@/api/exam/createExam/newTest/newTest'
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
      },
      tabName: 'singleTab',
      tabList: [
        {
          label: '单题输入',
          value: 'singleTab',
        }, 
        {
          label: '批量导入',
          value: 'batchTab',
        }, 
      ],
      rules: {
        field: [
          { required: true, message: '请选择题库', trigger: 'change' },
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
      },
    }
  },
  created (){
    this.getTestOption ()
  },
  methods:{
    /**
     * 保存
     */
    saveSingle (){

    },
    /**
     * 提交
     */
    submitSingle (){
      if(this.$refs.single.submitForm () == true){
        this.$refs.single.submitForm ()
        this.form.tag = JSON.stringify(this.form.tagLists)
        let form = this.form
        let ruleForm = this.$refs.single.ruleForm
        let singleBothForm = Object.assign(form,ruleForm)
        console.log(singleBothForm)
        this.$message({
          type: 'success',
          message: '提交成功!',
        })
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
</style>
