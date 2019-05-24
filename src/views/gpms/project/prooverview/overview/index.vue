<template>
  <div>
    <basic-container>
      <div class="box">
        <operation-container class="clearmagin">
          <template slot="left">
            <p>概况</p>
          </template>
          <template slot="right">
            <el-button type="small" class="pk" icon="el-icon-picture-outline" @click='handleClicks'>返回我的项目</el-button>
          </template>
        </operation-container>
        <el-row>
          <!--left-->
          <el-col class="borders parantL" :span="16">
            <el-row>
              <el-col class="bolds">基本信息</el-col>
            </el-row>
            <el-row class="">
              <el-col class="font">
                <el-row class="font">
                  <el-col :span="11">
                    项目名称: {{basic.proName}}
                  </el-col>
                  <el-col :span="2">
                    <el-button type="small">立项阶段</el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div style="overflow: hidden;" class="heightF">
              <div style="float: left;">
                发布人： {{basic.issuer}}
              </div>
              <div style="float: left;">
                发布时间： {{basic.suerTime}}
              </div>
            </div>
            <el-row class="marTop">
              <el-col :span="12">
                编号： {{basic.number}}
              </el-col>
              <el-col :span="10">
                项目类型： {{basic.type}}
              </el-col>
            </el-row>
            <el-row class="marTop">
              <el-col :span="12">
                业务类型： {{basic.business}}
              </el-col>
              <el-col :span="10">
                <el-row>
                  <el-col :span="6">
                    相关客户：
                  </el-col>
                  <el-col :span="18">
                    <div v-for="(item,i) in basic.client" :key='i' style="overflow: hidden;" class="boxFont">
                      {{item}}
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="marTop">
              <el-col :span="12">
                项目预算(万元)： {{basic.budget}}
              </el-col>
              <el-col :span="10">
                合同金额(元)： {{basic.contract}}
              </el-col>
            </el-row>

            <el-row class="marTop">
              <el-col :span="12">
                <el-row>
                  <el-col :span="5">
                    项目标签：
                  </el-col>
                  <el-col :span="19">
                    <div v-for="(item,i) in basic.proTag" :key='i' style="overflow: hidden;" class="boxFont">
                      {{item}}
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="10">
                是否关联产品： {{basic.issus}}
              </el-col>
            </el-row>
            <el-row class="marTop">
              <el-col :span="12">
                <el-row>
                  <el-col :span="5">
                    承接部门：
                  </el-col>
                  <el-col :span="19">
                    <div v-for="(item,i) in basic.continue" :key='i' style="overflow: hidden;" class="boxFont">
                      {{item}}
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <!--right-->
          <el-col :span="8" class="borders parantH">
            <el-row>
              <el-col :span="20" class="bolds">基本信息</el-col>
              <el-col :span="4" class="marTopSmall">
                <el-button type="small">管理</el-button>
              </el-col>
            </el-row>
            <el-row class="marBot2">
              <el-col>
                <el-row>
                  <el-col :span="6" class="textL">
                    市场经理：
                  </el-col>
                  <el-col :span="3">
                    <div class="headBox"></div>
                  </el-col>
                  <el-col :span="10">
                    {{team.maranger.name}}
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="marBot2">
              <el-col>
                <el-row>
                  <el-col :span="6" class="textL">
                    项目经理：
                  </el-col>
                  <el-col :span="3">
                    <div class="headBox"></div>
                  </el-col>
                  <el-col :span="10">
                    {{team.proMan.name}}
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="marBot2">
              <el-col>
                <el-row>
                  <el-col :span="6" class="textL">
                    项目指导人：
                  </el-col>
                  <el-col :span="3">
                    <div class="headBox"></div>
                  </el-col>
                  <el-col :span="10">
                    {{team.guide.name}}
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="marBot2">
              <el-col>
                <el-row>
                  <el-col :span="6" class="textL">
                    项目成员：
                  </el-col>
                  <el-col :span="18">
                    <div style="">
                      <div v-for="i in team.member.num" :key="i" style="float: left;margin-right: 10px;margin-bottom: 20px;">
                        <div class="headBox"></div>
                        <p style="float:left;" class="nameMar">殷亚增</p>
                      </div>

                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!--选项卡切换-->
        <el-row>
          <div class="contianBox">
            <p>数据推荐</p>
            <iep-tabs v-model="activeTab" :tab-list="tabList">
              <template v-if="activeTab ==='Recommend'" v-slot:Recommend>
                <recommend v-loading="activeTab !=='Recommend'"></recommend>
              </template>
              <template v-if="activeTab ==='Materials'" v-slot:Materials>
                <materials v-loading="activeTab !=='Materials'"></materials>
              </template>
              <template v-if="activeTab === 'Guide'" v-slot:Guide>
                <guide v-loading="activeTab !=='Guide'"></guide>
              </template>
              <template v-if="activeTab === 'Member'" v-slot:Member>
                <member v-loading="activeTab !=='Member'"></member>
              </template>
            </iep-tabs>
          </div>
        </el-row>
      </div>
    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import Recommend from './Recommend/'
