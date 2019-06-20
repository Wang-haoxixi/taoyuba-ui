<template>
  <div>
    <div class="header">
      <img src="../img/IG.png" style="margin-top: -2px;float: left;">
      <span style="font-size:19px;float: left;color: #fff;"><b>在线考试系统</b></span>
      <span style="height: 20px;width:2px;background: #fff;margin: 6px 15px 0 15px;float: left;"></span>
      <span style="font-size:17px;float:left;color: #fff;margin-top:3px;">{{examTxt}}</span>
    </div>
    <div class="examShow">
      <div style="float: left; width: 70%;">
        <span style="font-size: 20px;"><b>{{questionTypeOne}}</b></span>
        <span style="font-size: 15px;margin-left: 25px;">共 {{questionTypeOneTotal}} 题，合计
          {{questionTypeOneScore}} 分，已完成 {{questionTypeOnePer}} / {{questionTypeOneTotal}}</span>
        <hr>
        <span style="font-size: 15px;"><b>说明：</b></span>
        <span style="font-size: 15px;">{{questionExplain}}</span>
        <div style="margin-top: 15px;font-size: 15px;">
          <div style="margin-bottom: 10px;">
            <span>{{number}}、 </span>
            <span>{{question}}</span>
            <span> （{{scorePer}} 分）</span>
          </div>
          <div>
            <li v-for="(item,index) in fieldList" :key="index" style="list-style-type:none;">
              <el-radio v-model="answerRadio" :label="index" @change="handleRadio (item)"></el-radio>
              <span>{{item.option}} . </span>
              <span>{{item.answer}}</span>
            </li>
          </div>
          <div>
            <el-checkbox-group v-model="checksList" style="margin-left: 28px;">
              <el-checkbox style="margin-right: 100%;" v-for="item in checkboxList" :label="item.option"
                :key="item.option" @change="handleCheckBox ()">
                <span>{{item.option}} . {{item.answer}}</span>
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div>
            <li v-for="(item,index) in trueOrFalseList" :key="index" style="list-style-type:none;">
              <el-radio v-model="trueOrFalseRadio" :label="index" @change="handleTrueOrFalse (index)"></el-radio>
              <span>{{item}}</span>
            </li>
          </div>
          <div>
            <li v-for="(item,index) in inputList" :key="index" style="list-style-type:none;margin-left:28px;">
              <span>{{index + 1}}、</span>
              <el-input style="width: 79%;"></el-input>
            </li>
          </div>
          <div>
            <li v-for="(item,index) in inputAreaList" :key="index" style="list-style-type:none;margin-left:28px;">
              <span>{{index + 1}}、</span>
              <el-input type="textarea" style="width: 79%;" :rows="3"></el-input>
            </li>
          </div>
        </div>
        <div align="center" style="width:100%;margin:50px 0 100px 0;">
          <iep-button style="margin:0 10px;">上一题</iep-button>
          <iep-button style="margin:0 10px;">下一题</iep-button>
        </div>
      </div>
      <div style="float:right;width: 28%;border-left: 1px solid #eee;padding-bottom: 75px;">
        <div style="float:right;width: 250px;background: linear-gradient(to bottom right, rgb(55, 15, 68) , rgb(107, 174, 246));">
          <div style="text-align: center;position: relative;top: 65px;">
            <span style="color: white;">当前进度</span><br>
            <span style="color: rgb(65, 153, 248);font-size: 18px;">{{questionTypeOnePer}}</span>
            <span style="color: white;font-size: 18px;"> / </span>
            <span style="color: white;font-size: 18px;">{{typeSum}}</span>
          </div>
          <ve-ring style="padding-top: 15px;margin-top: -75px;" height="200px" :data="chartData"
            :settings="chartSettings" :tooltip-visible="false" :legend-visible="false" :colors="colors"></ve-ring>
          <div style="text-align: left;padding: 0 18px;">
            <span class="answerSheet">{{questionTypeOne}}</span>
            <div class="answerSheetTop">
              <iep-button class="choices" v-for="(item,index) in typeOne" :key="index" @click="handleTypeOne(index)">{{item}}</iep-button>
            </div><br>
            <span class="answerSheet">{{questionTypeTwo}}</span>
            <div class="answerSheetTop">
              <iep-button class="choices" v-for="(item,index) in typeTwo" :key="index" @click="handleTypeTwo(index)">{{item}}</iep-button>
            </div><br>
            <span class="answerSheet">{{questionTypeThree}}</span>
            <div class="answerSheetTop">
              <iep-button class="choices" v-for="(item,index) in typeThree" :key="index" @click="handleTypeThree(index)">{{item}}</iep-button>
            </div><br>
          </div>
        </div>
      </div>
    </div>
    <footer-tool-bar>
      <span class="headerTxt">准考证号：{{examNo}}</span>
      <span class="headerTxt">剩余时间：{{min}} 分：{{sec}} 秒</span>
      <iep-button>保存</iep-button>
      <iep-button style="margin-right: 30px;">保存并退出</iep-button>
      <iep-button type="primary" @click="handleGoBack">交卷</iep-button>
    </footer-tool-bar>
  </div>
</template>

