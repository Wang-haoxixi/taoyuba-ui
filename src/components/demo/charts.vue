<template>
  <div class="iep-page-form">
    <el-form ref="form" size="small" label-width="80px">
      <ve-line :data="chartData" :settings="chartSettings"></ve-line>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    this.chartSettings = {
      labelMap: {
        PV: '访问用户',
        Order: '下单用户',
      },
    }
    return {
      chartData: {
        columns: ['date', 'PV', 'Order'],
        rows: [
          { 'date': '2018-05-22', 'PV': 32371, 'Order': 19810 },
          { 'date': '2018-05-23', 'PV': 12328, 'Order': 4398 },
          { 'date': '2018-05-24', 'PV': 92381, 'Order': 52910 },
        ],
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 20px;
  width: 100%;
  border: 1px solid #eee;
}
</style>
