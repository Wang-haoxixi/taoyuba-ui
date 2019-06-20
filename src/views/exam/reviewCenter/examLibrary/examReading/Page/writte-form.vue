<template>
  <div>
    <div class="header">
      <!-- <img src="./IG.png"> -->
      <span class="title1"><b>在线考试系统</b></span>
      <span class="title2"></span>
      <span class="title3">{{resdata.fieldName}}</span>
      <span class="title4">
        评分进度<span class="title5">5</span> / 23</span>
    </div>

    <div class="examShowss" style="background-color:#fff">
      <div class="left">
        <span style="font-size: 20px;"><b>{{resdata.questionTypeName}}</b></span>
        <span class="title1">共 5 题，合计 5 分，已完成 {{count}} / {{resdata.questionTotalNum}}</span>
        <hr>
        <div class="container">
          <div style="margin-bottom: 10px;">
            <span>1、 </span>
            <span>公司共有战略决策委员会、__人力与技术委员会____、市场与营销委员会、_______________、项目执行与质量委员会五大委员会。</span>
            <span> （ 1 分）</span>
          </div>

          <!-- <div>
            <li v-for="(item,index) in fillAreaList" :key="index" style="margin-left:28px;">
              <el-input type="textarea" v-model="fillInput" style="width: 70%;margin-top:10px" :rows="2"></el-input>
              <el-input v-model="freeInput" class="give-mark"></el-input>
              <span style="margin-left:10px;">分</span>
            </li>
          </div> -->

          <div>
            <li v-for="(item,index) in inputAreaList" :key="index" style="margin-left:28px;">
              <el-input type="textarea" v-model="userByAnswer" style="width: 80%;margin-top:10px" :rows="6"></el-input>
              <el-input class="give-mark-two" v-model="freeInput"></el-input>
              <span style="margin-left:10px;">分</span>
            </li>
          </div>

          <!-- <div>
            <li v-for="(item,index) in operationList" :key="index" style="margin-left:28px;display:flex">
              <iep-froala-editor v-model="operation" style="width:80%"></iep-froala-editor>
              <el-input v-model="freeInput" class="give-mark-three"></el-input>
              <span style="margin-left:15px;margin-top:175px">分</span>
            </li>
          </div> -->

          <div class="center" align="center">
            <iep-button style="margin:0 10px;" @click="prv" :disabled="resdata.questionNum === 1">上一题</iep-button>
            <iep-button style="margin:0 10px;" @click="next" :disabled="resdata.questionNum === resdata.questionTotalNum">下一题</iep-button>
            <iep-button style="margin:0 10px;" @click="saveAndGoBack">保存并退出</iep-button>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="container">
          <div class="top">
            <span class="titleone">本题得分</span><br>
            <span class="titletwoss">
              <el-input class="fen" v-model="freeInput"></el-input>
            </span>
            <span class="titlethree"> / </span>
            <span class="titlefour">12</span>
          </div>

          <ve-ring style="padding-top: 15px;margin-top: -75px;" height="180px" :data="chartData" :settings="chartSettings" :tooltip-visible="false" :legend-visible="false" :colors="colors"></ve-ring>

          <div class="card">
            <div>
              <span class="answerSheet">填空题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.radioMap" :key="index" @click="handleCard(item)" :class="{'activess':item.answerOrNot===1,'active': item.id == resdata.questionNum}">{{item.id}}</iep-button>
              </div><br>
            </div>

            <div>
              <span class="answerSheet">简答题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.checkboxMap" :key="index" @click="handleCard(item)" :class="{'activess':item.answerOrNot===1,'active': item.id == resdata.questionNum}">{{item.id}}</iep-button>
              </div><br>
            </div>

            <div>
              <span class="answerSheet">实操题</span>
              <div class="answerSheetTop">
                <iep-button class="choices" v-for="(item,index) in resdata.checkedMap" :key="index" @click="handleCard(item)" :class="{'activess':item.answerOrNot===1,'active': item.id == resdata.questionNum}">{{item.id}}</iep-button>
              </div><br>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { judgeWrittenById, passWrittenById } from '@/api/exam/examLibrary/examReading/examReading'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  props: ['formData'],
  data () {
    this.colors = ['#409AF9', '#FFFFFF']
    this.chartSettings = {
      radius: [50, 60],
      offsetY: 80,
    }
    return {
      userByAnswer:'',         //用户答案(v-model绑定的值)
      fillInput: '',           //填空(v-model绑定的值)
      freeInput: '',           //简答(v-model绑定的值)
      operation: '',           //实操(v-model绑定的值)
      fillAreaList: ['', ''],  //填空
      inputAreaList: [''],     //简答
      operationList: [''],     //实操
      chartData: {
        columns: ['是否完成', '进度'],
        rows: [
          { '是否完成': '已完成', '进度': '' },
          { '是否完成': '未完成', '进度': '' },
        ],
      },
      resdata: {
        questionOffNum: [],  //已完成的题数
        questionTotalNum: '',//题目总数
        titleOptions: [],    //答案选项数组
        radioMap: [],        //答题卡片的单选题数组集合，从数组中遍历题目出来
        checkboxMap: [],     //答题卡片的复选题数组集合，从数组中遍历题目出来
        checkedMap: [],      //答题卡片的判断题数组集合，从数组中遍历题目出来
        textMap: [],         //答题卡片的简答题数组集合，从数组中遍历题目出来
      },
    }
  },
  watch: {

  },
  computed: {
    count: function () {
      return this.offNum()
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    /**
     * 判断题型(公用方法)
     */
    judgeType (params) {
      params.examId = this.formData.examId
      params.currentQuestionNum = this.resdata.questionNum
      const type = this.resdata.questionTypeName
      if (type === '填空题') {
        params.score = this.answerRadio
      }
      if (type === '简答题') {
        params.score = JSON.stringify(this.checksList)
      }
      if (type === '实操题') {
        params.score = this.trueOrFalseRadio
      }
      // if (type === '简答题') {
      //   params.score = this.freeInput
      // }
    },

    /**
     * 获取题目的详细数据(公用请求方法)
     */
    getSubjectById (params) {
      passWrittenById(params).then(res => {
         const record = res.data.data
         this.resdata = record
         this.userByAnswer = record.userAnswer
        // this.resdata = res.data
        // this.resdata.questionOffNum = res.data.questionNumList
        // this.resdata.questionTotalNum = res.data.questionNumList.checkboxMap.length + res.data.questionNumList.checkedMap.length + res.data.questionNumList.radioMap.length + res.data.questionNumList.textMap.length
        // this.resdata.titleOptions = res.data.titleOptions ? JSON.parse(res.data.titleOptions) : ''
        // this.resdata.radioMap = res.data.questionNumList.radioMap
        // this.resdata.checkboxMap = res.data.questionNumList.checkboxMap
        // this.resdata.checkedMap = res.data.questionNumList.checkedMap
        // this.resdata.textMap = res.data.questionNumList.textMap
        // if (res.data.questionTypeName === '单选题') {
        //   this.answerRadio = res.data.score
        // }
        // if (res.data.questionTypeName === '复选题') {
        //   this.checksList = JSON.parse(res.data.score)
        // }
        // if (res.data.questionTypeName === '判断题') {
        //   this.trueOrFalseRadio = res.data.score
        // }
        // if (res.data.questionTypeName === '简答题') {
        //   this.freeInput = res.data.score
        // }
      })
    },

    /**
     * 首次进入页面先判断后台返回信息，true代表可以阅卷再去发送获取考卷的请求
     */
    loadPage () {
      const params = {
        examId: this.formData.examId,
      }
      judgeWrittenById(params).then(res => {
        const resjudge = res.data.data
        if (resjudge === true) {
          const params = {
            examId: this.formData.examId,
          }
          this.getSubjectById(params)
        } else {
          this.$message({
            type: 'info',
            message: '已有老师阅卷，目前不能阅卷哦',
          })
        }
      })
    },

    /**
     *计算已完成的题数
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
      //console.log('counts22', arr)
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
     * 点击答题卡
     */
    handleCard (item) {
      const params = {
        questionNum: item.id,
      }
      this.judgeType(params)
      this.getSubjectById(params)
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
        const params = {
          ifCommit: 1,
        }
        this.judgeType(params)
        this.getSubjectById(params)
        this.$message({
          type: 'success',
          message: '保存成功!',
        })
        this.$emit('close', false)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消',
        })
      })
    },

  },
}
</script>
<style lang="scss" scoped>
.header {
  background-color: #fafafa;
  // background: -webkit-linear-gradient(left, rgb(64, 156, 252), rgb(100, 6, 10));
  // background: -moz-linear-gradient(right, rgb(64, 156, 252), rgb(100, 6, 10));
  // background: -o-linear-gradient(right, rgb(64, 156, 252), rgb(100, 6, 10));
  // background: linear-gradient(to right, rgb(64, 156, 252), rgb(100, 6, 10));
  padding: 15px 20px;
  width: 100%;
  height: 60px;
  img {
    margin-top: -2px;
    float: left;
  }
  .title1 {
    font-size: 19px;
    float: left;
    color: #595959;
  }
  .title2 {
    height: 20px;
    width: 2px;
    background: #595959;
    margin: 6px 15px 0 15px;
    float: left;
  }
  .title3 {
    font-size: 17px;
    float: left;
    color: #595959;
    margin-top: 3px;
  }
  .title4 {
    font-size: 15px;
    float: left;
    color: #595959;
    margin-top: 3px;
    margin-left: 150px;
    .title5 {
      color: rgb(65, 153, 248);
      margin-left: 15px;
    }
  }
}
.examShowss {
  margin: 20px auto;
  width: 89%;
  overflow: hidden;
  .left {
    float: left;
    width: 70%;
    .title1 {
      font-size: 15px;
      margin-left: 25px;
    }
    .container {
      margin-top: 15px;
      font-size: 15px;
      li {
        list-style-type: none;
      }
      .center {
        width: 100%;
        margin: 50px 0 0 0;
      }
    }
  }
  .right {
    float: right;
    width: 28%;
    border-left: 0px solid #eee;
    padding-bottom: 75px;
    .container {
      float: right;
      width: 280px;
      margin-top: 20px;
      background: #fffbf6;
      border: 1px solid #ffdbc1;
      // background: linear-gradient(
      //   to bottom right,
      //   rgb(55, 15, 68),
      //   rgb(107, 174, 246)
      // );
      .top {
        text-align: center;
        position: relative;
        top: 40px;
        .titleone {
          color: #595959;
          font-size: 30px;
        }
        .titletwoss {
          color: #e6a23c;
          font-size: 40px;
          .fen {
            width: 22%;
            font-size: 40px;
          }
        }
        .titlethree {
          color: #595959;
          font-size: 20px;
          margin-left: -2px;
        }
        .titlefour {
          color: #595959;
          font-size: 20px;
        }
      }
      .card {
        text-align: left;
        padding: 0 18px;
        .activess {
          background: #fdf6eb;
          border-color: #f5dab1;
          color: #e6a23c;
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
<style lang="scss">
.examShowss {
  .give-mark {
    width: 7%;
    height: 50px;
    //margin-top: 20px;
    margin-left: 100px;
    .el-input__inner {
      height: 50px;
      color: #ff6666;
      font-size: 20px;
      text-align: center;
    }
  }
  .give-mark-two {
    width: 8%;
    height: 70px;
    margin-left: 50px;
    .el-input__inner {
      width: 60px;
      height: 50px;
      margin-top: -40px;
      color: #ff6666;
      font-size: 20px;
      text-align: center;
    }
  }
  .give-mark-three {
    width: 10%;
    height: 74px;
    margin-left: 30px;
    margin-top: 150px;
    .el-input__inner {
      width: 80px;
      height: 74px;
      color: #ff6666;
      font-size: 20px;
      text-align: center;
    }
  }
  .titletwoss {
    .el-input__inner {
      width: 139%;
      color: #e6a23c;
      border: 0px solid #494884;
      background: none;
    }
  }
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
