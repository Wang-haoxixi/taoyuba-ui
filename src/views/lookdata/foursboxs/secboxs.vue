<template>
  <div :class='className' ref='chart' />
</template>

<script>
  import echarts from 'echarts'
  import {getCollectAnalyze} from '@/api/lookdata/index'
  export default {
    name: 'Index',
    data (){
      return {
        chart: null,
        data: {
          mat:[],
          range:[],
        },
      }
    },
    methods: {
      init (){
        this.chart = echarts.init(this.$refs[this.id])
        this.loadMap()
      },
      getSeries (){
        let series = []
        for(let i = 0;i<this.data.mat.length;i++){
          if(i === 0){
            series.push({
              name: this.data.mat[i],
              type: 'bar',
              barGap: '0%',
              barWidth:14,
              zlevel: 2,
              data: this.data[this.data.mat[i]],
            })
          }else{
            series.push({
              name: this.data.mat[i],
              type: 'bar',
              barWidth:14,
              zlevel: 2,
              data: this.data[this.data.mat[i]],
            })
          }
        }
        return series
      },
      loadMap () {
        var bar_dv = this.$refs.chart
        let myChart = echarts.init(bar_dv)
        if(bar_dv){
          let option = {
            title:{
              text:'归集数据材料分析',
              left:'42%',
              top:'8%',
              textStyle:{
                color:'#fcfdff',
                fontSize:18,
                fontWeight:'normal',
              },
            },
            color:['#11a6aa', '#157dde', '#c79266', '#a985dd'],
            legend: {
              orient:'vertical',
              top: 20,
              right:20,
              padding:15,
              textStyle: {
                color: '#fff',
              },
              data: this.data.mat,
              icon:'square',
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '10%',
              width:'78%',
              containLabel: true,
            },
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
              },
            },
            // tooltip: {
            //   show: "true",
            //   trigger: 'item',
            //   backgroundColor: 'rgba(0,0,0,0.7)', // 背景
            //   padding: [8, 10], //内边距,
            // },
            yAxis: {
              min:0,
              max:50,
              splitNumber:5,
              type: 'value',
              axisTick: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#28416e',
                },
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#28416e ',
                },
              },
              axisLabel: {
                textStyle: {
                  color: '#fff',
                  fontWeight: 'normal',
                  fontSize: '12',
                },
              },
            },
            xAxis: [{
              type: 'category',
              axisTick: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#28416e',
                },
              },
              axisLabel: {
                inside: false,
                textStyle: {
                  color: '#fff',
                  fontWeight: 'normal',
                  fontSize: '12',
                },
                // formatter:function(val){
                //     return val.split("").join("\n")
                // },
              },
              data: this.data.range,
            }, {
              type: 'category',
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              splitArea: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              data: ['会', '不会', '看情况'],
            },

            ],
            series: this.getSeries(),
          }
          myChart.setOption(option)
        }else{
          console.log('error')
        }
      },
    },
    created (){},
    mounted (){
      getCollectAnalyze().then(({data})=>{
        let newData = data.data
        // newData.mat= ['证照类', '证明类', '批文类', '其它类']
        this.data = newData
        this.init()
      })
    },
    props:{
      className: {
        type: String,
        default: 'charts',
      },
      id: {
        type: String,
        default: 'chart',
      },
    },
  }
</script>

<style scoped>
  .charts{
    width: 100%;
    height: 100%;
  }
</style>
