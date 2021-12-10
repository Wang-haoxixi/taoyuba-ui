<template>
    <div class="main-see">
        <div class="title">
            <div class="title-img">
                <img src="/img/title.png" alt="">
            </div>
            <div class="title-hello">
                <div class="hello">您好,欢迎来到淘渔吧后台系统</div>
                <div class="hello1">您的合作社在本次开捕前联系了<span style="color:#0185D8">{{ total.ready }}</span>名船东，完成率为<span style="color:#0185D8">{{ total.percent }}</span>，感谢您对渔业安全作出贡献。</div>
                <div class="hello1"><span class="hello2">您的区域管理范围为：</span><el-button type="primary" plain size="mini" style="margin-right:5px">衢山区域</el-button>点击查看当前区域渔业概况。</div>
            </div>
            <div class="title-one">{{ time.z }}</div>
            <div class="title-two">{{ time.y }}</div>
        </div>
        <div class="title" style="margin-top: 16px;padding:24px 36px">
            <div class="title-t">
                <img src="/img/icon.png" alt="">
                <div>
                    <div class="title-t-hender">本站渔船总量</div>
                    <div class="title-num">{{ crew.shipCount }}<span class="title-t-hender" style="margin-left:10px">艘</span></div>
                </div>
            </div>
            <div class="title-t">
                <img src="/img/icon1.png" alt="">
                <div>
                    <div class="title-t-hender">已参加面对面教育</div>
                    <div class="title-num">{{ crew.signCount }}<span class="title-t-hender" style="margin-left:10px">人</span></div>
                </div>
            </div>
            <div class="title-t">
                <img src="/img/icon2.png" alt="">
                <div>
                    <div class="title-t-hender">本站船员总量</div>
                    <div class="title-num">{{ crew.crewCount }}<span class="title-t-hender" style="margin-left:10px">人</span></div>
                </div>
            </div>
            <div class="title-t" style="padding-right:0;border-right:0px solid #ccc">
                <img src="/img/icon3.png" alt="">
                <div>
                    <div class="title-t-hender">联系记录总数</div>
                    <div class="title-num">{{ crew.recordCount }}<span class="title-t-hender" style="margin-left:10px">条</span></div>
                </div>
            </div>
        </div>
        <div class="kjtd">
            <div class="title td">
                <h3>便捷通道</h3>
                <div class="bj">
                    <div class="bj-boss"><div><i class="el-icon-edit"></i></div><div>上船登记</div></div>
                    <div class="bj-boss"><div><i class="el-icon-tickets"></i></div><div>台账管理</div></div>
                    <div class="bj-boss"><div><i class="el-icon-document"></i></div><div>合同管理</div></div>
                    <div class="bj-boss"><div><i class="el-icon-chat-dot-square"></i></div><div>求职登记</div></div>
                    <div class="bj-boss"><div><i class="el-icon-notebook-2"></i></div><div>培训记录</div></div>
                    <div class="bj-boss"><div><i class="el-icon-paperclip"></i></div><div>人船关联</div></div>
                </div>
            </div>
            <div class="title td">
                <h3>快捷查询</h3>
                <div class="quick-query-all">
                    <div class="quick-query">
                        <el-input placeholder="请输入渔船名"></el-input>
                        <el-button type="primary" plain>渔船查询</el-button>
                    </div>
                    <div class="quick-query">
                        <el-input placeholder="请输入职务船员证书编号"></el-input>
                        <el-button type="primary" plain>证书查询</el-button>
                    </div>
                    <div class="quick-query">
                        <el-input placeholder="请输入船员姓名"></el-input>
                        <el-button type="primary" plain>船员查询</el-button>
                    </div>
                </div>
            </div>
            <div class="title td">
                <h3>船东联系记录 <span style="color:#0185D8;float: right;font-size: 16px;">查看未联系渔船 <i class="el-icon-arrow-right"></i></span> </h3>
                <el-table
                    :data="pagedTable"
                    stripe
                    style="width: 100%">
                    <el-table-column
                    prop="shipName"
                    label="船名号"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="relationshipReason"
                    label="联系事由"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="relationshipTime"
                    label="联系时间"
                    >
                    </el-table-column>
                </el-table>
            </div>
            <div class="title td">
                <h3>网签合同管理 <span style="color:#0185D8;float: right;font-size: 16px;">网签合同 <i class="el-icon-arrow-right"></i></span></h3>
                <div class="contract">当前共有{{ crew.totalContract }}条合同，请及时关注处理</div>
                <div class="contract-num">
                    <div>即将过期合同：<span>{{ crew.readyContract }}</span>条</div>
                    <div>合同成立：<span>{{ crew.startContract }}</span>条</div>
                    <div>未签纸质合同：<span>{{ crew.noPaperContract }}</span>条</div>
                    <div>合同解除：<span>{{ crew.endContract }}</span>条</div>
                </div>
                <h3>快速检索</h3>
                <div style="margin: 17px 0">
                    <el-input placeholder="请输入船员身份证号"></el-input>
                </div>
                <div style="text-align: center">
                    <el-button>检索</el-button>
                    <el-button>打印</el-button>
                    <el-button>导出</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getPage } from '@/api/tmlms/relation'
import { countShipAndCrew,countRecordByVillageId } from '@/api/wel/index'

export default {
   data () {
    return {
      list: [],
      pagedTable: [],
      total: {},
      crew: {},
      info: {},
      time: {
          z: '',
          y: '',
      },
    }
  },
  components: { },
  created () {
        getPage({current:1,size:6}).then(({ data })=>{
          this.pagedTable = data.data.records
        })
        // countInfo().then(({ data })=>{
        //   console.log(data)
        //   this.info = data.data
        // })
        countShipAndCrew().then(({ data })=>{
          console.log(data)
          this.crew = data.data
        })
        countRecordByVillageId().then(({ data })=>{
          console.log(data)
          this.total = data.data
        })
        var date = new Date()
        let arrz = ['天','一','二','三','四','五','六']
        this.time.z = `周${ arrz[date.getDay()] }`
        this.time.y = `${ date.getMonth() + 1 }月${ date.getDate() }日`
        // date.getYear(); //获取当前年份(2位)
        // date.getMonth(); //获取当前月份(0-11,0代表1月)
        // date.getDate(); //获取当前日(1-31)
        // date.getDay(); //获取当前星期X(0-6,0代表星期天)
  },
  computed: {
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
            justify-content: space-between;
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
            width: 170px;
        }
    }
    .title-t {
        display: flex;
        align-items: center;
        // padding-right: 40px;
        justify-content: center;
        width: 25%;
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
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        h3 {
            font-size: 17px;
            font-weight: 800;
            line-height: 24px;
            color: #333333;
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
}
</style>
