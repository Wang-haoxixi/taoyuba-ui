<template>
  <div>
    <div class="top">
      <span>拜访数量</span>
      <div class="inline">
        <el-radio-group v-model="type" size="mini" @change="changeType">
          <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <ve-line :data="chartData" :settings="chartSetting" :extend="chartExtend" height="300px" :loading="loading"></ve-line>
  </div>
</template>

<script>
import 'v-charts/lib/style.css'
import { getAllCoreclient, getAllImportantclient, getAllGeneralclient, getAllPotentialclient, getAllOtherclient } from '@/api/crms/count'
export default {
  data () {
    this.chartSetting = {
      labelMap: {
        'visitTheNumber': '核心客户',
        'increasedOpportunity': '重要客户',
        'contractQuantity': '一般客户',
        'contactQuantity': '潜在客户',
        'clientQuantity': '其他客户',
      },
    }
    this.chartExtend = {
      color: ['#D97075', '#F0F0A9', '#A9CCF0', '#8A94AF', '#FBB781'],
      legend: {
        show: 'true',
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
        type: 'line',
        smooth: false,
        lineStyle: {
        },

      },
    }
    return {
      loading: false,
      type: '1',
      interval: 1,
      tabList: [{ label: '按周', value: '1' }, { label: '按月', value: '2' }, { label: '季度', value: '3' }, { label: '年度', value: '4' }],
      chartData: {
        columns: ['timeInterval', 'visitTheNumber', 'increasedOpportunity', 'contractQuantity', 'contactQuantity', 'clientQuantity'],
        rows: [],
      },
      year: '',
      data1: [
        { timeInterval: '周一', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '周二', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '周三', visitTheNumber: 0, increasedOpportunity: 3, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '周四', visitTheNumber: 0, increasedOpportunity: 32, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '周五', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '周六', visitTheNumber: 0, increasedOpportunity: 12, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '周日', visitTheNumber: 0, increasedOpportunity: 55, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
      ],
      data2: [
        { timeInterval: '一月', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '二月', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '三月', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '四月', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '五月', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '六月', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '七月', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '八月', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '九月', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '十月', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '十一月', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '十二月', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
      ],
      data3: [
        { timeInterval: '第一季度', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '第二季度', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '第三季度', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
        { timeInterval: '第四季度', visitTheNumber: 0, increasedOpportunity: 22, contractQuantity: 0, contactQuantity: 0, clientQuantity: 0 },
      ],
      data4: [],
    }
  },
  created () {
    this.load()
  },
  methods: {
    searchPage () {
      this.$message.success('功能开发中')
    },
    changeType () {
      this.interval = this.type
      this.load()
    },
    load () {
      //核心客户
      getAllCoreclient({ interval: this.interval }).then(res => {
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
                this.data1[i].visitTheNumber = Data[m].visitTheNumber
                break
              } else {
                this.data1[i].visitTheNumber = 0
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
                this.data2[i].visitTheNumber = Data[m].visitTheNumber
                break
              } else {
                this.data2[i].visitTheNumber = 0
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
                this.data3[i].visitTheNumber = Data[m].visitTheNumber
                break
              } else {
                this.data3[i].visitTheNumber = 0
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
      // 重要客户
      getAllImportantclient({ interval: this.interval }).then(res => {
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
                this.data1[i].increasedOpportunity = Data[m].increasedOpportunity
                break
              } else {
                this.data1[i].increasedOpportunity = 0
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
                this.data2[i].increasedOpportunity = Data[m].increasedOpportunity
                break
              } else {
                this.data2[i].increasedOpportunity = 0
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
                this.data3[i].increasedOpportunity = Data[m].increasedOpportunity
                break
              } else {
                this.data3[i].increasedOpportunity = 0
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
          this.data4 = this.data4.map(m => {
            if (!m.hasOwnProperty('increasedOpportunity')) {
              m.increasedOpportunity = 0
              return m
            }
          })
          for (let i in this.data4) {
            for (let m in arr) {
              if (this.data4[i].timeInterval == arr[m].timeInterval) {
                this.data4[i].increasedOpportunity = arr[m].increasedOpportunity
              }
            }
          }
          this.chartData.rows = this.data4
        }
      })
      // 一般客户
      getAllGeneralclient({ interval: this.interval }).then(res => {
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
                this.data1[i].contractQuantity = Data[m].contractQuantity
                break
              } else {
                this.data1[i].contractQuantity = 0
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
                this.data2[i].contractQuantity = Data[m].contractQuantity
                break
              } else {
                this.data2[i].contractQuantity = 0
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
                this.data3[i].contractQuantity = Data[m].contractQuantity
                break
              } else {
                this.data3[i].contractQuantity = 0
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
          this.data4 = this.data4.map(m => {
            if (!m.hasOwnProperty('contractQuantity')) {
              m.contractQuantity = 0
              return m
            }
          })
          for (let i in this.data4) {
            for (let m in arr) {
              if (this.data4[i].timeInterval == arr[m].timeInterval) {
                this.data4[i].contractQuantity = arr[m].contractQuantity
              }
            }
          }
          this.chartData.rows = this.data4
        }
      })
      // 潜在客户
      getAllPotentialclient({ interval: this.interval }).then(res => {
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
                this.data1[i].contactQuantity = Data[m].contactQuantity
                break
              } else {
                this.data1[i].contactQuantity = 0
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
                this.data2[i].contactQuantity = Data[m].contactQuantity
                break
              } else {
                this.data2[i].contactQuantity = 0
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
                this.data3[i].contactQuantity = Data[m].contactQuantity
                break
              } else {
                this.data3[i].contactQuantity = 0
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
          this.data4 = this.data4.map(m => {
            if (!m.hasOwnProperty('contactQuantity')) {
              m.contactQuantity = 0
              return m
            }
          })
          for (let i in this.data4) {
            for (let m in arr) {
              if (this.data4[i].timeInterval == arr[m].timeInterval) {
                this.data4[i].contactQuantity = arr[m].contactQuantity
              }
            }
          }
          this.chartData.rows = this.data4
        }
      })
      // 其他客户
      getAllOtherclient({ interval: this.interval }).then(res => {
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
          this.data4 = this.data4.map(m => {
            if (!m.hasOwnProperty('clientQuantity')) {
              m.clientQuantity = 0
              return m
            }
          })
          for (let i in this.data4) {
            for (let m in arr) {
              if (this.data4[i].timeInterval == arr[m].timeInterval) {
                this.data4[i].clientQuantity = arr[m].clientQuantity
              }
            }
          }
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
.top {
  padding: 10px 30px 20px 10px;
  display: flex;
  justify-content: space-between;
}
</style>