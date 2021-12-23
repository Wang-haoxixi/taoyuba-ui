<template>
    <div class="main-see">
        <div class="main-l">
            <div class="title">
                <div style="display:flex;align-items:center">
                    <div class="title-img">
                        <img src="/img/title.png" alt="">
                    </div>
                    <div class="title-hello">
                        <div class="hello">您好,欢迎来到淘渔吧后台系统</div>
                        <div class="hello1"><span class="hello2">您的区域管理范围为：</span><el-button type="primary" plain size="mini" style="margin-right:5px" @click="selectArea()">{{ getAreaName() }}</el-button><span style="color: #0185D8;cursor: pointer;" @click="selectArea()">点击切换</span>当前区域渔业概况。</div>
                    </div>
                </div>
                <!-- <div class="title-one">{{ time.z }}</div>
                <div class="title-two">{{ time.y }}</div> -->
                <div class="big-data" @click="open">
                    <!-- <el-button type="primary" @click="open">大数据墙</el-button> -->
                    <img src="/img/remainpic/home-bigdata.png" alt="">
                    大数据墙
                </div>
            </div>
            <div>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="kjtd" v-if="inS.shipCount">
                            <!-- <h3>渔船总数 <span style="float: none">{{ inS.shipCount.total }}</span></h3> -->
                            <!-- <h3 style="display: flex;justify-content: space-between;">渔船总数<el-button type="text">查看全部</el-button></h3> -->
                            <h3>渔船总数<el-button type="text" style="float: right;padding: 5px;">查看全部</el-button></h3>
                            <div class="fishermen-num">
                                <div class="kjtd-ship"><div>单船桁杆</div><p>{{ inS.shipCount['3'] }}</p></div>
                                <div class="kjtd-ship"><div>钓具</div><p>{{ inS.shipCount['4'] }}</p></div>
                                <div class="kjtd-ship"><div>漂流</div><p>{{ inS.shipCount['5'] }}</p></div>
                                <div class="kjtd-ship"><div>拖虾</div><p>{{ inS.shipCount['7'] }}</p></div>
                                <div class="kjtd-ship"><div>围网</div><p>{{ inS.shipCount['8'] }}</p></div>
                                <div class="kjtd-ship"><div>流刺网</div><p>{{ inS.shipCount['10'] }}</p></div>
                                <div class="kjtd-ship"><div>帆张网</div><p>{{ inS.shipCount['11'] }}</p></div>
                                <div class="kjtd-ship"><div>渔运</div><p>{{ inS.shipCount['15'] }}</p></div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="kjtd" v-if="inS.certCount">
                            <h3>已登机船员<span style="float: right;">{{ inS.certCount.total }}</span></h3>
                            <!-- <div class="kjtd-ship"><div>持证船员</div><p>{{ inS.certCount.cert }}</p></div>
                            <div class="kjtd-ship"><div>普通船员</div><p>{{ inS.certCount.normal }}</p></div>
                            <div class="kjtd-ship"><div>已上船船员</div><p>{{ inS.certCount.total }}</p></div>
                            <div class="kjtd-ship"><div>合同船员</div><p>{{ inS.certCount['1'] }}</p></div> -->
                            <div class="card-type">
                                <div class="_item" style="background: #4480F8">
                                    <div>
                                        已上船船员
                                        <img src="/img/remainpic/icon-boarding.png" alt="">
                                    </div>
                                    <div style="font: bold 18px 'DIN Alternate';">{{ inS.certCount.total }}</div>
                                </div>
                                <div class="_item" style="background: #367DB7">
                                    <div>
                                        合同船员
                                        <img src="/img/remainpic/icon-contract-boatman.png" alt="">
                                    </div>
                                    <div style="font: bold 18px 'DIN Alternate';">{{ inS.certCount['1'] }}</div>
                                </div>
                                <div class="_item" style="background: #65D5D0">
                                    <div>
                                        持证船员
                                        <img src="/img/remainpic/icon-turbine.png" alt="">
                                    </div>
                                    <div style="font: bold 18px 'DIN Alternate';">{{ inS.certCount.cert }}</div>
                                </div>
                                <div class="_item" style="background: #67DE9C">
                                    <div>
                                        普通船员
                                        <img src="/img/remainpic/icon-drive.png" alt="">
                                    </div>
                                    <div style="font: bold 18px 'DIN Alternate';">{{ inS.certCount.normal }}</div>
                                </div>
                            </div>

                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="kjtd" v-if="inO.contract">
                            <!-- <h3>面对面教育培训</h3>
                            <div class="kjtd-ship"><div>参会人员</div><p>{{ inO.sign.meet }}</p></div>
                            <div class="kjtd-ship"><div>船东</div><p>{{ inO.sign['0'] }}</p></div>
                            <div class="kjtd-ship"><div>渔船监护人</div><p>{{ inO.sign['1'] }}</p></div>
                            <div class="kjtd-ship"><div>培训次数</div><p>{{ inO.sign.total }}</p></div> -->
                            <h3>船员合同</h3>
                            <div id="main" style="width: 300px;height:300px;"></div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="kjtd" v-if="inO.sign">
                            <h3>网签合同</h3>
                            <div class="kjtd-ship"><div>成立合同</div><p>{{ inO.contract.startContract }}</p></div>
                            <div class="kjtd-ship"><div>失效合同</div><p>{{ inO.contract.overContract }}</p></div>
                            <div class="kjtd-ship"><div>解除合同</div><p>{{ inO.contract.endContract }}</p></div>
                            <div class="kjtd-ship"><div>合同备案</div><p>{{ inO.contract.noPaperContract }}</p></div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="kjtd">
                            <h3>进出港管理 </h3>
                            <div class="kjtd-ship"><div>进港</div><p>{{ inM.IN }}</p></div>
                            <div class="kjtd-ship"><div>出港</div><p>{{ inM.OUT }}</p></div>
                            <div class="kjtd-ship"><div>已上报/未上报</div><p>0/0</p></div>
                            <div class="kjtd-ship"><div>免报告</div><p>0</p></div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="kjtd">
                            <h3>求职招聘</h3>
                            <div class="kjtd-ship"><div>持证船员</div><p>{{Zhao.licensedCrew}}</p></div>
                            <div class="kjtd-ship"><div>普通船员</div><p>{{Zhao.rating}}</p></div>
                            <div class="kjtd-ship"><div>已上船船员</div><p>{{Zhao.boarding}}</p></div>
                            <div class="kjtd-ship"><div>合同船员</div><p>{{Zhao.contractCrew}}</p></div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="kjtd">
                            <h3>船东联系排行（当月）</h3>
                            <el-table
                                :data="pagedTable"
                                stripe
                                style="width: 100%">
                                <el-table-column
                                    type="index"
                                    width="50">
                                </el-table-column>
                                <el-table-column
                                prop="villageName"
                                label="基层名称"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="number"
                                label="数量"
                                >
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="kjtd">
                            <h3>基层操作排行（当月）</h3>
                            <el-table
                                :data="pageTable"
                                stripe
                                style="width: 100%">
                                <el-table-column
                                    type="index"
                                    width="50">
                                </el-table-column>
                                <el-table-column
                                prop="villageName"
                                label="基层名称"
                                >
                                </el-table-column>
                                <el-table-column
                                prop="number"
                                label="数量"
                                >
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span="24">
                        <div class="kjtd">
                            <div>
                                <el-button type="text" :class="active === 0 ? '' : 'button-dis'" @click="searchName(0)">渔船查询</el-button> <span class="kjtd-span">/</span> <el-button type="text" :class="active === 1 ? '' : 'button-dis'" @click="searchName(1)">证书查询</el-button> <span class="kjtd-span">/</span> <el-button type="text" :class="active === 2 ? '' : 'button-dis'" @click="searchName(2)">船员查询</el-button>
                            </div>
                            <div class="kjtd-search"> <el-input v-model="search" :placeholder="placeholders[active]"></el-input> <el-button type="primary" style="margin-left: 10px" @click="searchAny">查询</el-button> </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <select-org-dialog ref="selectOrgDialog"></select-org-dialog>
        </div>
        <div class="main-r">
            <div class="card" style="background: linear-gradient(135deg, #4480F8 0%, #3EBBFD 100%);margin-bottom:20px">
                111
            </div>
            <div class="card notification" style="margin-bottom: 20px">
                <div class="card-title">违规通知</div>
                <div class="msg-middle" style="padding-bottom: 0px;margin-bottom: 0px;border-bottom: none">
                    <div class="viol">浙岱渔<span>L08k1d</span>上下船员与进出港不匹配,请及时核查。</div>
                    <div class="viol">浙岱渔<span>026</span>在东经30度,北纬50度,请及时与船东联系进行核实。</div>
                    <div class="viol">浙岱渔<span>00036</span>未经允许驶离港口,请及时与船东联系进行核实。</div>
                    <div class="viol">当前浙岱渔<span>09230</span>有<span>232</span>份证书过期,请及时做好联系工作！</div>
                    <div class="viol">浙岱渔<span>00036</span>在东经30度,北纬50度,请及时与船东联系进行核实。</div>
                    <div class="viol">浙岱渔<span>00036</span>在东经30度,北纬50度,请及时与船东联系进行核实。</div>
                </div>
            </div>
            <div class="card">
                <div class="card-title">求职招聘</div>
                <div class="position-item">
                    <div class="pst-price">
                        <div>
                            <span class="pst">船长</span><el-tag size="mini">丙一</el-tag>
                        </div>
                        <div class="price">
                            100K-120K
                        </div>
                    </div>
                    <div class="ship-time">
                        <div>围网渔船</div>
                        <div>30分钟前</div>
                    </div>
                </div>
                <div class="position-item">
                    <div class="pst-price">
                        <div>
                            <span class="pst">船长</span><el-tag size="mini">甲二</el-tag>
                        </div>
                        <div class="price">
                            100K-120K
                        </div>
                    </div>
                    <div class="ship-time">
                        <div>围网渔船</div>
                        <div>30分钟前</div>
                    </div>
                </div>
                <div class="position-item">
                    <div class="pst-price">
                        <div>
                            <span class="pst">船长</span><el-tag size="mini">丙一</el-tag>
                        </div>
                        <div class="price">
                            100K-120K
                        </div>
                    </div>
                    <div class="ship-time">
                        <div>围网渔船</div>
                        <div>30分钟前</div>
                    </div>
                </div>
                <div class="position-item">
                    <div class="pst-price">
                        <div>
                            <span class="pst">船长</span><el-tag size="mini">丙一</el-tag>
                        </div>
                        <div class="price">
                            100K-120K
                        </div>
                    </div>
                    <div class="ship-time">
                        <div>围网渔船</div>
                        <div>30分钟前</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import * as echarts from 'echarts'
