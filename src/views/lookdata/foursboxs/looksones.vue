<template>
  <div :class='className' ref='chart' />
</template>

<script>
  import echarts from 'echarts'
  import {getDataUse} from '@/api/lookdata/index'
  export default {
    name: 'Index',
    data (){
      return {
        chart: null,
        filed:['给外部门共享', '给本部门间系统共享', '部门系统自用数据'],
        data:[{
          value: 46,
          name: '给外部门共享',
        }, {
          value: 20,
          name: '给本部门间系统共享',
        }, {
          value: 18,
          name: '部门系统自用数据',
        }],
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
              orient: 'vertical',
              top: '28%',
              right:10,
              textStyle:{
                color:'#fff',
                fontSize:12,
              },
              data: this.filed,
            },
            series: [{
              type: 'pie',
              selectedMode: 'single',
              radius: ['35%', '58%'],
              center:['30%','50%'],
              color: ['#177ddf', '#12a7ad', '#2ca756'],

              label: {
                normal: {
                  formatter: function (params) {
                    return params.percent.toFixed(0)+'%'
                  },
                  textStyle: {
                    color: '#d2d1df',
                    fontSize: 12,
                  },
                },
              },
              labelLine: {
                normal: {
                  show: true,
                  length:5,
                  lineStyle:{
                    color:'#fff',

                  },
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
      getDataUse().then(({data})=>{
        let fields = []
        let newData = []
        for(let item of data.data){
          fields.push(item.name)
          newData.push({
            value: item.num,
            name: item.name,
          })
        }
        this.filed = fields
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
