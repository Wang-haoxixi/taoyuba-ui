<template>
<!-- 大数据墙 -->
  <div id="statisrics" style="min-width: 1200px;">
    <el-row>
      <el-col :span="24">
        <h1 class="chart-title">{{orgTitle}}渔业船员大数据统计墙</h1>
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
            <el-form-item style="width: 120px;" v-show="levelShow">
              <el-select v-model="villageId" @change="onChangeLevel">
                <el-option
                  v-for="item in levelList"
                  :key="item.userId"
                  :label="item.villageName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="width: 120px;">
              <el-select :disabled="positionDisabled" v-model="positionId" placeholder="职位船员" @change="onChangePositionId">
                <el-option
                  v-for="item in positionDicMap"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <div class="chart-bg panel">
          <div>
            <h2>{{title}}工资统计</h2>
          </div>
          <div id="salaryTotal"  :style="{width: '100%', height: echartHeight + 'px'}"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="chart-bg panel">
          <h2>{{contractTitle}}劳动合同状态统计</h2>
          <div id="contractToal"  :style="{width: '100%', height: echartHeight + 'px'}"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="chart-bg panel">
          <h2>职务船员数量统计</h2>
          <div id="certTotal"  :style="{width: '100%', height: echartHeight + 'px'}"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="10" class="all-crew">
        <div class="chart-bg panel font-height">
          <el-row>
            <el-col :span="12" class="font-yellow">{{totalCrew}}</el-col>
            <el-col :span="12" class="font-yellow">{{contractCrew}}</el-col>
          </el-row>
          <el-row class="el-row-text">
            <el-col :span="12" class="font-text">已上船登记船员</el-col>
            <el-col :span="12" class="font-text">已签订劳务协议船员</el-col>
          </el-row>
          <el-row>
            <el-col :span="8" class="font-yellow">{{counts.shipStandardCertCount}}</el-col>
            <el-col :span="8" class="font-yellow">0</el-col>
            <el-col :span="8" class="font-yellow">{{counts.shipCount}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="8" class="font-text">应配职务船员</el-col>
            <el-col :span="8" class="font-text">应配船员</el-col>
            <el-col :span="8" class="font-text">渔船数量</el-col>
          </el-row>
          <el-row>
            <el-col :span="8" class="font-yellow">{{counts.shipRealCertCount}}</el-col>
            <el-col :span="8" class="font-yellow">0</el-col>
            <el-col :span="8" class="font-yellow">{{counts.upShipCount}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="8" class="font-text">实配职务船员</el-col>
            <el-col :span="8" class="font-text">实配船员</el-col>
            <el-col :span="8" class="font-text">今年上船登记船员</el-col>
          </el-row>
        </div>
        <div id="mapChina" :style="{width: '100%', height: '600px'}"></div>
        <div class="panel-footer"></div>
        <div class="chart-bg panel">
          <h2>船东统计</h2>
          <div id="peopleTotal"  :style="{width: '100%', height: '290px'}"></div>
          <div class="panel-footer"></div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="chart-bg panel">
          <h2>{{title}}年龄分布</h2>
          <div id="ageTotal"  :style="{width: '100%', height: echartHeight + 'px'}"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="chart-bg panel">
          <h2>{{title}}籍贯分布</h2>
          <div id="provinceTotal"  :style="{width: '100%', height: echartHeight + 'px'}"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="chart-bg panel">
          <h2>渔船船龄分布</h2>
          <div  id="shipAge" :style="{width: '100%', height: echartHeight + 'px'}"></div>
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
/* eslint-disable */
import { mapGetters } from 'vuex'
import { getAllAreaName } from '@/api/post/address'
import { getPage as getPageArea } from '@/api/tmlms/area'
import {
  getShipCount,
  getPositionInforByOrgID,
  getCrewByOrg,
  getCountCrew,
  getVillage,
  getCrewOrgRelationVillage,
  getCountCrewVillage,
  getPositionInforVillage,
  getShipCountVillage,
} from '@/api/tmlms/dataStatistics'
// import { mapState } from 'vuex'
import 'echarts/map/js/china'
import moment from 'moment'
export default {
  data () {
    return {
      time: '',
      counts: {
        upShipCount: 0,
        shipCount: 0,
        shipRealCertCount: 0,
        shipStandardCertCount: 0,
      },
      levelShow: false,
      levelList: [],
      title: '职务船员',
      contractTitle: '',
      positionId: '',
      villageId: '',
      positionDicMap: [{label: '全部', value: ''}],
      areaListProps: {
        value: 'id',
        label: 'orgRelationName',
        children: 'children',
      },
      echartHeight: '332',
      disabled: false,
      positionDisabled: false,
      areaValue: [],
      orgList: [],
      orgId:21,
      orgTitle:'',
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
      peopleTotal: '',
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
    // ...mapState({
    //   orgList: state => state.user.orgs,
    // }),
  },
  mounted (){
    this.drawLine()
  },
  created (){
    this.positionDicMap = this.positionDicMap.concat(this.dictGroup['tyb_resume_position'])
    this.getPageArea()
    this.getTime()
  },
  methods: {
    getTime () {
      this.time = moment().format('lll')
    },
    getCountCrewVillage () {
      getCountCrewVillage({orgRelationId: this.orgId, villageId: this.villageId, positionId: this.positionId}).then(data=>{
        let dataNum
        dataNum = data.data.data
        // console.log('dataNum', dataNum)
        Object.keys(dataNum).forEach(item=>{
          let num = parseInt(dataNum[item])
          this.totalCrew = this.totalCrew+num
          if(item=='1') this.contractCrew = num
          // console.log('this.totalCrew', this.totalCrew)
        })
        this.disabled = false
      })
    },
    getCrewOrgRelationVillage () {
      getCrewOrgRelationVillage({ villageId: this.villageId }).then(res=>{
        //职务船员数量
        this.getCrewNumber(res)
        // 职务船员年龄分布
        this.getCrewAge(res)
        // 船东统计
        this.getShipOwner(res)
        // 职务船员工资统计
        this.getSalary(res)
        // 渔船船龄分布
        this.getShipAge(res)
        // 劳动合同状态统计
        this.getContract(res)
        // 职务船员籍贯分布， 地图
        this.getNativePlace(res)
      })
    },
    onChangeLevel () {
      this.totalCrew = 0
      this.contractCrew = 0
      this.positionId = ''
      if (this.villageId) {
        this.getCrewOrgRelationVillage()
        this.getCountCrewVillage()
        this.getShipCountVillage()
      } else {
        this.findName(this.orgList)
        this.getPosition()
        this.getTotalNum()
        this.totalCrew = 0
        this.contractCrew = 0
        this.getShipCount()
        if (this.positionId) {
          this.getPositionInforByOrg()
        }
      }
      this.getTime()
    },
    onChangePositionId (val) {
      let result = this.positionDicMap.filter((item) => {
        return item.value === val
      })
      if (this.villageId) {
        if (result && result[0].value !== '') {
          this.contractTitle = result[0].label
          this.title = result[0].label
          this.positionDisabled = true
          getPositionInforVillage({
            positionId: this.positionId,
            orgRelationId: this.areaValue[this.areaValue.length - 1],
            villageId: this.villageId,
          }).then((res) => {
            this.positionDisabled = false
            this.setSalary()
            this.setCrewAge()
            this.setContract()
            this.setNativePlace()
            this.getSalary(res)
            this.getCrewAge(res)
            this.getContract(res)
            this.getNativePlace(res, false)
          }).catch(() => {
            this.positionDisabled = false
          })
        } else {
          this.contractTitle = ''
          this.title = '职务船员'
          this.getPosition()
          this.drawLine()
        }
      } else {
        if (result && result[0].value !== '') {
          this.contractTitle = result[0].label
          this.title = result[0].label
          this.positionDisabled = true
          this.getPositionInforByOrg()
        } else {
          this.contractTitle = ''
          this.title = '职务船员'
          this.getPosition()
          this.drawLine()
        }
      }
      this.getTime()
    },
    getPositionInforByOrg () {
      getPositionInforByOrgID({positionId: this.positionId, orgRelationId: this.areaValue[this.areaValue.length - 1]}).then((res) => {
            this.positionDisabled = false
            this.setSalary()
            this.setCrewAge()
            this.setContract()
            this.setNativePlace()
            this.getSalary(res)
            this.getCrewAge(res)
            this.getContract(res)
            this.getNativePlace(res, false)
          }).catch(() => {
            this.positionDisabled = false
          })
    },
    getPageArea () {
      getPageArea({current: 1, size: 100}).then(({ data }) => {
        if (data.code === 0) {
          this.orgList = data.data.records
          this.areaValue = [this.orgList[0].id]
          this.changeOrg(this.areaValue)
        }
      })
    },
    findName (data = []) {
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].id === this.orgId) {
          this.orgTitle = data[i].orgRelationName
          break
        }
        let children = data[i].children
        if (children && children.length > 0) {
          this.findName(children)
        }
      }
    },
    changeOrg (item = []){
      this.orgId = item[item.length - 1]
      this.findName(this.orgList)
      this.disabled = true
      this.getPosition()
      this.getTotalNum()
      this.getShipCount()
      this.totalCrew = 0
      this.contractCrew = 0
      this.positionId = ''
      this.contractTitle = ''
      this.title = '职务船员'
      let orgInfo = this.getOrgInfo(this.orgList, this.orgId)
      this.levelShow = orgInfo && !(orgInfo.children && orgInfo.children.length > 0)
      if (this.levelShow) {
        this.getOrgList(this.orgId)
      }
      this.villageId = ''
      this.getTime()
      // console.log('content', this.getOrgInfo(this.orgList, this.orgId))
    },
    getShipCount () {
      getShipCount({orgRelationId: this.orgId}).then(({ data }) => {
        if (data.code === 0) {
          this.counts.upShipCount = data.data.upShipCount
          this.counts.shipCount = data.data.shipCount
          this.counts.shipRealCertCount = data.data.shipRealCert['0_0']
          this.counts.shipStandardCertCount = data.data.shipStandardCert['0_0']
        }
      })
    },
    getShipCountVillage () {
      getShipCountVillage({orgRelationId: this.orgId, villageId: this.villageId}).then(({ data }) => {
        if (data.code === 0) {
          this.counts.upShipCount = data.data.upShipCount
          this.counts.shipCount = data.data.shipCount
          this.counts.shipRealCertCount = data.data.shipRealCert['0_0']
          this.counts.shipStandardCertCount = data.data.shipStandardCert['0_0']
        }
      })
    },
    getOrgList (id) {
      getVillage({id, page: 100}).then(({ data }) => {
        if (data.code === 0) {
          this.levelList = [{villageName: '全部', userId: ''}]
          this.levelList = this.levelList.concat(data.data.records)
        }
      })
    },
    getOrgInfo (data, id) {
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].id === id) {
          return data[i]  
        }
        let children = data[i].children
        if (children && children.length > 0) {
          let result = this.getOrgInfo(children, id) 
          if (result) {
            return result
          }
        }
      }
    },
    // 职务船员数量统计
    getCrewNumber (res) {
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
    },
    setCrewNumber () {
      this.certTotal = this.$echarts.init(document.getElementById('certTotal'))
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
    },
    // 职务船员工资统计
    getSalary (res) {
      //薪资
      this.salaryValue = res.data.data.salary
      this.salaryTotal.setOption({
        xAxis: {
            data:this.salaryName,
        },
        series: [{
            data: this.salaryValue,
        }],
      })
    },
    setSalary () {
      this.salaryTotal = this.$echarts.init(document.getElementById('salaryTotal'))
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
    },
    // 职务船员年龄分布
    getCrewAge (res) {
      this.age = []
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
    },
    setCrewAge () {
      this.ageTotal = this.$echarts.init(document.getElementById('ageTotal'))
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
    },
    // 劳动合同状态统计
    getContract (res) {
      this.contractStatus = []
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
      this.contractNum = []
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
    },
    setContract () {
      this.contractToal =  this.$echarts.init(document.getElementById('contractToal'))
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
    },
    // 渔船船龄分布
    getShipAge (res) {
      //船龄
      this.shipValue = res.data.data.ship
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
    },
    setShipAge () {
      this.shipAge = this.$echarts.init(document.getElementById('shipAge'))
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
    },
    // 职务船员籍贯分布， 地图
    getNativePlace (res, mapStatus = true) {
      this.getProvince = []
      this.getProvince = res.data.data.province.map(item=>{
        return {
          value:item.number,
          name:item.province_id,
        }
      })
      if(this.getProvince.length){
        let getPr = []
        getPr = this.getProvince.map(async (item)=>{
          item.name = await getAllAreaName(item.name).then(v=>{
            if(v.data.data.name){
              return v.data.data.name
            }
          })
          return item
        })
        this.province = []
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
            // console.log(this.mapProvice)
            let reg = /省|市/g
            let reg1 = /自治区/
            this.mapProvice = this.mapProvice.map(tt=>{
              tt.name = tt.name.replace(reg,'')
              if(reg1.test(tt.name)){
                tt.name = tt.name.substring(0,2)
              }
              return tt
            })
            if (mapStatus) {
              this.chinaMap(this.mapProvice)
            }
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
            if (mapStatus) {
              this.chinaMap(this.mapProvice)
            }
        }
    },
    setNativePlace () {
      this.provinceTotal = this.$echarts.init(document.getElementById('provinceTotal'))
      this.provinceTotal.setOption({
        color: [
          '#FFB171',
          '#E45857',
          '#2936ED',
          '#9EFF81',
          '#29FFF7',
          '#FCFF83',
          '#FCFF83',
          '#FF74DF',
          '#8B78F6',
          '#4480F8',
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
            width:'50%',
        },
        series: [{
            name: '籍贯分布',
            type: 'pie',
            radius: ['10%', '60%'],
            center: ['50%', '42%'],
            // radius: [10, 60],
            // center: ['50%', '50%'],
            // roseType: 'area',
            data: [],
            label: {
              fontSize: 14
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
    // 船东统计
     getShipOwner (res) {
     let shipHaver = res.data.data.shipHaver
      this.peopleTotal.setOption({
       radar:{
        indicator:(function(){
          var res = []
          shipHaver.forEach(item=>{
            res.push({
              text:`${item.number}艘渔船${item.havers}人`,
              max:1000
            })
          })
          return res
        })(),
      },
        series: [{
          // 根据名字对应到相应的系列
          data: [
            {
              name:'船东统计',
              value:(
                function(){
                var res= []
               res = shipHaver.map(item=>{
                  return item.havers
                })
                return res
              }()
              )
            }
          ],
        }],
      })

    },
    setShipOwner () {
      this.peopleTotal = this.$echarts.init(document.getElementById('peopleTotal'))
      this.peopleTotal.setOption({
        tooltip: {
        trigger: 'axis'
      },
      radar:{
        indicator:[],
        center:['50%','50%'],
        radius:150,
        axisName: {
          color: '#f66',
        },
        splitLine:{
          lineStyle:{
            color:'rgba(43, 196, 243, .5)'
          }
        },
        splitArea:{
          show:false
        },
        axisLine:{
          lineStyle:{
            color:'rgba(43, 196, 243, .5)'
          }
        }
      },
      series:[
        {
          name:'船东统计',
          type:'radar',
          itemStyle:{
            color:'rgba(43, 196, 243)'
          },
           emphasis: {
        lineStyle: {
          width: 4
        }
      },
          areaStyle: {
            color:'rgba(43, 196, 243,.5)'
          },
          data:[]
        }
      ]
      })
    },
    // 已上船登记船员 已签订劳务协议船员
    getTotalNum (){
      getCountCrew(this.orgId).then(data=>{
        let dataNum
        dataNum = data.data.data
        this.totalCrew = 0
        Object.keys(dataNum).forEach(item=>{
          let num = parseInt(dataNum[item])
          this.totalCrew = this.totalCrew+num
          if(item=='1') this.contractCrew = num
        })
        this.disabled = false
      })
    },
    getPosition () {
      this.age = []
      this.province = []
      //数据获取
      getCrewByOrg(this.orgId).then(res=>{
        this.disabled = false
        //职务船员数量
        this.getCrewNumber(res)
        // 职务船员年龄分布
        this.getCrewAge(res)
        // 船东统计
        this.getShipOwner(res)
        // 职务船员工资统计
        this.getSalary(res)
        // 渔船船龄分布
        this.getShipAge(res)
        // 劳动合同状态统计
        this.getContract(res)
        // 职务船员籍贯分布， 地图
        this.getNativePlace(res)
      })
    },
    // 地图
    chinaMap ( data ) {
      this.mapChina = this.$echarts.init(document.getElementById('mapChina'))
      let option = {
        tooltip : {
          trigger: 'item',
        },
        legend: {
        inactiveBorderColor: 'rgba(204, 204, 204, 0.5)',
        inactiveBorderWidth: 10,
        data: [
          {
            name: '疫情高风险区域',
            icon: 'circle',
            textStyle: {
              fontSize: 12,
              color: '#fff',
            },
            itemStyle: {
              borderWidth: 10,
              borderColor: 'rgba(253, 101, 101, .3)',
            },
            // icon: 'path://M5313 10298 l-1081 -1872 -509 -108 c-279 -59 -753 -160 -1053 -224 -300 -63 -680 -144 -845 -179 -165 -35 -588 -125 -940 -200 -352 -74 -695 -147 -763 -162 -67 -14 -121 -30 -120 -35 3 -8 176 -201 1911 -2127 538 -596 977 -1090 977 -1098 0 -7 -101 -975 -225 -2150 -124 -1175 -223 -2138 -221 -2141 3 -2 892 391 1975 873 1344 598 1978 876 1993 873 13 -3 904 -398 1981 -878 1077 -480 1960 -870 1963 -868 2 3 -97 966 -221 2141 -124 1175 -225 2143 -225 2150 0 8 210 247 468 533 257 285 896 996 1421 1579 525 583 965 1072 979 1087 14 15 24 30 21 32 -2 2 -420 93 -929 201 -804 171 -2274 483 -3054 649 l-248 52 -1081 1872 c-595 1030 -1084 1872 -1087 1872 -3 0 -492 -842 -1087 -1872z m2166 -27 c589 -1019 1071 -1857 1071 -1862 0 -4 -482 -670 -1070 -1480 -589 -810 -1068 -1474 -1066 -1476 3 -3 3448 1113 6101 1977 132 43 241 77 243 75 2 -2 -164 -189 -370 -417 -205 -228 -852 -946 -1438 -1596 -761 -846 -1069 -1181 -1080 -1177 -15 6 -520 171 -2475 806 -539 175 -981 316 -983 314 -2 -1 650 -902 1449 -2002 2139 -2942 2454 -3377 2463 -3390 4 -8 2 -11 -6 -8 -7 3 -890 396 -1963 874 l-1950 868 -5 1834 c-6 2056 -2 8525 4 8518 3 -2 486 -838 1075 -1858z m-2161 -3338 c590 -812 1071 -1478 1068 -1480 -2 -2 -1321 424 -2932 947 -1611 524 -3035 986 -3164 1027 -129 42 -238 79 -242 82 -5 4 4124 891 4192 900 3 0 488 -664 1078 -1476z m1072 -1498 c0 -3 -761 -1053 -1692 -2333 -930 -1280 -1813 -2495 -1962 -2699 -148 -205 -271 -371 -271 -370 -2 2 439 4197 447 4255 3 22 99 55 1478 503 811 263 1590 517 1730 563 270 89 270 89 270 81z',
          },
          {
            name: '疫情中风险区域',
            icon: 'circle',
            textStyle: {
              fontSize: 12,
              color: '#fff',
            },
            itemStyle: {
              borderWidth: 10,
              borderColor: 'rgba(255, 177, 113, .3)',
            },
            // icon:'path://M5477 12793 c-5 -7 -74 -232 -124 -398 -8 -27 -51 -167 -94 -310 -44 -143 -93 -303 -109 -355 -16 -52 -74 -243 -130 -425 -56 -181 -114 -373 -130 -425 -73 -239 -222 -729 -330 -1080 -65 -212 -167 -545 -226 -740 -59 -195 -109 -356 -110 -358 -1 -2 -39 6 -85 17 -46 11 -244 57 -439 102 -195 45 -470 108 -610 140 -140 33 -313 73 -385 89 -71 16 -245 56 -385 89 -140 32 -415 95 -610 140 -195 45 -391 91 -435 101 -44 10 -219 51 -390 90 -171 39 -346 80 -390 90 -215 51 -478 110 -486 110 -5 0 -9 -36 -9 -79 l0 -79 1445 -1552 c795 -854 1445 -1556 1445 -1560 0 -4 -650 -706 -1445 -1560 l-1445 -1552 0 -79 c0 -43 4 -79 9 -79 8 0 271 59 486 110 44 10 219 51 390 90 171 39 346 80 390 90 44 10 240 56 435 101 195 45 470 108 610 140 140 33 314 73 385 89 72 16 245 56 385 89 140 32 415 95 610 140 195 45 393 91 439 102 46 11 84 19 85 17 1 -2 51 -163 110 -358 59 -195 161 -528 226 -740 108 -351 257 -841 330 -1080 16 -52 74 -243 130 -425 56 -181 114 -373 130 -425 16 -52 65 -214 110 -360 45 -146 95 -310 111 -365 17 -55 47 -154 68 -220 l37 -120 74 0 74 0 37 120 c21 66 51 165 68 220 16 55 66 219 111 365 45 146 94 308 110 360 16 52 74 244 130 425 56 182 114 373 130 425 73 239 222 729 330 1080 65 212 167 545 226 740 59 195 109 356 110 358 1 2 39 -6 85 -17 46 -11 244 -57 439 -102 195 -45 470 -108 610 -140 140 -33 314 -73 385 -89 72 -16 245 -56 385 -89 140 -32 415 -95 610 -140 195 -45 391 -91 435 -101 44 -10 220 -51 390 -90 171 -39 346 -80 390 -90 215 -51 478 -110 486 -110 5 0 9 36 9 79 l0 79 -1445 1552 c-795 854 -1445 1556 -1445 1560 0 4 650 706 1445 1560 l1445 1552 0 79 c0 43 -4 79 -9 79 -8 0 -271 -59 -486 -110 -44 -10 -219 -51 -390 -90 -170 -39 -346 -80 -390 -90 -44 -10 -240 -56 -435 -101 -195 -45 -470 -108 -610 -140 -140 -33 -313 -73 -385 -89 -71 -16 -245 -56 -385 -89 -140 -32 -415 -95 -610 -140 -195 -45 -393 -91 -439 -102 -46 -11 -84 -19 -85 -17 -1 2 -51 163 -110 358 -59 195 -161 528 -226 740 -108 351 -257 841 -330 1080 -16 52 -74 244 -130 425 -56 182 -114 373 -130 425 -16 52 -65 214 -110 360 -45 146 -95 310 -111 365 -17 55 -47 154 -68 220 l-37 120 -71 3 c-39 2 -74 -1 -76 -5z'
          },
          {
            name: '疫情低风险区域',
            textStyle: {
              fontSize: 12,
              color: '#fff',
            },
            icon: 'circle',
            itemStyle: {
              borderWidth: 10,
              borderColor: 'rgba(1, 236, 253, .3)',
            },
            // icon:'path://M4598 11198 l-915 -1593 -1840 -5 -1840 -5 918 -1597 919 -1598 -919 -1597 -918 -1598 1840 -5 1840 -5 915 -1592 c504 -876 919 -1593 922 -1593 3 0 418 717 922 1593 l915 1592 1840 5 1840 5 -918 1598 -919 1597 919 1598 918 1597 -1840 5 -1840 5 -916 1593 c-503 875 -918 1592 -921 1592 -3 0 -418 -717 -922 -1592z m1379 -806 l453 -787 -455 -3 c-250 -1 -660 -1 -910 0 l-455 3 453 787 c248 433 454 788 457 788 3 0 209 -355 457 -788z m-2769 -1611 c-16 -42 -904 -1569 -909 -1563 -4 4 -206 354 -449 777 -243 424 -447 776 -452 783 -8 9 173 12 902 12 514 0 910 -4 908 -9z m4378 -1186 c376 -654 684 -1192 684 -1195 0 -3 -308 -540 -684 -1195 l-684 -1190 -1382 0 -1381 0 -685 1190 c-390 679 -682 1196 -679 1204 3 8 286 501 627 1095 342 595 648 1127 681 1184 l59 102 1380 -2 1379 -3 685 -1190z m2056 1183 c-5 -7 -209 -359 -452 -783 -243 -423 -445 -773 -449 -777 -5 -6 -892 1520 -909 1563 -2 5 404 9 908 9 729 0 910 -3 902 -12z m-6883 -3977 c248 -430 451 -785 451 -787 0 -2 -410 -4 -911 -4 -728 0 -909 3 -901 13 5 6 209 359 452 782 243 424 445 774 447 778 3 5 6 7 8 5 2 -2 206 -356 454 -787z m6431 4 c243 -423 447 -776 452 -782 8 -10 -173 -13 -902 -13 -501 0 -910 4 -908 9 17 43 904 1569 909 1563 4 -4 206 -353 449 -777z m-2797 -1673 c-139 -248 -869 -1512 -873 -1512 -4 0 -734 1264 -873 1512 l-39 68 912 0 912 0 -39 -68z'
          },
        ],
        textStyle: { color: 'black' },
        orient: 'vertical',
        x: 'left',
        y: 'top',
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
            seriesIndex:0,
          },
           geo: {
        top: '10%', //组件距离容器的距离
        type: 'map',
        map: 'china',
        roam: false,
        enter: [104.114129, 37.550339],
        itemStyle: {
          normal: {
            areaColor: 'rgba(43, 196, 243, 0.42)',
            borderColor: 'rgba(43, 196, 243, 1)',
            borderWidth: 1,
          },
        },
        label: {
          show: true,
          color: '#FFF',
        },
      },
        series : [
          {
            name: '籍贯分布',
            type: 'map',
            geoIndex: 0,
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
          {
          name: '疫情高风险区域',
          type: 'effectScatter', //设置为散点图
          coordinateSystem: 'geo',
          data: [
            [98.582245,24.440102],
            [119.754812,49.168796],
          ], // series数据内容，将地名转换为对应的经纬度，并提取数值大小
          //symbolSize:"18",//set fixed point size;
          //set point size by value
          symbolSize: 12,
          visualMap:false,
          emphasis: {
            scale: true,
          },
          //pointSize:'10',
          //blurSize:'0',
          itemStyle: {
            color: 'rgba(253, 101, 101, 1)',
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
          },
          encode: { tooltip: [0, 1] },
        },
        {
          name: '疫情中风险区域',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: [
            [113.270216,23.135237],
            [121.630872,29.865922],
            [121.479696,31.235458],
            [126.669513,45.747934],
          ], // series数据内容
          //symbolSize:"18",
          symbolSize: 12,
          visualMap:false,
          emphasis: {
            scale: true,
          },
          //pointSize:'10',
          //blurSize:'0',
          itemStyle: {
            color: 'rgba(255, 177, 113, 1)',
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
          },
          encode: { tooltip: [0, 1] },
        },
        {
          name: '疫情低风险区域',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: [
            [106.634858,26.652434],
            [123.472721,41.683052],
            [118.801156,32.04554],
            [113.631708,34.752861],
            [114.521403,38.048292],
            [112.946939,28.232687],
            [112.556197,37.876857],
            [114.185398,22.287344],
            [101.784562,36.623236],
            [117.208087,39.091091],
            [116.731394,39.910433],
            [91.123993,29.654594],
            [126.556065,43.843414],
            [106.558234,29.569046],
            [106.26545,38.477905],
            [87.635087,43.79934],
            [113.580586,22.1538],
            [115.8226,28.642675],
            [117.02702,36.674443],
            [114.348174,30.551647],
            [103.840755,36.066746],
            [103.840755,36.066746],
            [108.37878,22.848207],
            [108.960636,34.275514],
            [120.650074,24.160554],
            [104.082823,30.657042],
            [117.233674,31.826972],
            [110.206684,20.052127],
            // [111.769695,40.822489],
            ], // series数据内容
          //symbolSize:"18",
          symbolSize: 12,
          visualMap:false,
          emphasis: {
            scale: true,
          },
          //pointSize:'10',
          //blurSize:'0',
          itemStyle: {
            color: 'rgba(1, 236, 253, 1)',
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
          },
          encode: { tooltip: [0, 1] },
        },
        ],
      }
      this.mapChina.setOption(option)
    },
    // 绘制图表
    drawLine (){
        // 职务船员数量统计
        this.setCrewNumber()
        // 职务船员工资统计
        this.setSalary()
        // 职务船员年龄分布
        this.setCrewAge()
        // 船东统计
        this.setShipOwner()
        // 劳动合同状态统计
        this.setContract()
        // 渔船船龄分布
        this.setShipAge()
        // 职务船员籍贯分布，
        this.setNativePlace()
    },
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
    .font-yellow{
      height:30px;
      font-size: 24px;
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
</style>