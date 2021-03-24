<template>
  <div class="ship-manage-container" style="min-width: 1200px;">
    <div>
      <h1 class="chart-title">海洋捕捞渔船管理统计墙</h1>
      <h6 class="chart-time">数据更新时间：{{time}}</h6>
      <div class="select-wrapper">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item style="width: 180px;">
            <el-cascader
              @change="changeOrg"
              placeholder=""
              :options="orgList"
              v-model="areaValue"
              :props="areaListProps"
              change-on-select
              :disabled="disabled"
            ></el-cascader>
          </el-form-item>
          <!-- <el-form-item style="width: 120px;" v-show="levelShow">
            <el-select v-model="villageId" @change="onChangeLevel">
              <el-option
                v-for="item in levelList"
                :key="item.userId"
                :label="item.villageName"
                :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
      </div>
    </div>
    <!-- 一 -->
    <el-row>
      <el-col :span="8">
        <div class="chart-bg panel">
          <div>
            <h2>进出港统计</h2>
          </div>
          <div id="inAndOut" :style="{width: '100%', height: '300px'}"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-bg panel">
          <div>
            111
          </div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-bg panel">
          <div>
            <h2>基层情况统计</h2>
          </div>
          <div id="baseLevel" :style="{width: '100%', height: '300px'}"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 二 -->
    <el-row>
      <el-col :span="8">
        <div class="chart-bg panel">
          <div>
            <h2>进出港统计1</h2>
          </div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="chart-bg panel">
          <div>
            <h2>进出港统计1</h2>
          </div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 三 -->
    <el-row>
      <el-col :span="8">
        <div class="chart-bg panel">
          <div>
            <h2>进出港统计1</h2>
          </div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="chart-bg panel">
          <div>
            <h2>进出港统计1</h2>
          </div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 四 -->
    <el-row>
      <el-col :span="8">
        <div class="chart-bg panel">
          <div>
            <h2>进出港统计1</h2>
          </div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="chart-bg panel">
          <div>
            <h2>进出港统计1</h2>
          </div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import 'echarts/map/js/china'
import moment from 'moment'
import { getPage as getPageArea } from '@/api/tmlms/area'
export default {
  data () {
    return {
      time: '',
      areaListProps: {
        value: 'id',
        label: 'orgRelationName',
        children: 'children',
      },
      disabled: false,
      orgList: [],
      levelShow: false,
      villageId: '',
      areaValue: [],
      levelList: [],
      inAndOut: null,
    }
  },
  mounted () {
    this.getPageArea()
    this.getTime()
    this.setEchart()
  },
  methods: {
    getTime () {
      this.time = moment().format('lll')
    },
    getPageArea () {
      getPageArea({current: 1, size: 100}).then(({ data }) => {
        if (data.code === 0) {
          this.orgList = data.data.records
          this.areaValue = [this.orgList[0].id]
        }
      })
    },
    changeOrg () {},
    onChangeLevel () {},
    // 进出港统计
    echartInAndOut () {
      let option = {
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['邮件营销', '联盟广告'],
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisLabel: {
              color: 'rgba(255,255,255,.7)',
              interval:0,
            },
            // 去除x坐标轴的颜色
            axisLine: {
              show: false,
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              color: 'rgba(255,255,255,.7)',
            },
            // 修改y轴分割线的颜色
            splitLine: {
              lineStyle: {
                color: '#012f4a',
              },
            },
          },
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310],
            },
          ],
      }
      this.inAndOut = this.$echarts.init(document.getElementById('inAndOut'))
      this.inAndOut.setOption(option)
    },
    setEchart () {
      this.echartInAndOut()
    },
  },
}
</script>
<style lang="scss" scoped>
  .ship-manage-container {
    position: relative;
    overflow-y:auto;
    height: 100%;
    background-color: #06164A;
    .chart-title{
      padding-top:30px;
      font-size:30px;
      color:#fff;
      text-align: center;
    }
    .chart-time {
      text-align: center;
      color: #fff;
      font-size: 12px;
    }
    .select-wrapper {
      position: absolute;
      top:40px;
      right: 20px;
    }
    .chart-bg{
      background-color: #101F51;
      border:solid 1px #11395A;
      border-radius: 3px;
      margin:20px;
      padding-bottom: 10px;
      position: relative;
      h2{
        color:#fff;
        font-size:16px;
        text-align: center;
        padding-top:20px;
      }
    }
    .panel::before {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      width: 10px;
      height: 10px;
      border-top: 2px solid #02a6b5;
      border-left: 2px solid #02a6b5;
      border-radius: 20%;
    }
    .panel .panel-footer::before {
        position: absolute;
        bottom: 0;
        left: 0;
        content: "";
        width: 10px;
        height: 10px;
        border-bottom: 2px solid #02a6b5;
        border-left: 2px solid #02a6b5;
        border-radius: 20%;
    }
    .panel::after {
        position: absolute;
        top: 0;
        right: 0;
        content: "";
        width: 10px;
        height: 10px;
        border-top: 2px solid #02a6b5;
        border-right: 2px solid #02a6b5;
        border-radius: 20%;
    }
    .panel .panel-footer::after {
        position: absolute;
        bottom: 0;
        right: 0;
        content: "";
        width: 10px;
        height: 10px;
        border-bottom: 2px solid #02a6b5;
        border-right: 2px solid #02a6b5;
        border-radius: 20%;
    }
  }
</style>