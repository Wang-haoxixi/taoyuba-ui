<template>
  <div>
    <div class="examExamine-wrapper">
      <el-card shadow="never" class="examExamine-elCard" v-loading="loading">

        <el-container class="examExamine-container">
          <div class="examExamine-left">
            <h1>总得分:<span style="color:red">{{totalScore}}</span></h1>
            <div class="examExamine-header">
              <el-table :data="performanceInfor.examBankTypeTranlVos" border style="width: 100%"
                :header-cell-style="getRowClass" header-align="center">
                <el-table-column label="考试项目" align="center">
                  <template slot-scope="scope">
                    {{scope.row.title}}
                  </template>
                </el-table-column>
                <el-table-column label="单选" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.radio">{{Number.isNaN(Number(scope.row.radio)) ?
                      scope.row.radio : Number(scope.row.radio)}}</span>
                    <span v-else>/</span>
                  </template>
                </el-table-column>
                <el-table-column label="复选" align="center">
                  <template slot-scope="scope">

                    <span v-if="scope.row.checkbox">{{Number.isNaN(Number(scope.row.checkbox)) ?
                      scope.row.checkbox : Number(scope.row.checkbox)}}</span>
                    <span v-else>/</span>
                  </template>
                </el-table-column>
                <el-table-column label="判断" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.checked">{{Number.isNaN(Number(scope.row.checked)) ?
                      scope.row.checked : Number(scope.row.checked)}}</span>
                    <span v-else>/</span>
                  </template>
                </el-table-column>
                <el-table-column label="简答" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.text">{{Number.isNaN(Number(scope.row.text)) ?
                      scope.row.text : Number(scope.row.text)}}</span>
                    <span v-else>/</span>
                  </template>
                </el-table-column>
                <el-table-column label="卷面总分" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.$index!=2">{{Number(scope.row.radio)+Number(scope.row.checkbox)+Number(scope.row.checked)+Number(scope.row.text)}}</span>
                    <span v-else>/</span>
                  </template>
                </el-table-column>
                <el-table-column label="面试" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.face">{{scope.row.face}}</span>
                    <span v-else>/</span>
                  </template>
                </el-table-column>
              </el-table>

              <div class="comments">
                <label>面试评语:</label>
                <iep-input-area readonly v-model="performanceInfor.comments"></iep-input-area>
              </div>
            </div>

            <div class="examExamine-content">

              <div v-if="radioMap.length>0" class="question-result">
                <h2><b>单选题(共{{radioMap.length}}题)</b></h2>
                <ul>
                  <li v-for="(radioItem,index) in radioMap" :key="index+1" :id="'radio_'+(index+1)">
                    <div class="question-title">
                      <h3><b>{{index+1}}.{{radioItem.questionTypeName}}（{{radioItem.grade}}
                          分）{{radioItem.title}}</b></h3>
                    </div>
                    <el-radio-group v-model="radioItem.userAnswer" disabled>
                      <el-radio v-for="radioOption in radioItem.itemOptions" :key="radioOption.key"
                        :label="radioOption.key">{{radioOption.value}}</el-radio>
                    </el-radio-group>
                    <div class="question-analysis">
                      <p><b>考生答案：<span>{{radioItem.userAnswer}}</span></b></p>
                      <p><b>正确答案：<span>{{radioItem.itemAnswer}}</span></b></p>
                      <p><b>答案解析：<span>{{radioItem.itemExplain}}</span></b></p>
                    </div>
                  </li>
                </ul>
              </div>
              <div v-if="checkboxMap.length>0" class="question-result">
                <h2><b>复选题(共{{checkboxMap.length}}题)</b></h2>
                <ul>
                  <li v-for="(checkboxItem,index) in checkboxMap" :key="index+1" :id="'checkbox_'+(index+1)">
                    <div class="question-title">
                      <h4><strong>{{index+1}}.{{checkboxItem.questionTypeName}}（{{checkboxItem.grade}}
                          分）{{checkboxItem.title}}</strong></h4>
                    </div>
                    <el-checkbox-group v-model="checkboxItem.userAnswer" disabled>
                      <el-checkbox v-for="checkOptions in checkboxItem.itemOptions" :key="checkOptions.key"
                        :label="checkOptions.key">
                        <span>{{checkOptions.key}} . {{checkOptions.value}}</span>
                      </el-checkbox>
                    </el-checkbox-group>
                    <div class="question-analysis">
                      <p><b>考生答案：<span>{{checkboxItem.userAnswer}}</span></b></p>
                      <p><b>正确答案：<span>{{checkboxItem.itemAnswer}}</span></b></p>
                      <p><b>答案解析：<span>{{checkboxItem.itemExplain}}</span></b></p>
                    </div>
                  </li>
                </ul>
              </div>
              <div v-if="checkedMap.length>0" class="question-result">
                <h2><b>判断题(共{{checkedMap.length}}题)</b></h2>
                <ul>
                  <li v-for="(checkedItem,index) in checkedMap" :key="index+1" :id="'checked_'+(index+1)">
                    <div class="question-title">
                      <h4><strong>{{index+1}}.{{checkedItem.questionTypeName}}（{{checkedItem.grade}}
                          分）{{checkedItem.title}}</strong></h4>
                    </div>
                    <el-radio-group v-model="checkedItem.userAnswer" disabled>
                      <el-radio v-for="checkedOption in checkedItem.itemOptions" :key="checkedOption.key"
                        :label="checkedOption.key">{{checkedOption.value}}</el-radio>
                    </el-radio-group>
                    <div class="question-analysis">
                      <p><b>考生答案：<span>{{checkedItem.userAnswer}}</span></b></p>
                      <p><b>正确答案：<span>{{checkedItem.itemAnswer}}</span></b></p>
                      <p><b>答案解析：<span>{{checkedItem.itemExplain}}</span></b></p>
                    </div>
                  </li>
                </ul>
              </div>
              <div v-if="textMap.length>0" class="question-result">
                <h2><b>简答题(共{{textMap.length}}题)</b></h2>
                <ul>
                  <li v-for="(textItem,index) in textMap" :key="index+1" :id="'text_'+(index+1)">
                    <div class="question-title">
                      <h4><strong>{{index+1}}.{{textItem.questionTypeName}}（{{textItem.grade}}
                          分）{{textItem.title}}</strong></h4>
                    </div>
                    <iep-input-area :autosize={minRows:2,maxRows:6} v-model="textItem.userAnswer"
                      readonly></iep-input-area>
                    <div class="question-analysis">
                      <p><b>正确答案：<span>{{textItem.itemAnswer}}</span></b></p>
                      <p><b>答案解析：<span>{{textItem.itemExplain}}</span></b></p>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          <el-aside width="25%" class="examExamine-aside">
            <div class="response-card">
              <div class="response-header">
                <h3>答题卡</h3>
              </div>

              <div class="response-content" v-if="radioMap.length>0">
                <div class="response-questionTitle">
                  <span>单选题</span>
                  <span>共{{radioMap.length}}题</span>
                </div>
                <div class="response-questionMark">
                  <a class="choices" v-for="(radioItem,index) in radioMap" :key="index+1" :href="'#radio_'+(index+1)"
                    :style="radioItem.score===radioItem.grade ? successBgColor:errorBgColor">{{index+1}}</a>
                </div>
              </div>

              <div class="response-content" v-if="checkboxMap.length>0">
                <div class="response-questionTitle">
                  <span>复选题</span>
                  <span>共{{checkboxMap.length}}题</span>
                </div>
                <div class="response-questionMark">
                  <a class="choices" v-for="(checkboxItem,index) in checkboxMap" :key="index+1"
                    :href="'#checkbox_'+(index+1)" :style="checkboxItem.score===checkboxItem.grade ? successBgColor:errorBgColor">{{index+1}}</a>
                </div>
              </div>

              <div class="response-content" v-if="checkedMap.length>0">
                <div class="response-questionTitle">
                  <span>判断题</span>
                  <span>共{{checkedMap.length}}题</span>
                </div>
                <div class="response-questionMark">
                  <a class="choices" v-for="(checkedItem,index) in checkedMap" :key="index+1" :href="'#checked_'+(index+1)"
                    :style="checkedItem.score===checkedItem.grade ? successBgColor:errorBgColor">{{index+1}}</a>
                </div>
              </div>

              <div class="response-content" v-if="textMap.length>0">
                <div class="response-questionTitle">
                  <span>简答题</span>
                  <span>共{{textMap.length}}题</span>
                </div>
                <div class="response-questionMark">
                  <a class="choices text" v-for="(textItem,index) in textMap" :key="index+1" :href="'#text_'+(index+1)">{{index+1}}</a>
                </div>
              </div>

              <div class="response-footer">
                <el-checkbox-group>
                  <el-checkbox label="正确"></el-checkbox>
                  <el-checkbox label="错误"></el-checkbox>
                </el-checkbox-group>
              </div>

            </div>
          </el-aside>
        </el-container>
      </el-card>
      <footer-tool-bar>
        <iep-button @click="handleBack">返回</iep-button>
      </footer-tool-bar>
    </div>
  </div>

