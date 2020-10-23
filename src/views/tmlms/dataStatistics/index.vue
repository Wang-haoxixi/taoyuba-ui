<template>
  <div id="statisrics">
    <el-row>
      <el-col :span="24">
        <h1 class="chart-title">{{orgTitle}}渔业船员大数据统计墙</h1>
        <div class="select-wrap">
          <el-select v-model="orgId" @change="changeOrg">
            <el-option v-for="item in orgList" :key="item.orgId" :label="item.name" :value="item.orgId">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <div class="chart-bg panel">
          <h2>职务船员数量统计</h2>
          <div id="certTotal"  :style="{width: '100%', height: '200px'}"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="chart-bg panel">
          <h2>职务船员工资统计</h2>
          <div id="salaryTotal"  :style="{width: '100%', height: '200px'}"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="chart-bg panel">
          <h2>职务船员年龄分布</h2>
          <div id="ageTotal"  :style="{width: '100%', height: '200px'}"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="10" class="all-crew">
        <div class="chart-bg panel font-height">
          <el-row>
            <el-col :span="12" class="font-yellow">{{totalCrew}}</el-col>
            <el-col :span="12" class="font-yellow">{{contractCrew}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="font-text">已上船登记船员</el-col>
            <el-col :span="12" class="font-text">已签订劳务协议船员</el-col>
          </el-row>
        </div>
        <div id="mapChina" :style="{width: '100%', height: '600px'}"></div>
      </el-col>
      <el-col :span="7">
        <div class="chart-bg panel">
          <h2>劳动合同状态统计</h2>
          <div id="contractToal"  :style="{width: '100%', height: '200px'}"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="chart-bg panel">
          <h2>渔船船龄分布</h2>
          <div  id="shipAge" :style="{width: '100%', height: '200px'}"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="chart-bg panel">
          <h2>职务船员籍贯分布</h2>
          <div id="provinceTotal"  :style="{width: '100%', height: '200px'}"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
    </el-row>
    <!-- <basic-container>
      <page-header title='统计'></page-header>
      <div id="myChart" :style="{width: '600px', height: '300px'}"></div>
    </basic-container> -->
    <!-- <div id="myEchart" style="height: 800px"></div> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getCrewByOrg,getCountCrew } from '@/api/tmlms/dataStatistics'
import { getAllAreaName } from '@/api/post/address'
import { mapState } from 'vuex'
import 'echarts/map/js/china'

