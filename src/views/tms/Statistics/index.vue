<template>
  <div class="statistics-wrapper">
    <basic-box>
      <div class="count-wrapper">
        <avue-data-box :option="option"></avue-data-box>
      </div>
    </basic-box>
    <el-row :gutter="20">
      <el-col :span="12">
        <basic-box>
          <pie-chart></pie-chart>
        </basic-box>
      </el-col>
      <el-col :span="12">
        <basic-box>
          <line-chart></line-chart>
        </basic-box>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <basic-box>
          <tag-group></tag-group>
        </basic-box>
      </el-col>
      <el-col :span="12">
        <basic-box>
          <photo-show></photo-show>
        </basic-box>
      </el-col>
    </el-row>
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
            icon: 'icon-list',
            color: 'rgb(49, 180, 141)',
          },
          {
            title: '应用系统',
            count: 0,
            icon: 'icon-jiaoseguanli',
            color: 'rgb(56, 161, 242)',
          },
          {
            title: '本周新增',
            count: 0,
            icon: 'icon-shujuzhanshi2',
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
  padding: 20px;
  > a:hover {
    text-decoration: none;
  }
}
.chart-wrapper {
  display: flex;
  justify-content: space-between;
}
.count-wrapper {
  background-color: #fff;
  > .data-box .item-icon {
    line-height: 100px;
  }
}
</style>
