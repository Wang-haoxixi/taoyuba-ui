.<template>
  <basic-container>
    <div id="baiduMap" style="width: 100%; height: 800px">
      <div id="baiduMapWrap" style="width: 100%; height: 800px"></div>
    </div>
    <el-dialog
    title="联系记录"
    :visible.sync="dialogVisible"
     width="50%">
      <div>
        <el-table
          :data="shipRelationList"
          style="width: 100%">
          <el-table-column
            prop="shipName"
            label="渔船名">
          </el-table-column>
          <el-table-column
            prop="shipownerName"
            label="联系人">
          </el-table-column>
          <el-table-column
            prop="shipownerPhone"
            label="联系电话">
          </el-table-column>
           <el-table-column
            prop="relationshipType"
            label="联系设备">
            <template slot-scope="scope">
            <span>
              {{scope.row.relationshipType === 3 ? getLabel(relationshipType, scope.row.relationshipType) : getLabel(relationshipType, scope.row.relationshipType) + '(' + scope.row.relationshipNumber + ')'}}
            </span>
          </template>
          </el-table-column>
           <el-table-column
            prop="relationshipReason"
            label="联系事由">
          </el-table-column>
           <el-table-column
            prop="relationshipTime"
            label="联系时间">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </basic-container>
</template>

