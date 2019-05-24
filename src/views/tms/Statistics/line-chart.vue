<template>
  <div class="line-chart-wrapper">
    <h1>每日新增</h1>
    <no-data v-if="!data.length" style="height: 300px;"></no-data>
    <v-chart v-if="data.length" :force-fit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-line position="date*value" />
      <v-point position="date*value" shape="circle" />
    </v-chart>
  </div>
</template>
<script>
import { getTagDayNew } from '@/api/tms/statistics'
import noData from './no-data'
const scale = [{
  dataKey: 'value',
  min: 0,
}, {
  dataKey: 'date',
  min: 0,
  max: 1,
}]

export default {
  components: { noData },
  data () {
    return {
      data: [],
      scale,
      height: 300,
    }
  },
  created () {
    this.loadLineChartData()
  },
  methods: {
    loadLineChartData () {
      getTagDayNew().then(res => {
        this.data = res.data
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.line-chart-wrapper {
  h1 {
    font-size: 20px;
  }
}
</style>
