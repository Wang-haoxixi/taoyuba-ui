<template>
  <div class="information">
    <a-spin :spinning="pageLoading">
      <el-card class="box-card" shadow="hover" :body-style="bodyStyle">
        <el-row>
          <el-col :span="4" class="dotted">
            <div class="left">
              <div class="img">
                <iep-img-avatar :size="90" :src="userInfo.sysUser.avatar" alt="头像"></iep-img-avatar>
              </div>
              <div class="code-name">{{form.staffId}}</div>
              <el-tooltip class="item" effect="dark" content="资料完善度" placement="top">
                <el-progress :percentage="form.integrity" color="#68C769"></el-progress>
              </el-tooltip>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="right">
              <div class="user-poster">   
                <span class="say">{{timeFix}}，{{userInfo.sysUser.username}}
                  <iep-identity-mark icon="iep2-iconchengyuan" title="成员"></iep-identity-mark>
                  <span class="welcome-text">
                    <!-- {{welcome}} -->
                    <span v-for="(item,index) in userInfo.roleName" :key="index" style="margin-left:5px">{{item}}</span>                 
                    <!-- <span v-for="(item,index) in userInfo.roleName" :key="index" style="margin-left:5px">
                      <span v-if="item !== '船员' && item !== '船东' && item !== '船员中介' && item !== '渔村'">{{item}}</span>
                      <span v-if="item === '船员' && crewStatus === 2">船员</span>
                      <span v-if="item === '船员' && crewStatus === 1">船员(待审核)</span>
                      <span v-if="item === '船东' && shipOwnerStatus === 2">船东</span>
                      <span v-if="item === '船东' && shipOwnerStatus === 1">船东(待审核)</span>
                      <span v-if="item === '船员中介' && agentStatus === 2">船员中介</span>
                      <span v-if="item === '船员中介' && agentStatus === 1">船员中介(待审核)</span>
                      <span v-if="item === '渔村' && villageStatus === 2">渔村</span>
                      <span v-if="item === '渔村' && villageStatus === 1">渔村(待审核)</span>
                    </span>                    -->
                  </span>
                </span>
              </div>
              <div class="user-info">
                <span v-if="form.title" class="color">{{form.title}}</span>
                <span v-if="form.job" class="border">{{form.job}}</span>
                <!-- <router-link class="more" to="">更多<i class="el-icon-d-arrow-right"></i></router-link> -->
                <!-- <span class="drop-down">产品技术委员会<i class="el-icon-arrow-down"></i></span> -->
              </div>
              <div class="user-data">
                <!-- <a class="inline task" @click="handleSome1()">
                  <i class="icon-qian icon padding"></i>
                  <span>完成每日工作，领国脉贝<i class="el-icon-d-arrow-right"></i></span>
                </a> -->
                <!-- <a class="inline change" @click="handleSome2()">
                  领导桌面
                </a> -->
                <el-button size="small">产品设计</el-button>
                <el-button size="small">项目管理</el-button>
                <el-button size="small">原型设计</el-button>
                <el-button size="small">平台规划</el-button>
                <div class="inline data">
                  <div class="data-lab">
                    <div class="count" @click="handleSome3()">{{form.tagNum}}</div>
                    <div class="labTitle">
                      <span>标签</span>
                      <span class="span">
                        <iep-tip icon="el-icon-question" content="您创建和管理标签的数量">
                        </iep-tip>
                      </span>
                    </div>
                  </div>
                  <div class="data-lab">
                    <div class="count" @click="handleSome4()">{{form.materialNum}}</div>
                    <div class="labTitle">
                      <span>材料</span>
                      <span class="span">
                        <iep-tip icon="el-icon-question" content="您上传材料的总数量">
                        </iep-tip>
                      </span>
                    </div>
                  </div>
                  <div class="data-lab hideLine">
                    <div class="count" @click="handleSome5()">{{form.credit}}</div>
                    <div class="labTitle">
                      <span>信用</span>
                      <span class="span">
                        <iep-tip icon="el-icon-question" content="个人信用是基于内网创建的一套征信系统，依据个人在内网中的各项行为数据，运用云计算和机器学习等技术，对各维度数据进行综合处理和评估，在个人工作、学习、管理、协作五个维度客观呈现个人信用状况的综合分值。信用值的高低将影响项目承接机会、企业内部投资、员工提拔、晋升、领导表扬/奖励及享受特权的重要依据。">
                        </iep-tip>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <span style="margin:20px" v-if="!isManger">
        <i class="el-icon-warning"></i>
        您已加入
          <span v-for="(item,index) in userInfo.roleName" :key="index" style="margin-left:5px">
              {{item}}
          </span>
        <el-button style="color:#0185d8" type="text" @click="openDialog">请选择</el-button>
      </span>
    </a-spin>
    <el-dialog
      title="选择角色"
      :visible.sync="dialogShow"
      width="80%">
      <span style="margin:20px"><i class="el-icon-warning"></i>请选择要加入的角色</span>
      <div class="roles">
        <template v-for="(item,index) of roleList" >
          <div class="role" v-if="userInfo.roles.indexOf(item.role) === -1" :key="index">
            <el-button @click="changeSelect(item.role)" style="width:80%;margin:auto" :type="item.role == select ? 'primary' : 'default'">{{item.name}}</el-button>
          </div>
        </template>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUser()">确 定</el-button>
        <el-button @click="dialogShow = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>    
