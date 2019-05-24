<template>
  <div class="lookBigBox">
    <div class="lookBox">
      <!-- header -->
      <div class="tops">
        <img class="backTop" src="./images/tops2.png" alt="">
        <span class="text1">信息资源目录</span>
        <span class="text2">服务事项数据</span>
      </div>
      <!-- <div class="time">{{this.time}}</div> -->
      <div class="contents">
        <!-- 块一 -->
        <div class="ones">
          <div class="bord firsts">
            <div class="img_box">
              <div class="img_boxOne"></div>
              <div class="imges_box">
                <img src="./images/kuang2.png" alt="">
              </div>
            </div>
            <!-- 小框标题 -->
            <div class="titleBox">
              <div class="divBox">
                <div class="divone"></div>
                <div class="divtwo"></div>
              </div>
              <p class="tit">基本情况统计</p>
            </div>
            <firsttable></firsttable>
          </div>
          <div class="bord seconds">
            <onetabs></onetabs>
          </div>
          <div class="bord thirds">
            <onecake></onecake>
          </div>
        </div>
        <!-- 块二 -->
        <div class="twos">
          <div class="bord One">
            <twocake></twocake>
          </div>
          <div class="bord Two">
            <threecake></threecake>
          </div>
          <div class="bord Three">
            <fourcake></fourcake>
          </div>
        </div>
        <!-- 块三 -->
        <div class="bord threes">
          <threeboxs></threeboxs>
        </div>
        <!-- 块四 -->
        <div class="fours">
          <div class="bord theone">
            <!-- 小框标题 -->
            <div class="titleBox">
              <div class="divBox">
                <div class="divone"></div>
                <div class="divtwo"></div>
              </div>
              <p class="tit">信息系统概览</p>
            </div>
            <secondtable></secondtable>
          </div>
          <div class="bord thetwo">
            <!-- 小框标题 -->
            <div class="titleBox">
              <div class="divBox">
                <div class="divone"></div>
                <div class="divtwo"></div>
              </div>
              <p class="tit">数据归集统计分析</p>
            </div>
            <foursboxs></foursboxs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firsttable from './tablebox/firsttable'
import secondtable from './tablebox/secondtable'
import onetabs from './tablebox/onetabs'
import onecake from './cakebox/onecake'
import twocake from './cakebox/twocake'
import threecake from './cakebox/threecake'
import fourcake from './cakebox/fourcake'
import threeboxs from './threeboxs'
import foursboxs from './foursboxs'
var moment = require('moment')
export default {
  components: {firsttable,secondtable,onetabs, onecake ,twocake, threecake,fourcake,threeboxs,foursboxs},
  data (){
    return{
      time: '',
    }
  },
  methods: {
    getTime () {
      setTimeout(()=>{
        this.time = moment().format("YYYY年 MM月DD日 dddd HH:mm:ss")
      },1000)
    },
  },
  watch:{
    'time': {
      handler () {
        this.getTime()
      },
    },
  },
  mounted () {
    this.time = moment().format("YYYY年 MM月DD日 dddd HH:mm:ss")
  },
}
</script>


<style lang="scss" scoped>
.bord{
  border: 1px solid #243b76;
}
// titlebox
.titleBox{
  color: #fff;
  margin-top: 20px;
  margin-left: 25px;
  .divBox{
    width: 15px;
    height: 25px;
    // background-color: yellow;
    display: inline-block;
    .divone{
      width: 5px;
      height: 15px;
      margin-top: 5px;
      float: left;
      background-color: #243b76;
    }
    .divtwo{
      width: 5px;
      height: 25px;
      float: right;
      background-color: #243b76;
    }
  }
  .tit{
    display: inline-block;
    vertical-align: top;
    padding-left: 10px;
    color: #F9FFFF;
  }
}
.lookBigBox{
  width: 100vw;
  height: 100vh;
  background-color: #153357;
  overflow: auto;
  .lookBox{
    width: 2400px;
    height: 1200px;
    box-sizing: border-box;
    margin: 0 auto;
    // background-color: red;
    overflow: hidden;
    .tops{
      height: 48px;
      width: 1213px;
      // background: yellow;
      margin-left: 538px;
      margin-top: 29px;
      background-repeat:no-repeat;
      position: relative;
      color: #fff;
      .backTop{
        width: 100%;
        height: 100%;
      }
      .text1{
        position:absolute;
        top: 0;
        left: 387px;
        font-size: 24px;
        font-weight: bold;
      }
      .text2{
        position:absolute;
        top: 0;
        left: 671px;
        font-size: 24px;
      }
    }
    .time {
      position: absolute;
      margin: 0 36px;
      color: #fff;
      border: 1px solid #243b76;
      padding: 3px 10px;
      border-radius: 6px;
    }
    .contents{
      height: 1024px;
      width: 2346px;
      // background-color: #666666;
      margin: 66px auto;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      .ones{
        width: 500px;
        height: 100%;
        // background-color: aqua;
        display: inline-block;
        box-sizing: border-box;
        position: relative;
        .firsts,.seconds,.thirds{
          overflow: hidden;
          box-sizing: border-box;
          width: 100%;
          background-color: #1c3667;
        }
        .firsts{
          height: 254px;
          margin-bottom: 16px;
          position: relative;
          overflow: visible;
          // 第一个框
          .img_box{
            width: 325px;
            height: 51px;
            background-color: #1c3667;
            box-sizing: border-box;
            position: absolute;
            right: -1px;
            top: -1px;
            overflow: hidden;
          }
          .img_boxOne{
            width: 40px;
            height: 110px;
            /* background-color: yellow; */
            position: absolute;
            top: -31px;
            left: 22px;
            transform: rotate(-36deg);
            -ms-transform: rotate(-36deg);
            -webkit-transform: rotate(-36deg);
            border-left: 1px solid #243b76;
            background-color: #153357;
          }
          .imges_box{
            height: 100%;
            width: 288px;
            position: absolute;
            right: 0;
            overflow: hidden;
            border-bottom: 1px solid #243b76;
            background-color: #153357;
          }
          .imges_box img{
            width: 285px;
            margin-top: 10px;
          }
        }
        .seconds{
          height: 400px;
          margin-bottom: 27px;
        }
        .thirds{
          height: 327px;
        }
      }
      .twos{
        width: 500px;
        height: 100%;
        // background-color: aqua;
        margin-left: 23px;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: top;
        .One,.Two,.Three{
          overflow: hidden;
          box-sizing: border-box;
          width: 100%;
          background-color: #1c3667;
        }
        .One{
          height: 254px;
          margin-bottom: 23px;
        }
        .Two{
          height: 255px;
          margin-bottom: 20px;
        }
        .Three{
          height: 472px;
        }
      }
      .threes{
        width: 500px;
        height: 100%;
        // background-color: aqua;
        margin-left: 23px;
        display: inline-block;
        overflow: hidden;
        box-sizing: border-box;
        background-color: #1c3667;
        vertical-align: top;
      }
      .fours{
        width: 776px;
        height: 100%;
        // background-color: aqua;
        margin-left: 23px;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: top;
        .theone,.thetwo{
          // overflow: hidden;
          box-sizing: border-box;
          width: 100%;
          background-color: #1c3667;
        }
        .theone{
          height: 221px;
          margin-bottom: 24px;
        }
        .thetwo{
          height: 779px;
        }
      }
    }
  }
}


</style>
