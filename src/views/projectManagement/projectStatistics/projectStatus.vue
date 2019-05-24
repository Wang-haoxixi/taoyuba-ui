<template>
  <div>
    <div class="title">项目状态统计
      <div class="select-group">
        <div class="form-control">
        <el-select v-model="statusType" placeholder="请选择" @change="changeStatusType">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>  
        </div>
      </div>  
    </div> 
    <div :class='className' ref='chart' />      
  </div>
</template>

<script>
import { getProjectType } from '@/api/projectManagement/projectList'
import echarts from 'echarts'
export default {
  data (){
    return {
      chart: null,
      statusOptions: [{
        value: '',
        label: '全部',
      }, {
        value: '1',
        label: '新建类',
      }, {
        value: '2',
        label: '升级改造类',
      }, {
        value: '3',
        label: '运维类',
      }, {
        value: '4',
        label: '服务类',
      }],
      statusType: '',
    }
  },
  methods: {
    init () {
      this.chart = echarts.init(this.$refs[this.id])
      this.loadMap()
    },
    changeStatusType () {
      this.loadMap()
    },
    loadMap () {
      getProjectType({projectType:this.statusType}).then(({data}) => {
        var scaleData = data.dataList
        var bar_dv = this.$refs.chart
        var myChart = echarts.init(bar_dv)
        if(bar_dv){
          var option = {
            title:{
              text:'全部\n  '+data.count,
              left:'26%',
              top:'45%',
              textStyle:{
                color:'#000000',
                fontSize:18,
                fontWeight: 'normal',
              },
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b}({d}%)',
            },
            legend: {
              orient: 'vertical',
              right: '8%',
              icon:'react',
              top:'center',
              itemGap:20,
              formatter:'     {name}',
              textStyle:{
                color:'#000000',
                fontSize:14,
              },
            },
            color:['#cc2f72', '#292756'],
            series: [
              {
                name:'访问来源',
                type:'pie',
                radius: [82, 120],
                center:['30%','50%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: true,
                    formatter:'{c}',
                    padding:-12,
                    textStyle:{
                      color:'#000000',
                    },
                  },
                },
                labelLine: {
                  normal: {
                    show: false,
                  },
                },
                data: scaleData,
              },
            ],
          }

          myChart.setOption(option)
        }else{
          console.log('error')
        }  
      }) 
    },
  },
  created (){},
  mounted (){
    this.init()
  },
  props:{
    data: {
      type: Object,
      default: () => {},
    },
    className: {
      type: String,
      default: 'charts',
    },
    id: {
      type: String,
      default: 'chart',
    },
  },
}
</script>

<style scoped>
.charts{
  width: 100%;
  height: 300px;
}
.title{font-size: 16px; padding: 10px 0; border-bottom: 1px solid #e4e4e4; margin-bottom: 20px; color: #333;}
.select-group{float: right;margin-top: -10px;}
.select-group .form-control{float: left; margin-left:5px;border-color:#e4e4e4; border-radius: 3px; padding:0 5px; height: 30px; line-height: 30px;}
</style>