// import { getIndex } from '@/api/wel/index'
import { getUserInfo } from '@/api/login'
import { timeFix, welcome } from '@/util/text'
import { getObj } from '@/api/admin/role'
// import { getCrewByUserId } from '@/api/post/crew'
// import { getShipownerDetail } from '@/api/tmlms/shipowner/index'
// import { detailAgent } from '@/api/tmlms/agent/index'
// import { detailVillage } from '@/api/tmlms/bvillage/index'
const initIndexForm = () => {
  return {
    name: '', //名字
    staffId: '', //工号
    job: '', //职位
    title: '',//职称
    tagNum: 10,//标签
    materialNum: 10,//材料
    credit: 10,//信用
    integrity: 0, // 资料完善度
  }
}
export default {
  data () {
    return {
      timeFix: timeFix(),
      welcome: welcome(),
      pageLoading: true,
      bodyStyle: {
        padding: 0,
      },
      userInfo: {
        sysUser:{},
        roles:[],
        roleName:[],
      },
      select: '',
      form: initIndexForm(),
      dialogShow: false, //弹窗
      roleList: [
        {
          name: '船员',
          select: false,
          role: 105,
        },{
          name: '船东',
          select: false,
          role: 108,
        },{
          name: '中介',
          select: false,
          role: 109,
        },{
          name: '基层组织',
          select: false,
          role: 112,
        },
      ],
      crewStatus: '',
      shipOwnerStatus: '',
      agentStatus: '',
      villageStatus: '',
      isIdCard: false,
      isManger: false,
    }
  },
  computed: {
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSome1 () {
      this.$message.success('页面建设中')
    },
    handleSome2 () {
      this.$message.success('功能开发中')
    },
    handleSome3 () {
      this.$openPage('/app/tag_library')
    },
    handleSome4 () {
      this.$openPage('/wel/material/datum')
    },
    handleSome5 () {
      this.$message.success('个人信用评分, 功能开发中')
    },
    openDialog () {
      this.dialogShow = true
    },
    // 单选角色
    changeSelect (role){
      this.select = role
    },
    // 选好角色后新增信息
    addUser () {
      if(this.select){
        // switch(this.select) {
        //     case 105:
        //         this.$router.push({name: 'detailBoatMan',query: {userId: this.userInfo.sysUser.userId}})
        //         break
        //     case 108:
        //         this.$router.push({name: 'applyDetailShipowner',query: {userId: this.userInfo.sysUser.userId}})
        //         break
        //     case 109:
        //         this.$router.push({name: 'detailAgent',query: {userId: this.userInfo.sysUser.userId}})
        //         break
        //     case 112:
        //         this.$router.push({name: 'applyBvillage',query: {userId: this.userInfo.sysUser.userId}})
        //         break
        //     default:
        //         return false
        // } 
        if (this.select === 105 && this.isIdCard === true) {
          this.$router.push({name: 'applyDetailBoatMan',query: {userId: this.userInfo.sysUser.userId}})
        } else if (this.select === 108 && this.isIdCard === true) {
          this.$router.push({name: 'applyDetailShipowner',query: {userId: this.userInfo.sysUser.userId}})
        } else if (this.select === 109 && this.isIdCard === true) {
          this.$router.push({name: 'detailAgent',query: {userId: this.userInfo.sysUser.userId}})
        } else if (this.select === 112 && this.isIdCard === true) {
          this.$router.push({name: 'applyBvillage',query: {userId: this.userInfo.sysUser.userId}})
        } else {
          this.$router.push({name: 'detailIformation'})
        }
      }else{
        this.$message.error('请选择角色!')
      }
    },
    // 获取roles
    getRole (val) {
      if (val === 111) {
        this.isManger = true
      }
      getObj(val).then(res=>{
         this.userInfo.roleName.push(res.data.data.roleName)
      })
    },
    loadPage () {
      getUserInfo().then(res=>{
        this.userInfo = res.data.data
        if (res.data.data.sysUser.idCard && res.data.data.sysUser.idCard !== '') {
          this.isIdCard = true
        } else {
          this.isIdCard = false
        }
        this.$set(this.userInfo,'roleName',[])
        //过滤组织成员    
       const  roles =  this.userInfo.roles.filter(item => item !==3)
        roles.forEach(item=>{   
          this.getRole(item)
        })
        // getCrewByUserId(this.userInfo.sysUser.userId).then((data) => {
        //   this.crewStatus = data.data.data.status
        // })
        // getShipownerDetail(this.userInfo.sysUser.userId).then((data) => {
        //   this.shipOwnerStatus = data.data.data.status
        // })
        // detailAgent(this.userInfo.sysUser.userId).then((data) => {
        //   this.agentStatus = data.data.data.status
        // })
        // detailVillage(this.userInfo.sysUser.userId).then((data) => {
        //   this.villageStatus = data.data.data.status
        // })
      })
      this.pageLoading = false
      // getIndex().then(({ data }) => {
      //   this.form = this.$mergeByFirst(initIndexForm(), data.data)
      //   this.pageLoading = false
      //   this.$emit('on-finish')
      // })
    },
  },
}
</script>

