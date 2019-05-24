<template>
  <iep-fams-card title="项目核算">
    <template slot="right">
      <el-radio-group v-model="timeType" size="small">
        <el-radio-button label="week">周</el-radio-button>
        <el-radio-button label="month">月</el-radio-button>
        <el-radio-button label="year">年</el-radio-button>
      </el-radio-group>
    </template>
    <div class="processing-wrapper">
      <div class="processing-data">
        <ve-line :data="chartData" :extend="chartExtend"></ve-line>
      </div>
      <div class="processing-select">
        <div class="rank-item" v-for="(item, idx) in projectData" :key="idx">
          <h1>{{item.title | parseToMoney}}</h1>
          <div class="content">
            <div>{{item.desc}}</div>
            <div>{{item.rank}}/{{item.total}}</div>
          </div>
          <el-progress :stroke-width="8" :show-text="false" :percentage="(item.total-item.rank)/item.total*100" status="success"></el-progress>
        </div>
      </div>
    </div>
  </iep-fams-card>
</template>
<script>
import IepFamsCard from './IepFamsCard'
export default {
  components: { IepFamsCard },
  data () {
    this.chartExtend = {
      'xAxis.0.axisLabel.rotate': 45,
      series: {
        smooth: 0,
      },
    }
    return {
      timeType: 'week',
      chartData: {
        columns: ['日期', '收入', '支出', '利润'],
        rows: [
          { '日期': '1月', '收入': 1393, '支出': 1093, '利润': 0.32 },
          { '日期': '2月', '收入': 3530, '支出': 3230, '利润': 0.26 },
          { '日期': '3月', '收入': 2923, '支出': 2623, '利润': 0.76 },
          { '日期': '4月', '收入': 1723, '支出': 1423, '利润': 0.49 },
          { '日期': '5月', '收入': 3792, '支出': 3492, '利润': 0.323 },
          { '日期': '6月', '收入': 4593, '支出': 4293, '利润': 0.78 },
          { '日期': '7月', '收入': 1393, '支出': 1093, '利润': 0.32 },
          { '日期': '8月', '收入': 3530, '支出': 3230, '利润': 0.26 },
          { '日期': '9月', '收入': 2923, '支出': 2623, '利润': 0.76 },
          { '日期': '10月', '收入': 1723, '支出': 1423, '利润': 0.49 },
          { '日期': '11月', '收入': 3792, '支出': 3492, '利润': 0.323 },
          { '日期': '12月', '收入': 4593, '支出': 4293, '利润': 0.78 },
        ],
      },
      projectData: [
        {
          title: 275,
          desc: '2019年合同总数',
          rank: 4,
          total: 100,
        },
        {
          title: 27534234,
          desc: '2019年合同总数',
          rank: 56,
          total: 100,
        },
        {
          title: 275312,
          desc: '2019年合同总数',
          rank: 32,
          total: 100,
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.description {
  display: flex;
  justify-content: space-between;
}
.processing-wrapper {
  display: flex;
  .processing-select {
    flex: 1;
  }
  .processing-data {
    border-right: 1px solid #e8e8e8;
    padding-right: 15px;
    margin-right: 15px;
    flex: 2;
  }
}
.rank-item {
  margin-top: 20px;
  margin-left: 30px;
  h1 {
    margin: 20px 0 5px 0;
    font-size: 25px;
    color: #333;
  }
  .content {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
}
</style>
