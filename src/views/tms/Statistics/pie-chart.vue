<template>
  <div class="pie-chart-wrapper" v-if="showChart">
    <h1>标签分布</h1>
    <no-data v-if="!data.length" style="height: 300px;"></no-data>
    <v-chart v-if="data.length" :force-fit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip :show-title="false" data-key="item*percent" />
      <v-axis />
      <v-legend data-key="item" />
      <v-pie position="percent" color="item" :v-style="pieStyle" :label="labelConfig" />
      <v-coord type="theta" />
    </v-chart>
  </div>
</template>
<script>
import { getTagDistributed } from '@/api/tms/statistics'
import noData from './no-data'
import { View } from '@antv/data-set'

const scale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%',
}]
export default {
  components: { noData },
  data () {
    return {
      showChart: false,
      data: [],
      scale,
      height: 300,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1,
      },
      labelConfig: ['percent', {
        formatter: (val, item) => {
          return item.point.item + ': ' + val
        },
      }],
    }
  },
  created () {
    this.loadDistributed()
  },
  methods: {
    loadDistributed () {
      getTagDistributed().then(res => {
        const dv = new View().source(res.data)
        dv.transform({
          type: 'percent',
          field: 'count',
          dimension: 'item',
          as: 'percent',
        })
        this.data = dv.rows
        this.showChart = true
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.pie-chart-wrapper {
  h1 {
    font-size: 20px;
  }
}
</style>
