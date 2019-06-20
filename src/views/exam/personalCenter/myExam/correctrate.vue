<template>
  <el-card class="correctrate-box" shadow="hover">
    <div slot="header">
      <span>正确率</span>
      <el-select placeholder="请选择" clearable v-model="value" size="mini">
        <el-option v-for="item in selectData" :key="item.id" :value="item.id" :label="item.name"></el-option>
      </el-select>
    </div>
    <div class="echarts">
      <ve-ring :data="chartData" :settings="chartSettings" height="400px" :extend="chartExtend"></ve-ring>
    </div>
  </el-card>
</template>

<script>
import Vue from 'vue'
import VePie from 'v-charts/lib/pie.common'
Vue.component(VePie.name, VePie)
const selectData = [
  { value: '1', name: '国脉内网' },
  { value: '2', name: '水巢DIPS' },
  { value: '3', name: '数据基因' },
  { value: '4', name: '技能类' },
  { value: '5', name: '知识类' },
  { value: '6', name: '数据能力类' },
  { value: '7', name: '基本能力类' },
  { value: '8', name: '项目管理类' },
  { value: '9', name: '公司常识类' },
  { value: '10', name: '人力资源类' },
]

export default {
  data () {
    this.chartSettings = {
      // roseType: 'radius',
      radius: ['50%', '70%'],
    },
      this.chartExtend = {
        series: {
          center: ['50%', '50%'],
        },
        color: ['#F5BA89', '#B7DBF9', '#EF878C'],
        legend: {
          orient: 'vertical',
          left: 0,
          aligin: 'auto',
        },
        label: {
          show: false,
        },
      }
    return {
      value: '',
      selectData,
      chartData: {
        columns: ['name', 'value'],
        rows: [
          { 'name': '单选题', 'value': 1393 },
          { 'name': '多选题', 'value': 1393 },
          { 'name': '简答题', 'value': 1393 },
        ],
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.el-card__header div {
  display: flex;
  justify-content: space-between;
}

.el-select {
  width: 30% !important;
  margin-left: 5%;
}
</style>