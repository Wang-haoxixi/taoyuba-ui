<template>
  <div class="information">
    <a-spin :spinning="pageLoading">
      <el-card class="box-card" shadow="hover" :body-style="bodyStyle">
        <el-row>
          <el-col :span="4" class="dotted">
            <div class="left">
              <div class="img">
                <iep-img-avatar :size="90" :src="userInfo.avatar" alt="头像"></iep-img-avatar>
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
                <span class="say">{{timeFix}}，{{form.name}}
                  <iep-identity-mark icon="iep2-iconchengyuan" title="成员"></iep-identity-mark>
                  <span class="welcome-text">{{welcome}}</span>
                </span>
              </div>
              <div class="user-info">
                <span v-if="form.title" class="color">{{form.title}}</span>
                <span v-if="form.job" class="border">{{form.job}}</span>
                <!-- <router-link class="more" to="">更多<i class="el-icon-d-arrow-right"></i></router-link> -->
                <!-- <span class="drop-down">产品技术委员会<i class="el-icon-arrow-down"></i></span> -->
              </div>
              <div class="user-data">
                <a class="inline task" @click="handleSome1()">
                  <i class="icon-qian icon padding"></i>
                  <span>完成每日工作，领国脉贝<i class="el-icon-d-arrow-right"></i></span>
                </a>
                <a class="inline change" @click="handleSome2()">
                  领导桌面
                </a>
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
    </a-spin>
  </div>
</template>
<script>
import { getIndex } from '@/api/wel/index'
import { timeFix, welcome } from '@/util/text'
import { mapGetters } from 'vuex'
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
      form: initIndexForm(),
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
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
    loadPage () {
      this.pageLoading = true
      getIndex().then(({ data }) => {
        this.form = this.$mergeByFirst(initIndexForm(), data.data)
        this.pageLoading = false
        this.$emit('on-finish')
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.welcome-text {
  margin-left: 10px;
  font-size: 16px;
  color: #cb3737;
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
            color: #cb3737;
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
            background: #f9eae7;
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
            color: #cb3737;
            margin-left: 10px;
            border: 1px solid #cb3737;
            -webkit-transition: all 0.5s;
            transition: all 0.5s;
            &:focus,
            &:hover {
              background-color: #cb3737;
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
</style>
<style lang="css" scoped>
.information >>> .el-card__body {
  width: 100%;
}
</style>