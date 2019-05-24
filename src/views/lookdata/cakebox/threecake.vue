<template>
  <div>
    <div class="titleBox">
      <div class="divBox">
        <div class="divone"></div>
        <div class="divtwo"></div>
      </div>
      <p class="tit">信息资源重点领域分类</p>
    </div>
    <div id="myChart" ></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {getKeyAreas} from '@/api/lookdata/index'
export default {
  data (){
    return{
      filed:[],
      value:[],
    }
  },
  mounted (){
    getKeyAreas().then(({data})=>{
      let filed = []
      let value = []
      for(let item of data.data){
        filed.push(item.name)
        value.push(item.value)
      }
      this.filed = filed.slice(0,5).reverse()
      this.value = value.slice(0,5).reverse()
      this.creatE()
    })
  },
  methods:{
    creatE (){
      let myChart = echarts.init(document.getElementById('myChart'))
      let item = this.filed
      let value = this.value
      myChart.setOption({
        color: ['#000'],
          // 提示框
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow',
            },
            textStyle: {
              fontSize: 10,
            },
          },
          legend: {
            show: false,
          },
          // 整体位置
          grid: {
            left: '0%',
            right: '0%',
            top: '2%',
            bottom: '2%',
            height:'90%',
            width:'110%',
            containLabel: true,
          },
          // 轴线
          xAxis: {
            show: false,
            boundaryGap: [0.4, 0.5],
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
              margin: 100,
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
            data: item,
          },

          series: [{
              type: 'bar',
              barCategoryGap: '50%',
              barWidth: 10,
              label: {
                  normal: {
                      show: true,
                    color:'#bebed6',
                      position: 'right',
                      // 图示标签显示内容格式化
                      formatter: function (item) {
                          return Number(item.value)
                      },
                  },
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset:1,
                    color: '#154897', // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#154897', // 100% 处的颜色
                  }], false),
                  textStyle:{
                    color:'#DCE8F7',
                  },
                  barBorderRadius: [50, 50, 50, 50],
                  shadowColor: 'rgba(0,0,0,0.1)',
                  shadowBlur: 3,
                  shadowOffsetY: 3,
                },
              },
              zlevel: 10,
              data: value,
              // color:"#fff",
          }],
        })
    },
  },
}
</script>

<style lang="scss" scoped>
#myChart{
  width: 100%;
  height: 233px;
  // margin-left: -40px;
}
// titlebox
.titleBox{
  color: #fff;
  margin-top: 20px;
  margin-left: 25px;
  .divBox{
    width: 15px;
    height: 25px;
    // background-color: yellow;
    display: inline-block;
    .divone{
      width: 5px;
      height: 15px;
      margin-top: 5px;
      float: left;
      background-color: #152D67;
    }
    .divtwo{
      width: 5px;
      height: 25px;
      float: right;
      background-color: #154897;
    }
  }
  .tit{
    display: inline-block;
    vertical-align: top;
    padding-left: 10px;
    color: #F9FFFF;
  }
}
</style>
