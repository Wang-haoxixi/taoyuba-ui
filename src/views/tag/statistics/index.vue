<template>
  <div class="statistics-wrapper">
    <!-- 头部统计数据 -->
    <basic-box>
      <div class="count-wrapper">
        <avue-data-box :option="option"></avue-data-box>
      </div>
    </basic-box>
    <el-row :gutter="20">
      <!-- 标签分布 -->
      <el-col :span="12">
        <basic-box>
          <pie-chart></pie-chart>
        </basic-box>
      </el-col>
      <!-- 每日新增 -->
      <el-col :span="12">
        <basic-box>
          <line-chart></line-chart>
        </basic-box>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <!-- 本周新增 -->
      <el-col :span="12">
        <basic-box>
          <tag-group></tag-group>
        </basic-box>
      </el-col>
      <!-- 标签生命周期 -->
      <el-col :span="12">
        <basic-box>
          <photo-show></photo-show>
        </basic-box>
      </el-col>
    </el-row>
    <!-- 常用标签瀑布图 -->
    <basic-box>
      <waterfall-chart></waterfall-chart>
    </basic-box>
  </div>
</template>
<script>
import { getTagStatistics } from '@/api/tms/statistics'
import BasicBox from './basic-box'
import PieChart from './pie-chart'
import LineChart from './line-chart'
import TagGroup from './tag-group'
import PhotoShow from './photo-show'
import WaterfallChart from './waterfall-chart'
export default {
  components: { BasicBox, PieChart, LineChart, TagGroup, PhotoShow, WaterfallChart },
  data () {
    return {
      form: {},
      option: {
        data: [
          {
            title: '标签总量',
            count: 0,
            icon: 'iconfont icon-mulu4',
            color: 'rgb(49, 180, 141)',
          },
          {
            title: '应用系统',
            count: 0,
            icon: 'iconfont icon-zhanlve',
            color: 'rgb(56, 161, 242)',
          },
          {
            title: '本周新增',
            count: 0,
            icon: 'iconfont icon-bumen',
            color: 'rgb(117, 56, 199)',
          },
        ],
      },
    }
  },
  created () {
    this.loadCount()
  },
  methods: {
    loadCount () {
      getTagStatistics().then(res => {
        const count = res.data
        const { data } = this.option
        data[0].count = count.sum
        data[1].count = count.app
        data[2].count = count.newweek
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.statistics-wrapper {
  padding: 0 20px 20px;
  /deep/ a:hover {
    text-decoration: none;
  }
}
.chart-wrapper {
  display: flex;
  justify-content: space-between;
}
.count-wrapper {
  background-color: #fff;
  /deep/ .data-box .item-icon {
    line-height: 100px;
  }
}
  .el-col{
    height: 100%;
  }
</style>
