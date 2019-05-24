<template>
  <div :class='className' ref='chart' />
</template>

<script>
  import echarts from 'echarts'
  import {getTopic} from '@/api/lookdata/index'
  export default {
    name: 'Index',
    data (){
      return {
        chart: null,
        filed: [],
        data: [],
      }
    },
    methods: {
      init (){
        this.chart = echarts.init(this.$refs[this.id])
        this.loadMap()
      },
      loadMap () {
        var data = this.data
        var bar_dv = this.$refs.chart
        let myChart = echarts.init(bar_dv)
        if(bar_dv){
          let option = {
            tooltip: {
              show: true,
              trigger: 'item',
              formatter: "{b}: {c} ({d}%)",
            },
            legend: {
              orient: 'horizontal',
              top: '2%',
              textStyle:{
                color:'#DCE8F7',
                fontSize:12,
              },
              data: this.filed,
            },
            series: [{
              type: 'pie',
              selectedMode: 'single',
              radius: ['35%', '58%'],
              center:[230,160],
              color: ['#177ddf', '#12a7ad', '#2ca756', '#d8b118', '#ce3f5b'],

              label: {
                normal: {
                  formatter: '{d}%',
                  textStyle: {
                    color: '#d2d1df',
                    fontSize: 12,
                  },
                },
              },
              labelLine: {
                normal: {
                  show: true,
                },
              },
              itemStyle:{
                borderColor: '#caecde',
              },
              data: data,
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
      getTopic().then(({data})=>{
        let resData = data.data
        let filed = []
        for(let item of resData){
          filed.push(item.name)
        }
        this.data = resData
        this.filed = filed
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
