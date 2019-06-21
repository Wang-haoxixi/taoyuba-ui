<template>
  <steps-content>
    <el-card shadow="never" class="content-wrapper">
      <div slot="header">
        <el-form label-width="80px" :inline="true">
          <el-form-item label="当前题数">
            <el-input size="small" v-model="assessmentPaper.choiceNum"></el-input>
          </el-form-item>
          <el-form-item label="当前总分">
            <el-input size="small" v-model="assessmentPaper.score"></el-input>
          </el-form-item>
          <el-form-item style="float:right">
            <iep-button icon="el-icon-plus" type="primary" @click="questionButton()" :disabled="readOnly">试题配置</iep-button>
          </el-form-item>
        </el-form>
      </div>
      <el-row class="total-questions" v-for="(item,index) in pagerListSort" :key="index">
        <el-col :span="24" class="questions">
          <div class="title">
            <h2>{{res.exms_question_type.find(data => {
              return data.id === parseInt(item.type)
              }).label}}</h2>
            <span v-if="readOnly===false" class="el-icon-close" @click="deletePaper(index)"></span>
          </div>
          <div class="body">
            <el-form label-width="50px" :inline="true">
              <div class="dt_div">
                <el-form-item label="科目:">
                  <el-select v-model="item.field" multiple collapse-tags size="mini" disabled>
                    <el-option v-for="(item, index) in res.exms_subjects" :key="index" :label="item.label"
                      :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="题型:">
                  <el-select v-model="item.type" disabled size="mini">
                    <el-option v-for="(item, index) in res.exms_question_type" :key="index" :label="item.label"
                      :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="配置状态:" label-width="80px">
                  <el-select v-model="item.configurationState" disabled size="mini">
                    <el-option value="0" label="固定选题"></el-option>
                    <el-option value="1" label="随机选题"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item style="float:right">
                  <iep-button type="primary" @click="questionButton(index)" :disabled="readOnly">试题配置</iep-button>
                </el-form-item>
              </div>
              <div class="dt_div">
                <el-form-item label="简单:">
                  <el-input v-model="item.simpleNum" size="mini" readonly></el-input>
                </el-form-item>
                <el-form-item label="普通:">
                  <el-input v-model="item.middleNum" size="mini" readonly></el-input>
                </el-form-item>
                <el-form-item label="困难:">
                  <el-input v-model="item.hardNum" size="mini" readonly></el-input>
                </el-form-item>
                <el-form-item label="共">
                  <el-input v-model="item.total" size="mini" readonly>
                    <template slot="append">道</template>
                  </el-input>
                </el-form-item>
              </div>
              <div class="dt_div">
                <el-form-item label="每题:">
                  <el-input v-model="item.single" size="mini" readonly style="width:150px">
                    <template slot="append">分</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="共:">
                  <el-input size="mini" readonly :value="item.total * item.single" style="width:160px">
                    <template slot="append">分</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="打分方式:" label-width="90px" v-if="item.type==11">
                  <el-radio-group v-model="item.scoringMethod">
                    <el-radio label="0" disabled>系统判定</el-radio>
                    <el-radio label="1" disabled>人工阅卷</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item style="margin-left:20px" v-if="item.type==11 || item.type==10">
                  <el-checkbox v-model="item.marker" label="指定阅卷老师" disabled></el-checkbox>
                </el-form-item>
                <el-form-item style="margin-left:20px" v-if="item.type==10">
                  <el-switch active-text="多选模式" v-model="item.multipleSelection" disabled
                    :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
              </div>

              <div class="dt_div" v-if="item.type==10">
                <el-form-item label="题型:" style="width: 100%;" class="qstnDescribeArea">
                  <iep-input-area :autosize={minRows:2,maxRows:6} readonly v-model="item.qstnDescribe"></iep-input-area>
                </el-form-item>
              </div>

              <div class="dt_div" v-if="item.configurationState=='0'">
                <el-form-item label="已选试题:" style="width:100%" label-width="75px"></el-form-item>
                <el-table :data="item.iepItemBankList" :header-cell-style="getRowClass" class="questionTable"
                  border style="width: 100%; margin-bottom: 10px;">
                  <el-table-column type="index" align="center"></el-table-column>
                  <el-table-column prop="title" label="内容">
                    <template slot-scope="scope">
                      {{scope.row.title}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="title" label="题型" width="120px">
                    <template slot-scope="scope">
                      {{scope.row.questionTypeName}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="title" label="题类" width="120px">
                    <template slot-scope="scope">
                      {{scope.row.kindName}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="levelName" label="难度" width="120px">
                    <template slot-scope="scope">
                      {{scope.row.difficultyName}}
                    </template>
                  </el-table-column>
                </el-table>

              </div>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <hr>

      <div class="footer">

        <ul>
          <li>
            简单：<span>{{assessmentPaper.simpleNum || 0}}</span>道
          </li>
          <li>
            一般：<span>{{assessmentPaper.middleNum || 0}}</span>道
          </li>
          <li>
            困难：<span>{{assessmentPaper.hardNum || 0}}</span>道
          </li>
          <li>共{{assessmentPaper.choiceNum || 0}}道</li>
        </ul>
        <!-- <span>难度系数：{{assessmentPaper.difficulty || 0}} <span>中等</span></p> -->
      </div>
    </el-card>
    <template v-slot:action>
      <el-button style="margin-left: 8px" @click="handlePrev" v-if="isEdit==false">
        上一步
      </el-button>
      <el-button type="primary" :loading="submitLoading" :disabled="submitDisabled===false" @click="handleSubmit"
        v-if="readOnly===false">
        配置完成
      </el-button>

    </template>
    <el-dialog title="试题配置" :visible.sync="questionConfiguration" :close-on-click-modal="false"
      width="700px" @close="questionConfiguration = false">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules" v-loading="formLoading">
        <el-form-item label="科目" prop="field">
          <el-select v-model="form.field" clearable multiple placeholder="请选择科目" @visible-change="fieldChange"
            style="width:100%">
            <el-option v-for="(item, index) in res.exms_subjects" :key="index" :label="item.label"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-select v-model="form.type" clearable placeholder="请选择题型" @change="typeChange" style="width:100%">
            <el-option v-for="(item, index) in res.exms_question_type" :key="index" :label="item.label"
              :value="item.id" :disabled="choiceType.indexOf(item.id)>-1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="配置状态" prop="configurationState">
          <el-select v-model="form.configurationState" placeholder="请选择配置状态" clearable @change="configurationStateChange"
            style="width:100%">
            <el-option value="0" label="固定选题"></el-option>
            <el-option value="1" label="随机选题"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="简单题数" prop="simpleNum">
          <el-col :span="17">
            <iep-input-number controls-position="right" :max="totalNum.simple || 0" v-model="form.simpleNum"
              style="width:100%" :disabled="form.configurationState==='0'"></iep-input-number>
          </el-col>
          <el-col :span="7" style="text-align:center">题库现有 <span>{{totalNum.simple || 0}}</span>
            道</el-col>

        </el-form-item>

        <el-form-item label="一般题数" prop="middleNum">
          <el-col :span="17">
            <iep-input-number controls-position="right" :max="totalNum.general || 0" v-model="form.middleNum"
              style="width:100%" :disabled="form.configurationState==='0'"></iep-input-number>
          </el-col>
          <el-col :span="7" style="text-align:center">题库现有 <span>{{totalNum.general || 0}}</span>
            道</el-col>
        </el-form-item>

        <el-form-item label="困难题数" prop="hardNum">
          <el-col :span="17">
            <iep-input-number controls-position="right" :max="totalNum.difficult || 0" v-model="form.hardNum"
              style="width:100%" :disabled="form.configurationState==='0'"></iep-input-number>
          </el-col>
          <el-col :span="7" style="text-align:center">题库现有 <span>{{totalNum.difficult || 0}}</span>
            道</el-col>
        </el-form-item>

        <el-form-item label="每题" prop="single">
          <el-col :span="7">
            <iep-input-number controls-position="right" :min="1" v-model="form.single" style="width:100%"></iep-input-number>
          </el-col>
          <el-col :span="3">
            <span style="border-right: 1px solid #c0c4cc;">分</span>
            <span>共</span>
          </el-col>
          <el-col :span="7">
            <el-input readonly v-model="totalScore">
              <template slot="append">
                <span>分</span>
              </template>
            </el-input>

          </el-col>

        </el-form-item>

        <el-form-item label="打分方式" prop="scoringMethod" v-if="form.type==2">
          <el-radio-group v-model="form.scoringMethod">
            <el-radio label="0">系统判定</el-radio>
            <el-radio label="1">人工阅卷</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-col :span="9" v-if="form.type==2 || form.type==3">
            <el-form-item prop="marker">
              <el-checkbox v-model="form.marker" label="指定阅卷老师"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="9" v-if="form.type==3">
            <el-form-item prop="multipleSelection">
              <el-switch active-text="多选模式" v-model="form.multipleSelection" :active-value="1"
                :inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="题型说明" prop="qstnDescribe" v-if="form.type==3">
          <iep-input-area placeholder="请输入题型说明" :autosize={minRows:2,maxRows:6} v-model="form.qstnDescribe"></iep-input-area>
        </el-form-item>
        <el-form-item v-if="form.configurationState==='0'" prop="iepItemBankList" label-width="20px">
          <dialog-question-table v-model="form.iepItemBankList" :questionType="form.type"
            :fieldType="form.field.join(',')" ref="table" @show-number="showNumber"></dialog-question-table>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <iep-button type="primary" @click="submitForm">确认配置</iep-button>
      </template>
    </el-dialog>
  </steps-content>
</template>

<script>
import StepsContent from '../StepsContent'
import DialogQuestionTable from '../DialogQuestionTable'
import { postPaperAmount, postNewPaper } from '@/api/examPaper/examPaperApi'
import { getTestOption } from '@/api/exam/createExam/newTest/newTest'
import { toDtoForm, questionForm } from '../option'
function sortKey (array, key) {
  return array.sort(function (a, b) {
    var x = a[key]
    var y = b[key]
    return ((x < y) ? -1 : (x > y) ? 1 : 0)
  })
}


export default {
  name: 'CreatedNewPaper',
  props: ['data'],
  components: { StepsContent, DialogQuestionTable },
  data () {
    var checkSimpleNum = (rule, value, callback) => {
      setTimeout(() => {
        if (value === 0 && this.totalNum.simple > 0) {
          callback(new Error('请配置试题的简单题数'))
        } else {
          callback()
        }
      }, 100)
    }
    var checkMiddleNum = (rule, value, callback) => {
      setTimeout(() => {
        if (value === 0 && this.totalNum.general > 0) {
          callback(new Error('请配置试题的一般题数'))
        } else {
          callback()
        }
      }, 100)
    }
    var checkHardNum = (rule, value, callback) => {
      setTimeout(() => {
        if (value === 0 && this.totalNum.difficult > 0) {
          callback(new Error('请配置试题的困难题数'))
        } else {
          callback()
        }
      }, 100)
    }
    return {
      formLoading: false,
      questionConfiguration: false,
      choiceType: [],//已选择的题型      iepTestPaperIndex: '',//试题下标
      submitLoading: false,//提交加载
      submitDisabled: false,//禁用配置完成的按钮
      res: [],//下拉框的值
      rules: {
        field: [{ required: true, message: '请选择科目', trigger: 'change' }],
        type: [{ required: true, message: '请选择题型', trigger: 'change' }],
        configurationState: [{ required: true, message: '请选择配置状态', trigger: 'change' }],
        simpleNum: [{ validator: checkSimpleNum, trigger: 'blur' }],
        middleNum: [{ validator: checkMiddleNum, trigger: 'blur' }],
        hardNum: [{ validator: checkHardNum, trigger: 'blur' }],
        single: [{ required: true, message: '请输入每题分数', trigger: 'blur' }],
        scoringMethod: [{ required: true, message: '请选择打分方式', trigger: 'change' }],
        iepItemBankList: [{ required: true, message: '请选择试题', trigger: 'blur' }],
      },
      form: questionForm(),
      totalNum: {},
      iepQstnRuleList: [],//试题集合
    }
  },
  computed: {
    //试题总分
    totalScore: function () {
      return this.totalCount * this.form.single
    },
    //试题数目
    totalCount: function () {
      return (this.form.simpleNum + this.form.middleNum + this.form.hardNum)
    },
    //试题排序
    pagerListSort: function () {
      return sortKey(this.iepQstnRuleList, 'type')
    },
    //新增/编辑
    isEdit () {
      return this.data.iepTestPaperVO.id ? true : false
    },
    //是否只读
    readOnly () {
      if (this.isEdit) {
        return this.data.methodName === '查看' ? true : false
      } else {
        return false
      }
    },
    //评估试卷结果方法
    assessmentPaper () {
      let simpleNum = 0
      let middleNum = 0
      let hardNum = 0
      let score = 0
      this.iepQstnRuleList.forEach((item) => {
        simpleNum += parseInt(item.simpleNum)
        middleNum += parseInt(item.middleNum)
        hardNum += parseInt(item.hardNum)
        score += parseInt(item.total) * parseInt(item.single)
      })
      let paperNum = {}
      paperNum.simpleNum = simpleNum
      paperNum.middleNum = middleNum
      paperNum.hardNum = hardNum
      paperNum.score = score
      paperNum.choiceNum = simpleNum + middleNum + hardNum
      return paperNum
    },

  },
  watch: {
    'data.iepTestPaperVO': {
      handler () {
        this.getTestOption()
      },
      immediate: true,
    },
  },
  methods: {

    getRowClass ({ rowIndex }) {
      if (rowIndex == 0) {
        return 'background:#F2F4F5;color:#333'
      } else {
        return ''
      }
    },

    /**
     * 获取试题数据
     */
    async getTestOption () {
      const params = {
        numberList: [
          'exms_subjects',//考试科目
          'exms_question_type',//题型
        ],
      }
      const { data } = await getTestOption(params)
      this.res = data
      this.loadSelf()
    },

    /**
     * 获取信息
     */
    loadSelf () {
      if (this.isEdit) {
        this.data.iepTestPaperVO.iepQstnRuleList.forEach((item) => {
          this.choiceType.push(item.type)
          var fieldString = item.field.split(',')
          var fieldInt = fieldString.map((data) => {
            return +data
          })
          item.field = fieldInt
          this.iepQstnRuleList.push(item)
        })
        this.choiceType.sort()
        this.submitDisabled = true
      } else {
        this.choiceType = []
        this.iepQstnRuleList = []
        this.submitDisabled = false
      }
    },

    /**
     * 试题配置操作
     */
    questionButton (index) {
      this.formLoading = true
      this.iepTestPaperIndex = index
      if (index != undefined) {
        postPaperAmount({ subject: this.iepQstnRuleList[index].field.join(','), question: this.iepQstnRuleList[index].type }).then(({ data }) => {
          if (data.data) {
            this.totalNum = data.data
            this.form = this.$mergeByFirst(questionForm(), this.iepQstnRuleList[index])
            this.formLoading = false
          }
        })
      } else {
        this.form = questionForm()
        this.totalNum.simple = 0
        this.totalNum.general = 0
        this.totalNum.difficult = 0
        this.formLoading = false
      }
      this.questionConfiguration = true
    },

    /**
     * 确认配置
     */
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let _form = toDtoForm(this.form)
          _form.total = this.totalCount
          if (this.iepTestPaperIndex != undefined) {
            this.iepQstnRuleList.splice(this.iepTestPaperIndex, 1, _form)
            this.choiceType.splice(this.iepTestPaperIndex, 1, _form.type)
          } else {
            this.choiceType.push(_form.type)
            this.iepQstnRuleList.push(_form)
          }
          this.choiceType.sort()
          this.questionConfiguration = false
          this.submitDisabled = true

        }
      })
    },

    /**
     * 获取题数
     */
    async count () {
      this.form.simpleNum = 0
      this.form.middleNum = 0
      this.form.hardNum = 0
      if (this.form.iepItemBankList.length > 0) {
        this.$refs['table'].handleDelete()
      }
      if (this.form.type != '' && this.form.field != '') {
        const { data } = await postPaperAmount({ subject: this.form.field.join(','), question: this.form.type })
        if (data.data) {
          this.totalNum = data.data
        }
      }

    },

    /**
     * 配置选题改变
     */
    configurationStateChange (val) {
      let _form = this.form
      _form.simpleNum = 0
      _form.middleNum = 0
      _form.hardNum = 0
      if (val === '1') {
        _form.iepItemBankList = []
      }
    },

    /**
     * 科目选择时加载对应难度的总数
     */
    fieldChange () {
      this.count()
    },


    /**
     * 题型选择时部分表单内容清空以及加载对应难度的总数
     */
    typeChange (value) {

      let _form = this.form
      if (value == '0' || value == '1') {
        _form.scoringMethod = ''
        _form.marker = ''
        _form.qstnDescribe = ''
        _form.multipleSelection = 0
      } else if (value == '2') {
        _form.qstnDescribe = ''
        _form.multipleSelection = 0
      } else {
        _form.scoringMethod = ''
      }
      this.count()
    },

    /**
     * 展示所选的题数
     */
    showNumber (val) {
      this.form.simpleNum = 0
      this.form.middleNum = 0
      this.form.hardNum = 0
      var sortMap = {}
      for (var i = 0; i < val.length; i++) {
        for (var prop in val[i]) {
          if (prop == 'difficulty') {
            var key = val[i][prop]
            if (sortMap.hasOwnProperty(key)) {
              sortMap[key] = sortMap[key] * 1 + 1
            } else {
              sortMap[key] = 1
            }
            break
          }
        }
      }
      for (var difficulty in sortMap) {
        if (difficulty === '9') {
          this.form.simpleNum = sortMap[difficulty]
        } else if (difficulty === '8') {
          this.form.middleNum = sortMap[difficulty]
        } else {
          this.form.hardNum = sortMap[difficulty]
        }
      }


    },

    /**
     * 删除试题
     */
    deletePaper (index) {
      this.iepQstnRuleList.splice(index, 1)
      this.choiceType.splice(index, 1)
      if (this.iepQstnRuleList.length === 0) {
        this.submitDisabled = false
      }
    },

    /**
     * 上一步
     */
    handlePrev () {
      this.$emit('prev')
    },

    /**
     * 配置完成
     */
    async handleSubmit () {
      const iepTestPaper = { ...this.data.iepTestPaperVO }
      iepTestPaper.iepQstnRuleList = this.iepQstnRuleList.map(function (item) {
        const field = item.field.join(',')
        item.field = field
        return item
      })
      iepTestPaper.score = this.assessmentPaper.score
      iepTestPaper.choiceNum = this.assessmentPaper.choiceNum
      iepTestPaper.difficulty = this.assessmentPaper.difficulty
      this.submitLoading = true
      try {
        const { data } = await postNewPaper(iepTestPaper)
        if (data.data) {
          this.submitDisabled = false
          const examInfo = { ...this.data }
          examInfo.iepTestPaperVO = data.data
          this.$emit('on-data', examInfo)
        } else {
          this.$message(data.msg)
        }
      } catch (error) {
        this.$message('似乎出现了一些问题')
      }
      this.submitLoading = false
    },

  },
}
</script>

