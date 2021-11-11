<template>
    <div class="main-see">
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
            <div class="">
                 <el-button type="primary" @click="open">大数据墙</el-button>
            </div>
        </div>
        <div>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="kjtd" v-if="inS.shipCount">
                        <h3>渔船总数 <span style="float: none">{{ inS.shipCount.total }}</span></h3>
                        <div class="kjtd-ship"><div>帆张网</div><p>{{ inS.shipCount['11'] }}</p></div>
                        <div class="kjtd-ship"><div>流刺网</div><p>{{ inS.shipCount['10'] }}</p></div>
                        <div class="kjtd-ship"><div>拖虾网</div><p>{{ inS.shipCount['7'] }}</p></div>
                        <div class="kjtd-ship"><div>休闲船</div><p>{{ inS.shipCount['16'] }}</p></div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="kjtd" v-if="inS.certCount">
                        <h3>船员登记 <span style="float: none">{{ inS.certCount.total }}</span></h3>
                        <div class="kjtd-ship"><div>持证船员</div><p>{{ inS.certCount.cert }}</p></div>
                        <div class="kjtd-ship"><div>普通船员</div><p>{{ inS.certCount.normal }}</p></div>
                        <div class="kjtd-ship"><div>已上船船员</div><p>{{ inS.certCount.total }}</p></div>
                        <div class="kjtd-ship"><div>合同船员</div><p>{{ inS.certCount['1'] }}</p></div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="kjtd" v-if="inO.sign">
                        <h3>面对面教育培训</h3>
                        <div class="kjtd-ship"><div>参会人员</div><p>{{ inO.sign.meet }}</p></div>
                        <div class="kjtd-ship"><div>船东</div><p>{{ inO.sign['0'] }}</p></div>
                        <div class="kjtd-ship"><div>渔船监护人</div><p>{{ inO.sign['1'] }}</p></div>
                        <div class="kjtd-ship"><div>培训次数</div><p>{{ inO.sign.total }}</p></div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="kjtd" v-if="inO.contract">
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
</template>

<script>
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
    .title {
        padding: 20px 16px;
        background: white;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
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
        padding: 0 20px;
        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
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
        .kjtd-ship {
            width: 25%;
            display: inline-block;
            margin-left: -3px;
            margin-top: 24px;
            text-align: center;
            border-right: 1px solid #EDEDED;
            &:last-child {
                border-right: 0px solid #EDEDED;
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
                font-weight: 400;
                line-height: 20px;
                color: #333333;
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
                background: rgba(1, 133, 216, 0.1);
                color: #0185D8;
                text-align: center;
                font-size: 14px;
                border-radius: 12px;
                font-weight: 500;
            }
        }
        .kjtd-search {
            display: flex;
            justify-content: space-around;
            padding: 24px;
            background: #F9F9F9;
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
</style>
