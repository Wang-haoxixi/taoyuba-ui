<template>
  <div id="statisrics" style="min-width: 1200px;">
    <el-row>
      <el-col :span="24">
        <h1 class="chart-title">海洋捕捞渔船管理统计墙</h1>
        <!-- <div class="select-wrapper">
          <el-form :inline="true" class="demo-form-inline">
          </el-form>
        </div> -->
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
              ></el-cascader>
            </el-form-item>
            <el-form-item style="width: 120px;">
              <el-select v-model="villageId" @change="onChangeLevel">
                <el-option
                  v-for="item in levelList"
                  :key="item.userId"
                  :label="item.villageName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="7">
        <div class="chart-bg panel">
          <div>
            <h2>进出港统计</h2>
          </div>
          <div id="salaryTotal" style="width: 100%;box-sizing: border-box" class="height-340"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="10" class="all-crew">
        <div class="chart-bg panel font-height boss-bg">
          <el-row class="el-row-text big">
            <el-col :span="6" class="font-text">渔船总数</el-col>
            <el-col :span="6" class="font-text">船员总数</el-col>
            <el-col :span="6" class="font-text">基层总数</el-col>
            <el-col :span="6" class="font-text">渔港总数</el-col>
          </el-row>
          <el-row class="big">
            <el-col :span="6" class="font-yellow">{{ data[2]['渔船总数'] }}</el-col>
            <el-col :span="6" class="font-yellow">{{ data[2]['船员总数'] }}</el-col>
            <el-col :span="6" class="font-yellow">{{ data[2]['基层总数'] }}</el-col>
            <el-col :span="6" class="font-yellow">{{ data[2]['渔港总数'] }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="font-text">本地渔船</el-col>
            <el-col :span="6" class="font-text">持证船员</el-col>
            <el-col :span="6" class="font-text">在港渔船</el-col>
            <el-col :span="6" class="font-text">额定船员</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="font-yellow">{{ data[2]['本地渔船'] }}</el-col>
            <el-col :span="6" class="font-yellow">{{ data[2]['持证船员'] }}</el-col>
            <el-col :span="6" class="font-yellow">{{ data[2]['在港渔船'] }}</el-col>
            <el-col :span="6" class="font-yellow">{{ data[2]['额定船员'] }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="font-text">外地渔船</el-col>
            <el-col :span="6" class="font-text">普通船员</el-col>
            <el-col :span="6" class="font-text">出海渔船</el-col>
            <el-col :span="6" class="font-text">实配船员</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="font-yellow">{{ data[2]['外地渔船'] }}</el-col>
            <el-col :span="6" class="font-yellow">{{ data[2]['普通船员'] }}</el-col>
            <el-col :span="6" class="font-yellow">{{ data[2]['出海渔船'] }}</el-col>
            <el-col :span="6" class="font-yellow">{{ data[2]['实配船员'] }}</el-col>
          </el-row>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="chart-bg panel">
          <div>
            <h2>渔船健康状态统计</h2>
          </div>
          <div id="shipHealthy" style="width: 100%" class="height-340"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="chart-bg panel height-500">
          <div>
            <h2>船员培训情况</h2>
          </div>
          <div style="border-bottom: 1px dashed #78cde9">
            <div id="CrewTrainingB" style="width: 100%;box-sizing: border-box" class="height-230"></div>
            <div class="panel-footer"></div>
          </div>
          <div>
            <h2>培训人员分类</h2>
          </div>
          <div class="flex-285">
            <div id="CrewTrainingZ" style="width: 100%;box-sizing: border-box;height: 285px" class="height-230"></div>
            <div class="panel-footer"></div>
          </div>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="chart-bg panel height-500">
          <el-row>
          <el-col :span="16">
            <div class="" style="border-right: 1px dashed #78cde9">
              <div>
                <h2>船员基本情况统计</h2>
              </div>
              <div>
                <div class="crew-information height-230" v-if="data[6]">
                  <div><span class="crew-information-title">合同成立：</span><el-progress :format="()=>{return data[6][0].number}" :color="'#00feff'"  :stroke-width="26" :percentage="(data[6][0].number/getMax()) * 100"></el-progress></div>
                  <div><span class="crew-information-title">未通过审核：</span><el-progress :format="()=>{return data[6][1].number}" :color="'#00feff'" :stroke-width="26" :percentage="(data[6][1].number/getMax()) * 100"></el-progress></div>
                  <div><span class="crew-information-title">合同纠纷：</span><el-progress :format="()=>{return data[6][2].number}" :color="'#00feff'" :stroke-width="26" :percentage="(data[6][2].number/getMax()) * 100"></el-progress></div>
                  <div><span class="crew-information-title">合同解除：</span><el-progress :format="()=>{return data[6][3].number}" :color="'#00feff'"  :stroke-width="26" :percentage="(data[6][3].number/getMax()) * 100"></el-progress></div>
                  <div><span class="crew-information-title">合同过期：</span><el-progress :format="()=>{return data[6][4].number}" :color="'#00feff'"  :stroke-width="26" :percentage="(data[6][4].number/getMax()) * 100"></el-progress></div>
                  <div><span class="crew-information-title">未签纸质合同：</span><el-progress :format="()=>{return data[6][5].number}" :color="'#00feff'"  :stroke-width="26" :percentage="(data[6][5].number/getMax()) * 100"></el-progress></div>
                  <div><span class="crew-information-title">已上船登记船员：</span><el-progress :format="()=>{return data[6][6]['crewNum'][1]}" :color="'#00feff'"  :stroke-width="26" :percentage="(data[6][6]['crewNum'][1]/getMax()) * 100"></el-progress></div>
                  <div><span class="crew-information-title">已签劳务协议船员：</span><el-progress :format="()=>{return all(data[6][6]['crewNum'])}" :color="'#00feff'"  :stroke-width="26" :percentage="(all(data[6][6]['crewNum'])/getMax()) * 100"></el-progress></div>
                </div>
                <div class="panel-footer"></div>
              </div>
              <div class="crew-one">
                <div class="crew-one-children" style="border-right: 1px dashed #78cde9">
                  <div>
                    <h2>船东船只持有统计</h2>
                  </div>
                  <div id="VesselHolding" style="width: 100%;box-sizing: border-box" class="height-282"></div>
                  <div class="panel-footer"></div>
                </div>
                <div class="crew-one-children">
                  <div>
                    <h2>职务船员数量统计</h2>
                  </div>
                  <div id="crewNum" style="width: 100%;box-sizing: border-box" class="height-282"></div>
                  <div class="panel-footer"></div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
          <div class="height-500" >
            <div class="">
              <div>
                <h2>船员年龄分布统计</h2>
              </div>
              <div style="border-bottom: 1px dashed #78cde9">
                <div id="crewOld" style="width: 100%;box-sizing: border-box" class="height-230"></div>
                <div class="panel-footer"></div>
              </div>
              <div>
                <h2>船员籍贯分布统计</h2>
              </div>
              <div>
                <div id="crewNative" style="width: 100%;" class="height-282"></div>
                <div class="panel-footer"></div>
              </div>
            </div>
          </div>
        </el-col>
        </el-row>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="chart-bg panel height-500" >
          <div class="chart-bg panel height-500">
            <div>
              <h2>渔船事故违规统计</h2>
            </div>
            <div class="flex-610">
              <div id="shipAccident" style="width: 100%;box-sizing: border-box" class="height-454"></div>
              <div class="panel-footer"></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="chart-bg panel height-500" >
          <div class="chart-bg panel height-500">
            <div class="after">
              <h2>渔船检验情况统计分析</h2>
            </div>
            <div class="crew-one">
              <div class="width-33" style="border-left: none;border-top:none">
                <h3>渔船作业分类统计</h3>
                <div id="shipWork" style="width: 100%;box-sizing: border-box" class="height-230"></div>
                <div class="panel-footer"></div>
              </div>
              <div class="width-33">
                <h3>渔船检验项目数据统计</h3>
                <div id="shipCheck" style="width: 100%;box-sizing: border-box" class="height-230"></div>
                <div class="panel-footer"></div>
              </div>
              <div class="width-33" style="border-right: none;border-top:none">
                <h3>隐患排查情况分析</h3>
                <div id="troubleInvestigation" style="width: 100%;box-sizing: border-box" class="height-230"></div>
                <div class="panel-footer"></div>
              </div>
              <div class="width-33" style="border-left:none;border-bottom:none">
                <div style="width:50%;display:inline-block">
                  <h3>船龄占比</h3>
                  <div id="shipHign" style="width: 100%;box-sizing: border-box" class="height-230"></div>
                  <div class="panel-footer"></div>
                </div>
                <div style="width:50%;display:inline-block">
                  <h3>功率船长占比</h3>
                  <div id="shipW" style="width: 100%;box-sizing: border-box" class="height-230"></div>
                  <div class="panel-footer"></div>
                </div>
              </div>
              <div class="width-33" style="border-bottom:none">
                <h3>渔船检验合格分析</h3>
                <div id="shipPass" style="width: 100%;box-sizing: border-box" class="height-230"></div>
                <div class="panel-footer"></div>
              </div>
              <div class="width-33" style="border-right:none;border-bottom:none">
                <h3>排查情况分析</h3>
                <div id="checkInformation" style="width: 100%;box-sizing: border-box" class="height-230"></div>
                <div class="panel-footer"></div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="chart-bg panel height-500" >
          <div class="chart-bg panel height-500">
            <div>
              <h2>渔船承保情况统计</h2>
            </div>
            <div class="flex-610">
              <div id="shipUnderwriting" style="width: 100%;box-sizing: border-box" class="height-454"></div>
              <div class="panel-footer"></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="chart-bg panel height-500" >
          <div class="chart-bg panel height-500">
            <div>
              <h2 class="after">渔船交易数据统计</h2>
            </div>
            <div class="crew-one">
              <div class="width-50" style="border-left:none;">
                <h3>船数、功率、交易额三年数据对比</h3>
                <div id="thereYear" style="width: 100%;box-sizing: border-box" class="height-230"></div>
                <div class="panel-footer"></div>
              </div>
              <div class="width-50" style="border-right:none;">
                <h3>实船鉴证情况统计</h3>
                <div id="shipReal" style="width: 100%;box-sizing: border-box" class="height-230"></div>
                <div class="panel-footer"></div>
              </div>
            </div>
            <div class="crew-one">
              <div class="width-50" style="border-left:none;border-bottom:none">
                <h3>渔船交易用途</h3>
                <div id="shipSale" style="width: 100%;box-sizing: border-box" class="height-230"></div>
                <div class="panel-footer"></div>
              </div>
              <div class="width-50" style="border-right:none;border-bottom:none">
                <h3>渔船跨县流转统计</h3>
                <div id="shipRun" style="width: 100%;box-sizing: border-box" class="height-230"></div>
                <div class="panel-footer"></div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="chart-bg panel height-500" >
          <div class="chart-bg panel height-500">
            <div>
              <h2>渔港基层情况统计</h2>
            </div>
            <div class="flex-610">
              <div id="shipBase" style="width: 100%;box-sizing: border-box" class="height-454"></div>
              <div class="panel-footer"></div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getPage as getPageArea } from '@/api/tmlms/area'
import {
  crewOrgRelationNew,
  crewOrgRelationVillageNew,
  getVillage,
} from '@/api/tmlms/dataStatistics'
export default {
  data () {
    return {
      orgList: [],
      areaListProps: {
        value: 'id',
        label: 'orgRelationName',
        children: 'children',
      },
      areaValue: [],
      levelList: [],
      villageId: '',
      orgId: '',
      data: {
        2:{},
      },
    }
  },
  computed:{
  },
  mounted (){
  },
  created (){
    this.getPageArea()
  },
  methods: {
    /* eslint-disable */
    // 进出港统计
    salaryTotal () {
      this.salaryTotal = this.$echarts.init(document.getElementById('salaryTotal'))
      let option = {
        tooltip: {
          // 通过坐标轴来触发
          trigger: 'axis',
        },
        legend: {
          data: ['在港', '出港', '已上报', '免报告'],
          textStyle: {
            fontSize: 12,
            color: 'white'
          }
        },
        xAxis: {
            type: 'category',
            data: ['2021/5/1','2021/6/1','2021/7/1','2021/8/1'],
          axisLabel: {
            color: 'white',
            interval:0,
          },
          axisLine: {
            lineStyle:{color:'white'},
          },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
              color: 'white',
            },
            axisLine: {
              lineStyle:{color:'white'},
            },
            // 修改y轴分割线的颜色
            splitLine: {
              lineStyle: {
                color: 'white',
              },
            },
        },
        series: [{
            name: '在港',
            data: [12,1,212,343],
            type: 'line',
            smooth: true,
        },{
            name: '出港',
            data: [1,11,222,333],
            type: 'line',
            smooth: true,
        },{
            name: '已上报',
            data: [13,1,262,63],
            type: 'line',
            smooth: true,
        },{
            name: '免报告',
            data: [13,151,42,73],
            type: 'line',
            smooth: true,
        }],
      }
      this.salaryTotal.setOption(option)
    },
    // 渔船健康
    shipHealthy () {
      this.shipHealthy = this.$echarts.init(document.getElementById('shipHealthy'))
      let option = {
          xAxis: {
              type: 'category',
              data: ['健康','亚健康','不健康'],
              axisLabel: {
                color: 'white',
                interval:0,
              },
               axisLine:{
                lineStyle:{color:'white'}    // x轴坐标轴颜色
               },
          },
          yAxis: {
              type: 'value',
               // 修饰刻度标签的颜色
              axisLabel: {
                color: 'white',
              },
              axisLine:{
                lineStyle:{color:'white'}    // x轴坐标轴颜色
               },
          },
          series: [{
              data: [{
                value: 100,
                itemStyle: {
                  normal: {//写上normal属性，否则不起作用；
                      color:new this.$echarts.graphic.LinearGradient(
                          0, 0, 0, 1,//从上往下渐变
                          [
                              {offset: 0, color: 'rgba(30, 172, 88, 1)'},
                              {offset: 1, color: 'rgba(30, 172, 88, 0.2)'}
                          ]
                      )
                  }
                }
              },{
                value: 200,
                itemStyle: {
                  normal: {//写上normal属性，否则不起作用；
                      color:new this.$echarts.graphic.LinearGradient(
                          0, 0, 0, 1,//从上往下渐变
                          [
                              {offset: 0, color: 'rgba(249, 246, 9, 1)'},
                              {offset: 1, color: 'rgba(249, 246, 9, 0.2)'}
                          ]
                      )
                  }
                }
              },{
                value: 150,
                itemStyle: {
                  normal: {//写上normal属性，否则不起作用；
                      color:new this.$echarts.graphic.LinearGradient(
                          0, 0, 0, 1,//从上往下渐变
                          [
                              {offset: 0, color: 'rgba(251, 8, 6, 1)'},
                              {offset: 1, color: 'rgba(251, 8, 6, 0.2)'}
                          ]
                      )
                  }
                }
              }],
              type: 'bar',
              barWidth : 70,
              showBackground: true,
              backgroundStyle: {
                  color: 'rgba(180, 180, 180, 0.2)'
              }
          }]
      };
      this.shipHealthy.setOption(option)
    },
    // 船员培训 饼状
    CrewTrainingB () {
      this.CrewTrainingB = this.$echarts.init(document.getElementById('CrewTrainingB'))
      let option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                textStyle: {
                  fontSize: 12,
                  color: 'white'
                }
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 28, name: '普通船员持证率',itemStyle: { color: '#4472c7' }},
                        {value: 72, name: '职务船员持证率',itemStyle: { color: '#ed7f30' }},
                    ]
                }
            ]
      }
      this.CrewTrainingB.setOption(option)
    },
    // 船员培训 柱状图
    CrewTrainingZ () {
      this.CrewTrainingZ = this.$echarts.init(document.getElementById('CrewTrainingZ'))
      let option = {
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              top: '20%',
              bottom: '5%',
              containLabel: true
          },
          xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              // 修饰刻度标签的颜色
              axisLabel: {
                color: 'white',
              },
          },
          yAxis: {
              type: 'category',
              data: ['违规接受教育人数', '违规扣分船员人数', '船东船长应培训人数', '实际培训人数'],
                            // 修饰刻度标签的颜色
              axisLabel: {
                color: 'white',
              },
          },
          series: [
              {
                  name: '数量',
                  type: 'bar',
                  data: [4, 3, 2, 4],
                  itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = [
                              '#ffba09','#fdfb06','#2de3f9','#4bfffe','#27727B',
                            ];
                            return colorList[params.dataIndex]
                        },
                    }
                },
              },
          ]
      }
      this.CrewTrainingZ.setOption(option)
    },
    // 船东持有渔船
    VesselHolding () {
      this.VesselHolding = this.$echarts.init(document.getElementById('VesselHolding'))
      let option = {
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '2%',
                  top: '3%',
                  containLabel: true,
              },
              color: ['#2e89d0'],
              xAxis: {
                  type: 'category',
                  data: [`${this.data[8][0].number}艘渔船`, `${this.data[8][1].number}艘渔船`, `${this.data[8][2].number}艘渔船`, `${this.data[8][3].number}艘渔船`, `${this.data[8][4].number}艘渔船`],
                  axisLabel: {
                    color: 'white',
                  },
                  axisLine:{
                    lineStyle:{color:'white'}    // x轴坐标轴颜色
                  },
              },
              yAxis: {
                  type: 'value',
                  axisLabel: {
                    color: 'white',
                  },
                  axisLine:{
                    lineStyle:{color:'white'}    // x轴坐标轴颜色
                  },
              },
              series: [{
                  data: [this.data[8][0].havers, this.data[8][1].havers, this.data[8][2].havers, this.data[8][3].havers, this.data[8][4].havers],
                  type: 'bar',
                  barWidth : 20,//柱图宽度
                  itemStyle: {
                    barBorderRadius: 5
                  }
              }]
          }
      this.VesselHolding.setOption(option)
    },
    // 船员数量
    crewNum () {
      this.certTitle = this.data[9].filter(item=>{
        if(item.position_id && item.position_id !=='0') return item
      })
      this.certTitle = this.certTitle.map(item=>{
        this.$store.getters.dictGroup.tyb_resume_position.map(data=>{
          if(item.position_id==data.value){
            item.position_id=data.label
          }
        })
        // return item
        return {
          value:item.number,
          name:item.position_id,
        }
      })
      this.certTitleName =  this.certTitle.map( v=>{
        return v.name
      })
      this.certTitleNum =  this.certTitle.map( v=>{
        return v.value
      })
      this.crewNum = this.$echarts.init(document.getElementById('crewNum'))
      let option =       {
        color: ['#2f89cf'],
          tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: {
            type: 'category',
            data:  this.certTitleName,
            axisLabel: {
            color: 'rgba(255,255,255,.7)',
            interval:0,
            rotate:45,
            },
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              show: false,
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
              textStyle: {
                color: 'rgba(255,255,255,.6)',
                fontSize: '12',
              },
            },
            axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)',
              // width: 1,
              // type: "solid"
            },
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)',
            },
          },
        },
        series: [{
          name: '职务船员数量',
          barWidth: '35%',
          data: this.certTitleNum,
          type: 'bar',
          itemStyle: {
            barBorderRadius: 5,
          },
        }],
      }
      this.crewNum.setOption(option)
    },
    // 船员年龄
    crewOld () {
      this.crewOld = this.$echarts.init(document.getElementById('crewOld'))
      let option = {
            grid: {
                left: '0',
                right: '0',
                bottom: '0',
                top: '0',
                containLabel: true,
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                textStyle: {
                  fontSize: 12,
                  color: 'white'
                }
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: this.data[7][0], name: '30及以下',itemStyle: { color: '#75e1ca' }},
                        {value: this.data[7][1], name: '31-40',itemStyle: { color: '#a1eaa3' }},
                        {value: this.data[7][2], name: '41-50',itemStyle: { color: '#5573f5' }},
                        {value: this.data[7][3], name: '51-60',itemStyle: { color: '#85daef' }},
                        {value: this.data[7][4], name: '60及以上',itemStyle: { color: '#85daef' }}
                    ]
                }
            ]
        };
      this.crewOld.setOption(option)
    },
    // 船员籍贯
    crewNative () {
      let name = this.data[10].map(item=>{
        // return item
        return {
          value: item.number, name: item.provinceName
        }
      })
      this.crewNative = this.$echarts.init(document.getElementById('crewNative'))
      let option = {
              legend: {
                orient: 'vertical',
                left: 'left',
                textStyle: {
                  fontSize: 12,
                  color: 'white'
                }
              },
              series: [
                  {
                      name: '籍贯',
                      type: 'pie',
                      radius: [5, 50],
                      center: ['50%', '50%'],
                      roseType: 'area',
                      itemStyle: {
                          borderRadius: 8
                      },
                      data: name
                  }
              ]
        }
      this.crewNative.setOption(option)
    },
    // 渔船事故违规
    shipAccident () {
      this.shipAccident = this.$echarts.init(document.getElementById('shipAccident'))
      let option = {
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              top: '10%',
              bottom: '5%',
              containLabel: true
          },
          xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              // 修饰刻度标签的颜色
              axisLabel: {
                color: 'white',
              },
          },
          yAxis: {
              type: 'category',
              data: ['事故', '违规', '纠纷', '违法','失信','变更'],
                            // 修饰刻度标签的颜色
              axisLabel: {
                color: 'white',
              },
          },
          series: [
              {
                name: '数量',
                type: 'bar',
                data: [4, 3, 4, 3, 2, 4],
                itemStyle: {
                  normal: {//写上normal属性，否则不起作用；
                      color:new this.$echarts.graphic.LinearGradient(
                          1, 0, 0, 0,//从上往下渐变
                          [
                              {offset: 0, color: 'rgba(0, 9, 220, 1)'},
                              {offset: 1, color: 'rgba(119, 131, 179, 1)'}
                          ]
                      )
                  }
                },
              },
          ]
      }
      this.shipAccident.setOption(option)
    },
    // 渔船作业分类统计
    shipWork () {
      let certTitle = this.data[12].filter(item=>{
        if(item.activityType && item.activityType !=='0') return item
      })
      certTitle = certTitle.map(item=>{
        this.$store.getters.dictGroup.tyb_resume_worktype.map(data=>{
          if(item.activityType==data.value){
            item.activityType=data.label
          }
        })
        // return item
        return {
          value:item.number,
          name:item.activityType,
        }
      })
      let arr =  certTitle.map( v=>{
        return {value: v.value, name: v.name}
      })
      this.shipWork = this.$echarts.init(document.getElementById('shipWork'))
      let option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: {
              fontSize: 12,
              color: 'white'
            }
          },
          series: [
              {
                  name: '访问来源',
                  type: 'pie',
                  avoidLabelOverlap: false,
                  label: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      label: {
                          show: true,
                          fontSize: '40',
                          fontWeight: 'bold'
                      }
                  },
                  labelLine: {
                      show: false
                  },
                  data: arr
              }
          ]
      };
      this.shipWork.setOption(option)
    },
    // 渔船检验项目数据统计
    shipCheck () {
      this.shipCheck = this.$echarts.init(document.getElementById('shipCheck'))
      let option = {
            grid: {
              left: '3%',
              right: '4%',
              top: '5%',
              bottom: '8%',
              containLabel: true
          },
        tooltip: {
          // 通过坐标轴来触发
          trigger: 'axis',
        },
        legend: {
          data: ['老旧渔船', '船图不符', '船证不符', '证业不符'],
          bottom: 'bottom',
          textStyle: {
            fontSize: 12,
            color: 'white'
          }
        },
        xAxis: {
          type: 'category',
          data: ['2021/5/1','2021/6/1','2021/7/1','2021/8/1'],
            // 修饰刻度标签的颜色
          axisLabel: {
            color: 'white',
            interval:0,
          },
          // 去除x坐标轴的颜色
          axisLine: {
            lineStyle:{color:'white'},
          },
        },
        yAxis: {
            axisLine: {
              lineStyle:{color:'white'},
            },
            type: 'value',
            // 修饰刻度标签的颜色
            axisLabel: {
              color: 'white',
            },
            // 修改y轴分割线的颜色
            splitLine: {
              lineStyle: {
                color: 'white',
              },
            },
        },
        series: [{
            name: '老旧渔船',
            data: [12,1,212,343],
            type: 'line',
        },{
            name: '船图不符',
            data: [1,11,222,333],
            type: 'line',
        },{
            name: '船证不符',
            data: [13,1,262,63],
            type: 'line',
        },{
            name: '证业不符',
            data: [13,151,42,73],
            type: 'line',
        }],
      }
      this.shipCheck.setOption(option)
    },
    // 隐患排查
    troubleInvestigation () {
      this.troubleInvestigation = this.$echarts.init(document.getElementById('troubleInvestigation'))
      let option = {
          grid: {
              left: '3%',
              right: '4%',
              top: '5%',
              bottom: '8%',
              containLabel: true
          },
          xAxis: {
              type: 'category',
              data: ['重大隐患问题','覆盖广高频发问题','一般性问题'],
              axisLabel: {
                color: 'white',
                interval:0,
              },
               axisLine:{
                lineStyle:{color:'white'}    // x轴坐标轴颜色
               },
          },
          yAxis: {
              type: 'value',
               // 修饰刻度标签的颜色
              axisLabel: {
                color: 'white',
              },
              axisLine:{
                lineStyle:{color:'white'}    // x轴坐标轴颜色
               },
          },
          series: [{
              data: [200, 200, 150],
              itemStyle: {
                  normal: {//写上normal属性，否则不起作用；
                      color:new this.$echarts.graphic.LinearGradient(
                          0, 0, 0, 1,//从上往下渐变
                          [
                              {offset: 0, color: 'rgba(247, 16, 10, 1)'},
                              {offset: 1, color: 'rgba(247, 16, 10, 0.2)'}
                          ]
                      )
                  }
              },
              type: 'bar',
              barWidth : 30,
              showBackground: true,
              backgroundStyle: {
                  color: 'rgba(180, 180, 180, 0.2)'
              }
          }]
      };
      this.troubleInvestigation.setOption(option)
    },
    // 船龄占比
    shipHign () {
      this.shipHign = this.$echarts.init(document.getElementById('shipHign'))
      let option = {
          tooltip: {
              trigger: 'item'
          },
          series: [
              {
                  name: '',
                  type: 'pie',
                  radius: '50%',
                  data: [
                      {value: this.data[15.3][0], name: '5年以下',itemStyle: { color: '#4472c8' }},
                      {value: this.data[15.3][1], name: '6-10年',itemStyle: { color: '#ed7f30' }},
                      {value: this.data[15.3][2], name: '11-15年',itemStyle: { color: '#a5a5a5' }},
                      {value: this.data[15.3][3], name: '16-20年',itemStyle: { color: '#ffc100' }},
                      {value: this.data[15.3][4], name: '20年以上',itemStyle: { color: 'green' }},
                  ],
                  emphasis: {
                      itemStyle: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  },
                  label: {
                    normal: {
                      show: true,
                      position: 'inner'
                    }
                  }
              }
          ]
      }
      this.shipHign.setOption(option)
    },
    // 功率
    shipW () {
      this.shipW = this.$echarts.init(document.getElementById('shipW'))
      let option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],
                    label: {
                        position: 'inner',
                        fontSize: 14,
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: this.data[15.2].lessThan45, name: '45千瓦以下'},
                        {value: this.data[15.2].moreThan45, name: '45千瓦以上'}
                    ]
                },
                {
                    name: '',
                    type: 'pie',
                    radius: ['45%', '60%'],
                    labelLine: {
                        length: 30,
                    },
                    data: [
                        {value: this.data[15.1].lessThan12, name: '12米以上'},
                        {value: this.data[15.1].moreThan12, name: '12米以下'},
                    ],
                    label: {
                      normal: {
                        show: true,
                        position: 'inner'
                      }
                  }
                }
            ]
        };
      this.shipW.setOption(option)
    },
    // 合格率
    shipPass () {
      this.shipPass = this.$echarts.init(document.getElementById('shipPass'))
      let option = {
           grid: {
              left: '3%',
              right: '4%',
              top: '10%',
              bottom: '1%',
              containLabel: true
          },
          angleAxis: {
              axisLine:{
                lineStyle:{color:'white'}    // x轴坐标轴颜色
              },
          },
          radiusAxis: {
              type: 'category',
              data: ['初检', '二检', '其他'],
              z: 10,
              textStyle: {
                  fontSize: 16,
                  color: 'white'
              }
          },
          polar: {
          },
          series: [{
              type: 'bar',
              data: [1, 2,1 ],
              coordinateSystem: 'polar',
              name: '合格',
              stack: 'a',
              emphasis: {
                  focus: 'series'
              },
              itemStyle:{  
                  normal:{       
                      color:'#2f5498'     
                  }  
              }, 
          }, {
              type: 'bar',
              data: [2, 1,2],
              coordinateSystem: 'polar',
              name: '不合格',
              stack: 'a',
              emphasis: {
                  focus: 'series'
              },
              itemStyle:{  
                  normal:{       
                      color:'#ed7f30'     
                  }  
              },
          }],
          legend: {
              orient: 'vertical',
              left: 'left',
              show: true,
              data: ['合格', '不合格'],
              textStyle: {
                  fontSize: 16,
                  color: 'white'
              }
          }
      };
      this.shipPass.setOption(option)
    },
    // 排查情况分析
    checkInformation () {
      this.checkInformation = this.$echarts.init(document.getElementById('checkInformation'))
      let option = {
          title: {
              text:'排查总数:999',
              subtext: '排查完成率:999',
              left:'center',
              top:'35%',
              padding:[24,0],
              subtextStyle: {
                  color:'#fff',
                  fontSize: 16,
                  align:'center'
              },
              textStyle:{
                  color:'#fff',
                  fontSize: 16,
                  align:'center'
              }
          },
          tooltip: {
              trigger: 'item'
          },
          legend: {
              top: '5%',
              left: 'center',
              textStyle: {
                fontSize: 12,
                color: 'white'
              }
          },
          series: [
              {
                  name: '',
                  type: 'pie',
                  radius: ['40%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      label: {
                          show: true,
                          fontSize: '40',
                          fontWeight: 'bold'
                      }
                  },
                  labelLine: {
                      show: false
                  },
                  data: [
                      {value: 1048, name: '自查合格率',itemStyle: { color: '#4472c8' }},
                      {value: 735, name: '抽查合格率',itemStyle: { color: '#ed7f30' }},
                      {value: 580, name: '排查合格率',itemStyle: { color: '#a5a5a5' }},
                  ]
              }
          ]
      };
      this.checkInformation.setOption(option)
    },
    // 渔船承包
    shipUnderwriting () {
      this.shipUnderwriting = this.$echarts.init(document.getElementById('shipUnderwriting'))
      let option = {
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          legend: {
              data: ['渔船机损险', '渔船全损险', '渔船综合责任险', '雇主责任险'],
              textStyle: {
                fontSize: 12,
                color: 'white'
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              top: '10%',
              bottom: '0',
              containLabel: true
          },
          xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              // 修饰刻度标签的颜色
              axisLabel: {
                color: 'white',
              },
          },
          yAxis: {
              type: 'category',
              data: ['2016', '2017', '2018', '2019', '2020', '2021'],
              // 修饰刻度标签的颜色
              axisLabel: {
                color: 'white',
              },
              textStyle: {
                fontSize: 12,
                color: 'white'
              }
          },
          series: [
              {
                  name: '渔船机损险',
                  type: 'bar',
                  data: [400, 23, 333, 444, 777, 888],
                  itemStyle: {
                      normal: {
                          color: '#febe05',
                      }
                  },
              },
              {
                  name: '渔船全损险',
                  type: 'bar',
                  data: [2222, 333, 1212, 22, 33, 66],
                  itemStyle: {
                      normal: {
                          color: '#a5a5a3',
                      }
                  },
              },
              {
                  name: '渔船综合责任险',
                  type: 'bar',
                  data: [400, 45, 400, 22, 77, 400],
                  itemStyle: {
                      normal: {
                          color: '#ed7f30',
                      }
                  },
              },
              {
                  name: '雇主责任险',
                  type: 'bar',
                  data: [400, 400, 55, 44, 400, 88],
                  itemStyle: {
                      normal: {
                          color: '#4473c5',
                      }
                  },
              }
          ]
      };
      this.shipUnderwriting.setOption(option)
    },
    // 数据三年
    thereYear () {
       this.thereYear = this.$echarts.init(document.getElementById('thereYear'))
          let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['2019年', '2020年', '2021年'],
                textStyle: {
                  fontSize: 12,
                  color: 'white'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                top: '10%',
                bottom: '0',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: [0, 0.01],
                // 修饰刻度标签的颜色
                axisLabel: {
                  color: 'white',
                },
                textStyle: {
                  fontSize: 12,
                  color: 'white'
                },
                data: ['船数(百艘)','功率(万千瓦)','交易额(亿元)'],
            },
            yAxis: {
              type: 'value',
                // 修饰刻度标签的颜色
                axisLabel: {
                  color: 'white',
                },
                textStyle: {
                  fontSize: 12,
                  color: 'white'
                }
            },
            series: [
                {
                    name: '2019年',
                    type: 'bar',
                    data: [400, 23, 333],
                    itemStyle: {
                        normal: {
                            color: '#febe05',
                        }
                    },
                },
                {
                    name: '2020年',
                    type: 'bar',
                    data: [2222, 333, 1212],
                    itemStyle: {
                        normal: {
                            color: '#a5a5a3',
                        }
                    },
                },
                {
                    name: '2021年',
                    type: 'bar',
                    data: [400, 45, 400, 22, 77, 400],
                    itemStyle: {
                        normal: {
                            color: '#ed7f30',
                        }
                    },
                },
            ]
        };
       this.thereYear.setOption(option)
    },
    // 实船
    shipReal () {
      this.shipReal = this.$echarts.init(document.getElementById('shipReal'))
      let option = {
          grid: {
              left: '3%',
              right: '4%',
              top: '5%',
              bottom: '8%',
              containLabel: true
          },
          xAxis: {
              type: 'category',
              data: ['重大隐患问题','覆盖广高频发问题','一般性问题'],
              axisLabel: {
                color: 'white',
                interval:0,
              },
               axisLine:{
                lineStyle:{color:'white'}    // x轴坐标轴颜色
               },
          },
          yAxis: {
              type: 'value',
               // 修饰刻度标签的颜色
              axisLabel: {
                color: 'white',
              },
              axisLine:{
                lineStyle:{color:'white'}    // x轴坐标轴颜色
               },
          },
          series: [{
              data: [200, 200, 150],
              itemStyle: {
                  normal: {//写上normal属性，否则不起作用；
                      color:new this.$echarts.graphic.LinearGradient(
                          0, 0, 0, 1,//从上往下渐变
                          [
                              {offset: 0, color: 'rgba(94, 87, 243, 1)'},
                              {offset: 1, color: 'rgba(94, 87, 243, 0.2)'}
                          ]
                      )
                  }
              },
              type: 'bar',
              barWidth : 30,
              showBackground: true,
              backgroundStyle: {
                  color: 'rgba(180, 180, 180, 0.2)'
              }
          }]
      };
      this.shipReal.setOption(option)
    },
    // 渔船交易
    shipSale () {
      this.shipSale = this.$echarts.init(document.getElementById('shipSale'))
      let option = {
          legend: {
              data: ['交易总量', '拆解', '更新改造', '直接生产'],
              textStyle: {
                  fontSize: 12,
                  color: 'white'
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: [
              {
                  type: 'category',
                  boundaryGap: false,
                  data: ['2018','2019','2020','2021'],
                axisLabel: {
                color: 'white',
                interval:0,
              },
               axisLine:{
                lineStyle:{color:'white'}    // x轴坐标轴颜色
               },
              }
          ],
          yAxis: [
              {
              type: 'value',
              axisLabel: {
                color: 'white',
                interval:0,
              },
               axisLine:{
                lineStyle:{color:'white'}    // x轴坐标轴颜色
               },
              }
          ],
          series: [
              {
                  name: '交易总量',
                  type: 'line',
                  stack: '总量',
                  areaStyle: {},
                  emphasis: {
                      focus: 'series'
                  },
                  data: [120, 132, 101, 134],
                  itemStyle: {
                        normal: {
                            color: '#243b9b',
                        }
                    },
              },
              {
                  name: '拆解',
                  type: 'line',
                  stack: '总量',
                  areaStyle: {},
                  emphasis: {
                      focus: 'series'
                  },
                  data: [220, 182, 191, 234],
                  itemStyle: {
                        normal: {
                            color: '#9da373',
                        }
                    },
              },
              {
                  name: '更新改造',
                  type: 'line',
                  stack: '总量',
                  areaStyle: {},
                  emphasis: {
                      focus: 'series'
                  },
                  data: [150, 232, 201, 154],
                  itemStyle: {
                        normal: {
                            color: '#ba9561',
                        }
                    },
              },
              {
                  name: '直接生产',
                  type: 'line',
                  stack: '总量',
                  areaStyle: {},
                  emphasis: {
                      focus: 'series'
                  },
                  data: [320, 332, 301, 334],
                  itemStyle: {
                      normal: {
                          color: '#cc7a54',
                      }
                  },
              },
          ]
      };
      this.shipSale.setOption(option)
    },
    // 渔船流转
    shipRun () {
      this.shipRun = this.$echarts.init(document.getElementById('shipRun'))
      let option = {
          tooltip: {
              trigger: 'axis',
          },
          legend: {
              data: ['净流入', '流出', '流入'],
              textStyle: {
                fontSize: 12,
                color: 'white'
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: [
              {
                  type: 'value',
                  axisLabel: {
                    color: 'white',
                  },
                  axisLine:{
                    lineStyle:{color:'white'}    // x轴坐标轴颜色
                  },
              }
          ],
          yAxis: [
              {
                  type: 'category',
                  data: ['2019年','2020年','2021年'],
                  axisLabel: {
                    color: 'white',
                  },
                  axisLine:{
                    lineStyle:{color:'white'}    // x轴坐标轴颜色
                  },
              }
          ],
          series: [
              {
                  name: '净流入',
                  type: 'bar',
                  label: {
                      show: true,
                      position: 'left'
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: [200, 170, 240],
                  itemStyle: {
                      normal: {
                          color: '#a5a5a5',
                      }
                  },
              },
              {
                  name: '流出',
                  type: 'bar',
                  label: {
                      show: true,
                      position: 'left'
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: [320, 302, 341],
                  itemStyle: {
                        normal: {
                            color: '#e7803b',
                        }
                    },
              },
              {
                  name: '流入',
                  type: 'bar',
                  label: {
                      show: true,
                      position: 'left'
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: [-120, -132, -101],
                  itemStyle: {
                      normal: {
                          color: '#4472c8',
                      }
                  },
              }
          ]
      };
      this.shipRun.setOption(option)
    },
    // 渔船基层 
    shipBase () {
      this.shipBase = this.$echarts.init(document.getElementById('shipBase'))
      let option = {
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
              bottom: 'bottom',
              data: ['基层总数', '工作人员总数', '管理渔船总数', '管理船员总数', '码头总数', '渔船停靠数', '工作人员总数', '未知数据'],
              textStyle: {
                  fontSize: 12,
                  color: 'white'
              }
          },
          series: [
              {
                  name: '统计',
                  type: 'pie',
                  selectedMode: 'single',
                  radius: [0, '30%'],
                  label: {
                      position: 'inner',
                      fontSize: 14,
                  },
                  labelLine: {
                      show: false
                  },
                  data: [
                      {value: 1548, name: '基层'},
                      {value: 775, name: '渔港码头'},
                  ]
              },
              {
                  type: 'pie',
                  radius: ['45%', '60%'],
                  labelLine: {
                      length: 30,
                  },
                  label: {
                      // position: 'inner',
                      fontSize: 14,
                  },
                  data: [
                      {value: 1048, name: '基层总数'},
                      {value: 335, name: '工作人员总数'},
                      {value: 310, name: '管理渔船总数'},
                      {value: 251, name: '管理船员总数'},
                      {value: 234, name: '码头总数'},
                      {value: 147, name: '渔船停靠数'},
                      {value: 135, name: '工作人员总数'},
                      {value: 102, name: '未知数据'}
                  ]
              }
          ]
      };
      this.shipBase.setOption(option)
    },
    // 改变区域
    changeOrg (item) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.villageId = ''
      this.orgId = item[item.length - 1]
      this.getOrgList(this.orgId)
      crewOrgRelationNew(this.orgId).then(res=>{
        this.data = res.data.data
        loading.close()
        this.creadPic()
      })
    },
    // 基层变化
    onChangeLevel () {
      if( !this.villageId ) {
        this.changeOrg(this.areaValue)
      }else{
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        crewOrgRelationVillageNew(this.villageId).then(res=>{
          this.data = res.data.data
           loading.close()
          this.creadPic()
        })
      }
    },
    getOrgList (id) {
      getVillage({id:id, page: 100}).then(({ data }) => {
        if (data.code === 0) {
          this.levelList = [{villageName: '全部', userId: ''}]
          this.levelList = this.levelList.concat(data.data.records)
        }
      })
    },
    // 初始化获得区域列表
    getPageArea () {
      getPageArea({current: 1, size: 100}).then(({ data }) => {
        if (data.code === 0) {
          this.orgList = data.data.records
          this.areaValue = [this.orgList[0].id]
          this.changeOrg(this.areaValue)
        }
      })
    },
    // 全部
    all (arr) {
      let data = 0
      for (const key in arr) {
        data = data + arr[key]
      }
      return data
    },
    // 获取最大值
    getMax () {
      let arr = []
      for (const key in this.data[6]) {
        if(this.data[6][key].number){
          arr.push(this.data[6][key].number)
        }else{
          let crewNum = 0
          for (const item in this.data[6][key].crewNum) {
            crewNum = crewNum +  this.data[6][key].crewNum[item]
          }
          arr.push(crewNum)
        }
      }
      return Math.max(...arr)
    },
    creadPic () {
          // 进出港
    this.salaryTotal()
    // 渔船健康
    this.shipHealthy()
    // 船员培训 饼状
    this.CrewTrainingB()
    // 船员培训 柱状
    this.CrewTrainingZ()
    // 船东持有渔船
    this.VesselHolding()
    // 船员数量
    this.crewNum()
    // 船员年龄
    this.crewOld()
    // 船员籍贯
    this.crewNative()
    // 渔船事故
    this.shipAccident()
    // 渔船作业分类统计
    this.shipWork()
    // 渔船检验项目
    this.shipCheck()
    // 隐患排查
    this.troubleInvestigation()
    // 船长 
    this.shipHign()
    // 功率 和船龄
    this.shipW()
    // 渔船通过率
    this.shipPass()
    // 排查情况
    this.checkInformation()
    // 渔船承包情况统计
    this.shipUnderwriting()
    // 三年数据
    this.thereYear()
    // 实船
    this.shipReal()
    // 渔船交易用途
    this.shipSale()
    // 渔船跨县流转记录
    this.shipRun()
    // 渔船基层
    this.shipBase()
    }
     /* eslint-enable */
  },
}
</script>
<style lang='scss' scoped>
  #statisrics{
    position: relative;
    overflow-y:auto;
    height: 100%;
    background-color: #06164A;
    ::v-deep .el-scrollbar__wrap {
      height: 400px;
    }
    .crew-one {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .crew-one-children {
        width: 50%;
        padding-left:10px;
      }
    }
    .crew-information {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      border-bottom: 1px dashed #78cde9;
      .crew-information-title {
        display: inline-block;
        width: 130px;
        text-align: right;
      }
      div {
        display: inline-block;
        width: 50%;
        box-sizing: border-box;
        padding-right: 5px;
        color: white;
        padding: 5px 0;
      }
    }
    .boss-bg {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
    }
    .select-wrap{
      position:absolute;
      top:40px;
      right: 170px;
    }
    .crew-select {
      width: 140px;
      position:absolute;
      top:40px;
      right: 20px;
    }
    .chart-title{
      padding-top:30px;
      font-size:30px;
      color:#fff;
      text-align: left;
    }
    .chart-bg{
      height: 400px;
      box-sizing: border-box;
      margin-bottom: 30px;
      background-color: #101F51;
      border:solid 1px #11395A;
      border-radius: 3px;
      padding-bottom: 10px;
      position: relative;
      h2{
        color:#fff;
        font-size:20px;
        text-align: center;
        padding-top:20px;
      }
    }
    h3 {
        color:#fff;
        font-size:16px;
        text-align: center;
        padding-top:20px;
    }
    .all-crew{
      color: white;
      text-align: center;
      font-size: 12px;
    }
    .font-yellow{
      height:30px;
      font-size: 18px;
      color: #ffeb7b;
      font-family: electronicFont;
      font-weight: bold;
      text-align: left;
      padding-left: 47px;
    }
    .font-text{
      font-size:19px;
      padding-left: 47px;
      text-align: left;
    }
    .big {
      .font-yellow {
        height:30px;
        font-size: 23px;
        color: #ffeb7b;
        font-family: electronicFont;
        font-weight: bold;
        text-align: left;
        padding-left: 47px;
      }
      .font-text {
        font-size:28px;
        text-align: left;
        padding-left: 47px;
      }
    }
    ::v-deep .el-progress-bar {
      width: 90%;
    }
    ::v-deep .el-progress-bar__outer{
      border: 1px solid #00ffff;
    }
  }
  .panel::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-top: 2px solid #78cde9;
    border-left: 2px solid #78cde9;
    border-radius: 20%;
}
.panel .panel-footer::before {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #78cde9;
    border-left: 2px solid #78cde9;
    border-radius: 20%;
}
.panel::after {
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-top: 2px solid #78cde9;
    border-right: 2px solid #78cde9;
    border-radius: 20%;
}
.panel .panel-footer::after {
    position: absolute;
    bottom: 0;
    right: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #78cde9;
    border-right: 2px solid #78cde9;
    border-radius: 20%;
}
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .crew-select {
    position: absolute;
    right: 5px;
    top: 17px;
    width: 110px;
  }
  .select-wrapper {
    position: absolute;
    top:40px;
    right: 20px;
  }
  .all-crew {
    .el-row-text {
      margin-bottom: 0px;
    }
  }
  .chart-time {
    text-align: center;
    color: #fff;
    font-size: 12px;
  }
  .el-row {
    margin-bottom: 12px;
  }
  ::v-deep .el-progress-bar__outer{
    background-color: rgba(255,255,255,0);
  }
  ::v-deep .el-progress__text {
    color: white;
  }
  .height-230 {
    height: 240px;
  }
  .height-282 {
    height: 323px;
    display: flex;
    align-items: center;
  }
  .height-500 {
    height: 665px!important;
  }
  .height-340 {
    height: 340px;
  }
  .height-454 {
    height: 454px;
  }
  .flex-285 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 285px;
  }
  .flex-610 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 610px;
  }
  .width-33 {
    width: 33.3333%;
    border: 1px dashed #78cde9;
    border-top: none;
    padding: 3px;
    box-sizing: border-box;
  }
  .width-50 {
    width: 50%;
    border: 1px dashed #78cde9;
    border-top: none;
    padding: 3px;
    box-sizing: border-box;
  }
  .after::after{
    content: '';
    width:50%;
    height: 10px;
    display: block;
    margin: 0 auto;
    border-bottom: 1px dashed #78cde9;
  }
</style>