<template>
  <div class="weights">
    <div class="title">{{title}}</div>
    <ve-funnel :data="chartData" :settings="chartSettings"></ve-funnel>
  </div>
</template>

<script>
  export default {
    data () {
      this.chartSettings = {
        sequence: ['查询', '访问', '订阅', '收藏', '打赏'],
      }
      return {
        title: '内网行为权重',
        chartData: {
          columns: ['状态', '数值'],
          rows: [
            { '状态': '查询', '数值': 500 },
            { '状态': '访问', '数值': 400 },
            { '状态': '订阅', '数值': 300 },
            { '状态': '收藏', '数值': 200 },
            { '状态': '打赏', '数值': 100 },
          ],
        },
      }
    },
  }
</script>
<style lang="scss" scoped>
.weights {
  border: 1px solid #eee;
  padding: 50px 20px 0;
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