import Materials from './Materials/'
import Guide from './Guide/'
import Member from './Member/'
export default {
  mixins: [mixins],
  data () {
    return {
      tabList: [{
        label: '推荐项目',
        value: 'Recommend',
      }, {
        label: '推荐材料',
        value: 'Materials',
      }, {
        label: '推荐项目经理',
        value: 'Guide',
      }, {
        label: '推荐项目成员',
        value: 'Member',
      }],
      activeTab: 'Recommend',
      basic: {
        proName: '北京市西城区五个主题事项梳理项目服务',
        issuer: '张三',
        suerTime: '2019-02-22',
        number: 'GM20190001',
        type: '外部项目',
        business: '咨询-规划',
        client: ['佛山市经济和信息化局'],
        budget: 30,
        contract: 245000,
        proTag: ['互联网+政务服务', '顶层规划'],
        issus: '是',
        continue: ['佛山司马钱信息技术有限公司'],
      },
      team: {
        maranger: {
          src: '',
          name: '殷亚增',
        },
        proMan: {
          src: '',
          name: '殷亚增',
        },
        guide: {
          src: '',
          name: '殷亚增',
        },
        member: {
          num: 9,
        },
      },
    }
  },
  created () {
    this.getdetail()
  },
  components: {
    Recommend, Materials, Guide, Member,
  },
  methods: {
    getdetail () {
      this.$store.dispatch('GetSurvey').then(data => {
        console.log(data)
      })
    },
    handleClicks () {
      this.$router.push('/Gpms/project')
    },
    // 标签组件
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  background-color: #fff;
  position: relative;
  color: #666;
  .clearmagin {
    margin: auto 0;
    box-sizing: border-box;
    padding: 0 20px;
    p {
      font-size: 18px;
      font-weight: bold;
    }
    .pk {
      margin-top: 0px;
    }
  }
  .el-row {
    margin-top: 15px;
  }
  .contianBox {
    border: 1px solid #ccc;
    padding: 3px 15px;
    font-size: 14px;
    font-weight: 900;
    margin-bottom: 15px;
    height: 480px;
  }
  .headBox {
    width: 30px;
    height: 30px;
    border: 1px solid #ccc;
    margin-top: -8px;
    float: left;
  }
  .nameMar {
    margin-top: -1px;
    margin-left: 9px;
  }
  .boxFont {
    padding: 5px 8px;
    border: 1px solid #ccc;
    float: left;
    margin-top: -5px;
    margin-right: 8px;
  }
  .parantL {
    width: 65%;
    margin-right: 1.6%;
  }
  .parantH {
    height: 100%;
  }
  .el-row {
    font-size: 14px;
  }
  .marTop {
    margin-top: 20px;
  }
  .marBot2 {
    margin-bottom: 13px;
    .textL {
      text-align: right;
    }
  }
  .marTopSmall {
    margin-top: -5px;
  }
  .font {
    line-height: 47px;
    height: 47px;
    margin-bottom: 0;
  }
  .heightF {
    font-size: 12px;
    div {
      margin-right: 30px;
    }
  }
  .borders {
    box-sizing: border-box;
    border: 1px solid #ccc;
    padding: 10px 15px 20px 15px;
    .bolds {
      font-weight: bold;
      font-size: 14px;
      padding-bottom: 10px;
      .Explain {
        cursor: pointer;
        font-size: 13px;
        color: gray;
        padding-left: 5px;
      }
      .Blackwindow {
        line-height: 2px;
      }
    }
    .leftBox {
      margin-right: 8px;
      .leftBoxone {
        border: 1px solid gray;
        margin-bottom: 10px;
        .ones {
          width: 50%;
          display: inline-block;
          .onesSmallTop {
            box-sizing: border-box;
            border-bottom: 1px solid gray;
          }
        }
        .twos {
          width: 50%;
          display: inline-block;
          vertical-align: top;
          box-sizing: border-box;
          border-left: 1px dashed gray;
          .twosSmallUp {
            box-sizing: border-box;
            border-bottom: 1px solid gray;
          }
        }
      }
      .leftBoxtwo {
        border: 1px solid gray;
        .firsts {
          width: 50%;
          display: inline-block;
        }
        .seconds {
          width: 50%;
          display: inline-block;
          vertical-align: top;
          box-sizing: border-box;
          border-left: 1px solid gray;
          .secondsTop {
            border-bottom: 1px dashed gray;
          }
        }
      }
    }
    .rightBox {
      background-color: goldenrod;
      .rightBoxone {
        width: 98%;
        border: 1px solid gray;
        display: inline-block;
        .solids {
          border-bottom: 1px solid gray;
        }
        .dashed {
          border-bottom: 1px dashed gray;
        }
      }
      .rightBoxtwo {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid gray;
        display: inline-block;
        .solids {
          border-bottom: 1px solid gray;
        }
        .dashed {
          border-bottom: 1px dashed gray;
        }
      }
    }
    .fontname {
      font-size: 13px;
      margin-top: 10px;
      padding-left: 40px;
    }
    .fontcontent {
      font-size: 13px;
      padding-left: 40px;
      margin-bottom: 0;
      p {
        margin: 0;
      }
    }
  }
}
.centers {
  text-align: center;
}
.cle {
  margin: 0 0 20px 0;
  font-size: 35px;
}
.twoFonts {
  width: 50%;
  display: inline-block;
  font-size: 11px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-bottom: 9px;
}
.money {
  font-size: 13px;
  padding: 5px 0 5px 10px;
}
.twoFontsbut {
  padding-bottom: 11px;
}
.mright {
  padding-top: 5px;
  padding-bottom: 10px;
}
.marbFonts {
  margin-bottom: 5px;
}
.twoFontsBox {
  padding-top: 1px;
}
table {
  width: 100%;
  text-align: center;
  border-color: gray;
}
.titl {
  text-align: left;
  padding-left: 10px;
  font-weight: bold;
}
td,
th {
  padding: 10px 0;
}
.Fields {
  text-align: left;
  padding-left: 10px;
}
.calls {
  margin-top: 25px;
  padding-left: 45px;
  padding-right: 45px;
}
// 标签组件
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.Labelesname {
  border-bottom: 1px solid gray;
  margin-bottom: 10px;
}
.gridBox {
  width: 110px;
  height: 140px;
  // background-color: yellow;
  display: inline-block;
  vertical-align: top;
  text-align: center;
  img {
    width: 110px;
    height: 110px;
    display: block;
  }
}
.pkbox {
  font-size: 40px;
  line-height: 110px;
}
</style>