import SelectOrgDialog from '@/page/index/top/SelectOrgDialog'
import { mapState } from 'vuex'
import { countPortByOrg,countShipAndCrewByOrg,countVillageByOrg,countSignAndContractByOrg,jobRecruitment } from '@/api/wel/index'
export default {
   data () {
    return {
      list: [],
      pagedTable: [],
      pageTable:[],
      search: '',
      active: 0,
      inM: {
          port: {},
      },
      inS: {
          certCount: {},
          shipCount: {},
      },
      inO: {},
      Zhao:{},
      placeholders: ['请输入船名号','请输入证书号','请输入船员名称'],
      time: {
          z: '',
          y: '',
      },
    }
  },
  components: { SelectOrgDialog },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    // 绘制图表
    myChart.setOption({
    title: {
        text: 'ECharts 入门示例',
    },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: [
        {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
        },
    ],
    })
  },
  created () {
      countVillageByOrg({current:1,size:6}).then(({ data })=>{
          this.pagedTable = data.data.record
      })
      countPortByOrg().then(({ data })=>{
          this.inM = data.data
        //   console.log(this.inM)
      })
      countShipAndCrewByOrg().then(({ data })=>{
          this.inS = data.data
      })
      jobRecruitment().then(({data})=>{
          this.Zhao = data.data
      })
      countSignAndContractByOrg().then(({data})=>{
        //   console.log(this.info)
          this.inO = data.data
      })
        var date = new Date()
        let arrz = ['天','一','二','三','四','五','六']
        this.time.z = `周${ arrz[date.getDay()] }`
        this.time.y = `${ date.getMonth() + 1 }月${ date.getDate() }日`
  },
    computed: {         
    ...mapState({
      orgList: state => state.user.orgs,
      orgId: state => state.user.userInfo.orgId,
    }),
  },
  methods: {
      open (){
          const { href } = this.$router.resolve({
          name: 'dataStatistics',
        })
        console.log('href', href)
        window.open(href, '_blank')
      },
      searchName (val) {
          this.active = val
      },
      selectArea () {
          this.$refs['selectOrgDialog'].dialogShow = true
      },
      getAreaName () {
          let data = ''
          this.orgList.forEach(element => {
              if( element.orgId === this.orgId ){
                data = element.name
              }
          })
          return data
      },
      searchAny () {
          if( !this.search ){
              this.$message.warning('请先输入要搜索的内容！')
              return false
          }
          if(this.active === 0){
            // this.$router.push(`/ships/manage?shipName=${this.search}`)
          }else if(this.active === 1){
            // this.$router.push(`/ships/manage?shipName=${this.search}`)
            console.log(123)
          }else {
            this.$router.push(`/crew/smdj/boatMan?realName=${this.search}`)
          }
      },
  },
}
</script>
<style scoped lang="scss">
.main-see {
    background: #F9F9F9;
    min-height: calc(100vh - 60px);
    margin-top: -15px;
    padding: 20px;

    display: flex;

    .title {
        padding: 20px 16px;
        background: white;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .big-data{
            width: 96px;
            height: 96px;
            background: rgba(68, 128, 248, .1);
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font: 400 14px 'PingFang SC';
            color: #666666;
            line-height: 24px;
            cursor: pointer;
            &:hover{
                background: rgba(68, 128, 248, .2);
            }
            >img{
                width: 36px;
                margin-bottom: 8px;
            }
        }

        .title-one {
            position: absolute;
            width: 50px;
            height: 20px;
            background: #0185D8;
            right: 30px;
            top: 10px;
            border-radius: 4px 4px 0px 0px;
            font-size: 10px;
            font-weight: 400;
            line-height: 20px;
            color: #FFFFFF;
            text-align: center;
        }
        .title-two {
            position: absolute;
            width: 50px;
            height: 20px;
            top: 30px;
            right: 30px;
            background: rgba(1, 133, 216, 0.1);
            text-align: center;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 400;
            line-height: 20px;
            color: #0185D8;
        }
        .title-hello {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }
        .hello {
            margin-bottom: 16px;
            height: 25px;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 25px;
            color: #333333;
            opacity: 1;
        }
        .hello1 {
            height: 20px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 20px;
            color: #999999;
            opacity: 1;
        }
        .hello2 {
            height: 20px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 20px;
            color: #333333;
            opacity: 1;
        }
    }
    .title-img {
        padding-right: 20px;
        img {
            width: 130px;
            height: 96px;
        }
    }
    .title-t {
        display: flex;
        align-items: center;
        padding-right: 40px;
        border-right: 1px solid #EDEDED;
        img {
            margin-right: 10px;
        }
    }
    .title-t-hender {
        height: 20px;
        font-weight: 400;
        line-height: 20px;
        color: #999999;
        font-size: 14px;
        margin: 5px 0;
    }
    .title-num {
        height: 25px;
        font-size: 18px;
        font-weight: 400;
        line-height: 20px;
        color: #333333;
    }
    .td {
        width: 49%;
        display: block;
        margin-top: 20px;
    }
    .kjtd {
        background: white;
        margin-top: 16px;
        padding: 16px 16px 24px 16px;
        border-radius: 10px;
        .fishermen-num{
            display: flex;
        }
        .kjtd-ship {
            width: 25%;
            display: inline-block;
            margin-left: -3px;
            margin-top: 24px;
            text-align: center;
            border-right: 1px dashed #EDEDED;
            &:last-child {
                border-right: 0px dashed #EDEDED;
            }
            div {
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 20px;
                color: #999999;
                margin-bottom: 10px;
            }
            p {
                font-size: 18px;
                font-weight: bold;
                line-height: 20px;
                color: #333333;
                font-family: DIN Alternate;
            }
        }
        h3 {
            font-size: 17px;
            font-weight: 800;
            line-height: 24px;
            color: #333333;
            span {
                display: inline-block;
                width: 61px;
                height: 24px;
                background: rgba(68, 128, 248, 0.1);
                color: #4480F8;
                text-align: center;
                font-size: 14px;
                border-radius: 12px;
                font-weight: bold;
                font-family: DIN Alternate;
            }
        }
        .kjtd-search {
            display: flex;
            justify-content: space-around;
            padding: 24px;
            background: #F9F9F9;
        }

        .card-type{
            margin-top: 20px;
            color: #FFFFFF;
            font: 400 14px 'PingFang SC';
            line-height: 20px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-auto-flow: row dense;
            grid-row-gap: 20px;
            grid-column-gap: 16px;
            ._item{
                padding: 20px 16px;
                border-radius: 5px;
                img{
                    height: 24px;
                }
                >div:first-of-type{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                }
            }
        }
    }
    .bj {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .bj-boss {
            width: 25%;
            height: 77px;
            margin: 10px;
            border: 1px solid #EDEDED;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            i {
                font-size: 22px;
            }
            div {
                text-align: center;
            }
        }

    }
    .quick-query-all {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        height: 100%;
        padding-bottom: 20px;
    }
    .quick-query {
        display: flex;
        width: 100%;
        button {
            margin-left: 8px;
        }
    }
    .contract {
        width: 100%;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: #F9F9F9;
        border-radius: 5px;
        color: #666666;
        margin: 10px 0 10px 0;
    }
    .contract-num {
        border-bottom: 1px solid #EDEDED;
        padding-bottom: 20px;
        margin-bottom: 18px;
        div {
            display: inline-block;
            width: 49%;
            padding: 8px 0;
            color: #999999;
        }
        span {
            font-size: 18px;
            color: #E6893A;
            margin-right: 5px;
        }
    }
    .button-dis {
        ::v-deep {
            color: #c0c4cc;
        }
    }
    .kjtd-span {
        margin: 0 10px;
        color: #c0c4cc;
    }
}

