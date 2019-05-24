<template>
  <div>
    <ve-ring :data="chartData" :settings="chartSettings" :extend="chartExtend" height="300px"></ve-ring>
  </div>
</template>

<script>
import { getAllRecord } from '@/api/crms/count'
export default {
  data () {
    this.chartSettings = {
      roseType: 'radius',

    },
      this.chartExtend = {
        legend: {
          orient: 'vertical',
          left: 0,
          aligin: 'auto',
        },
        series: {
          center: ['50%', '50%'],
        },
      }
    return {
      chartData: {
        columns: ['marketManager', 'contactQuantity'],
        rows: [
          { marketManager: '刘大力', contactQuantity: 41.8 },
          { marketManager: '王浩', contactQuantity: 38 },
          { marketManager: '李四', contactQuantity: 33.7 },
          { marketManager: '张三', contactQuantity: 30.7 },
          { marketManager: '寒冬', contactQuantity: 25.8 },
          { marketManager: '夏凉', contactQuantity: 31.7 },
          { marketManager: '秋霜', contactQuantity: 33 },
          { marketManager: '春雪', contactQuantity: 46 },
        ],
      },
    }
  },
  created () {
    getAllRecord().then((res) => {
      this.chartData.rows = res.data.data
    })
  },
}
</script>