</template>

<script>
import { getResultInfo } from '@/api/exam/testPage/subjectTest/subjectTest'
export default {
  props: ['record'],
  data () {
    return {
      errorBgColor: {
        backgroundColor: '#ab2b22',
      },
      successBgColor: {
        backgroundColor: '#64ad42',
      },
      performanceInfor: {},
      loading: false,
      checkboxMap: [],
      radioMap: [],
      checkedMap: [],
      textMap: [],
      totalScore: '',
    }
  },
  created () {
    this.resultPaper()
  },
  // computed: {
  //   totalScore () {
  //     console.log('his.performanceInfor.examBankTypeTranlVos', this.performanceInfor.examBankTypeTranlVos)
  //     const score = this.performanceInfor.examBankTypeTranlVos[0]

  //   },
  // },
  methods: {
    /**
     * 表格第一行变色
     */
    getRowClass ({ rowIndex }) {
      if (rowIndex == 0) {
        return 'background:#F2F4F5;color:#333;'
      } else {
        return ''
      }
    },

    /**
     * 获取成绩信息
     */
    async resultPaper () {
      this.loading = true
      const data = await getResultInfo({ examinationmanagementId: this.record.id })
      const resultInfo = data.data.data
      if (resultInfo) {
        this.performanceInfor = resultInfo
        this.checkboxMap = resultInfo.result.checkboxMap.map(function (item) {
          const checkUserAnswer = JSON.parse(item.userAnswer)
          item.userAnswer = checkUserAnswer
          if (item.itemOptions) {
            const checkitemOptions = JSON.parse(item.itemOptions)
            item.itemOptions = checkitemOptions
          }
          return item
        })
        this.radioMap = resultInfo.result.radioMap.map(function (item) {
          if (item.itemOptions) {
            const radioitemOptions = JSON.parse(item.itemOptions)
            item.itemOptions = radioitemOptions
          }
          return item
        })
        this.checkedMap = resultInfo.result.checkedMap.map(function (item) {
          if (item.itemOptions) {
            const checkeditemOptions = JSON.parse(item.itemOptions)
            item.itemOptions = checkeditemOptions
          }
          return item
        })
        this.textMap = resultInfo.result.textMap
        const score = this.performanceInfor.examBankTypeTranlVos[0]
        if (Number.isNaN(Number(score.face))) {
          this.totalScore = Number(score.radio) + Number(score.checkbox) + Number(score.checked) + Number(score.text)
        } else {
          this.totalScore = Number(score.radio) + Number(score.checkbox) + Number(score.checked) + Number(score.text) + Number(score.face)
        }
        this.loading = false
      }
    },

    /**
     * 返回
     */
    handleBack () {
      this.$emit('onGoBack')
    },
  },
}
</script>
<style lang="scss" scoped>
.examExamine-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.examExamine-elCard {
  width: 100%;
  border: none;
  .examExamine-container {
    .examExamine-left {
      flex: 1;
      .examExamine-header {
        border-bottom: 1px solid #ebeef5;
        margin-bottom: 10px;
        .comments {
          margin: 15px 0px;
          label {
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
      .examExamine-content {
        .question-result {
          ul {
            padding: 0px;
            margin: 0px;
            list-style: none;
            li {
              margin-bottom: 16px;
              .question-title {
                margin-bottom: 10px;
              }

              .el-radio,
              .el-checkbox {
                display: block;
                margin-bottom: 5px;
              }
            }
          }
          .question-analysis {
            margin-top: 16px;
            border: 1px dashed #e9e9e9;
            border-radius: 6px;
            background-color: #fafafa;
            min-height: 150px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 20px;
          }
        }
      }
    }
    .examExamine-aside {
      .response-card {
        border: 1px solid #ebeef5;
        min-height: 200px;
        position: absolute;
        right: 35px;
        width: 22%;
        .response-header {
          padding: 5px 0px;
          background-color: #f2f4f5;
          h3 {
            text-align: center;
            font-weight: bold;
            font-size: 20px;
          }
        }
        .response-content {
          margin-bottom: 5px;
          .response-questionTitle {
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
            font-size: 16px;
            border-bottom: 1px solid #ebeef5;
            margin-bottom: 10px;
            align-items: center;
            min-height: 40px;
          }

          .response-questionMark {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            .choices {
              margin: 5px 0px 5px 5px;
              color: white;
              line-height: 1;
              cursor: pointer;
              border: 1px solid #dcdfe6;
              border-color: #dcdfe6;
              padding: 6px 10px;
              font-size: 12px;
              border-radius: 3px;
              text-align: center;
              box-sizing: border-box;
              transition: 0.1s;
              font-weight: 500;
            }
            .text {
              color: black;
            }
          }
        }
        .response-footer {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
<style scoped>
.examExamine-elCard >>> .el-card__body {
  margin-bottom: 50px;
}

.question-result >>> .el-radio__input.is-disabled .el-radio__inner,
.question-result >>> .el-checkbox__input.is-disabled .el-checkbox__inner {
  background-color: #ffffff;
  border-color: #dcdfe6;
}
.question-result >>> .el-radio__input.is-disabled + span.el-radio__label,
.question-result >>> .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #606266;
}
.response-footer >>> .el-checkbox:first-child .el-checkbox__inner {
  background-color: #64ad42;
}
.response-footer >>> .el-checkbox:last-child .el-checkbox__inner {
  background-color: #ab2b22;
}
</style>