<script>
export default {
  computed: {
    sec: function () {
      return this.num(this.secs)
    },
    min: function () {
      return this.num(this.mins)
    },
  },
  data () {
    this.colors = ['#409AF9', '#FFFFFF']
    this.chartSettings = {
      radius: [40, 50],
      offsetY: 100,
    }
    return {
      analyzingExam: {},
      number: 1,
      scorePer: 3,
      answerRadio: '',
      trueOrFalseRadio: '',
      trueOrFalseList: ['正确', '错误'],
      checksList: [],
      checkboxList: [
        { option: 'A', answer: '123456' },
        { option: 'B', answer: '456789' },
        { option: 'C', answer: '789456' },
        { option: 'D', answer: '123789' },
        { option: 'E', answer: '789123' },
      ],
      fieldList: [
        { option: 'A', answer: '123456' },
        { option: 'B', answer: '456789' },
        { option: 'C', answer: '789456' },
        { option: 'D', answer: '123789' },
      ],
      inputList: ['', ''],
      inputAreaList: ['', ''],
      question: '国脉将助力________________，启动区域性国际信息服务中心规划编制。',
      questionExplain: '本题来源于国脉内网、水巢、数据基因、技能类、知识类、数据能力类、基本能力类、项目管理类、公司常识类、人力资源类等。',
      questionTypeOne: '单选题',
      questionTypeTwo: '判断题',
      questionTypeThree: '简答题',
      typeSum: '',
      typeOne: [],
      typeTwo: [],
      typeThree: [],
      questionTypeOneTotal: 15,
      questionTypeOneScore: 45,
      questionTypeOnePer: 1,
      questionTypeTwoTotal: 5,
      questionTypeTwoScore: 2,
      questionTypeThreeTotal: 3,
      questionTypeThreeScore: 45,
      examTxt: '国脉内网的题库',
      mins: 15,
      secs: 0,
      examNo: '2019052568969',
      chartData: {
        columns: ['是否完成', '进度'],
        rows: [
          { '是否完成': '已完成', '进度': 1 },
          { '是否完成': '未完成', '进度': 23 },
        ],
      },
    }
  },
  mounted () {
    this.timer()
  },
  created () {
    this.typeOneArray()
    this.typeTwoArray()
    this.typeThreeArray()
    this.questionTypeSum()
  },
  methods: {
    /**
     * 判断题
     */
    handleTrueOrFalse (index) {
      console.log('handleTrueOrFalse => ' + index)
    },
    /**
     * 多选题
     */
    handleCheckBox () {
      console.log('handleCheckBox => ' + this.checksList)
    },
    /**
     * 单选题
     */
    handleRadio (item) {
      console.log('handleRadio => ' + item.option)
    },
    /**
     * 计算总题
     */
    questionTypeSum () {
      this.typeSum = this.questionTypeOneTotal + this.questionTypeTwoTotal + this.questionTypeThreeTotal
      return this.typeSum
    },
    /**
     * 点击题一
     */
    handleTypeOne (index) {
      console.log('TypeOne index => ' + index)
    },
    /**
     * 点击题一
     */
    handleTypeTwo (index) {
      console.log('TypeTwo index => ' + index)
    },
    /**
     * 点击题一
     */
    handleTypeThree (index) {
      console.log('TypeThree index => ' + index)
    },
    /**
     * 选择题数组
     */
    typeOneArray () {
      for (let index = 1; index < this.questionTypeOneTotal + 1; index++) {
        this.typeOne.push(index)
      }
      return this.typeOne
    },
    /**
     * 判断题数组
     */
    typeTwoArray () {
      for (let index = 1; index < this.questionTypeTwoTotal + 1; index++) {
        this.typeTwo.push(index)
      }
      return this.typeTwo
    },
    /**
     * 简答题数组
     */
    typeThreeArray () {
      for (let index = 1; index < this.questionTypeThreeTotal + 1; index++) {
        this.typeThree.push(index)
      }
      return this.typeThree
    },
    /**
     * 返回
     */
    handleGoBack () {
      this.$confirm('此操作将提交试卷，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '交卷成功!',
        })
        this.$emit('onGoBack')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消交卷',
        })
      })
      // this.$emit('onGoBack')
    },
    num (n) {
      return n < 10 ? '0' + n : '' + n
    },
    /**
     * 倒计时
     */
    timer () {
      var _this = this
      var time = window.setInterval(function () {
        if (_this.secs === 0 && _this.mins !== 0) {
          _this.secs = 59
          _this.mins -= 1
        }
        else if (_this.mins === 0 && _this.secs === 0) {
          _this.secs = 0
          window.clearInterval(time)
        }
        else {
          _this.secs -= 1
        }
      }, 1000)
    },
  },
  watch: {
    sec: {
      handler (newVal) {
        this.num(newVal)
      },
    },
    min: {
      handler (newVal) {
        this.num(newVal)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.examShow {
  margin: 20px auto;
  width: 89%;
}
.header {
  background: -webkit-linear-gradient(left, rgb(64, 156, 252), rgb(100, 6, 10));
  background: -moz-linear-gradient(right, rgb(64, 156, 252), rgb(100, 6, 10));
  background: -o-linear-gradient(right, rgb(64, 156, 252), rgb(100, 6, 10));
  background: linear-gradient(to right, rgb(64, 156, 252), rgb(100, 6, 10));
  padding: 15px 20px;
  width: 100%;
  height: 60px;
}
.headerTxt {
  padding: 0 20px;
}
.el-radio__label {
  display: none;
}
.el-radio {
  margin: 0 10px 0 28px !important;
}
.answerSheet {
  font-size: 18px;
  color: white;
}
.answerSheetTop {
  border-top: solid 1px #eee;
  padding-top: 6px;
}
.choices + .choices {
  margin: 1px;
}
.choices {
  width: 41.6px;
  margin-right: 1px;
}
</style>


