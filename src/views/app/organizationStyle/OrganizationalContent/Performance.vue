<template>
  <ve-histogram :data="chartData" :extend="chartExtend" :colors="colors" :toolbox="toolbox" height="307px">
  </ve-histogram>
</template>

<script>
export default {
  data () {
    this.colors = ['#d66368', '#f58f44']
    this.chartSettings = {
      metrics: ['计划收款', '实际收款'],
      dimension: ['dept'],
      lineStyle: {
        color: '#fff',
      },
    }
    this.toolbox = {
      feature: {
        magicType: { type: ['line', 'bar'] },
        saveAsImage: {},
      },
    }
    this.chartExtend = {
      barWidth: '10',
      itemStyle: {
        barBorderRadius: 10,
      },
    }
    return {
      replaceText: (data) => `（计划收款共计${data[0]}笔，共计${data[0]}贝）`,
      value6: '',
      chartData: {
        columns: ['dept', '计划收款', '实际收款'],
        rows: [
          { 'dept': '1月', '计划收款': 0, '实际收款': 220 },
          { 'dept': '2月', '计划收款': 0, '实际收款': 180 },
          { 'dept': '3月', '计划收款': 0, '实际收款': 510 },
          { 'dept': '4月', '计划收款': 0, '实际收款': 232 },
          { 'dept': '5月', '计划收款': 480, '实际收款': 0 },
          { 'dept': '6月', '计划收款': 250, '实际收款': 0 },
          { 'dept': '7月', '计划收款': 288, '实际收款': 0 },
          { 'dept': '8月', '计划收款': 185, '实际收款': 0 },
          { 'dept': '9月', '计划收款': 480, '实际收款': 0 },
          { 'dept': '10月', '计划收款': 118, '实际收款': 0 },
          { 'dept': '11月', '计划收款': 205, '实际收款': 0 },
          { 'dept': '12月', '计划收款': 258, '实际收款': 0 },
        ],
      },
    }
  },
}
</script>