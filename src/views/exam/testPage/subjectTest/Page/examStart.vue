<template>
  <div>
    <div class="header">
      <!-- <img src="../img/IG.png"> -->
      <span class="title-one"><b>在线考试系统</b></span>
      <span class="line"></span>
      <span class="title-two">{{resdata.fieldName}}</span>
    </div>

    <div class="examShow">
      <div class="left">
        <span style="font-size: 20px;"><b>{{resdata.questionTypeName}}</b></span>
        <span class="title">共 {{resdata.kindTotalNum}} 题，合计 {{resdata.kindMark}} 分，已完成 {{kindOffCount}} / {{resdata.kindTotalNum}}</span>
        <hr>
        <span style="font-size: 15px;"><b>说明：</b></span>
        <span style="font-size: 15px;">{{questionExplain}}</span>
        <div class="question">
          <div style="margin-bottom: 10px;">
            <span>{{resdata.questionNum}}、 </span>
            <span>{{resdata.title}}</span>
            <span> （ {{resdata.single}} 分）</span>
          </div>

          <div v-if="resdata.questionTypeName ==='单选题'">
            <li v-for="(item,index) in resdata.titleOptions" :key="index">
              <el-radio v-model="answerRadio" :label="item.key"></el-radio>
              <span> {{item.key}}、{{item.value}}</span>
            </li>
          </div>

          <div v-if="resdata.questionTypeName ==='复选题'">
            <el-checkbox-group v-model="checksList" style="margin-left: 28px;">
              <el-checkbox style="margin-right: 100%;" v-for="item in resdata.titleOptions" :label="item.key" :key="item.key">
                <span>{{item.key}} . {{item.value}}</span>
              </el-checkbox>
            </el-checkbox-group>
          </div>

          <div v-if="resdata.questionTypeName ==='判断题'">
            <li v-for="(item,index) in resdata.titleOptions" :key="index">
              <el-radio v-model="trueOrFalseRadio" :label="item.value"></el-radio>
            </li>
          </div>

          <!-- <div v-if="resdata.questionType ==='填空题'">
            <li v-for="(item,index) in inputList" :key="index" style="list-style-type:none;margin-left:28px;">
              <span>{{index + 1}}、</span>
              <el-input style="width: 79%;"></el-input>
            </li>
          </div> -->

          <div v-if="resdata.questionTypeName ==='简答题'">
            <li v-for="(item,index) in inputAreaList" :key="index" style="margin-left:28px;">
              <el-input type="textarea" v-model="freeInput" style="width: 79%;" :rows="4"></el-input>
            </li>
          </div>
        </div>

        <div class="center" align="center">
          <iep-button style="margin:0 10px;" @click="prv" :disabled="resdata.questionNum === 1">上一题</iep-button>
          <iep-button style="margin:0 10px;" @click="next" :disabled="resdata.questionNum === resdata.questionTotalNum">下一题</iep-button>
        </div>
      </div>

      <div class="right" v-if="resdata.title">
        <div class="container">
          <div class="explain">
            <span style="color: #595959;">当前进度</span><br>
            <span class="count">{{count}}</span>
            <span class="line"> / </span>
            <span class="TotalNum">{{resdata.questionTotalNum}}</span>
          </div>

          <ve-ring class="ring" height="200px" :data="chartData" :settings="chartSettings" :tooltip-visible="false" :legend-visible="false" :colors="colors"></ve-ring>

          <div class="card">
            <div v-if="resdata.radioMap.length > 0">
              <span class="answerSheet">单选题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.radioMap" :key="index" @click="handleCard(item)" :class="{'activess':item.answerOrNot===1,'active': item.questionNum == resdata.questionNum}">{{item.questionNum}}</iep-button>
              </div><br>
            </div>

            <div v-if="resdata.checkboxMap.length > 0">
              <span class="answerSheet">复选题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.checkboxMap" :key="index" @click="handleCard(item)" :class="{'activess':item.answerOrNot===1,'active': item.questionNum == resdata.questionNum}">{{item.questionNum}}</iep-button>
              </div><br>
            </div>

            <div v-if="resdata.checkedMap.length > 0">
              <span class="answerSheet">判断题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.checkedMap" :key="index" @click="handleCard(item)" :class="{'activess':item.answerOrNot===1,'active': item.questionNum == resdata.questionNum}">{{item.questionNum}}</iep-button>
              </div><br>
            </div>

            <div v-if="resdata.textMap.length > 0">
              <span class="answerSheet">简答题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.textMap" :key="index" @click="handleCard(item)" :class="{'activess':item.answerOrNot===1,'active': item.questionNum == resdata.questionNum}">{{item.questionNum}}</iep-button>
              </div><br>
            </div>

          </div>
        </div>
      </div>
    </div>

    <footer-tool-bar>
      <span class="headerTxt">准考证号：{{examNo}}</span>
      <span class="headerTxt">剩余时间：{{min}} 分：{{sec}} 秒</span>
      <!-- <iep-button @click="handleSave">暂停</iep-button> -->
      <iep-button @click="backhome">返回</iep-button>
      <iep-button style="margin-right: 30px;" @click="saveAndGoBack">保存并退出</iep-button>
      <iep-button type="primary" @click="handleExamination">交卷</iep-button>
    </footer-tool-bar>
  </div>