<style lang="scss" scoped>
span {
  padding: 0px 10px;
}

.content-wrapper {
  width: 100%;
  .el-form-item {
    margin: 0px;
  }
  .total-questions .questions {
    border: 1px solid #c0c4cc;
    margin-bottom: 25px;
    -moz-box-shadow: 2px 2px 5px #c0c4cc;
    box-shadow: 2px 2px 5px #c0c4cc;
    .title {
      padding: 10px 25px;
      background: #f2f2f2;
      display: flex;
      justify-content: space-between;
      span {
        font-size: 30px;
        color: #909399;
      }
    }

    .body {
      padding: 0px 25px;
      font-size: 16px;
      .dt_div {
        border-bottom: 1px solid #c0c4cc;
        padding: 10px 0px;
        &:nth-child(2) {
          .el-form-item {
            .el-input {
              width: 100px;
            }
          }
        }
        &:last-child {
          border: 0;
        }
      }
    }
  }
  .footer {
    ul {
      display: flex;
      justify-content: center;
      list-style: none;
      li {
        margin-right: 50px;
      }
    }
    p {
      text-align: center;
      margin-top: 20px;
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>
<style  scoped>
.qstnDescribeArea >>> .el-form-item__content {
  width: 95%;
}
.questionTable >>> .th {
  background: #ccc;
}
.questionTable >>> .ms-tree-space {
  position: relative;
  top: 1px;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: 18px;
  height: 14px;
}
.questionTable >>> .cell {
  display: flex;
  flex-wrap: wrap;
}
</style>