<template>
    <div class="main-see">
        <div class="main-top">
            <div class="aside-left">
                <div class="card title">
                    <el-image src="/img/title.png" class="title-img" style="width: 130px;height: 96px;margin-right: 20px"></el-image>
                    <div class="title-hello">
                        <div>您好，衢顺渔业专业合作社，欢迎来到淘渔吧后台系统</div>
                        <div>您的合作社本月联系过<span style="color: #4480F8">999</span>名船东，感谢您对渔业安全做出的贡献”。</div>
                    </div>
                </div>
                <div class="card msg-manager">
                    <div class="card-title">消息管理</div>
                    <div class="msg-item" v-for="(item,index) in msgList" :key="index">
                        <div class="item-left"><span class="origin"></span>{{ item.title }}</div>
                        <div class="item-right">{{ item.dateTime }}</div>
                    </div>
                </div>
                <div class="speed-content">
                    <div class="card convenient-channel">
                        <div class="card-title">便捷通道</div>
                        <div class="square-inner grid">
                            <div v-for="(item, index) in channelList" :key="index">
                                <div :style="{background: item.bgColor}" class="icon-box">
                                    <img :src="item.icon">
                                </div>
                                <div>{{ item.name }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="card quick-query">
                        <div class="card-title">快捷查询</div>
                        <div class="search search-fisher">
                            <el-input placeholder="请输入船名号或渔船编号"></el-input>
                            <el-button type="primary" plain>渔船查询</el-button>
                        </div>
                        <div class="search search-certificate">
                            <el-input placeholder="请输入职务船员证书编号"></el-input>
                            <el-button type="primary" plain>证书查询</el-button>
                        </div>
                        <div class="search search-boatman">
                            <el-input placeholder="请输入船员姓名或身份证号"></el-input>
                            <el-button type="primary" plain>船员查询</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="aside-right">
                <div class="card" style="background: linear-gradient(135deg, #4480F8 0%, #3EBBFD 100%);margin-bottom:20px">
                    111
                </div>
                <div class="card notification">
                    <div class="card-title">证书消息提醒</div>
                    <div class="msg-top">
                        <div style="color:#666666;font-size: 12px;line-height: 20px;">浙岱渔2382证书即将到期，请及时核查！</div>
                        <el-button>查看详情</el-button>
                    </div>
                    <div class="card-title" style="font-size:13px">请输入船员姓名或身份证号</div>
                    <div class="msg-middle">
                        <div>浙岱渔<span>00001</span>上下船员与进出港不匹配，请及时核查。</div>
                        <div>浙岱渔<span>06761</span>上下船员与进出港不匹配，请及时核查。</div>
                    </div>
                    <div class="card-title">渔船越界提醒</div>
                    <div class="msg-bottom" style="padding-bottom: 0px;margin-bottom: 0px;border-bottom: none">
                        <div>浙岱渔<span>06761</span>在东经30度，北纬50度，请及时与船东联系进行核实!</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-middle">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="info-item" style="background: #4480F8;">
                        <div class="info-title">本站渔船总量</div>
                        <div class="info-data">
                            <div class="num">399</div>
                            <div class="circle-box">
                                <img src="../../../../../public/img/menuicon/icon-home-totalboat.png">
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="info-item" style="background: #67DE9C;">
                        <div class="info-title">已参加面对面教育/应参加人数</div>
                        <div class="info-data">
                            <div class="num">500/512</div>
                            <div class="circle-box">
                                <img src="../../../../../public/img/menuicon/icon-home-joinnum.png">
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="info-item" style="background: #FFB171;">
                        <div class="info-title">本站船员总量</div>
                        <div class="info-data">
                            <div class="num">875</div>
                            <div class="circle-box">
                                <img src="../../../../../public/img/menuicon/icon-home-totalcrew.png">
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="info-item" style="background: #FD6565;">
                        <div class="info-title">联系记录总数</div>
                        <div class="info-data">
                            <div class="num">8997</div>
                            <div class="circle-box">
                                <img src="../../../../../public/img/menuicon/icon-home-totallinks.png">
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="main-bottom">
            <div class="aside-l">
                <!-- <div class="card recordbox" style="margin-bottom:20px;width:100%;position:absolute; width:100%;"> -->
                <div class="card recordbox" style="margin-bottom:20px;width:100%;">
                    <div class="card-title">
                        <div>船东联系记录
                            <span style="color:#4480F8;float: right;font-size: 16px;">查看未联系渔船 <i class="el-icon-arrow-right"></i></span>
                        </div>
                    </div>
                    <el-table
                        :data="pagedTable"
                        style="width:100%"
                        stripe>
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
                <div class="card contract-manage">
                    <div class="card-title">
                        <div>网签合同管理
                            <span style="color:#4480F8;float: right;font-size: 16px;">网签合同 <i class="el-icon-arrow-right"></i></span>
                        </div>
                    </div>
                    <div class="contract">
                        当前共有<span style="color:#4480F8">2266</span>条合同，请及时关注处理
                    </div>
                    <div class="contract-item">
                        <div>即将过期合同：<span style="color:#FFB171">236</span> 条</div>
                        <div>合同成立：<span style="color:#FFB171">586</span> 条</div>
                        <div>未签纸质合同：<span style="color:#FFB171">1355</span> 条</div>
                        <div>合同解除：<span style="color:#FFB171">126</span> 条</div>
                    </div>
                    <div class="card-title" style="margin-bottom:16px">合同检索</div>
                    <div class="retrieve">
                        <el-input placeholder="请输入船名号/船员姓名"></el-input>
                        <div class="search-btns">
                            <el-button type="primary" icon="el-icon-search">检索</el-button>
                            <el-button icon="el-icon-printer">打印</el-button>
                            <el-button icon="el-icon-upload2">导出</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="aside-r">
                <div class="card">111</div>
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

      msgList: [
          {
              title: '【系统消息】 浙岱渔2382证书即将到期，请及时核查！',
              dateTime: '2021-11-13  16:30:54',
          },
          {
              title: '【系统消息】 浙岱渔2382证书即将到期，请及时核查！',
              dateTime: '2021-11-13  08:23:12',
          },
          {
              title: '【合同消息】 当前共有1709条合同即将到期，请及时关注处理！',
              dateTime: '2021-11-12  21:38:16',
          },
          {
              title: '【系统消息】 浙岱渔2382证书即将到期，请及时核查！',
              dateTime: '2021-11-11  17:39:54',
          },
          {
              title: '【其他消息】 浙岱渔00036在东经30度，北纬50度，请及时与船东联系进行核实。',
              dateTime: '2021-11-10  22:09:22',
          },
      ],
      channelList: [
          {
              name: '上船登记',
              icon: require('../../../../../public/img/menuicon/icon-home-boarding.png'),
              bgColor: 'linear-gradient(95deg, #ACDCFF 0%, #4480F8 100%)',
          },
          {
              name: '台账管理',
              icon: require('../../../../../public/img/menuicon/icon-home-book.png'),
              bgColor: 'linear-gradient(95deg, #FDF1E8 0%, #FFB171 100%)',
          },
          {
              name: '合同管理',
              icon: require('../../../../../public/img/menuicon/icon-home-contract.png'),
              bgColor: 'linear-gradient(95deg, #A7F8F5 0%, #67DE9C 100%)',
          },
          {
              name: '求职登记',
              icon: require('../../../../../public/img/menuicon/icon-home-register.png'),
              bgColor: 'linear-gradient(95deg, #FCD1BE 0%, #FD6565 100%)',
          },
          {
              name: '培训记录',
              icon: require('../../../../../public/img/menuicon/icon-home-record.png'),
              bgColor: 'linear-gradient(95deg, #F8D2F8 0%, #B95AF5 100%)',
          },
          {
              name: '人船关联',
              icon: require('../../../../../public/img/menuicon/icon-home-connection.png'),
              bgColor: 'linear-gradient(95deg, #FFD3F7 0%, #FF74A4 100%)',
          },
      ],
      showAside: true,
    }
  },
  computed: {
    isShow300px () {
      if (!this.isTablet()) { return this.showAside ? '300px' : '0' } else { return '0' }
    },
  },
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
}
</script>
<style scoped lang="scss">
.main-see {
    background: #F9F9F9;
    min-height: calc(100vh - 60px);
    margin-top: -15px;
    padding: 20px;
    .main-top{
        display: flex;
        .aside-left{
            flex: 1;
            .title{
                margin-bottom: 20px;
                display: flex;
                .title-hello{
                    display: flex;
                    flex-flow: column;
                    justify-content: center;
                    line-height: 25px;
                    >div:first-of-type{
                        font-size: 18px;
                        color: #333333;
                        margin-bottom: 20px;
                    }
                    >div:last-of-type{
                        font-size: 16px;
                        color: #666666;
                    }
                }
            }
            .msg-manager{
                margin-bottom: 20px;
                .msg-item{
                    line-height: 20px;
                    font-size: 12px;
                    display: flex;
                    justify-content: space-between;
                    padding: 10px;
                    border-radius: 5px;
                    &:hover{
                        background: rgba(68, 128, 248, .1);
                        transition: all .3s;
                    }
                    .origin{
                        display: inline-block;
                        width: 6px;
                        height: 6px;
                        background: #4480F8;
                        border-radius: 100%;
                        margin-right: 8px;
                    }
                    .item-left{
                        color: #666666;
                    }
                    .item-right{
                        color: #999999;
                        margin-right: 34px;
                    }
                }
            }
            .speed-content{
                display: flex;
                >.card{
                    flex: 1;
                }
                .convenient-channel{
                    margin-right: 20px;
                    .grid{
                        display: grid;
                        grid-template-columns: repeat(3, 1fr); /* 相当于 1fr 1fr 1fr */
                        grid-template-rows: repeat(2, 1fr); /* fr单位可以将容器分为几等份 */
                        grid-row-gap: 23px; /* grid-column-gap 和 grid-row-gap的简写 */
                        // place-items:center center
                    }
                    .grid>div{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        color: #666666;
                        line-height: 20px;
                        cursor: pointer;
                        .icon-box{
                            width: 40px;
                            height: 40px;
                            border-radius: 10px;
                            margin-bottom: 10px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            >img{
                                width: 20px;
                                height: 20px;
                            }
                        }
                    }
                }
                .quick-query{
                    .search{
                        display: flex;
                        >.el-input{
                            margin-right: 14px;
                        }
                        >.el-button{
                            padding: 10px 20px;
                        }
                        >.el-input__inner{
                            height: 36px;
                        }
                    }
                    .search:not(:last-of-type){
                        margin-bottom: 24px;
                    }
                }
            }
        }
        .aside-right{
            width: 277px;
            margin-left: 20px;
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
                }
            }
        }
    }
    .main-middle{
        margin: 20px 0;
        .info-item{
            padding: 16px;
            border-radius: 10px;
            line-height: 20px;
            color: #FFFFFF;
            .info-title{
                margin-bottom: 7px;
            }
            .info-data{
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                .num{
                    font-size: 24px;
                    font-weight: bold;
                    font-family: DIN Alternate;
                }
                .circle-box{
                    width: 44px;
                    height: 44px;
                    background: rgba(255, 255, 255, .25);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    >img{
                        width: 24px;
                    }
                }
            }
        }
    }
    .main-bottom{
        display: flex;
        .aside-l{
            // position: relative;
            flex: 1;
            // .recordbox{
            //     &::after{
            //         content: '';
            //         width: 100%;
            //         height: 100%;
            //     }
            // }
            .contract-manage{
                // margin-top: 420px;
                .contract{
                    line-height: 20px;
                    color: #666666;
                    padding: 8px 0;
                    background: #F9F9F9;
                    border-radius: 5px;
                    text-align: center;
                }
                .contract-item{
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #EDEDED;
                    padding: 25px 0;
                    margin-bottom: 28px;
                }
                .retrieve{
                    display: flex;
                    justify-content: space-between;
                    .el-input{
                        width: 512px;
                    }
                    .el-input__inner{
                        height: 36px;
                        line-height: 36px;
                    }
                    .search-btns{
                        .el-button{
                            padding: 10px 16px;
                            border-radius: 5px;
                        }
                        .el-button+.el-button{
                            margin-left: 15px;
                        }
                    }
                }
            }
        }
        .aside-r{
            width: 277px;
            margin-left: 20px;
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
</style>