<script>
import { getShipList,getPortList } from '@/api/tmlms/personShip'
import { getPage } from '@/api/tmlms/relation'
export default {
  components: {
  },
  data () {
    return {
      myChart:'',
      shipList: [],
      portList:[],
      dialogVisible:false,
      shipRelationList:{},
       relationshipType: [
    { label: '手机', value: 1 },
    { label: '座机', value: 2 },
    { label: '微信', value: 3 },
    { label: '其他', value: 4 },
  ],
    }
  },
  created () {
  },
  mounted () {
    this.getPortListInfo()
   this.getShipListInfo ()
  },
  computed: {},
  methods: {
    getLabel (data, value) {
      let label = ''
      data.forEach((item) => {
        if (item.value === value) {
          label = item.label
          return false
        }
      })
      return label
    },
    getShipListInfo (){
      getShipList().then((res) => {
      this.shipList = res.data.data.map((item) => {
        return {
          name:item.shipName,
          value:[item.longitude,item.latitude ,item.flag],
        }
      })
      // console.log(this.shipList)
      this.getData()
    })
    },
    getPortListInfo (){
      getPortList({
        size:100,
      }).then((res) => {
      this.portList = res.data.data.records.map((item) => {
        return {
          name:item.name,
          value:[item.longitude,item.latitude],
        }
      })
      // console.log(this.portList)
      })
    },
    getData () {
      // console.log(this.shipList)
      var myChart = this.$echarts.init(document.getElementById('baiduMapWrap'))
      var option
      option = {
        title: {},
        tooltip: {
          // trigger: 'item',
          formatter:'{b}',
        },
        bmap: {
          center: [122.2741, 30.2608],
          zoom: 10,
          roam: true,
        },
        series: [
          {
            name: '人船联动',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: this.shipList,
            symbolRotate: function () {
              return Math.round(Math.random()*100)
            },
            itemStyle:{
              color:function (params){
                if (params.value[2] == 1) {
                      return 'red'
                    } else {
                      return 'green'
                    }
              },
            },
            symbolSize:20,
            encode: {
              value: 2,
            },
            label: {
              formatter: '{b}',
              position: 'right',
              show: false,
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            // progressive:400,
            // progressiveThreshold :600,
            large:true,
            largeThreshold:2000,
            symbol:'path://M525.873548 897.156129l-383.174193-761.723871 763.045161-1.981935-379.870968 763.705806z',
          },
          {
            name: '港口名称',
            type: 'scatter',
            itemStyle: {
              color:'blue',
            },
            zlevel: 1,
            coordinateSystem: 'bmap',
            data: this.portList,
            symbolSize:20,
            encode: {
              value: 2,
            },
            label: {
              formatter: '{b}',
              position: 'right',
              show: true,
            },
            emphasis: {
              label: {
                show: true,
              },
              scale:true,
            },
            symbol:'path://M529.294679 1023.700092c-5.498308 0.199938-10.896647 0.299908-16.394956 0.299908-5.498308 0-10.996617-0.099969-16.494925-0.299908h32.889881zM920.27438 690.302674l-218.63273 70.378345c-3.398954 1.099662-3.798831 5.698247-0.599815 7.397724l79.275608 40.687481c10.196863 5.198401 11.696401 19.194094 2.899108 26.591818-59.181791 49.484774-138.157491 81.574901-223.331285 90.372194V527.852657h199.938482c4.398647 0 7.997539-3.598893 7.997539-7.997539v-79.975393c0-4.398647-3.598893-7.997539-7.997539-7.997539H559.985236v-1.699477c0-57.082437 22.892956-111.865581 64.080283-151.353431 31.390342-30.090742 50.684405-72.777607 49.884651-119.86312C672.350662 69.393719 599.273147-1.184566 509.700707 0.015065 421.327898 1.214696 350.04983 73.292519 350.04983 161.965236c0 45.486005 18.694248 86.573363 48.884959 115.964319 41.187327 40.187635 65.079976 94.77084 65.079975 152.253154v1.699477H264.076283c-4.398647 0-7.997539 3.598893-7.99754 7.997539v79.975393c0 4.398647 3.598893 7.997539 7.99754 7.997539h199.938481v397.477702c-84.573978-8.997232-163.649647-41.187327-223.031376-90.472163-8.797293-7.297755-7.297755-21.293448 2.899108-26.591818l79.275608-40.887419c3.199016-1.599508 2.799139-6.298062-0.599816-7.397724l-218.732699-69.8785c-4.198708-1.2996-8.697324 0.999692-10.096893 5.198401l-69.978469 218.832668c-1.099662 3.398954 2.499231 6.398031 5.598278 4.798524l93.971086-48.485082c6.298062-3.298985 13.995694-1.999385 18.894187 3.199016 42.486927 44.886189 96.770225 81.974778 158.451247 107.96678 51.184251 21.593356 106.66718 35.189173 163.24977 40.087665 10.796678 0.999692 21.593356 1.599508 32.390034 1.899416h32.88988c10.296832-0.299908 20.593664-0.899723 30.790527-1.799446 126.361121-10.796678 243.425102-64.680099 322.100894-148.154415 4.898493-5.198401 12.596124-6.498001 18.894186-3.199016l94.071056 48.285143c3.199016 1.599508 6.697939-1.399569 5.598278-4.798523l-70.378346-218.63273c-1.2996-4.098739-5.798216-6.398031-9.996924-4.998462zM446.020301 161.965236c0-36.388804 29.590895-65.979699 65.979699-65.979699s65.979699 29.590895 65.979699 65.979699-29.590895 65.979699-65.979699 65.979699-65.979699-29.590895-65.979699-65.979699z',
          },
        ],
      }
      option && myChart.setOption(option)
      let that =this
      myChart.on('click', function (params) {
        // console.log(params)
        if(params.seriesIndex == 0){
           getPage({
          shipName:params.name,
        }).then(res => {
          that.shipRelationList = res.data.data.records.filter((item,index) =>{
            return index<=4
          })
          that.dialogVisible = true
      })
        }
})
    //   myChart.on('finished', () => { 
    //     if(myChart.getModel().getComponent('bmap') && myChart.getModel().getComponent('bmap').__bmap){
    //       let bmap = myChart.getModel().getComponent('bmap').__bmap
    //        bmap.addEventListener('zoomend', function () {
    //     // 打印出当前缩放值
    //     console.log(bmap.getZoom())
    //     let _option = myChart.getOption()
    //     let _zoom = _option.bmap[0].zoom
    //     if(_zoom<10){
    //       _option.series[0].symbol='circle'
    //        _option.series[0].symbolSize = 5
    //     }else{
    //       _option.series[0].symbol = 'path://M525.873548 897.156129l-383.174193-761.723871 763.045161-1.981935-379.870968 763.705806z'
    //        _option.series[0].symbolSize = 20
    //     }
    //     myChart.clear()
    //     myChart.setOption(_option)
    // })
    //     }
    //     // console.log(bmap)
    //   })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>