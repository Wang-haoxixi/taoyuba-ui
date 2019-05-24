<template>
  <div class="line-chart-wrapper">
    <h1>每日新增</h1>
    <div :style="{height: (height + 5) + 'px'}">
      <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
        <v-tooltip />
        <v-axis />
        <v-line position="date*value" />
        <v-point position="date*value" shape="circle" />
      </v-chart>
    </div>
  </div>
</template>
<script>
import { getTagDayNew } from '@/api/tms/statistics'

const scale = [{
  dataKey: 'value',
  min: 0,
}, {
  dataKey: 'date',
  min: 0,
  max: 1,
}]

export default {
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