<style lang="scss" scoped>
.welcome-text {
  margin-left: 10px;
  font-size: 16px;
  color: #0185d8;
}
.information {
  width: 100%;
  background: white;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  .box-card {
    margin: 20px;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .el-row {
    .el-col {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 10px 0;
      margin: 0;
      .left {
        width: 100%;
        text-align: center;
        .el-progress {
          margin-top: 10px;
          padding: 0 20px;
        }
        .img {
          margin: 0 auto;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          overflow: hidden;
        }
        .code-name {
          padding-top: 10px;
        }
      }
      .right {
        padding-left: 20px;
        > div {
          padding: 5px 0;
        }
        .el-progress {
          width: 120px;
        }
        .user-poster {
          display: flex;
          justify-content: flex-start;
          .say {
            display: inline-block;
            margin-top: 3px;
            font-size: 15px;
            .honor {
              display: inline-block;
              vertical-align: middle;
              img {
                display: block;
                width: 20px;
                height: 20px;
              }
            }
          }
          .gov {
            display: inline-block;
            margin-left: 20px;
            max-width: 520px;
            font-size: 16px;
            color: #0185d8;
            vertical-align: middle;
          }
        }
        .user-info {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .drop-down {
            padding: 2px 20px;
            font-size: 14px;
            border-radius: 20px;
            background-color: #bbb;
            color: #fff;
            i {
              margin-left: 5px;
            }
            cursor: pointer;
            &:hover {
              opacity: 0.7;
            }
          }
          span {
            margin: 0 4px;
          }
          .border {
            padding: 3px 12px;
            min-width: 25px;
            border-radius: 40px;
            border: 1px solid #eee;
            font-size: 12px;
            text-align: center;
            vertical-align: middle;
            background-color: #f5f7fa;
            color: #333;
          }
          .color {
            display: inline-block;
            margin: 0;
            font-size: 14px;
            color: #7a7a7a;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .more {
            min-width: 40px;
            padding: 0 10px;
            color: #2558a9;
            &:hover {
              color: #4689f3;
            }
          }
        }
        .user-data {
          display: flex;
          align-items: center;
          .inline {
            display: flex;
            align-items: center;
            .padding {
              padding-right: 5px;
              font-size: 18px;
            }
          }
          .task {
            padding: 3px 10px;
            font-size: 14px;
            border-radius: 3px;
            color: #666;
            .icon {
              font-size: 20px !important;
              color: #ffbc01;
            }
            &:focus,
            &:hover {
              opacity: 0.6;
              outline: none;
            }
          }
          .change {
            padding: 4px 10px;
            border-radius: 3px;
            font-size: 14px;
            text-align: center;
            color: #0185d8;
            margin-left: 10px;
            border: 1px solid #0185d8;
            -webkit-transition: all 0.5s;
            transition: all 0.5s;
            &:focus,
            &:hover {
              background-color: #0185d8;
              color: #fff;
              outline: none;
            }
          }
          .data {
            padding-left: 20px;
            .data-lab {
              padding: 5px 24px;
              position: relative;
              text-align: center;
              &:after {
                content: "";
                position: absolute;
                right: 0;
                top: 0;
                width: 1px;
                background: #ececec;
                height: 100%;
              }
              .count {
                cursor: pointer;
                font-size: 24px;
                color: #484848;
                &:hover {
                  color: rgb(172, 172, 172);
                }
              }
              .labTitle {
                color: #bbb;
                .span {
                  padding-left: 5px;
                }
              }
            }
            .hideLine:after {
              width: 0;
            }
          }
        }
      }
    }
  }
  .dotted {
    border-right: 2px dotted #eee;
    box-sizing: border-box;
  }
  .el-icon-question {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
}
@media (min-width: 0px) and (max-width: 1025px) {
  .information {
    font-size: 14px;
    .el-col-3 {
      width: auto;
    }
    .el-row .el-col .right .user-info .more {
      min-width: 50px;
    }
    .el-row .el-col .right .user-poster .gov {
      max-width: 440px;
    }
    .el-row .el-col .right .user-data .data .data-lab {
      min-width: 50px;
    }
  }
}
@media (min-width: 769px) and (max-width: 1026px) {
}
@media (min-width: 0px) and (max-width: 769px) {
  .el-col-20 {
    width: 100%;
  }
  .information {
    font-size: 12px;
    .dotted {
      display: none !important;
    }
    .el-row {
      .el-col .right .user-poster .gov {
        max-width: 310px;
      }
      .el-col-21 {
        width: 100%;
        .right {
          margin: 0 auto;
          padding: 5px;
        }
      }
    }
  }
}
.roles {
  display: flex;
  flex-wrap: wrap;
  .role{
    width: 200px;
    margin: 10px;
    text-align: center;
  }
}
</style>
<style lang="css" scoped>
.information >>> .el-card__body {
  width: 100%;
}
</style>
