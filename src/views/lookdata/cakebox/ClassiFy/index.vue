<template>
  <div :class='className' ref='chart' />
</template>

<script>
  import echarts from 'echarts'
  import {getResrcFormat} from '@/api/lookdata/index'
  export default {
    name: 'Index',
    data (){
      return {
        chart: null,
        data:{
          // fileds:['实时', '每日','每周','每月','\n','每季度', '每半年', '每年'],
          // xFileds:['电子文件','数据库','电子表格','图形图像','自描述','流媒体'],
          // 实时:[800, 800, 2000, 400, 600, 700],
          // 每日:[600, 1000, 1000, 1200, 1300, 900],
          // 每周:[800, 200, 600, 300, 400, 350],
          // 每月:[650, 700, 1000, 800, 600, 700],
          // 每季度:[800, 1000, 1900, 900, 600, 700],
          // 每半年:[200, 600, 400, 800, 400, 500],
          // 每年:[200, 600, 400, 800, 400, 500],
           max:10,
        },
      }
    },
    methods: {
      init (){
        this.chart = echarts.init(this.$refs[this.id])
        this.loadMap()
      },
      getSeries () {
        let series = []
        for(let i=0;i<this.data.fileds.length;i++){
          series.push({
            name: this.data.fileds[i],
            type: 'bar',
            stack: '总量',
            data: this.data[this.data.fileds[i]],
          })
          if(i==0){
            series[i].barWidth=40
          }
        }
        return series
      },
      loadMap () {
        var bar_dv = this.$refs.chart
        let myChart = echarts.init(bar_dv)
        if(bar_dv){
          let option = {
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
              },
            },
            legend: {
              top:'5%',
              right:'2%',
              data: this.data.fileds,
              textStyle:{
                color:'#fefefe',
                padding:-5,
              },
              icon:'square',
            },
            grid: {
              left: '2%',
              right: '4%',
              bottom: '3%',
              width:"100%",
              height:'75%',
              containLabel: true,
            },
            yAxis:  {
              min:0,
              max:this.data.max+5 || 10,
              splitNumber:8,
              type: 'value',
              axisLine:{
                lineStyle:{
                  color:'#253c78',
                },
              },
              splitLine:{
                show:false,
              },
              axisTick:{
                show:false,
              },
              axisLabel:{
                color:'#fefefe',
              },
            },
            xAxis: {
              type: 'category',
              data: this.data.xFileds,
              axisLine:{
                lineStyle:{
                  color:'#253c78',
                },
              },
              axisTick:{
                show:false,
              },
              axisLabel:{
                color:'#fefefe',
              },
            },
            color:['#177ddf','#12a7ad', '#ca9a98', '#2ca756', '#a985dd', '#d9af1b', '#6c8cbb','#CCCC33','#FF9966','#FF6666'],
            //'#99CC00','#CC0033', '#999933', '#333399', '#FF0033', '#FFFF00', '#FF6666', '#FF9966', '#CCCC33'
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
      getResrcFormat().then(({data})=>{
        let resData = data.data
        resData.fileds.splice(4,0,'\n')
        this.data = resData
        this.init()
        // console.log(resData)
      })
      // this.init()
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