</template>

<script>
import { getTestPageById } from '@/api/exam/testPage/subjectTest/examStart'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  props: ['record'],
  data () {
    this.colors = ['#ba1b21', '#999999']
    this.chartSettings = {
      radius: [50, 60],
      offsetY: 100,
    }
    return {
      answerRadio: '',        //单选(v-model绑定的值)
      checksList: [],         //复选(v-model绑定的值)
      trueOrFalseRadio: '',   //判断(v-model绑定的值)
      freeInput: '',          //简答(v-model绑定的值)
      inputAreaList: [''],
      questionExplain: '本题来源于国脉内网、水巢、数据基因、技能类、知识类、数据能力类、基本能力类、项目管理类、公司常识类、人力资源类等。',
      mins: '',
      secs: '',
      time: '',   //定义定时器
      examNo: '2019052568969',
      chartData: {
        columns: ['是否完成', '进度'],
        rows: '',
      },
      // statusColor: function (val) {
      //   if (val.answerOrNot === 1) {
      //     return 'background:#409eff;borderColor:#409eff;color:#fff'
      //   } else {
      //     return 'background:#fff;color:#409eff'
      //   }
      // },
      resdata: {
        kindTotalNum: '',    //每种题型合计题数
        kindMark: '',        //每种题型合计分数
        questionOffNum: [],  //全部已完成的题目总数
        questionTotalNum: '',//全部的题目总数
        titleOptions: [],    //答案选项数组
        radioMap: [],        //答题卡片的单选题数组集合，从数组中遍历题目出来
        checkboxMap: [],     //答题卡片的复选题数组集合，从数组中遍历题目出来
        checkedMap: [],      //答题卡片的判断题数组集合，从数组中遍历题目出来
        textMap: [],         //答题卡片的简答题数组集合，从数组中遍历题目出来
      },
    }
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
  computed: {
    sec: function () {
      return this.num(this.secs)
    },
    min: function () {
      return this.num(this.mins)
    },
    kindOffCount: function () {
      return this.kindOffNum()
    },
    count: function () {
      return this.offNum()
    },
  },
  mounted () {
    this.timer()
  },
  created () {
    this.loadPage()
  },
  beforeDestroy () {
    // this.saveAll()   //去到其他界面将自动保存
    clearInterval(this.time)
    this.time = null

  },
  destroyed () {

  },
  methods: {
    /**
     * 判断题型(公用方法)
     */
    judgeType (params) {
      params.examId = this.record.id
      params.currentQuestionNum = this.resdata.questionNum
      const type = this.resdata.questionTypeName
      if (type === '单选题') {
        params.userAnswer = this.answerRadio
      }
      if (type === '复选题') {
        params.userAnswer = JSON.stringify(this.checksList)
      }
      if (type === '判断题') {
        params.userAnswer = this.trueOrFalseRadio
      }
      if (type === '简答题') {
        params.userAnswer = this.freeInput
      }
    },

    /**
     * 获取题目的详细数据(公用请求方法)
     */
    getSubjectById (params, times) {
      getTestPageById(params).then(res => {
        const record = res.data.data
        if (times === true) {
          const timeAll = record.remainingTime ? record.remainingTime.split('-') : []
          this.mins = Number(timeAll[0])
          this.secs = Number(timeAll[1])
        }
        if (this.mins + this.secs === 0) {
          this.tip()
        } else {
          this.chartData.rows = record.questionStatus
          this.resdata = record
          this.resdata.questionOffNum = record.questionNumList
          this.resdata.questionTotalNum = record.questionNumList.checkboxMap.length + record.questionNumList.checkedMap.length + record.questionNumList.radioMap.length + record.questionNumList.textMap.length
          this.resdata.titleOptions = record.titleOptions ? JSON.parse(record.titleOptions) : []
          this.resdata.radioMap = record.questionNumList.radioMap
          this.resdata.checkboxMap = record.questionNumList.checkboxMap
          this.resdata.checkedMap = record.questionNumList.checkedMap
          this.resdata.textMap = record.questionNumList.textMap
          if (record.questionTypeName === '单选题') {
            this.answerRadio = record.userAnswer
            this.resdata.kindTotalNum = record.questionNumList.radioMap.length
            this.resdata.kindMark = record.questionNumList.radioMap[0].grade * this.resdata.kindTotalNum
          }

          if (record.questionTypeName === '复选题') {
            this.checksList = JSON.parse(record.userAnswer)
            this.resdata.kindTotalNum = record.questionNumList.checkboxMap.length
            this.resdata.kindMark = record.questionNumList.checkboxMap[0].grade * this.resdata.kindTotalNum
          }
          if (record.questionTypeName === '判断题') {
            this.trueOrFalseRadio = record.userAnswer
            this.resdata.kindTotalNum = record.questionNumList.checkedMap.length
            this.resdata.kindMark = record.questionNumList.checkedMap[0].grade * this.resdata.kindTotalNum
          }
          if (record.questionTypeName === '简答题') {
            this.freeInput = record.userAnswer
            this.resdata.kindTotalNum = record.questionNumList.textMap.length
            this.resdata.kindMark = record.questionNumList.textMap[0].grade * this.resdata.kindTotalNum
          }
        }

      })
    },

    /**
     * 提示语加自动保存(公用方法)
     */
    saveAll () {
      const params = {
        remainingTime: this.mins + '-' + this.secs,
      }
      this.judgeType(params)
      this.getSubjectById(params)
      this.$message({
        type: 'success',
        message: '自动保存成功!',
      })
    },

    /**
     *考试时间已结束，再次进入时提示时间为零
     */
    tip () {
      this.$message({
        type: 'warning',
        message: '剩余考试时间已为零!',
      })
      this.$emit('onGoBack')
    },

    /**
     * 首次进入页面加载题目
     */
    loadPage () {
      //const times = true
      const params = {
        examId: this.record.id,
        currentQuestionNum: this.resdata.questionNum,
        questionNum: this.resdata.questionNum,
      }
      this.getSubjectById(params, true)
    },

    /**
     *计算每种题型已完成的题数
     */
    kindOffNum () {
      let kindcount = 0
      const type = this.resdata.questionTypeName
      if (type === '单选题') {
        for (let i = 0; i < this.resdata.radioMap.length; i++) {
          if (this.resdata.radioMap[i].answerOrNot > 0) {
            kindcount++
          }
        }
      }
      if (type === '复选题') {
        for (let i = 0; i < this.resdata.checkboxMap.length; i++) {
          if (this.resdata.checkboxMap[i].answerOrNot > 0) {
            kindcount++
          }
        }
      }
      if (type === '判断题') {
        for (let i = 0; i < this.resdata.checkedMap.length; i++) {
          if (this.resdata.checkedMap[i].answerOrNot > 0) {
            kindcount++
          }
        }
      }
      if (type === '简答题') {
        for (let i = 0; i < this.resdata.textMap.length; i++) {
          if (this.resdata.textMap[i].answerOrNot > 0) {
            kindcount++
          }
        }
      }
      return kindcount
    },

    /**
     *计算已完成的题数总数
     */
    offNum () {
      let arr = []
      let counts = 0
      for (let item in this.resdata.questionOffNum) {
        arr = this.resdata.questionOffNum[item]   //将父对象赋给新定义的数组
        for (let i = 0; i < arr.length; i++) {    //判断每一个子数组里是否有值
          if (arr.length > 0) {                   //若长度>0,则继续判断子数组里的answerOrNot字段是否>0,>0则自动+1
            if (arr[i].answerOrNot > 0) {
              counts++
            }
          }
        }
      }
      //console.log('counts33', counts)
      return counts

      // for (let i = 0; i < this.resdata.questionOffNum.length; i++) {
      //   if (this.resdata.questionOffNum[i].length > 0) {
      //     let resultArr = this.resdata.questionOffNum[i]
      //     for (let j = 0; j < resultArr.length; j++) {
      //       if (resultArr[j].answerOrNot > 0) {
      //         counts++
      //       }
      //     }
      //   }
      // }
    },

    /** 
     * 上一题
     */
    prv () {
      const params = {
        questionNum: this.resdata.questionNum - 1,
      }
      this.judgeType(params)
      this.getSubjectById(params)
    },

    /** 
     * 下一题
     */
    next () {
      const params = {
        questionNum: this.resdata.questionNum + 1,
      }
      this.judgeType(params)
      this.getSubjectById(params)
    },

    /** 
     * 点击答题卡作答
     */
    handleCard (item) {
      const params = {
        questionNum: item.questionNum,
      }
      this.judgeType(params)
      console.log('33', params)
      this.getSubjectById(params)
    },

    /**
     * 暂停
     */
    // handleSave () {
    //   clearInterval(this.time)
    // },

    /**
     * 返回
     */
    backhome () {
      this.$confirm('此操作将不保存试卷，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已成功返回到主界面!',
        })
        this.$emit('onGoBack')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消返回',
        })
      })
    },

    /**
     * 保存并退出
     */
    saveAndGoBack () {
      this.$confirm('此操作将保存试卷，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.saveAll()
        this.$emit('onGoBack')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
        })
      })
    },

    /**
     * 交卷并返回主界面
     */
    handleExamination () {
      this.$confirm('此操作将提交试卷，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const params = {
          ifCommit: 1,
          remainingTime: this.mins + '-' + this.secs,
        }
        this.judgeType(params)
        getTestPageById(params).then(res => {
          if (res.data.code === 0) {
            console.log('success go back')
            this.$message({
              type: 'success',
              message: '交卷成功!',
            })
            this.$emit('onGoBack')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消交卷',
        })
      })
    },

    /**f
     * 小于10自动补零
     */
    num (n) {
      return n < 10 ? '0' + n : '' + n
    },

    /**
     * 倒计时,时间为零则自动交卷并返回主界面
     */
    timer () {
      const _this = this  //声明一个变量指向this，保证作用域一致，只在当前作用域
      this.time = window.setInterval(function () {
        if (_this.secs === 0 && _this.mins > 0) {
          _this.secs = 59
          _this.mins -= 1
        }
        else if (_this.mins === 0 && _this.secs === 0) {
          _this.secs = 0
          window.clearInterval(this.time)
          const params = {
            ifCommit: 1,
            remainingTime: _this.mins + '-' + _this.secs,
          }
          _this.judgeType(params)
          _this.getSubjectById(params)
          _this.$message({
            type: 'warning',
            message: '考试时间已到，自动交卷！',
          })
          _this.$emit('onGoBack')
        }
        else {
          _this.secs -= 1
        }
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  background-color: #fafafa;
  // background: -webkit-linear-gradient(left, #012f52, #35495e);
  // background: -moz-linear-gradient(right, #012f52, #35495e);
  // background: -o-linear-gradient(right, #012f52, #35495e);
  // background: linear-gradient(to right, #012f52, #35495e);
  padding: 15px 20px;
  width: 100%;
  height: 60px;
  img {
    margin-top: -2px;
    float: left;
  }
  .title-one {
    font-size: 19px;
    float: left;
    color: #595959;
  }
  .line {
    height: 20px;
    width: 2px;
    background: #595959;
    margin: 6px 15px 0 15px;
    float: left;
  }
  .title-two {
    font-size: 17px;
    float: left;
    color: #595959;
    margin-top: 3px;
  }
}
.examShow {
  margin: 20px auto;
  width: 89%;
  .left {
    float: left;
    width: 70%;
    .title {
      font-size: 15px;
      margin-left: 25px;
    }
    .question {
      margin-top: 15px;
      font-size: 15px;
      li {
        list-style-type: none;
      }
    }
    .center {
      width: 100%;
      margin: 50px 0 100px 0;
    }
  }
  .right {
    float: right;
    width: 28%;
    border-left: 0px solid #eee;
    padding-top: 30px;
    padding-bottom: 75px;
    .container {
      float: right;
      width: 280px;
      background: #fffbf6;
      border: 1px solid #ffdbc1;
      // background: linear-gradient(
      //   to bottom right,
      //   rgb(55, 15, 68),
      //   rgb(107, 174, 246)
      // );
      .explain {
        text-align: center;
        position: relative;
        top: 78px;
        .count {
          color: #ba1b21;
          font-size: 18px;
        }
        .line {
          color: #595959;
          font-size: 18px;
        }
        .TotalNum {
          color: #595959;
          font-size: 18px;
        }
      }
      .ring {
        padding-top: 15px;
        margin-top: -60px;
      }
      .card {
        text-align: left;
        padding: 10px 18px 0;
        .activess {
          background: #f8e8e9;
          border-color: #e3a4a6;
          color: #ba1b21;
        }
        .active {
          background: #ba1b21;
          border-color: #ba1b21;
          color: #fff;
        }
      }
    }
  }
}
.headerTxt {
  padding: 0 20px;
}
</style>
<style lang="scss" scoped>
/* TODO:scoped */
.examShow {
  .el-radio__label {
    display: none;
  }
  .el-radio {
    margin: 0 10px 0 28px !important;
  }
  .answerSheet {
    font-size: 18px;
    color: #595959;
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
}
</style>
