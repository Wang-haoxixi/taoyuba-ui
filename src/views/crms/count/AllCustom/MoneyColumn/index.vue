<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">签单金额</span>
      <div class="search">
        <div class="inline margin">
          <el-radio-group v-model="type" size="mini" @change="changeType">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="inline">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </div>
      </div>
    </div>
    <div>
      <div class="money">签单金额：{{total}}</div>
      <el-row>
        <ve-line :data="chartData" :extend="chartExtend" height="300px" :loading="loading"></ve-line>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import 'v-charts/lib/style.css'
import AdvanceSearch from './AdvanceSearch'
import { getAllContractAmount } from '@/api/crms/count'
export default {
  components: { AdvanceSearch },
  data () {
    this.chartExtend = {
      legend: {
        show: 'true',
        data: ['金额'],
        bottom: 0,
      },
      xAxis: {
        min: '周一',
        type: 'category',
        boundaryGap: false,
        axisLine: {
          show: true,
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: 'value',
        position: 'left',
        axisLine: {
          show: true,
        },
        axisTick: {
          show: false,
        },

      },
      grid: {
        left: '1%',
        right: '2%',
        bottom: '40',
        top: '5%',
        containLabel: true,
      },
      series: {
        name: '金额',
        type: 'line',
        smooth: false,
        lineStyle: {
          color: '#D56368',
        },

      },
    }
    return {
      loading: false,
      type: '1',
      tabList: [{ label: '按周', value: '1' }, { label: '按月', value: '2' }, { label: '季度', value: '3' }, { label: '年度', value: '4' }],
      chartData: {
        columns: ['timeInterval', 'clientQuantity'],
        rows: [],
      },
      interval: 1,
      year: '',
      data1: [
        { timeInterval: '周一', clientQuantity: 0, contactQuantity: 22 },
        { timeInterval: '周二', clientQuantity: 0, contactQuantity: 22 },
        { timeInterval: '周三', clientQuantity: 0, contactQuantity: 3 },
        { timeInterval: '周四', clientQuantity: 0, contactQuantity: 32 },
        { timeInterval: '周五', clientQuantity: 0, contactQuantity: 22 },
        { timeInterval: '周六', clientQuantity: 0, contactQuantity: 12 },
        { timeInterval: '周日', clientQuantity: 0, contactQuantity: 55 },
      ],
      data2: [
        { timeInterval: '一月', clientQuantity: 0, contactQuantity: 22 },
        { timeInterval: '二月', clientQuantity: 0, contactQuantity: 22 },
        { timeInterval: '三月', clientQuantity: 0, contactQuantity: 22 },
        { timeInterval: '四月', clientQuantity: 0, contactQuantity: 22 },
        { timeInterval: '五月', clientQuantity: 0, contactQuantity: 22 },
        { timeInterval: '六月', clientQuantity: 0, contactQuantity: 22 },
        { timeInterval: '七月', clientQuantity: 0, contactQuantity: 22 },
        { timeInterval: '八月', clientQuantity: 0, contactQuantity: 22 },
        { timeInterval: '九月', clientQuantity: 0, contactQuantity: 22 },
        { timeInterval: '十月', clientQuantity: 0, contactQuantity: 22 },
        { timeInterval: '十一月', clientQuantity: 0, contactQuantity: 22 },
        { timeInterval: '十二月', clientQuantity: 0, contactQuantity: 22 },
      ],
      data3: [
        { timeInterval: '第一季度', clientQuantity: 0, contactQuantity: 22 },
        { timeInterval: '第二季度', clientQuantity: 0, contactQuantity: 22 },
        { timeInterval: '第三季度', clientQuantity: 0, contactQuantity: 22 },
        { timeInterval: '第四季度', clientQuantity: 0, contactQuantity: 22 },
      ],
      data4: [],
      total: 0,
    }
  },
  created () {
    this.load()
  },
  methods: {
    searchPage (val) {
      this.load(val)
    },
    changeType () {
      this.interval = this.type
      this.load()
    },
    load (params) {
      getAllContractAmount({ interval: this.interval, ...params }).then(res => {
        this.total = 0
        for (var i = 0; i < res.data.data.length; i++) {
          this.total = Number(this.total) + Number(res.data.data[i].clientQuantity)
        }
        if (this.interval == 1) {
          let arr = res.data.data.map(m => m.timeInterval.substring(0, m.timeInterval.indexOf(' ')))
          let time = arr.map(m => this.getMyDay(new Date(m)))
          let Data = res.data.data.map((m, index) => {
            m.timeInterval = time[index]

            return m
          })
          for (let i in this.data1) {
            for (let m in Data) {
              if (Data[m].timeInterval == this.data1[i].timeInterval) {
                this.data1[i].clientQuantity = Data[m].clientQuantity
                break
              } else {
                this.data1[i].clientQuantity = 0
              }
            }
          }
          this.chartData.rows = this.data1
        }
        else if (this.interval == 2) {
          let arr = res.data.data.map(m => m.timeInterval.substring(5, 7))
          let time = arr.map(m => this.getMonthDay(m))
          let Data = res.data.data.map((m, index) => {
            m.timeInterval = time[index]
            return m
          })
          for (let i in this.data2) {
            for (let m in Data) {
              if (Data[m].timeInterval == this.data2[i].timeInterval) {
                this.data2[i].clientQuantity = Data[m].clientQuantity
                break
              } else {
                this.data2[i].clientQuantity = 0
              }
            }
          }
          this.chartData.rows = this.data2
        }
        else if (this.interval == 3) {
          let arr = res.data.data.map(m => m.timeInterval.substring(3, 4))
          let time = arr.map(m => this.getQuarter(m))
          let Data = res.data.data.map((m, index) => {
            m.timeInterval = time[index]
            return m
          })
          for (let i in this.data3) {
            for (let m in Data) {
              if (Data[m].timeInterval == this.data3[i].timeInterval) {
                this.data3[i].clientQuantity = Data[m].clientQuantity
                break
              } else {
                this.data3[i].clientQuantity = 0
              }
            }
          }
          this.chartData.rows = this.data3
        }
        else if (this.interval == 4) {
          let arr = res.data.data.map(m => {
            let year = m.timeInterval.substring(0, 4)
            m.timeInterval = year
            return m
          })
          this.data4 = arr
          this.chartData.rows = this.data4
        }
      })
    },
    getMyDay (date) {
      var week
      if (date.getDay() == 0) week = '周日'
      if (date.getDay() == 1) week = '周一'
      if (date.getDay() == 2) week = '周二'
      if (date.getDay() == 3) week = '周三'
      if (date.getDay() == 4) week = '周四'
      if (date.getDay() == 5) week = '周五'
      if (date.getDay() == 6) week = '周六'
      return week
    },
    getMonthDay (data) {
      let month
      if (data == '01') month = '一月'
      if (data == '02') month = '二月'
      if (data == '03') month = '三月'
      if (data == '04') month = '四月'
      if (data == '05') month = '五月'
      if (data == '06') month = '六月'
      if (data == '07') month = '七月'
      if (data == '08') month = '八月'
      if (data == '09') month = '九月'
      if (data == '10') month = '十月'
      if (data == '11') month = '十一月'
      if (data == '12') month = '十二月'
      return month
    },
    getQuarter (data) {
      let quarter
      if (data == '1') quarter = '第一季度'
      if (data == '2') quarter = '第二季度'
      if (data == '3') quarter = '第三季度'
      if (data == '4') quarter = '第四季度'
      return quarter
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: 700;
  font-size: 18px;
  padding-right: 10px;
}
.search {
  float: right;
  .margin {
    margin-right: 10px;
  }
  .inline {
    display: inline-block;
  }
}
#moneyColumn {
  width: "auto";
  height: 300px;
}
.money {
  padding: 10px 0 10px 55px;
}
</style>
