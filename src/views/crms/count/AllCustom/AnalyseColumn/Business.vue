<template>
  <div>
    <ve-pie :data="chartData" :legend-visible="false" :extend="chartExtend" height="300px" :loading="loading"></ve-pie>
  </div>
</template>

<script>
import _ from 'lodash'
import 'v-charts/lib/style.css'
import { getAllBusiness } from '@/api/crms/count'
export default {
  data () {
    this.chartExtend = {
      color: ['#A9CCF0', '#8D99B3', '#F0F0A9', '#FFD9BC', '#F1C8C8'],
      tooltip: {
        trigger: 'item',
        formatter: '{b}：{c}个 ({d}%)',
      },
      label: {
        show: true,
        color: '#000',
        formatter: '{b}：{d}%',
      },
      series: {
        center: ['50%', '50%'],
      },
    }
    return {
      loading: true,
      data: [
        { value: '0', name: '咨询', label: 'consulting' },
        { value: '0', name: '数据', label: 'information' },
        { value: '0', name: '会议培训', label: 'meetingTraining' },
        { value: '0', name: '业务类型其他', label: 'othersBusiness' },
        { value: '0', name: '外包', label: 'outsourcing' },
        { value: '0', name: '平台', label: 'platform' },
        { value: '0', name: '产品', label: 'product' },
        { value: '0', name: '技术服务', label: 'technicalService' },
      ],
      chartData: {
        columns: ['name', 'value'],
        rows: [],
      },
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      getAllBusiness().then((res) => {
        if (res) {
          this.loading = false
        }
        Object.keys(res.data.data).forEach((item) => {
          var index = _.findIndex(this.data, function (o) { return o.label == item })
          this.data[index].value = res.data.data[item]
        })
        this.chartData.rows = this.data
      })
    },
  },
}
</script>

<style>
</style>
