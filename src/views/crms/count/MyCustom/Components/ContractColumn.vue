<template>
  <el-card shadow="hover">
    <el-row class="contract">
      <el-col class="head">合同概况<span class="sub">（本月已签订合同金额共￥{{totalMoney}}）</span>
        <span class="dropdown">
          <el-select v-model="value" @change="change()">
            <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </span>
      </el-col>
    </el-row>
    <div class="echarts over">
      <ve-histogram :data="chartData" :settings="chartSetting" :legend-visible="false" :extend="chartExtend" height="300px" :loading="loading"></ve-histogram>
    </div>
  </el-card>
</template>
<script>
import { getMySituation } from '@/api/crms/count'
import 'v-charts/lib/style.css'
export default {
  data () {
    this.chartSetting = {

    }
    this.chartExtend = {
      grid: {
        left: '1%',
        right: '2%',
        bottom: '0',
        top: '5%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}：{c}%',
      },
      label: {
        show: true,
        position: [-20, -20],
        color: '#000',
        formatter: function (params) {
          if (params.value) {
            return '￥ ' + params.value.toLocaleString()
          } else {
            return ''
          }
        },
      },
      barWidth: '10',
      itemStyle: {
        color: '#D56368',
        barBorderRadius: 10,
      },
      series: {
        center: ['50%', '50%'],
      },
      xAxis: {
        type: 'category',
        axisLine: {
          show: true,
          onZero: false,
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
        },
        splitArea: {
          interval: 10,
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
          onZero: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            type: 'dotted',
          },
        },
      },

    }
    return {
      loading: true,
      value: 1,
      options: [
        {
          label: '本月', value: 1,
        },
        {
          label: '上月', value: 2,
        },
        {
          label: '本季度', value: 3,
        },
        {
          label: '上季度', value: 4,
        },
        {
          label: '今年', value: 5,
        },
        {
          label: '去年', value: 6,
        },
      ],
      totalMoney: '',
      interval: '1',
      chartData: {
        columns: ['timeInterval', 'contractAmount'],
        rows: [],
      },
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      getMySituation({ interval: this.interval }).then((res) => {
        if (res.data.data) {
          this.loading = false
        }
        var sourceData = res.data.data.contractSituations
        if (sourceData.length != 0) {
          this.totalMoney = res.data.data.contractAmount.toLocaleString()
          for (var i in sourceData) {
            if (this.interval == 1 || this.interval == 2) {
              sourceData[i].timeInterval = sourceData[i].timeInterval.substr(5, 2) + '.' + sourceData[i].timeInterval.substr(7, 2)
            } else {
              console.log()
              sourceData[i].timeInterval = parseInt(sourceData[i].timeInterval.substr(5, 2)) + '月'
            }
          }
          this.chartData.rows = sourceData
        } else {
          this.totalMoney = 0
          this.chartData.rows = [{ timeInterval: '暂无', contractAmount: 0 }]
        }
      })
    },
    change () {
      this.interval = this.value
      this.load()
    },

  },
}
</script>
<style lang="scss" scoped>
.contract {
  .head {
    font-weight: 700;
    background-color: #eee;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    .sub {
      font-weight: 500;
      font-size: 14px;
      color: #666;
    }
  }
  .btn {
    text-align: right;
  }
}
.echarts {
  height: 320px;
  padding-top: 20px;
}
.over {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}
.over::-webkit-scrollbar {
  height: 10px;
}
.over::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #e5e5e5;
}
.over::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: transparent;
}
.dropdown {
  float: right;
}
.el-select {
  width: 120px !important;
}
</style>

