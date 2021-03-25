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
    <el-row>
      <el-col :span="24">
        <div class="chart-bg panel">
          <el-row>
            <el-col :span="4" class="number-wrapper">
              <div class="font-yellow">8888</div>
              <div class="font-text">船员总数</div>
            </el-col>
            <el-col :span="4" class="number-wrapper">
              <div class="font-yellow">8888</div>
              <div class="font-text">渔船总数</div>
            </el-col>
            <el-col :span="4" class="number-wrapper">
              <div class="font-yellow">8888</div>
              <div class="font-text">基层数</div>
            </el-col>
            <el-col :span="4" class="number-wrapper">
              <div class="font-yellow">8888</div>
              <div class="font-text">村组织数</div>
            </el-col>
            <el-col :span="4" class="number-wrapper">
              <div class="font-yellow">8888</div>
              <div class="font-text">渔港总数</div>
            </el-col>
            <el-col :span="4" class="number-wrapper">
              <div class="font-yellow">8888</div>
              <div class="font-text">码头总数</div>
            </el-col>
          </el-row>
          <div class="panel-footer"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 一 -->
    <el-row>
      <el-col :span="12">
        <div class="chart-bg panel">
          <div>
            <h2>进出港统计</h2>
          </div>
          <div id="inAndOut" :style="{width: '100%', height: '330px'}"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-bg panel">
          <div>
            <h2>基层情况统计</h2>
          </div>
          <div id="baseLevel" :style="{width: '100%', height: '330px'}"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 二 -->
    <el-row>
      <el-col :span="8">
        <div class="chart-bg panel">
          <div>
            <h2>事故统计</h2>
          </div>
          <div id="accident" :style="{width: '100%', height: '280px'}"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-bg panel">
          <div>
            <h2>渔船健康档案</h2>
          </div>
          <div id="healthy" :style="{width: '100%', height: '280px'}"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-bg panel">
          <div>
            <h2>渔船检验数据统计</h2>
          </div>
          <div id="shipCheckout" :style="{width: '100%', height: '280px'}"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 三 -->
    <el-row>
      <el-col :span="8">
        <div class="chart-bg panel">
          <div>
            <h2>违规统计</h2>
          </div>
          <div id="violation" :style="{width: '100%', height: '280px'}"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="16">
        <el-row>
          <el-col :span="8">
            <div class="chart-bg panel">
              <div>
                <h2>勘验报告</h2>
              </div>
              <div id="shipTest" :style="{width: '100%', height: '280px'}"></div>
              <div class="panel-footer"></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="chart-bg panel">
              <div>
                <h2>渔船隐患排查</h2>
              </div>
              <div id="shipDanger" :style="{width: '100%', height: '280px'}"></div>
              <div class="panel-footer"></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="chart-bg panel">
              <div>
                <h2>船龄统计</h2>
              </div>
              <div id="shipAge" :style="{width: '100%', height: '280px'}"></div>
              <div class="panel-footer"></div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 四 -->
    <el-row>
      <el-col :span="8">
        <div class="chart-bg panel">
          <div>
            <h2>渔船分类统计</h2>
          </div>
          <div id="shipKind" :style="{width: '100%', height: '580px'}"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="chart-bg panel">
          <div>
            <h2>船员基本统计</h2>
          </div>
          <div id="shipInfo" :style="{width: '100%', height: '580px'}"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="6">
        <el-row>
          <el-col :span="24">
            <div class="chart-bg panel">
              <div>
                <h2>船员年龄分布统计</h2>
              </div>
              <div id="shipAgeInfo" :style="{width: '100%', height: '242px'}"></div>
              <div class="panel-footer"></div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="chart-bg panel">
              <div>
                <h2>船员籍贯分布统计</h2>
              </div>
              <div id="shipAddressInfo" :style="{width: '100%', height: '242px'}"></div>
              <div class="panel-footer"></div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 五 -->
    <el-row>
      <el-col :span="12">
        <div class="chart-bg panel">
          <div>
            <h2>渔船保险统计</h2>
          </div>
          <div id="" :style="{width: '100%', height: '280px'}"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-bg panel">
          <div>
            <h2>渔船交易数据统计</h2>
          </div>
          <div id="" :style="{width: '100%', height: '280px'}"></div>
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
          data: ['进港', '出港'],
          textStyle:{
            color:'#ffffff',
          },
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
          data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
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
            name: '进港',
            type: 'line',
            data: [120, 232, 101, 134, 90, 230, 210],
          },
          {
            name: '出港',
            type: 'line',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
        ],
      }
      this.inAndOut = this.$echarts.init(document.getElementById('inAndOut'))
      this.inAndOut.setOption(option)
    },
    // 基层情况统计
    echartBaseLevel () {
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他'],
          textStyle:{
            color:'#ffffff',
          },
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            label: {
              position: 'inner',
            },
            labelLine: {
              show: false,
            },
            data: [
              {value: 335, name: '直达', selected: true},
              {value: 679, name: '营销广告'},
              {value: 1548, name: '搜索引擎'},
            ],
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              formatter: '{b}  ',
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center',
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0,
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33,
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2,
                },
              },
            },
            data: [
              {value: 335, name: '直达'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1048, name: '百度'},
              {value: 251, name: '谷歌'},
              {value: 147, name: '必应'},
              {value: 102, name: '其他'},
            ],
          },
        ],
      }
      this.baseLevel = this.$echarts.init(document.getElementById('baseLevel'))
      this.baseLevel.setOption(option)

    },
    // 事故统计
    echartAccident () {
      let option = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          textStyle:{
            color:'#ffffff',
          },
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
          data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
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
            // name: '事故',
            type: 'line',
            data: [120, 232, 101, 134, 90, 230, 210],
          },
        ],
      }
      this.accident = this.$echarts.init(document.getElementById('accident'))
      this.accident.setOption(option)
    },
    // 渔船健康档案
    echartHealthy () {
      let option = {
        dataset: {
          source: [
            ['score', 'amount', 'product'],
            [89.3, 8212, '健康'],
            [57.1, 8254, '亚健康'],
            [74.4, 1032, '不健康'],
          ],
        },
        // grid: {containLabel: true},
        xAxis: {
          name: 'amount',
          axisLabel: {
            color: '#fff',
            interval:0,
          },
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            color: '#fff',
            interval:0,
          },
        },
        series: [
          {
            type: 'bar',
            encode: {
              // Map the "amount" column to X axis.
              x: 'amount',
              // Map the "product" column to Y axis
              y: 'product',
            },
          },
        ],
      }
      this.healthy = this.$echarts.init(document.getElementById('healthy'))
      this.healthy.setOption(option)
    },
    // 渔船检验数据统计
    echartShipCheckout () {
      let option = {
        color: [
          '#006cff',
          '#60cda0',
          '#ed8884',
          '#ff9f7f',
          '#0096ff',
          '#9fe6b8',
          '#32c5e9',
          '#1d9dff',
          '#ffeb7b',
        ],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
            left: 'center',
            top: 'bottom',
            textStyle:{
              color:'#ffffff',
            },
            icon:'rect',
            itemWidth:5,
            itemHeight:5,
            data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8'],
        },
        series: [{
            name: '渔船检验数据统计',
            type: 'pie',
            radius: ['10%', '60%'],
            center: ['50%', '42%'],
            roseType: 'area',
            // radius: [10, 60],
            // center: ['50%', '50%'],
            // roseType: 'area',
            data: [
              {value: 10, name: 'rose1'},
              {value: 5, name: 'rose2'},
              {value: 15, name: 'rose3'},
              {value: 25, name: 'rose4'},
              {value: 20, name: 'rose5'},
              {value: 35, name: 'rose6'},
              {value: 30, name: 'rose7'},
              {value: 40, name: 'rose8'},
            ],
            label: {
              fontSize: 10,
            },
            // 修饰引导线样式
            labelLine: {
              // 连接到图形的线长度
              length: 10,
              // 连接到文字的线长度
              length2: 10,
            },
        }],
      }
      this.shipCheckout = this.$echarts.init(document.getElementById('shipCheckout'))
      this.shipCheckout.setOption(option)
    },
    // 违规统计
    echartViolation () {
      let option = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          textStyle:{
            color:'#ffffff',
          },
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
          data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
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
            // name: '违规',
            type: 'line',
            data: [120, 232, 101, 134, 90, 230, 210],
          },
        ],
      }
      this.violation = this.$echarts.init(document.getElementById('violation'))
      this.violation.setOption(option)
    },
    // 勘验报告
    echartShipTest () {
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告'],
          textStyle:{
            color:'#ffffff',
          },
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
            ],
          },
        ],
      }
      this.shipTest = this.$echarts.init(document.getElementById('shipTest'))
      this.shipTest.setOption(option)
    },
    // 渔船隐患排查
    echartShipDanger () {
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告'],
          textStyle:{
            color:'#ffffff',
          },
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
            ],
          },
        ],
      }
      this.shipDanger = this.$echarts.init(document.getElementById('shipDanger'))
      this.shipDanger.setOption(option)
    },
    // 船龄统计
    echartShipAge () {
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告'],
          textStyle:{
            color:'#ffffff',
          },
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
            ],
          },
        ],
      }
      this.shipAge = this.$echarts.init(document.getElementById('shipAge'))
      this.shipAge.setOption(option)
    },
    // 渔船分类统计
    echartShipKind () {
      let myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6','#1089E7']
      let option = {
        grid: {
          top: '10%',
          left: '25%',
          bottom: '10%',
        },
        xAxis: {
          show: false,
        },
        yAxis: [
          {
            show: true,
            data: ['拖网', '刺网', '张网', '围网', '笼壶', '钓具', '耙刺', '陷阱', '敷网', '抄网', '地拉网', '杂渔网', '12米以下', '12米以上', '45千瓦以下', '45千瓦以上'],
            inverse: true,
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: '#fff',
              padding:5,
              rich: {
                lg: {
                  backgroundColor: '#339911',
                  color: '#fff',
                  borderRadius: 15,
                  // padding: 5,
                  align: 'center',
                  width: 15,
                  height: 15,
                },
              },
            },
          },
          {
            show: false,
            inverse: true,
            data: ['拖网'],
          },
        ],
        series: [
          {
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            barCategoryGap: 50,
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 20,
                color: function (params) {
                  let num = myColor.length
                  return myColor[params.dataIndex % num]
                },
              },
            },
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter: '{c}%',
              },
            },
          },
        ],
      }
      this.shipKind = this.$echarts.init(document.getElementById('shipKind'))
      this.shipKind.setOption(option)
    },
    // 船员基本统计
    echartShipInfo () {
      let option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              color: '#fff',
              interval:0,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#fff',
              interval:0,
            },
          },
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220],
          },
        ],
      }
      this.shipInfo = this.$echarts.init(document.getElementById('shipInfo'))
      this.shipInfo.setOption(option)
    },
    // 船员年龄分布统计
    echartShipAgeInfo () {
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告'],
          textStyle:{
            color:'#ffffff',
          },
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
            ],
          },
        ],
      }
      this.shipAgeInfo = this.$echarts.init(document.getElementById('shipAgeInfo'))
      this.shipAgeInfo.setOption(option)
    },
    // 船员籍贯分布统计
    echartShipAddressInfo () {
      let option = {
        color: [
          '#006cff',
          '#60cda0',
          '#ed8884',
          '#ff9f7f',
          '#0096ff',
          '#9fe6b8',
          '#32c5e9',
          '#1d9dff',
          '#ffeb7b',
        ],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
            left: 'center',
            top: 'bottom',
            textStyle:{
              color:'#ffffff',
            },
            icon:'rect',
            itemWidth:5,
            itemHeight:5,
            data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8'],
        },
        series: [{
            name: '渔船检验数据统计',
            type: 'pie',
            radius: ['10%', '60%'],
            center: ['50%', '42%'],
            roseType: 'area',
            // radius: [10, 60],
            // center: ['50%', '50%'],
            // roseType: 'area',
            data: [
              {value: 10, name: 'rose1'},
              {value: 5, name: 'rose2'},
              {value: 15, name: 'rose3'},
              {value: 25, name: 'rose4'},
              {value: 20, name: 'rose5'},
              {value: 35, name: 'rose6'},
              {value: 30, name: 'rose7'},
              {value: 40, name: 'rose8'},
            ],
            label: {
              fontSize: 10,
            },
            // 修饰引导线样式
            labelLine: {
              // 连接到图形的线长度
              length: 10,
              // 连接到文字的线长度
              length2: 10,
            },
        }],
      }
      this.shipAddressInfo = this.$echarts.init(document.getElementById('shipAddressInfo'))
      this.shipAddressInfo.setOption(option)
    },
    setEchart () {
      this.echartInAndOut()
      this.echartBaseLevel()
      this.echartAccident()
      this.echartHealthy()
      this.echartShipCheckout()
      this.echartViolation()
      this.echartShipTest()
      this.echartShipDanger()
      this.echartShipAge()
      this.echartShipKind()
      this.echartShipInfo()
      this.echartShipAgeInfo()
      this.echartShipAddressInfo()
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
    .font-yellow{
      font-size: 24px;
      color: #ffeb7b;
      font-family: electronicFont;
      font-weight: bold;
      line-height: 2;
    }
    .font-text{
      font-size:14px;
      color: #fff;
      line-height: 2;
      // line-height: 30px;
    }
    .number-wrapper {
      text-align: center;
    }
  }
</style>