export default {
  data () {
    return {
      orgId:21,
      orgTitle:'衢山',
      chartData:[],
      certTitle:[],
      certTitleName:[],
      certTitleNum:[],
      province:[],
      getProvince:[],
      localProvince:[],
      salary:[],
      salaryName:['10K以下','10~12','12~15','15~20','20以上'],
      salaryValue:[],
      shipName:['0~5年','6~10年','11~15年','16~20年','20年以上'],
      shipValue:[],
      age:[],
      contract:[],
      contractStatus:[],
      contractNum:[],
      mapProvice:[],
      provinceTotal:'',
      ageTotal:'',
      salaryTotal:'',
      contractToal:'',
      mapChina:'',
      shipAge:'',
      statusDict: [
        {
          lable: '',
          value: '全部',
        },
        {
          lable: 0,
          value: '未审核',
        },
        {
          lable: 1,
          value: '合同成立',
        },
        {
          lable: 2,
          value: '未通过审核',
        },
        {
          lable: 3,
          value: '合同纠纷',
        },
        {
          lable: 4,
          value: '合同解除',
        },
        {
          lable: 5,
          value: '合同过期',
        },
        {
          lable: 6,
          value: '未签纸质合同',
        },
      ],
      totalCrew:0,
      contractCrew:0,
    }
  },
  computed:{
    ...mapGetters(['dictGroup']),
    ...mapState({
      orgList: state => state.user.orgs,
    }),
  },
  mounted (){
    this.drawLine()
  },
  created (){
    this.changeOrg(21)
  },
  methods: {
    changeOrg (item){
      this.orgList.forEach(v=>{
        if(v.orgId == item){
          this.orgTitle = v.name
        }
      })
      // console.log(this.orgTitle)
      this.getPosition()
      this.getTotalNum()
      this.totalCrew = 0
      this.contractCrew = 0
    },
    getTotalNum (){
      getCountCrew(this.orgId).then(data=>{
        let dataNum
        dataNum = data.data.data
        Object.keys(dataNum).forEach(item=>{
          let num = parseInt(dataNum[item])
          this.totalCrew = this.totalCrew+num
          if(item=='1') this.contractCrew = num
        })
      })
    },
    getPosition () {
      this.age = []
      this.province = []
      //数据获取
      getCrewByOrg(this.orgId).then(res=>{

        // console.log(res.data.data)
        //数据格式统一
        //职务船员数量
        this.certTitle = res.data.data.crew.filter(item=>{
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
        this.certTotal.setOption({
          xAxis: [
            {
              data: this.certTitleName,
            },
          ],
          series: [{
            // 根据名字对应到相应的系列
            name: '职务船员',
            data:  this.certTitleNum,
          }],
        })
        //年龄
        Object.keys(res.data.data.age).forEach(key => {
          let age = {}
          switch(key){
            case '0':
              age.value = res.data.data.age['0']
              age.name = '30及以下'
              break
            case '1':
              age.value = res.data.data.age['1']
              age.name = '31~40'
              break
            case '2':
              age.value = res.data.data.age['2']
              age.name = '41~50'
              break
            case '3':
              age.value = res.data.data.age['3']
              age.name = '51~60'
              break
            case '4':
              age.value = res.data.data.age['4']
              age.name = '60及以上'
              break
            default:break
          }
          this.age.push(age)
        })
         //年龄统计
          this.ageTotal.setOption({
            legend: {
                data: this.age.name,
            },
              series: [{
                // 根据名字对应到相应的系列
                name: '年龄分布',
                data: this.age,
              }],
          })
        //薪资
        this.salaryValue = res.data.data.salary
        //船龄
        this.shipValue = res.data.data.ship
         //工资
        // console.log(this.salary.name)
        this.salaryTotal.setOption({
          xAxis: {
              data:this.salaryName,
          },
          series: [{
              data: this.salaryValue,
          }],
        })
      //   Object.keys(res.data.data.ship).forEach(key => {
      //     console.log(key)
      //     // let salary = {}
      //     switch(key){
      //       case 'lessThan10':
      //         this.shipName.push('0~5年')
      //         this.shipValue.push(res.data.data.ship['lessThan10'])
      //         break
      //       case '11to20':
      //         this.shipName.push('6~10年')
      //         this.shipValue.push(res.data.data.ship['11to20'])
      //         break
      //       case '21to30':
      //         this.shipName.push('11~15年')
      //         this.shipValue.push(res.data.data.ship['21to30'])
      //         break
      //       case 'moreThan40':
      //         this.shipName.push('20年以上')
      //         this.shipValue.push(res.data.data.ship['moreThan40'])
      //         break
      //       case '31to40':
      //         this.shipName.push('16~20年')
      //         this.shipValue.push(res.data.data.ship['31to40'])
      //         break
      //       default:break
      //     }
      //   }) // [a,b]
      // console.log(this.shipName)
      // console.log(this.shipValue)
        //船龄
        this.shipAge.setOption({
          xAxis: [
              {
                data: this.shipName,
              },
            ],
            series: [
            {
              data: this.shipValue,
            },
          ],
        })
        //合同
        this.contract = res.data.data.contract
        this.contractStatus = res.data.data.contract.map(item=>{
          this.statusDict.forEach(v=>{
            if(v.lable==item.status){
              item.status = v.value
            }
          })
          return item.status
        })
        let conTotal = 0
        res.data.data.contract.forEach(item=>{
          conTotal =conTotal+ parseInt(item.number)
        })
        this.contractNum = res.data.data.contract.map(item=>{
          item.number = Number((item.number/conTotal)*100).toFixed(0)
          return item.number
        })
        this.contractToal.setOption({
          yAxis: [
              {
                data: this.contractStatus,
              },
              {
                data: this.contractStatus,
              },
            ],
            series: [
            {
              data: this.contractNum,
            },
          ],
        })
        //籍贯
        this.getProvince = res.data.data.province.map(item=>{
          return {
            value:item.number,
            name:item.province_id,
          }
        })
        if(this.getProvince.length){
          let getPr = this.getProvince.map(async (item)=>{
            item.name = await getAllAreaName(item.name).then(v=>{
              if(v.data.data.name){
                return v.data.data.name
              }
            })
            return item
          })
          getPr.map(res=>{
            res.then(pr=>{
              this.province.push(pr)
            }).then(()=>{
              //籍贯统计
              this.provinceTotal.setOption({
                legend: {
                    data: this.province.name,
                },
                  series: [{
                    // 根据名字对应到相应的系列
                    name: '籍贯分布',
                    data: this.province,
                  }],
              })
              //地图数据
              this.mapProvice = JSON.parse(JSON.stringify(this.province))
              let reg = /省|市/g
              let reg1 = /自治区/
              this.mapProvice = this.mapProvice.map(tt=>{
                tt.name = tt.name.replace(reg,'')
                if(reg1.test(tt.name)){
                  tt.name = tt.name.substring(0,2)
                }
                return tt
              })
              this.chinaMap(this.mapProvice)
            })
          })
          }else{
            //籍贯统计
            this.provinceTotal.setOption({
              legend: {
                  data: this.province.name,
              },
                series: [{
                  // 根据名字对应到相应的系列
                  name: '籍贯分布',
                  data: this.province,
                }],
            })
              //地图数据
              this.mapProvice = JSON.parse(JSON.stringify(this.province))
              let reg = /省|自治区|市/g
              this.mapProvice = this.mapProvice.map(tt=>{
                tt.name = tt.name.replace(reg,'')
                return tt
              })
              this.chinaMap(this.mapProvice)
          }
    })
    },
    chinaMap ( data ) {

      this.mapChina = this.$echarts.init(document.getElementById('mapChina'))
      let option = {
        tooltip : {
              trigger: 'item',
        },
        legend: {
            orient: 'horizontal',//图例的排列方向
            textStyle: {color:'#fff'},
            x:'top',//图例的位置
            y:'20',

            data:['全国数据'],
        },
        visualMap: {  
              show : true,
              textStyle: {color:'#fff'}, 
              x: 'left',  
              y: 'bottom',  
              splitList: [   
                  {start: 1000},{start: 500, end: 999},  
                  {start: 200,end:499},{start: 100, end: 199},  
                  {start: 50, end: 99},{start: 1, end: 49},  
              ],  
              color: ['#5475f5', '#9feaa5', '#85daef','#74e2ca', '#e6ac53', '#9fb5ea'],
          },
        series : [
        {
          name: '籍贯分布',
          type: 'map',
          mapType: 'china',
          roam: false,
          zoom:1.25,
          label: {
              normal: {
                  show: true,  //省份名称
                  fontSize:'10',
                  color: 'rgba(255,255,255)',
              },
              emphasis: {
                  show: false,
              },
          },
          itemStyle: {
            normal: {
              areaColor: 'rgba(43, 196, 243, 0.42)',
              borderColor: 'rgba(43, 196, 243, 1)',
              borderWidth: 1,
            },
          },
          // itemStyle:{
          //     normal:{label:{show:true}},
          //     emphasis:{label:{show:true}},
          // },
          data:data,
              },
          ],
      }
      this.mapChina.setOption(option)
    
    },
    drawLine (){
        // 基于准备好的dom，初始化echarts实例
        this.certTotal = this.$echarts.init(document.getElementById('certTotal'))
        this.provinceTotal = this.$echarts.init(document.getElementById('provinceTotal'))
        this.ageTotal = this.$echarts.init(document.getElementById('ageTotal'))
        this.salaryTotal = this.$echarts.init(document.getElementById('salaryTotal'))
        this.contractToal =  this.$echarts.init(document.getElementById('contractToal'))
        this.shipAge = this.$echarts.init(document.getElementById('shipAge'))
        // 绘制图表
        //船龄
        this.shipAge.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#dddc6b',
              },
              
            },
          },
          legend: {
            top: '0%',
            textStyle: {
              color: 'rgba(255,255,255,.5)',
              fontSize: '12',
            },
          },
          grid: {
            left: '10',
            top: '30',
            right: '10',
            bottom: '10',
            containLabel: true,
          },
          xAxis: [
            {
                boundaryGap: false,
                type: 'category',
                axisLabel: {
                  textStyle: {
                    color: 'rgba(255,255,255,.6)',
                    fontSize: 12,
                  },
                  interval:0,
                  rotate:45,
                },
                axisLine: {
                  lineStyle: {
                    color: 'rgba(255,255,255,.2)',
                  },
                },
                data: [],
            },
            {
              axisPointer: { show: false },
              axisLine: { show: false },
              position: 'bottom',
              offset: 20,
            },
          ],
          yAxis: [
            {
              type: 'value',
              axisTick: { show: false },
              axisLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.1)',
                },
              },
              axisLabel: {
                textStyle: {
                  color: 'rgba(255,255,255,.6)',
                  fontSize: 12,
                },
              },

              splitLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.1)',
                },
              },
            },
          ],
          series: [
            {
                name: '船龄',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    color: '#0184d5',
                    width: 2,
                  },
                },
                areaStyle: {
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(0,0,0,1,
                      [
                        {
                          offset: 0,
                          color: 'rgba(1, 132, 213, 0.4)',
                        },
                        {
                          offset: 0.8,
                          color: 'rgba(1, 132, 213, 0.1)',
                        },
                      ],
                      false,
                    ),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                  },
                },
                itemStyle: {
                  normal: {
                    color: '#0184d5',
                    borderColor: 'rgba(221, 220, 107, .1)',
                    borderWidth: 12,
                  },
                },
                data: [],
            },
            ],
        })
        //合同
        var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6','#1089E7']
        this.contractToal.setOption({
          // color:['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'],
            //图标位置
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
                data: [],
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
                data: [],
              },
            ],
            series: [
            {
              name: '条',
              type: 'bar',
              yAxisIndex: 0,
              data: [],
              barCategoryGap: 50,
              barWidth: 10,
              itemStyle: {
                normal: {
                  barBorderRadius: 20,
                  color: function (params) {
                    var num = myColor.length
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
            {
              name: '框',
              type: 'bar',
              yAxisIndex: 1,
              barCategoryGap: 50,
              data: [100, 100, 100, 100, 100,100],
              barWidth: 15,
              itemStyle: {
                normal: {
                  color: 'none',
                  borderColor: '#00c1de',
                  borderWidth: 3,
                  barBorderRadius: 15,
                },
              },
            },
          ],
        })
        //职务船员
        this.certTotal.setOption({
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
              data: [],
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
            data: [],
            type: 'bar',
            itemStyle: {
              barBorderRadius: 5,
            },
          }],
        })
        //工资
        this.salaryTotal.setOption({
          color: ['#ed3f35'],
          tooltip: {
            // 通过坐标轴来触发
            trigger: 'axis',
          }, 
          xAxis: {
              type: 'category',
              data: [],
              // 去除刻度
              axisTick: {
                show: false,
              },
              // 修饰刻度标签的颜色
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
              // 去除刻度
              axisTick: {
                show: false,
              },
              // 修饰刻度标签的颜色
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
          series: [{
              name: '工资统计',
              data: [],
              type: 'line',
              smooth: true,
          }],
        })
        //年龄
        this.ageTotal.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
            position: function (p) {
              //其中p为当前鼠标的位置
              return [p[0] + 10, p[1] - 10]
            },
          },
          legend: {
            top: '90%',
            itemWidth: 10,
            itemHeight: 10,
            data: [],
            textStyle: {
              color: 'rgba(255,255,255,.5)',
              fontSize: '12',
            },
          },
          series: [
            {
              name: '年龄分布',
              type: 'pie',
              center: ['50%', '42%'],
              radius: ['40%', '60%'],
              color: [
                '#85daef',
                '#74e2ca',
                '#5475f5',
                '#9feaa5',
                '#e6ac53',
                '#9fb5ea',
              ],
              label: { show: false },
              labelLine: { show: false },
              data: [],
            },
          ],
        })
        //籍贯
        this.provinceTotal.setOption({
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
              data: [],
          },
          series: [{
              name: '籍贯分布',
              type: 'pie',
              radius: ['10%', '60%'],
              center: ['50%', '42%'],
              roseType: 'area',
              // radius: [10, 60],
              // center: ['50%', '50%'],
              // roseType: 'area',
              data: [],
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
        })
    },
  },
  watch:{

  },
}
</script>
<style lang='scss' scoped>
  #statisrics{
    position: relative;
    overflow-y:auto;
    height: 100%;
    background-color: #06164A;
    .select-wrap{
      position:absolute;
      top:40px;
      right: 30px;
    }
    .chart-title{
      padding-top:30px;
      font-size:30px;
      color:#fff;
      text-align: center;
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
    .all-crew{
      color: rgba(255,255,255,.7);
      text-align: center;
      font-size: 12px;
    }
    .font-height{

    }
    .font-yellow{
      height:30px;
      font-size: 30px;
      color: #ffeb7b;
      padding-top:10px;
      font-family: electronicFont;
      font-weight: bold;
    }
    .font-text{
      height:30px;
      font-size:14px;
      // line-height: 30px;
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
</style>