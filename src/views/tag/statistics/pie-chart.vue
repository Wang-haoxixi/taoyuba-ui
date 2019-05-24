<template>
  <div class="pie-chart-wrapper" v-if="showChart">
    <h1>标签分布<span @click="routeTo">更多</span></h1>
    <div :style="{height: (height + 5) + 'px'}">
      <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
        <v-tooltip :showTitle="false" dataKey="item*percent" />
        <v-axis />
        <v-legend dataKey="item" />
        <v-pie position="percent" color="item" :v-style="pieStyle" :label="labelConfig" />
        <v-coord type="theta" />
      </v-chart>
    </div>
  </div>
</template>
<script>
import { getTagDistributed } from '@/api/tms/statistics'
const DataSet = require('@antv/data-set')

const scale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%',
}]
export default {
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
        const dv = new DataSet.View().source(res.data)
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
    routeTo () {
      this.$router.push({path: '/tag/bqgl'})
    },
  },
}
</script>
<style lang="scss" scoped>
.pie-chart-wrapper {
  h1 {
    font-size: 20px;
    position: relative;
    span {
      position: absolute;
      top: 4px;
      right: 10px;
      font-size: 14px;
      color: #666;
      cursor: pointer;
      &:hover {
        color: rgb(56, 161, 242);
      }
    }
  }
}
</style>
