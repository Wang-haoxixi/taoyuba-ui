<template>
  <div class="performance">
    <div class="title">{{title}}</div>
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
  </div>
</template>

<script>
  export default {
    data () {
      this.chartSettings = {
        metrics: ['2018年', '2019年'],
        dimension: ['日期'],
      }
      return {
        title: '年度业绩变化',
        chartData: {
          columns: ['日期', '2018年', '2019年'],
          rows: [
            { '日期': '一月', '2018年': 1393, '2019年': 1093 },
            { '日期': '二月', '2018年': 3530, '2019年': 3230 },
            { '日期': '三月', '2018年': 2923, '2019年': 2623 },
            { '日期': '四月', '2018年': 1723, '2019年': 1423 },
            { '日期': '五月', '2018年': 3792, '2019年': 3492 },
            { '日期': '六月', '2018年': 4593, '2019年': 4293 },
            { '日期': '七月', '2018年': 4593, '2019年': 4293 },
          ],
        },
      }
    },
  }
</script>
<style lang="scss" scoped>
.performance {
  border: 1px solid #eee;
  padding: 20px;
  position: relative;
  .title{
    position: absolute;
    left: 20px;
    top: 20px;
    font-size: 16px;
    color: #333;
  }
}
</style>