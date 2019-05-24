<template>
  <div :class='className' ref='chart' />
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'Index',
    data (){
      return {
        chart: null,
        detail:{
          y1:55,
          y2:45,
        },
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
            backgroundColor:'#1d3768',
            title:{
              text:this.data.name,
              left:'12%',
              top:'bottom',
              textStyle:{
                color:'#fefefe',
                fontWeight:'normal',
                fontSize:12,
              },
            },
            tooltip: {
              formatter: "{a} <br/>{b} : {c}%",
            },
            grid: {
              bottom:'40',
              left: '45%',
            },
            xAxis: {
              max: 280,
              splitLine: {show: false},
              axisLine: {show: false},
              axisLabel: {show: false},
              axisTick: {show: false},
            },
            yAxis: [{
              type: "category",
              inverse: false,
              axisLine: {show: false},
              axisTick: {show: false},
              axisLabel: {show: false},
              data: [],
            }],
            series: [
              {
                name: "仪盘表",
                type: "gauge",
                radius:'55%',
                center:['30%', '50%'],
                startAngle: 200,
                endAngle: -20,
                splitNumber:15,
                axisLine: {
                  lineStyle: {
                    color: [
                      [this.data.value / 100, "#fff"],
                      [1, "#1d3768"],
                    ],
                    width: -10,
                  },

                },
                axisTick: {
                  lineStyle: {
                    color:'#8989a5',
                    width: 1,
                  },
                  length: -10,
                  splitNumber:2,
                },
                pointer: {           // 分隔线
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 5,
                  show:false,
                },
                axisLabel: {
                  textStyle: {
                    color: "#fff",
                  },
                  show:false,
                },
                splitLine: {
                  "show": false,
                },
                detail: {
                  show:true,
                  fontSize:12,
                  color:'#bec0d1',
                  formatter:'{value}%',
                },
                title: {
                  offsetCenter: [0, "60%"],
                },
                data: [{
                  value: this.data.value,
                  // formatter: "哈哈哈",
                }],
              },

              // 内侧指针、数值显示
              {
                type: 'gauge',
                center:  ['30%', '50%'],
                radius: '50%',
                startAngle: 200,
                endAngle: -20,
                min: 0,
                max: 400,
                axisLine: {
                  show: true,
                  lineStyle: {
                    width: 2,
                    color: [
                      [1, '#646581'],
                    ],
                  },
                },
                axisTick: {
                  show: 0,
                },
                splitLine: {
                  show: 0,
                },
                axisLabel: {
                  show:false,
                },
                pointer: {
                  show: 0,
                },
                detail: {
                  show: 0,
                },
              },
            ],
          }
          option.series[0].axisLine.lineStyle.color[0][1] = '#2c4d8e'
          myChart.setOption(option)
        }else{
          console.log('error')
        }
      },
    },
    created (){},
    mounted (){
      this.init()
    },
    watch: {
      'data': {
        deep: true,
        handler () {
          this.init()
        },
      },
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
      data:{
        type: Object,
        default (){
          return {}
        },
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
