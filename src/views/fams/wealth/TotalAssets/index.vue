<template>
  <div>
    <basic-container>
      <div class="main-top">
        <el-card class="left" shadow="hover">
          <h4 class="title">总资产</h4>
          <ul>
            <li v-for="(item, idx) in totalMap" :key="idx">
              <span class="num">{{item}}</span>
              <span class="sub-title">{{idx}}</span>
            </li>
          </ul>
        </el-card>
        <el-card class="right" shadow="hover">
          <h4 class="title">快捷入口</h4>
          <ul>
            <li>互助基金</li>
            <li @click="$openPage('/wel/wealth/invoice')">发票提交</li>
            <li @click="$openPage('/wel/wealth/billing_notice')">开票通知</li>
            <li @click="$openPage('/wel/wealth/withdraw')">我要提现</li>
            <li @click="handleReward()">我要打赏</li>
            <li>我要投资</li>
          </ul>
        </el-card>
      </div>
      <div class="content">
        <el-card class="box-card" shadow="hover">
          <operation-container>
            <template slot="left">
              <page-header title="财富统计-类型" :replaceText="replaceText" :data="[10 ,5]"></page-header>
            </template>
            <template slot="right">
              <div class="time">
                <div class="time-text">
                  <span>昨日</span>
                  <span>今日</span>
                  <span>本周</span>
                  <span>本月</span>
                  <span class="active">全年</span>
                </div>
                <div class="block">
                  <el-date-picker v-model="dateValue" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
            </template>
          </operation-container>
          <a-divider />
          <ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend" :colors="colors"></ve-histogram>
        </el-card>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { getTotal } from '@/api/fams/total'
export default {
  data () {
    this.colors = [
      (paramsA) => {
        var colorList1 = ['#d66368', '#d97276', '#dd8184', '#da8a8d', '#e09c9e', '#e8adaf', '#f7c6c8', '#ffdfe0']
        return colorList1[paramsA.dataIndex]
      },
      (paramsB) => {
        var colorList2 = ['#f58f44', '#f79349', '#f79a55', '#f9a261', '#f7af78', '#f9b37f', '#fdc296', '#fdd1b0']
        return colorList2[paramsB.dataIndex]
      },
    ]
    this.chartSettings = {
      metrics: ['收入', '支出'],
      dimension: ['dept'],
      lineStyle: {
        color: '#fff',
      },

    }
    this.chartExtend = {
      barWidth: '26',
      itemStyle: {
        barBorderRadius: 13,
      },

    }
    return {
      replaceText: (data) => `（收入共计${data[0]}笔，共计${data[0]}贝）`,
      totalMap: {
        '国脉贝': 6233.5,
        '发票额度': 6233.5,
        '现金': 6233.5,
        '股权': 6233.5,
        '其他': 6233.5,
      },
      dateValue: '',
      chartData: {
        columns: ['dept', '收入', '支出'],
        rows: [
          { 'dept': '内网', '收入': 38, '支出': 22 },
          { 'dept': '部门', '收入': 52, '支出': 22 },
          { 'dept': '提现', '收入': 61, '支出': 22 },
          { 'dept': '批评', '收入': 145, '支出': 22 },
          { 'dept': '学习', '收入': 48, '支出': 22 },
          { 'dept': '打赏', '收入': 38, '支出': 22 },
          { 'dept': '其他', '收入': 38, '支出': 22 },
        ],
      },
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    ...mapActions(['famsReward']),
    handleReward () {
      this.famsReward()
    },
    async loadPage () {
      const { data } = await getTotal()
      this.totalMap['国脉贝'] = data.data.govmadeBell
      this.totalMap['发票额度'] = data.data.withInvoice
      this.totalMap['现金'] = data.data.cash
      this.totalMap['股权'] = data.data.stockRight
      this.totalMap['其他'] = data.data.other
    },
  },
}
</script>
<style lang="scss" scoped>
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.main-top,
ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main-top {
  .title {
    margin: 0;
    font-size: 20px;
  }
  .left {
    flex: 1;
    margin-right: 20px;
    li {
      padding: 12px 40px;
      border-right: 1px solid #ebeef5;
      &:last-child {
        border: 0;
      }
    }
  }
  .right {
    flex: 0 0 300px;
    ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: center;
      li {
        cursor: pointer;
        padding: 10px 15px;
        cursor: pointer;
        &:hover {
          color: #cb3737;
        }
      }
    }
  }
  ul {
    span {
      display: block;
      text-align: center;
    }
    .num {
      font-size: 24px;
    }
    .sub-title {
      color: #999;
    }
  }
}
.content {
  margin-top: 20px;
}
</style>

<style lang="scss" scoped>
.time {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .time-text {
    span {
      padding: 0 10px;
      cursor: pointer;
      &:hover {
        color: #cb3737;
      }
    }
    span.active {
      color: #cb3737;
    }
  }
  .block {
    width: 40%;
  }
}
</style>
