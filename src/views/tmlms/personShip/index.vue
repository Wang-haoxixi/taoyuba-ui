.<template>
  <basic-container>
    <div class="titleWrap">
      <page-header title="人船联动"></page-header>
      <div class="changeBtn" v-if="!roles.includes(112)">
        <el-button
          type="primary"
          @click="changeMode(false)"
          v-show="showMode == true"
        >
          切换普通版
        </el-button>
        <el-button
          type="primary"
          @click="changeMode(true)"
          v-show="showMode == false"
        >
          切换地图版
        </el-button>
      </div>
    </div>
    <operation-container v-if="!roles.includes(112)" v-show="showMode==false">
      <template slot="right">
        <el-form :inline="true" :model="params" size="small">
          <el-form-item>
            <el-input v-model="params.shipName" placeholder="请输入船名">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              clearable
              style="width: 120px !important"
              v-model="params.villageId"
              placeholder="基层组织"
              size="small"
            >
              <el-option
                v-for="item in orgSearchList"
                :key="item.index"
                :label="item.villageName"
                :value="item.userId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item>
              <div style="width: 320px;">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="params.rangeTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </el-form-item> -->
          <el-form-item>
            <el-button type="default" @click="onSearch">搜索</el-button>
          </el-form-item>
        </el-form>
      </template>
    </operation-container>
    <operation-container v-if="!roles.includes(112)" v-show="showMode==true">
      <template slot="right">
        <el-form :inline="true" :model="mapParams" size="small">
          <el-form-item>
            <el-input v-model="mapParams.shipName" placeholder="请输入船名">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="onMapSearch">搜索</el-button>
          </el-form-item>
        </el-form>
      </template>
    </operation-container>
    <div v-show="showMode==false">
      <div class="title">人船联动渔船列表（红色代表未联系、绿色代表已联系、灰色代表无设备）</div>
    <div class="content" v-if="tableData.records.length > 0">
      <div
        class="contentItem"
        :class="
          item.isResolved == 2
            ? 'active'
            : item.isResolved == 3
            ? 'activeNone'
            : 'activeGreen'
        "
        :style="index % 8 == 0 ? 'border-left:1px solid #efefef' : ''"
        v-for="(item, index) of tableData.records"
        :key="index"
        @click="showDialog(item)"
      >
        {{ item.shipName }}
      </div>
    </div>
    <div class="empty" v-else>暂无数据</div>
    <div style="text-align: center; margin: 20px 0">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :total="total"
        :page-size="params.size"
        :current-page.sync="params.current"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
    </div>
    <dialog-form-relation
      ref="dialogFormRelation"
      @closeDialog="close"
      v-model="formRelation"
    ></dialog-form-relation>

    <div
      id="baiduMap"
      style="width: 100%; height: 800px"
      v-show="showMode == true"
    >
      <div id="baiduMapWrap" style="width: 100%; height: 800px"></div>
    </div>
    <el-dialog title="联系记录" :visible.sync="dialogVisible" width="50%">
      <div>
        <el-table :data="shipRelationList" style="width: 100%">
          <el-table-column prop="shipName" label="渔船名"> </el-table-column>
          <el-table-column prop="shipownerName" label="联系人">
          </el-table-column>
          <el-table-column prop="shipownerPhone" label="联系电话">
          </el-table-column>
          <el-table-column prop="relationshipType" label="联系设备">
            <template slot-scope="scope">
              <span>
                {{
                  scope.row.relationshipType === 3
                    ? getLabel(relationshipType, scope.row.relationshipType)
                    : getLabel(relationshipType, scope.row.relationshipType) +
                      "(" +
                      scope.row.relationshipNumber +
                      ")"
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="relationshipReason" label="联系事由">
          </el-table-column>
          <el-table-column prop="relationshipTime" label="联系时间">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </basic-container>
</template>

<script>
import { getShipList, getPortList,getListPage } from '@/api/tmlms/personShip'
import { getPage } from '@/api/tmlms/relation'
import dialogFormRelation from '@/views/tmlms/relation/dialogForm'
import { getVillageByOrg } from '@/api/tmlms/bvillage/index'
import { mapGetters } from 'vuex'
export default {
  components: {
    dialogFormRelation,
  },
  data () {
    return {
      myChart: '',
      shipList: [],
      portList: [],
      dialogVisible: false,
      shipRelationList: {},
      relationshipType: [
        { label: '手机', value: 1 },
        { label: '座机', value: 2 },
        { label: '微信', value: 3 },
        { label: '其他', value: 4 },
      ],
      showMode: false,
      tableData: {
        records: [],
      },
      params: {
        current: 1,
        size: 80,
        villageId: '',
        shipName: '',
        // rangeTime:[],
      },
      mapParams:{
        shipName: '',
      },
      total: 0,
      orgSearchList: [],
      formRelation: {},
      id: '',
    }
  },
  created () {
    this.getList()
    this.getVillageOrg()
  },
  mounted () {
  },
  computed: {
    ...mapGetters(['roles']),
  },
  methods: {
    changeMode (bol) {
      this.showMode = bol
      if(this.showMode==true){
        this.params.current =1
        this.params.villageId = ''
        this.params.shipName=''
        this.getPortListInfo()
        this.getShipListInfo()
      }else{
        this.mapParams.shipName = ''
        this.getList()
      }
    },
    getVillageOrg () {
      getVillageByOrg().then((res) => {
        let orgList = res.data.data
        this.orgSearchList = orgList.slice()
        this.orgSearchList.unshift({ userId: '', villageName: '全部' })
      })
    },
    showDialog (item) {
      if (item.isResolved == 2) {
        // console.log(item)
        this.id = item.shipId
        this.formRelation.shipName = item.shipName
        this.formRelation.shipownerName = item.shipowner
        this.formRelation.shipownerPhone = item.mobile
        this.$refs.dialogFormRelation.open()
      }
    },
    getList () {
      let params = Object.assign({}, this.params)
      getListPage(params).then(({ data }) => {
        if (data.code === 0) {
          this.tableData = data.data
          this.total = data.data.total
        }
      })
    },
    currentChange (val) {
      this.params.current = val
      this.getList()
    },
    close () {
      //新增成功
      // this.tableData.records.forEach(item=>{
      //   if(item.shipId==this.id){
      //     item.isResolved =1
      //     this.id = ''
      //   }
      // })
      this.getList()
    },
    onSearch () {
      this.params.current = 1
      this.getList()
    },

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
    getShipListInfo () {
      getShipList().then((res) => {
        this.shipList = res.data.data.map((item) => {
          return {
            name: item.shipName,
            value: [item.longitude, item.latitude, item.flag],
          }
        })
        console.log(this.shipList)
        this.getData()
      })
    },
    getPortListInfo () {
      getPortList({
        size: 100,
      }).then((res) => {
        this.portList = res.data.data.records.map((item) => {
          return {
            name: item.name,
            value: [item.longitude, item.latitude],
          }
        })
        // console.log(this.portList)
      })
    },
    getData () {
      // console.log(this.shipList)
      this.myChart = this.$echarts.init(document.getElementById('baiduMapWrap'))
      var option
      option = {
        title: {},
        tooltip: {
          // trigger: 'item',
          formatter: '{b}',
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
              return Math.round(Math.random() * 100)
            },
            itemStyle: {
              color: function (params) {
                if (params.value[2] == 1) {
                  return 'red'
                } else {
                  return 'green'
                }
              },
            },
            symbolSize: 20,
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
            large: true,
            largeThreshold: 2000,
            symbol:
              'path://M525.873548 897.156129l-383.174193-761.723871 763.045161-1.981935-379.870968 763.705806z',
          },
          {
            name: '港口名称',
            type: 'scatter',
            itemStyle: {
              color: 'blue',
            },
            zlevel: 1,
            coordinateSystem: 'bmap',
            data: this.portList,
            symbolSize: 20,
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
              scale: true,
            },
            symbol:
              'path://M529.294679 1023.700092c-5.498308 0.199938-10.896647 0.299908-16.394956 0.299908-5.498308 0-10.996617-0.099969-16.494925-0.299908h32.889881zM920.27438 690.302674l-218.63273 70.378345c-3.398954 1.099662-3.798831 5.698247-0.599815 7.397724l79.275608 40.687481c10.196863 5.198401 11.696401 19.194094 2.899108 26.591818-59.181791 49.484774-138.157491 81.574901-223.331285 90.372194V527.852657h199.938482c4.398647 0 7.997539-3.598893 7.997539-7.997539v-79.975393c0-4.398647-3.598893-7.997539-7.997539-7.997539H559.985236v-1.699477c0-57.082437 22.892956-111.865581 64.080283-151.353431 31.390342-30.090742 50.684405-72.777607 49.884651-119.86312C672.350662 69.393719 599.273147-1.184566 509.700707 0.015065 421.327898 1.214696 350.04983 73.292519 350.04983 161.965236c0 45.486005 18.694248 86.573363 48.884959 115.964319 41.187327 40.187635 65.079976 94.77084 65.079975 152.253154v1.699477H264.076283c-4.398647 0-7.997539 3.598893-7.99754 7.997539v79.975393c0 4.398647 3.598893 7.997539 7.99754 7.997539h199.938481v397.477702c-84.573978-8.997232-163.649647-41.187327-223.031376-90.472163-8.797293-7.297755-7.297755-21.293448 2.899108-26.591818l79.275608-40.887419c3.199016-1.599508 2.799139-6.298062-0.599816-7.397724l-218.732699-69.8785c-4.198708-1.2996-8.697324 0.999692-10.096893 5.198401l-69.978469 218.832668c-1.099662 3.398954 2.499231 6.398031 5.598278 4.798524l93.971086-48.485082c6.298062-3.298985 13.995694-1.999385 18.894187 3.199016 42.486927 44.886189 96.770225 81.974778 158.451247 107.96678 51.184251 21.593356 106.66718 35.189173 163.24977 40.087665 10.796678 0.999692 21.593356 1.599508 32.390034 1.899416h32.88988c10.296832-0.299908 20.593664-0.899723 30.790527-1.799446 126.361121-10.796678 243.425102-64.680099 322.100894-148.154415 4.898493-5.198401 12.596124-6.498001 18.894186-3.199016l94.071056 48.285143c3.199016 1.599508 6.697939-1.399569 5.598278-4.798523l-70.378346-218.63273c-1.2996-4.098739-5.798216-6.398031-9.996924-4.998462zM446.020301 161.965236c0-36.388804 29.590895-65.979699 65.979699-65.979699s65.979699 29.590895 65.979699 65.979699-29.590895 65.979699-65.979699 65.979699-65.979699-29.590895-65.979699-65.979699z',
          },
        ],
      }
      option && this.myChart.setOption(option)
      let that = this
      that.myChart.on('click', function (params) {
        // console.log(params)
        if (params.seriesIndex == 0) {
          getPage({
            shipName: params.name,
          }).then((res) => {
            that.shipRelationList = res.data.data.records.filter(
              (item, index) => {
                return index <= 4
              }
            )
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
    onMapSearch (){
      let res = this.shipList.filter(item=>{
        return item.name == this.mapParams.shipName
      })
      // console.log(res)
      if(res.length>0){
        let _option = this.myChart.getOption()
        _option.bmap[0].center = [res[0].value[0],res[0].value[1]],
        _option.bmap[0].zoom = 20
        this.myChart.clear()
        this.myChart.setOption(_option)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  border: 1px solid #efefef;
  padding: 12px;
  font-size: 14px;
  line-height: 23px;
  color: rgb(0 0 0);
  font-weight: bold;
  background: rgb(242, 244, 245);
}
.content {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  color: #606266;
  .contentItem {
    border-right: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
    padding: 12px;
    font-size: 14px;
    line-height: 28px;
  }
}
.active {
  color: red;
  cursor: pointer;
}
.activeNone {
  color: #909399;
}
.activeGreen {
  color: green;
}
.empty {
  font-size: 14px;
  line-height: 60px;
  color: #909399;
  text-align: center;
  border-bottom: 1px solid #efefef;
}

.titleWrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.changeBtn {
  display: flex;
  margin-bottom: 20px;
  justify-content: flex-end;
}
</style>
