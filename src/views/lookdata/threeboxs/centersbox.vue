<template>
  <div :class='className' ref='chart' />
</template>

<script>
  import echarts from 'echarts'
  import {getShareType, getSharingMode} from '@/api/lookdata/index'
  export default {
    name: 'Index',
    data (){
      return {
        chart: null,
        shareTypeData: [],
        legendFileds:['文件','数据库','电子文档','接口','纸质报表'],
        tal:[
          {value:123, name:'文件'},
          {value:123, name:'数据库'},
          {value:123, name:'电子文档'},
          {value:123, name:'接口'},
          {value:123, name:'纸质报表'},
        ],
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
        let data = this.tal
        if(bar_dv){
          let option = {
            color:['#e4be97','#93bfe4','#a985dd','#2ca756','#e5be97'],
            title:{
              x:'center',
              bottom:20,
              text:'共享开放属性分析',
              textStyle:{
                fontSize:18,
                fontWeight:'normal',
                color:'#fbfafb',
              },
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)",
            },
            legend: {
              bottom:60,
              x: 'center',
              data:this.legendFileds,
              icon:'square',
              textStyle:{
                color:'#fefefe',
              },
            },
            series: [
              {
                name:'数量',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '30%'],
                center:['50%','35%'],
                label: {
                  normal: {
                    position: 'inside',
                  },
                },
                labelLine: {
                  normal: {
                    show: false,
                  },
                },
                data: this.shareTypeData,
              },
              {
                name:'开放属性统计',
                type:'pie',
                radius: ['40%', '55%'],
                center:['50%','35%'],
                data:data,
                label:{
                  color:'#fefefe',
                  formatter:'{b}:{d}',
                  borderWidth:2,
                  borderColor:'#263b7e',
                  padding:[5,10],
                },
                labelLine:{
                  lineStyle:{
                    color:'#fefefe',
                  },
                },
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
      getShareType().then(({data})=>{
        this.shareTypeData = data.data
        getSharingMode().then(({data})=>{
          let legend = []
          let tal = []
          for(let item of data.data){
            legend.push(item.name)
            tal.push({
              name:item.name,
              value:item.value,
            })
          }
          this.legendFileds = legend
          this.tal = tal
          this.init()
        })
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
