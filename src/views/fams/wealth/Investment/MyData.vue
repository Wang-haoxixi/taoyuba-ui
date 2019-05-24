<template>
  <div>
    <ve-radar :data="chartData" :settings="chartSettings" :legendVisible="isTrue"></ve-radar>
  </div>
</template>

<script>

export default {
  data () {
    this.chartSettings = {
      labelMap: {
        date: '今年',
        work: '引用',
        study: '产量',
        creative: '贡献',
        weath: '口碑',
        admin: '热度',
      },
      lineStyle: {
        color: '#fff',
      },
      areaStyle: {
        opacity: 0.2,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'red', // 0% 处的颜色
          }, {
            offset: 1, color: 'orange', // 100% 处的颜色
          }],
          global: false, // 缺省为 false
        },
      },
    }
    this.isTrue = false
    return {
      chartData: {
        columns: ['date', 'creative', 'work', 'study', 'admin','weath'],
        rows: [
          {
            date: '去年', 'weath': 40, 'creative': 50, 'work': 30, 'study': 40, 'admin': 50,
          },
          {
            date: '今年', 'weath': 67, 'creative': 105, 'work': 75, 'study': 66, 'admin': 54, 
          },
        ],
      },
    }
  },
}
</script>
<style  lang="scss" scoped>
</style>
