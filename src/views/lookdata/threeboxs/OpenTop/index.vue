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
        // filed:["省医疗厅", "省交通厅", "省办公厅", "省教育厅", "省劳动厅"],
        // value:[37, 48, 45, 40, 50],
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
            color: ['#000'],
            // 提示框
            legend:{
              show : true,
            },
            tooltip: {
              trigger: 'item',
              axisPointer: {
                type: 'shadow',
              },
              textStyle: {
                fontSize: 10,
              },
              formatter: "{b}: {c}%",
            },
            // 整体位置
            grid: {
              left: '0%',
              right: '0%',
              top: '20%',
              bottom: '2%',
              height:'80%',
              width:'85%',
              containLabel: true,
            },
            // 轴线
            xAxis: {
              show: false,
              boundaryGap: [0.4, 0.5],
              min:0,
              max:100,
            },
            // 轴线
            yAxis: {
              type: 'category',
              // 轴线
              axisLine: {
                show: false,
                boundaryGap: true,
              },
              // 刻度
              axisTick: {
                show: false,
                alignWithLabel: true,
                boundaryGap: true,
              },
              axisLabel: {
                show: true,
                align:'left',
                margin: 120,
                textStyle: {
                  fontSize: 12,
                  color: '#fefeff',
                },
                formatter: function (name) {
                  // 当名称长度超过10,进行回行处理且循环持续, 防止过长
                  var result = ''
                  for (var i = 0, len = name.length; i < len; i++) {
                    result += name[i]
                    if (i >= 9 && (i % 9 === 0)) {
                      result += '\n'
                    }
                  }
                  return result
                },
              },
              data: this.filed,
            },

            series: [
              {//如果不需要背景色  可以把此 bar删掉  上方求bgData的过程删掉
                type: 'bar',
                data:[100,100,100,100,100],
                barWidth: 10,
                tooltip:{
                  show:false,
                },
                silent:true,
                itemStyle:{
                  normal:{
                    color:'#263b7e',
                    barBorderRadius: [50, 50, 50, 50],
                  },
                },
              },{
              type: 'bar',
              barCategoryGap: '50%',
              barGap:'-100%',
              barWidth: 10,
              label: {
                normal: {
                  show: true,
                  color:'#bebed6',
                  position: 'right',
                  // 图示标签显示内容格式化
                  formatter: '{c}%',
                },
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset:1,
                    color: '#154897', // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#5060ae', // 100% 处的颜色
                  }], false),
                  textStyle:{
                    color:'#fff',
                  },
                  barBorderRadius: [50, 50, 50, 50],
                  shadowColor: 'rgba(0,0,0,0.1)',
                  shadowBlur: 3,
                  shadowOffsetY: 3,
                },
              },
              zlevel: 10,
              data: this.value,
              // color:"#fff",
            }],
          }
          myChart.setOption(option)
        }else{
          console.log('error')
        }
      },
    },
    created (){},
    watch: {
      'value': {
        deep: true,
        handler () {
          this.init()
        },
      },
    },
    mounted (){
      this.init()
      console.log(this.value)
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
      value: {
        type: Array,
        default: ()=>[],
      },
      filed: {
        type: Array,
        default: ()=>[],
      },
    },
  }
</script>

<style scoped>
  .charts{
    width: 100%;
    height: 100%;
    margin-left: -40px;
  }
</style>