.main-l{
    flex: 1;
}

.main-r{
    margin-left: 20px;
    width: 292px;

    .position-item{
        margin-top: 20px;
        line-height: 24px;
        >div{
            display: flex;
            justify-content: space-between;
        }
        .pst-price{
            margin-bottom: 10px;
            font-size: 16px;
            .pst{
                font-weight: 400;
                color: #333333;
                margin-right: 10px;
            }
            .price{
                font: bold 16px 'DIN Alternate';
                color: #FD6565;
            }
        }
        .ship-time{

        }
    }
}

.card{
    border-radius: 10px;
    background: #FFFFFF;
    padding: 16px;
    .card-title{
        color: #333333;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 5px
    }
}

// 通知项
.notification{
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
    .msg-top,.msg-middle,.msg-bottom{
        padding-bottom: 13px;
        margin-bottom: 13px;
        border-bottom: 1px solid #EDEDED;
        >div{
            color: #666666;
            line-height: 20px;
            span{
                color: #4480F8;
            }
        }
        >.el-button{
            padding: 6px 12px;
            margin-top: 10px;
        }
    }
    .msg-middle{
        >div{
            text-indent: 9px;
            font-size: 12px;
            position: relative;
            &:after{
                content: '';
                background-color: #BBBBBB;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                position: absolute;
                top: 8px;
                left: 0;
            }
        }
        .viol{
            margin-top: 24px;
        }
    }
}
</style>
