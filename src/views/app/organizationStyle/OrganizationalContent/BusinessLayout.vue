<template>
  <div class="business-layout">
    <IepAppTabCard :title="title">
      <ve-radar :data="chartData" :settings="chartSettings" :legendVisible="isTrue" height="195px"></ve-radar>
    </IepAppTabCard>
  </div>
</template>

<script>
import 'v-charts/lib/style.css'
export default {
  data () {
    this.chartSettings = {
      dimension: ['日期'],
      metrics: ['软件', '平台', '创新', '数据', '咨询'],
      lineStyle: {
        width: 2,
        type: 'solid',
      },
      shape: 'polygon',
    }
    this.isTrue = false
    return {
      title: '业务布局',
      chartData: {
        columns: ['软件', '平台', '创新', '数据', '咨询'],
        rows: [
          { '软件': 1393, '平台': 1093, '创新': 3393, '数据': 2500, '咨询': 1200 },
          { '软件': 3530, '平台': 3230, '创新': 2566, '数据': 2800, '咨询': 3400 },
          { '软件': 2923, '平台': 2623, '创新': 3456, '数据': 3500, '咨询': 2000 },
          { '软件': 1723, '平台': 1423, '创新': 1530, '数据': 1900, '咨询': 3105 },
          { '软件': 3792, '平台': 3492, '创新': 3254, '数据': 3500, '咨询': 1359 },
          { '软件': 4593, '平台': 4293, '创新': 1200, '数据': 4500, '咨询': 3200 },
        ],
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.business-layout {
  margin-bottom: 30px;
}
</style>
