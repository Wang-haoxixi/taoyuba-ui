<template>
  <div :class='className' ref='chart' />
</template>

<script>
  import echarts from 'echarts'
  import {getStockDataScale} from '@/api/lookdata/index'
  export default {
    name: 'Index',
    data (){
      return {
        chart: null,
        detail:{
          y1:55,
          y2:45,
        },
        cnName: [],
        excel: [],
        database: [],
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
        if(bar_dv){
          let option = {
            title:{
              left:'30%',
              top:'7%',
              text:'数据对接方式分析',
              textStyle:{
                color:'#fefefe',
                fontWeight:'normal',
              },
            },
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
              },
            },
            legend: {

              top:'86%',
              data: ['Excel表对接', '库表对接'],
              textStyle:{
                color:'#fefefe',
                padding:-5,
              },
              icon:'square',
            },
            grid: {
              left: '10%',
              right: '4%',
              bottom: '18%',
              width:"95%",
              height:'60%',
              containLabel: true,
            },
            xAxis:  {
              type: 'value',
              axisLine:{
                show:false,
              },
              splitLine:{
                show:true,
                lineStyle:{
                  type: 'doshed',
                },
              },
              axisTick:{
                show:false,
              },
              axisLabel:{
                show:false,
              },
            },
            yAxis: {
              type: 'category',
              data: this.cnName,
              axisLine:{
                lineStyle:{
                  color:'#53556b',
                },
              },
              axisTick:{
                show:false,
              },
              axisLabel:{
                color:'#fefefe',
              },
            },
            color:['#157de0','#2ba655'],
            series: [
              {
                barWidth:20,
                name: 'Excel表对接',
                type: 'bar',
                stack: '总量',
                data: this.excel,
              },
              {
                name: '库表对接',
                type: 'bar',
                barWidth:20,
                stack: '总量',
                data: this.database,
              },
            ],
          }
          myChart.setOption(option)
        }else{
          console.log('error')
        }
      },
    },
    created (){},
    mounted (){
      getStockDataScale().then(({data})=>{
        let cnName = []
        let excel = []
        let database = []
        for(let item of data.data){
          cnName.push(item.dataScale)
          excel.push(item.excelDocking)
          database.push(item.databaseTableDocking)
        }
        this.cnName = cnName
        this.excel = excel
        this.database = database
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
