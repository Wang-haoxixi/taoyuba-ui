<template>
  <div class="mark">
    <IepAppTabCard :title="title">
      <ve-radar :data="chartData" :settings="chartSettings" :legendVisible="isTrue" height="220px"></ve-radar>
    </IepAppTabCard>
  </div>
</template>

<script>
import 'v-charts/lib/style.css'
export default {
  data () {
    this.chartSettings = {
      dimension: ['日期'],
      metrics: ['引用', '产量', '贡献', '口碑', '热度'],
      lineStyle: {
        width: 2,
        type: 'solid',
      },
      shape: 'polygon',
    }
    this.isTrue = false
    return {
      title: 'TA的指数',
      chartData: {
        columns: ['引用', '产量', '贡献', '口碑', '热度'],
        rows: [
          { '引用': 1393, '产量': 1093, '贡献': 3393, '口碑': 2500, '热度': 1200 },
          { '引用': 3530, '产量': 3230, '贡献': 2566, '口碑': 2800, '热度': 3400 },
          { '引用': 2923, '产量': 2623, '贡献': 3456, '口碑': 3500, '热度': 2000 },
          { '引用': 1723, '产量': 1423, '贡献': 1530, '口碑': 1900, '热度': 3105 },
          { '引用': 3792, '产量': 3492, '贡献': 3254, '口碑': 3500, '热度': 1359 },
          { '引用': 4593, '产量': 4293, '贡献': 1200, '口碑': 4500, '热度': 3200 },
        ],
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.mark {
  margin-bottom: 30px;
}
</style>
