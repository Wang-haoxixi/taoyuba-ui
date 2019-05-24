<template>
  <div :class='className' ref='chart' />
</template>

<script>
  import echarts from 'echarts'
  import {collectionTrendAnalysis} from '@/api/lookdata/index'
  export default {
    name: 'Index',
    data (){
      return {
        chart: null,
        data:[],
        xdata:[],
        max:0,
      }
    },
    methods: {
      init (){
        this.chart = echarts.init(this.$refs[this.id])
        this.loadMap()
      },
      loadMap () {
        var bar_dv = this.$refs.chart
        let myChart = echarts.init(bar_dv)
        var data = this.data
        var xdata = this.xdata
        if(bar_dv){
          let option = {
            title:{
              text:'目录归集走势分析',
              left:'42%',
              top:'8%',
              textStyle:{
                color:'#fcfdff',
                fontSize:18,
                fontWeight:'normal',
              },
            },
            grid: {
              left: 30,
              right: 50,
              top: 70,
              bottom: 30,
              height:'65%',
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xdata,
              triggerEvent: true,
              splitLine: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  width: 1,
                  color: '#28416e',
                },
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                color: '#fff',
                fontSize: 12,
              },
            },
            yAxis: {
              min:0,
              max:this.max,
              splitNumber:7,
              type: 'value',
              splitLine: {
                show: true,
                lineStyle: {
                  width: 1,
                  color: '#28416e',
                },
              },
              axisLine: {
                show: true,
                lineStyle: {
                  width: 1,
                  color: '#28416e',
                },
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                color: '#fff',
                fontSize: 12,
                margin:20,
                textShadowColor: '#000',
                textShadowOffsetY: 2,
              },
            },
            series: [{
              data: data,
              type: 'line',
              symbol: 'circle',
              symbolSize: 4,
              color: '#ffffff',
              lineStyle: {
                color: "rgba(1,98,133,0)",
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#fff',
                  fontSize: 12,
                },
              },
              areaStyle: {
                color: 'rgba(21, 72, 151,0.8)',
              },
            }],
          }
          myChart.setOption(option)
        }else{
          console.log('error')
        }
      },
    },
    created (){},
    mounted (){
      collectionTrendAnalysis().then(({data})=>{
        let resData = data.data.reverse()
        let times = []
        let values = []
        for(let item of resData){
          times.push(item.time.split("-").splice(0,2).join("-"))
          values.push(item.value)
          if(this.max<item.value+5){
            this.max = item.value+5
          }
        }
        this.data = values
        this.xdata = times
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
