<template>
  <div id="statisrics" style="min-width: 1200px;">
    <el-row>
      <el-col :span="24">
        <h1 class="chart-title">海洋捕捞渔船管理统计墙</h1>
        <!-- <div class="select-wrapper">
          <el-form :inline="true" class="demo-form-inline">
          </el-form>
        </div> -->
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="7">
        <div class="chart-bg panel">
          <div>
            <h2>进出港统计</h2>
          </div>
          <div id="salaryTotal" style="width: 100%;height:388px;box-sizing: border-box"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="10" class="all-crew">
        <div class="chart-bg panel font-height boss-bg">
          <el-row>
            <el-col :span="6" class="font-yellow">1236</el-col>
            <el-col :span="6" class="font-yellow">8700</el-col>
            <el-col :span="6" class="font-yellow">36</el-col>
            <el-col :span="6" class="font-yellow">42</el-col>
          </el-row>
          <el-row class="el-row-text">
            <el-col :span="6" class="font-text">渔船总数</el-col>
            <el-col :span="6" class="font-text">船员总数</el-col>
            <el-col :span="6" class="font-text">基层总数</el-col>
            <el-col :span="6" class="font-text">渔港总数</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="font-yellow">686</el-col>
            <el-col :span="6" class="font-yellow">1550</el-col>
            <el-col :span="6" class="font-yellow">536</el-col>
            <el-col :span="6" class="font-yellow">1236</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="font-text">本地渔船</el-col>
            <el-col :span="6" class="font-text">持证船员</el-col>
            <el-col :span="6" class="font-text">在港渔船</el-col>
            <el-col :span="6" class="font-text">额定船员</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="font-yellow">550</el-col>
            <el-col :span="6" class="font-yellow">6186</el-col>
            <el-col :span="6" class="font-yellow">749</el-col>
            <el-col :span="6" class="font-yellow">6543</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="font-text">外地渔船</el-col>
            <el-col :span="6" class="font-text">普通船员</el-col>
            <el-col :span="6" class="font-text">出海渔船</el-col>
            <el-col :span="6" class="font-text">实配船员</el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="chart-bg panel">
          <div>
            <h2>渔船健康状态统计</h2>
          </div>
          <div id="shipHealthy" style="width: 100%;"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed:{
  },
  mounted (){
    this.salaryTotal()
    this.shipHealthy()
  },
  created (){
  },
  methods: {
    /* eslint-disable */
    // 进出港统计
    salaryTotal () {
      this.salaryTotal = this.$echarts.init(document.getElementById('salaryTotal'))
      let option = {
        tooltip: {
          // 通过坐标轴来触发
          trigger: 'axis',
        },
        legend: {
          data: ['在港', '出港', '已上报', '免报告'],
          textStyle: {
            fontSize: 12,
            color: 'white'
          }
        },
        xAxis: {
            type: 'category',
            data: ['2021/5/1','2021/6/1','2021/7/1','2021/8/1'],
            // 去除刻度
            axisTick: {
              show: false,
            },
            // 修饰刻度标签的颜色
          axisLabel: {
            color: 'rgba(255,255,255,.7)',
            interval:0,
          },
          // 去除x坐标轴的颜色
          axisLine: {
            show: false,
          },
        },
        yAxis: {
            type: 'value',
            // 去除刻度
            axisTick: {
              show: false,
            },
            // 修饰刻度标签的颜色
            axisLabel: {
              color: 'rgba(255,255,255,.7)',
            },
            // 修改y轴分割线的颜色
            splitLine: {
              lineStyle: {
                color: '#012f4a',
              },
            },
        },
        series: [{
            name: '在港',
            data: [12,1,212,343],
            type: 'line',
            smooth: true,
        },{
            name: '出港',
            data: [1,11,222,333],
            type: 'line',
            smooth: true,
        },{
            name: '已上报',
            data: [13,1,262,63],
            type: 'line',
            smooth: true,
        },{
            name: '免报告',
            data: [13,151,42,73],
            type: 'line',
            smooth: true,
        }],
      }
      this.salaryTotal.setOption(option)
    },
    // 渔船健康
    shipHealthy () {
      this.shipHealthy = this.$echarts.init(document.getElementById('shipHealthy'))
      let option = {
          xAxis: {
              type: 'category',
              data: ['健康','亚健康','不健康'],
              axisLabel: {
                color: 'rgba(255,255,255,.7)',
                interval:0,
              },
               axisLine:{
                lineStyle:{color:'white'}    // x轴坐标轴颜色
               },
          },
          yAxis: {
              type: 'value',
               // 修饰刻度标签的颜色
              axisLabel: {
                color: 'rgba(255,255,255,.7)',
              },
              axisLine:{
                lineStyle:{color:'white'}    // x轴坐标轴颜色
               },
          },
          series: [{
              data: [200, 200, 150],
              itemStyle: {
                  normal: {//写上normal属性，否则不起作用；
                      color:new this.$echarts.graphic.LinearGradient(
                          0, 0, 0, 1,//从上往下渐变
                          [
                              {offset: 0, color: 'rgba(249, 246, 9, 1)'},
                              {offset: 1, color: 'rgba(249, 246, 9, 0.2)'}
                          ]
                      )
                  }
              },
              type: 'bar',
              barWidth : 30,
              showBackground: true,
              backgroundStyle: {
                  color: 'rgba(180, 180, 180, 0.2)'
              }
          }]
      };
      this.shipHealthy.setOption(option)
    }
     /* eslint-enable */
  },
}
</script>
<style lang='scss' scoped>
  #statisrics{
    position: relative;
    overflow-y:auto;
    height: 100%;
    background-color: #06164A;
    ::v-deep .el-scrollbar__wrap {
      height: 400px;
    }
    .boss-bg {
      width: 100%;
      height: 388px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
    }
    .select-wrap{
      position:absolute;
      top:40px;
      right: 170px;
    }
    .crew-select {
      width: 140px;
      position:absolute;
      top:40px;
      right: 20px;
    }
    .chart-title{
      padding-top:30px;
      font-size:30px;
      color:#fff;
      text-align: left;
    }
    .chart-bg{
      background-color: #101F51;
      border:solid 1px #11395A;
      border-radius: 3px;
      padding-bottom: 10px;
      position: relative;
      h2{
        color:#fff;
        font-size:16px;
        text-align: center;
        padding-top:20px;
      }
    }
    .all-crew{
      color: rgba(255,255,255,.7);
      text-align: center;
      font-size: 12px;
    }
    .font-yellow{
      height:30px;
      font-size: 24px;
      color: #ffeb7b;
      padding-top:10px;
      font-family: electronicFont;
      font-weight: bold;
    }
    .font-text{
      height:30px;
      font-size:14px;
      // line-height: 30px;
    }
  }
  .panel::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-top: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
    border-radius: 20%;
}
.panel .panel-footer::before {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
    border-radius: 20%;
}
.panel::after {
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-top: 2px solid #02a6b5;
    border-right: 2px solid #02a6b5;
    border-radius: 20%;
}
.panel .panel-footer::after {
    position: absolute;
    bottom: 0;
    right: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #02a6b5;
    border-right: 2px solid #02a6b5;
    border-radius: 20%;
}
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .crew-select {
    position: absolute;
    right: 5px;
    top: 17px;
    width: 110px;
  }
  .select-wrapper {
    position: absolute;
    top:40px;
    right: 20px;
  }
  .all-crew {
    .el-row-text {
      margin-bottom: 0px;
    }
  }
  .chart-time {
    text-align: center;
    color: #fff;
    font-size: 12px;
  }
  .el-row {
    margin-bottom: 12px;
  }
</style>