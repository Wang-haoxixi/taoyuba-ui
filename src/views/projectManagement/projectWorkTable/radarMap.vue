<template>
  <div class="thing">
    <div :class='className' ref='chart' />
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {getBarChart} from '@/api/projectManagement/projectDoc'
  export default {
    name: 'projectPhase',
    data (){
      return {
        chart: null,
        matterOptimizeList: [],
      }
    },
    methods: {
      init (){
        this.chart = echarts.init(this.$refs[this.id])
        this.loadMap()
      },
      loadMap () {
        getBarChart().then(({data}) => {
            console.log(data)
          //var listData = data
          var bar_dv = this.$refs.chart
          var myChart = echarts.init(bar_dv)
          if(bar_dv){
            var option = {
              tooltip : {
                trigger: 'axis',
              },
              radar: {
                indicator: [
                    {text: '需求', max: 100},
                    {text: '项目', max: 100},
                    {text: '任务', max: 100},
                    {text: '文档', max: 100},
                    {text: '知识', max: 100},
                ],
                radius: 80,
                center: ['50%','60%'],
              },
              series : [
                {
                  type: 'radar',
                  radarIndex: 1,
                  data: [
                    {
                        value: [85, 90, 90, 95, 95],
                        name: '某主食手机',
                    },
                    {
                        value: [95, 80, 95, 90, 93],
                        name: '某水果手机',
                    },
                  ],
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
        })
      },
    },
    created (){
      
    },
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
    },
  }
</script>

<style lang="scss" scoped>
  .detail{
    color: #dfe7ef;
    margin-top: 22px;
    overflow: hidden;
    &>div{
      font-size: 14px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border-bottom: 2px dotted #485162;
      float: right;
      margin-right: 40px;
      span{
        color: #a8ffff;
        font-size: 16px;
      }
    }
  }
  .chart{
    width: 580px;
    height: 100%;
    float: left;
  }
  .thing{
    width: 100%;
    height: 300px;
  }
</style>
