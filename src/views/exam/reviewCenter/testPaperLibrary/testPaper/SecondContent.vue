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
                  <el-select v-model="item.field" size="mini" disabled>
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
                <el-form-item label="打分方式:" label-width="90px" v-if="item.type==2">
                  <el-radio-group v-model="item.scoringMethod">
                    <el-radio label="0" disabled>系统判定</el-radio>
                    <el-radio label="1" disabled>人工阅卷</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item style="margin-left:20px" v-if="item.type==2 || item.type==3">
                  <el-checkbox v-model="item.marker" label="指定阅卷老师" disabled></el-checkbox>
                </el-form-item>
                <el-form-item style="margin-left:20px" v-if="item.type==3">
                  <el-switch active-text="多选模式" v-model="item.multipleSelection" disabled
                    :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
              </div>

              <div class="dt_div">
                <el-form-item label="题型:" style="width: 100%;" class="qstnDescribeArea">
                  <iep-input-area :autosize={minRows:2,maxRows:6} readonly v-model="item.qstnDescribe"></iep-input-area>
                </el-form-item>
              </div>

              <div class="dt_div" v-if="item.configurationState=='0'">
                <el-form-item label="已选试题:" style="width:100%" label-width="75px">
                  <ol type="1" style="padding-left:20px">
                    <li v-for="(choice,index) in item.questionArray" :key="index">
                      <div class="iep-ellinsis">
                        {{choice.title}}
                      </div>
                    </li>
                  </ol>
                </el-form-item>
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
        <p>难度系数：{{assessmentPaper.difficulty || 0}} <span>中等</span></p>
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
      width="700px" @close="questionClose">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="科目" prop="field">
          <el-select v-model="form.field" clearable placeholder="请选择科目" @change="fieldChang">
            <el-option v-for="(item, index) in res.exms_subjects" :key="index" :label="item.label"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-select v-model="form.type" clearable placeholder="请选择题型" @change="typeChange">
            <el-option v-for="(item, index) in res.exms_question_type" :key="index" :label="item.label"
              :value="item.id" :disabled="choiceType.indexOf(item.id)>-1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="配置状态" prop="configurationState">
          <el-select v-model="form.configurationState" placeholder="请选择配置状态" clearable @change="configurationStateChange">
            <el-option value="0" label="固定选题"></el-option>
            <el-option value="1" label="随机选题"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="简单题数" prop="simpleNum">
          <el-col :span="17">
            <iep-input-number controls-position="right" :min="0" :max="totalNum.simpleTotalNum || 0"
              v-model="form.simpleNum" style="width:100%" :disabled="form.configurationState==='0'"></iep-input-number>
          </el-col>
          <el-col :span="7" style="text-align:center">题库现有 <span>{{totalNum.simpleTotalNum || 0}}</span>
            道</el-col>

        </el-form-item>

        <el-form-item label="一般题数" prop="middleNum">
          <el-col :span="17">
            <iep-input-number controls-position="right" :min="0" :max="totalNum.middleTotalNum || 0"
              v-model="form.middleNum" style="width:100%" :disabled="form.configurationState==='0'"></iep-input-number>
          </el-col>
          <el-col :span="7" style="text-align:center">题库现有 <span>{{totalNum.middleTotalNum || 0}}</span>
            道</el-col>
        </el-form-item>

        <el-form-item label="困难题数" prop="hardNum">
          <el-col :span="17">
            <iep-input-number controls-position="right" :min="0" :max="totalNum.hardTotalNum || 0"
              v-model="form.hardNum" style="width:100%" :disabled="form.configurationState==='0'"></iep-input-number>
          </el-col>
          <el-col :span="7" style="text-align:center">题库现有 <span>{{totalNum.hardTotalNum || 0}}</span>
            道</el-col>
        </el-form-item>

        <el-form-item label="每题" prop="single">
          <el-col :span="7">
            <iep-input-number controls-position="right" :min="0" v-model="form.single" style="width:100%"></iep-input-number>
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
        <el-form-item v-if="form.configurationState==='0'" prop="questionArray">
          <dialog-question-table v-model="form.questionArray" :questionType="form.type" :fieldType="form.field"
            ref="table" @show-number="showNumber"></dialog-question-table>
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
import { toDtoForm } from '../option'
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
    return {
      questionConfiguration: false,
      choiceType: [],//已选择的题型
      iepTestPaperIndex: '',//试题下标
      submitLoading: false,//提交加载
      submitDisabled: false,//禁用配置完成的按钮
      res: [],//下拉框的值
      rules: {
        field: [{ required: true, message: '请选择题库', trigger: 'change' }],
        type: [{ required: true, message: '请选择题型', trigger: 'change' }],
        configurationState: [{ required: true, message: '请选择配置状态', trigger: 'change' }],
        simpleNum: [{ required: true, message: '请选择简单题数', trigger: 'blur' }],
        middleNum: [{ required: true, message: '请选择一般题数', trigger: 'blur' }],
        hardNum: [{ required: true, message: '请选择困难题数', trigger: 'blur' }],
        single: [{ required: true, message: '请输入每题分数', trigger: 'blur' }],
        scoringMethod: [{ required: true, message: '请选择打分方式', trigger: 'change' }],
      },
      form: {
        field: '',//科目
        type: '',//题型
        configurationState: '',//配置状态
        simpleNum: '',//简单题数
        middleNum: '',//普通题数
        hardNum: '',//困难题数
        scoringMethod: '',//打分方式
        marker: '',//是否指定阅卷人
        qstnDescribe: '',// 题型说明
        multipleSelection: 0,//是否开启多选
        single: '',//单题分数
        total: '',//试题总数
        questionArray: [],//固定试题
      },
      totalNum: {
        simpleTotalNum: 0,//简单总数
        middleTotalNum: 0,//普通总数
        hardTotalNum: 0,//困难总数
      },
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
      return this.data.id ? true : false
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
    'data': {
      handler () {
        this.getTestOption()
      },
      immediate: true,
    },
  },
  methods: {
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
        this.iepQstnRuleList = this.data.iepQstnRuleList
        this.iepQstnRuleList.forEach((item) => {
          this.choiceType.push(item.type)
        })
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
      this.questionConfiguration = true
      this.iepTestPaperIndex = index
      if (index != undefined) {
        this.form = { ...this.iepQstnRuleList[index] }
        this.count()
      } else {
        this.$nextTick(function () {
          this.$refs['form'].resetFields()
        })
      }

    },

    /**
     * 确认配置
     */
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let form = toDtoForm(this.form)
          form.total = this.totalCount
          if (this.iepTestPaperIndex != undefined) {
            this.iepQstnRuleList.splice(this.iepTestPaperIndex, 1, form)
            this.choiceType.splice(this.iepTestPaperIndex, 1, form.type)
          } else {
            this.choiceType.push(form.type)
            this.iepQstnRuleList.push(form)
          }
          this.choiceType.sort()
          this.questionConfiguration = false
          this.submitDisabled = true
          this.totalNum.simpleTotalNum = ''
          this.totalNum.middleTotalNum = ''
          this.totalNum.hardTotalNum = ''
          this.$refs['form'].resetFields()
        }
      })
    },

    /**
     * 计算题数
     */
    async count () {
      let _form = this.form
      if (_form.type != '' && _form.field != '') {
        const { data } = await postPaperAmount({ subject: _form.field, question: _form.type })
        if (data.data) {
          this.totalNum.simpleTotalNum = data.data.simple
          this.totalNum.middleTotalNum = data.data.general
          this.totalNum.hardTotalNum = data.data.difficulty
        }
      }
    },

    /**
     * 配置选题改变
     */
    configurationStateChange (val) {
      let _form = this.form
      if (val === '1') {
        _form.simpleNum = 0
        _form.middleNum = 0
        _form.hardNum = 0
        _form.questionArray = []
      }
    },

    /**
     * 科目选择时加载对应难度的总数
     */
    fieldChang () {
      this.count()
    },


    /**
     * 题型选择时部分表单内容清空以及加载对应难度的总数
     */
    typeChange (value) {
      let form = this.form
      if (value == '0' || value == '1') {
        form.scoringMethod = ''
        form.marker = ''
        form.qstnDescribe = ''
        form.multipleSelection = 0
      } else if (value == '2') {
        form.qstnDescribe = ''
        form.multipleSelection = 0
      } else {
        form.scoringMethod = ''
      }

      if (form.questionArray.length > 0) {
        this.$refs['table'].handleDelete()
      }

      this.count()
    },

    /**
     * 展示所选的题数
     */
    showNumber (val) {
      if (val.length === 0) {
        this.form.simpleNum = 0
        this.form.middleNum = 0
        this.form.hardNum = 0
      } else {
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
      const iepTestPaper = { ...this.data }
      iepTestPaper.iepQstnRuleList = this.iepQstnRuleList
      iepTestPaper.score = this.assessmentPaper.score
      iepTestPaper.choiceNum = this.assessmentPaper.choiceNum
      iepTestPaper.difficulty = this.assessmentPaper.difficulty
      this.submitLoading = true
      try {
        const { data } = await postNewPaper(iepTestPaper)
        if (data.data) {
          this.choiceType = []
          this.iepQstnRuleList = []
          this.submitDisabled = false
          this.$emit('on-data', data.data)
        } else {
          this.$message(data.msg)
        }
      } catch (error) {
        this.$message('似乎出现了一些问题')
      }
      this.submitLoading = false
    },

    /**
     * 关闭弹窗
     */
    questionClose () {
      this.questionConfiguration = false
      this.totalNum.simpleTotalNum = ''
      this.totalNum.middleTotalNum = ''
      this.totalNum.hardTotalNum = ''
      this.$refs['form'].resetFields()
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
</style>