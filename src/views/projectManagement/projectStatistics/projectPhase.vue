<template>
  <div class="thing">
    <div :class='className' ref='chart' />
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {getBarChart} from '@/api/projectManagement/projectDoc'
  export default {
    name: 'projectPhase',
    data (){
      return {
        chart: null,
        matterOptimizeList: [],
      }
    },
    methods: {
      init (){
        this.chart = echarts.init(this.$refs[this.id])
        this.loadMap()
      },
      loadMap () {
        getBarChart().then(({data}) => {
          var listData = data
          var bar_dv = this.$refs.chart
          var myChart = echarts.init(bar_dv)
          if(bar_dv){
            var option = {
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                },
              },
              legend: {
                data:[{
                  name: listData[0].name,
                  textStyle: {
                    color: '#000000',
                  },
                },{
                  name: listData[1].name,
                  textStyle: {
                    color: '#000000',
                  },
                },{
                  name: listData[2].name,
                  textStyle: {
                    color: '#000000',
                  },
                },{
                  name: listData[3].name,
                  textStyle: {
                    color: '#000000',
                  },
                },{
                  name: listData[4].name,
                  textStyle: {
                    color: '#000000',
                  },
                }],
                padding:[5,30],
                top:0,
                right:0,
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
                borderWidth:0,
              },
              xAxis : [
                {
                  type : 'category',
                  textStyle: {
                    color: '#000000',
                  },
                  data : [{
                    value:'立项阶段',
                    textStyle: {
                      color: '#000000',
                    },
                  },
                    {
                      value:'采购阶段',
                      textStyle: {
                        color: '#000000',
                      },
                    },
                    {
                      value:'实施阶段',
                      textStyle: {
                        color: '#000000',
                      },
                    },
                    {
                      value:'验收与支付',
                      textStyle: {
                        color: '#000000',
                      },
                    },
                    {
                      value:'项目绩效',
                      textStyle: {
                        color: '#000000',
                      },
                    },
                    {
                      value:'项目跟踪',
                      textStyle: {
                        color: '#000000',
                      },
                    }],
                  axisLine:{
                    lineStyle:{
                      color:'#000000',
                      width:1,//这里是为了突出显示加上的
                    },
                  },
                },
              ],
              yAxis : [
                {
                  type : 'value',
                  splitLine:{
                    show:false,
                  },
                  axisLine:{
                    lineStyle:{
                      color:'#000000',
                      width:1,//这里是为了突出显示加上的
                    },
                  },

                },
              ],
              series : [
                {
                  name:listData[0].name,
                  type:'bar',
                  stack: '广告',
                  barWidth : 25,
                  itemStyle:{
                    color:'#f70325',
                  },
                  label: {
                    normal: {
                      show: true,
                      position:'insideRight',
                    },
                  },
                  data:listData[0].dataList,
                }, {
                  name:listData[1].name,
                  type:'bar',
                  stack: '广告',
                  barWidth : 25,
                  itemStyle:{
                    color:'#fefb20',
                  },
                  label: {
                    normal: {
                      show: true,
                      position:'insideRight',
                    },
                  },
                  data:listData[1].dataList,
                }, {
                  name:listData[2].name,
                  type:'bar',
                  stack: '广告',
                  barWidth : 25,
                  itemStyle:{
                    color:'#11f517',
                  },
                  label: {
                    normal: {
                      show: true,
                      position:'insideRight',
                    },
                  },
                  data:listData[2].dataList,
                }, {
                  name:listData[3].name,
                  type:'bar',
                  stack: '广告',
                  barWidth : 25,
                  itemStyle:{
                    color:'#237ae5',
                  },
                  label: {
                    normal: {
                      show: true,
                      position:'insideRight',
                    },
                  },
                  data:listData[3].dataList,
                }, {
                  name:listData[4].name,
                  type:'bar',
                  stack: '广告',
                  barWidth : 25,
                  itemStyle:{
                    color:'#09edea',
                  },
                  label: {
                    normal: {
                      show: true,
                      position:'insideRight',
                    },
                  },
                  data:listData[4].dataList,
                },
              ],
            }
            myChart.setOption(option)
            // curMap = {
            //     mapCode: mapCode,
            //     mapName: name
            // };
          }else{
            console.log('error')
          }
        })
      },
    },
    created (){
      
    },
    mounted (){
      this.init()
    },
    props:{
      className: {
        type: String,
        default: 'chart',
      },
      id: {
        type: String,
        default: 'chart',
      },
    },
  }
</script>

<style lang="scss" scoped>
  .detail{
    color: #dfe7ef;
    margin-top: 22px;
    overflow: hidden;
    &>div{
      font-size: 14px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border-bottom: 2px dotted #485162;
      float: right;
      margin-right: 40px;
      span{
        color: #a8ffff;
        font-size: 16px;
      }
    }
  }
  .chart{
    width: 580px;
    height: 100%;
    float: left;
  }
  .thing{
    width: 100%;
    height: 300px;
  }
</style>
