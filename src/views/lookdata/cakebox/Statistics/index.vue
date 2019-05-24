<template>
  <div :class='className' ref='chart' />
</template>

<script>

  import {getStatusAccountingVO} from '@/api/lookdata/index'
  import echarts from 'echarts'
  export default {
    name: 'Index',
    data (){
      return {
        chart: null,
        tal: [],
      }
    },
    methods: {
      init (){
        this.chart = echarts.init(this.$refs[this.id])
        this.loadMap()
      },
      loadMap () {
        var data = this.tal
        var bar_dv = this.$refs.chart
        let myChart = echarts.init(bar_dv)
        if(bar_dv){
          let option = {

            color: ['#ff7f50', '#95e2ff', '#d2a2cc', '#32cd33', '#6395ec', '#ba56d4', '#53ff53', '#FFFFFD' ],
            grid: {
              bottom: 150,
              left: 100,
              right: '10%',
            },
            tooltip: {
              trigger: 'item',
              formatter: "{b}: {c} ({d}%)",
            },
            legend: {
              orient: 'vertical',
              top: "middle",
              itemGap:35,
              right: "5%",
              textStyle: {
                color: '#DCE8F7',
                fontSize: 14,
                padding:-8,
              },
              icon: 'square',
              data: data,
            },
            series: [
              // 主要展示层的
              {
                radius: ['35%', '61%'],
                center: ['28%', '55%'],
                type: 'pie',
                label: {
                  normal: {
                    show: true,
                    formatter: "{c}\n{d}%",
                    textStyle: {
                      fontSize: 12,
                      color:'#DCE8F7',
                    },
                    position: 'outside',
                  },
                  emphasis: {
                    show: true,
                  },
                },
                labelLine: {
                  normal: {
                    show: true,
                    length: 10,
                    length2: 18,
                    lineStyle:{
                      color:'#fff',
                    },
                  },
                  emphasis: {
                    show: true,
                  },
                },
                name: "目录状态统计",
                data: data,

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
      getStatusAccountingVO().then(({data})=>{
        this.tal = data.data
        // this.tal.splice(4,0,"\n")
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
