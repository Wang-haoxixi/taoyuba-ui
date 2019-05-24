<template>
  <div>
    <ve-pie :data="chartData" :legend-visible="false" :extend="chartExtend" height="300px" :loading="loading"></ve-pie>
  </div>
</template>

<script>
import _ from 'lodash'
import 'v-charts/lib/style.css'
import { getAllDistrict } from '@/api/crms/count'
export default {
  data () {
    this.chartExtend = {
      color: ['#A9F0DF', '#D56368', '#F1C8C8', '#FFB880', '#F0F0A9', '#8D99B3', '#A9CCF0'],
      tooltip: {
        trigger: 'item',
        formatter: '{b}：{c}%',
      },
      label: {
        show: true,
        color: '#000',
        formatter: '{b}：{c}%',
      },
      series: {
        center: ['50%', '50%'],
      },

    }
    return {
      loading: true,
      data: [
        { value: '0', name: '部委', label: 'ministriesCommissions' },
        { value: '0', name: '省级', label: 'provincialLevel' },
        { value: '0', name: '市级', label: 'cities' },
        { value: '0', name: '区县', label: 'county' },
        { value: '0', name: '园区', label: 'park' },
        { value: '0', name: '企业', label: 'enterprise' },
        { value: '0', name: '其他', label: 'other' }],
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
      getAllDistrict().then((res) => {
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
