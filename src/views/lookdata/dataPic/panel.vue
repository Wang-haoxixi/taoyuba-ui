<template>
  <div :class="className" ref="chart"/>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'Index',
    data (){
      return {
        chart: null,
      }
    },
    watch: {
      valueNum () {
        this.init()
      },
    },
    methods: {
      init (){
        this.chart = echarts.init(this.$refs[this.id])
        this.loadMap('china')
      },
      loadMap () {
        var data = {
          title: '仪表盘',
          value: this.valueNum / 1,
          color: {
            pieMini: '#ffca1c', //小圆形颜色
            pieMiniMini: '#fff', //小小圆形颜色
            piePlus: '#02e0d9', //大圆形颜色
          },
        }
        let bar_dv = this.$refs.chart
        let myChart = echarts.init(bar_dv)
        if(bar_dv){
          let option = {
            title: {
              textStyle: {
                fontWeight: 'normal',
                fontSize: 5,
              },
            },
            series: [{
              "name": "仪表盘",
              "type": "gauge",
              "splitNumber": 20,
              "radius" : 40,
              "axisLine": {
                "lineStyle": {
                  "color": [
                    [data.value / 100, data.color.piePlus],
                    [1, "#ebedf0"],
                  ],
                  "width":7,
                },
              },
              axisLabel: {
                show: false,
              },
              "axisTick": {
                show: false,

              },
              "splitLine": {
                "show": false,
              },
              "itemStyle": {
                show: false,
              },
              "detail": {
                "formatter": function (value) {
                  if (value != 0) {
                    var num = Math.round(value * 10) / 10
                    return parseInt(num) + '%'
                  } else {
                    return 0
                  }
                },
                x: "bottom",
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: 15,
                },
              },
              "title": {
                "offsetCenter": [0, "0%"],
              },
              "data": [{
                "name": "",
                "value": data.value,
              }],
              pointer: {
                show: true,
                length: '90%',
                width: 3, //指针粗细
              },
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

      },
    },
    created (){},
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
      valueNum: {
        type: String,
        default: '50',
      },
    },
  }
</script>

<style scoped>
  .chart{
    width: 100%;
    height: 75%;
    padding-top: 10px;
    box-sizing: border-box;
  }
</style>
