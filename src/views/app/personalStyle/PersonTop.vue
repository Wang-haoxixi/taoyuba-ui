<template>
  <div class="personal-top">
    <el-card class="box-card" shadow="hover">
      <div class="img-con">
        <div class="img"><img :src="img" alt=""></div>
        <span class="num">GM000001</span>
      </div>
      <div class="text">
        <div class="name-con">
          <span class="name">{{personName}}</span>
          <span class="post">{{post}}
            <!-- <span class="dn show1" :class="show1">V</span>
            <span class="dn show2 el-icon-star-on" :class="show2"></span>
            <span class="dn show3 iconfont icon-huangguan" :class="show2"></span> -->
            <iep-identity-mark class="mark" icon="iep2-icondongshichang" title="董事长"></iep-identity-mark>
            <iep-identity-mark class="mark" icon="iep2-iconzongjingli" title="总经理"></iep-identity-mark>
            <iep-identity-mark class="mark" icon="iep2-icontouziren1" title="投资人"></iep-identity-mark>
            <iep-identity-mark class="mark" icon="iep2-iconbanchang" title="班长"></iep-identity-mark>
            <iep-identity-mark class="mark" icon="iep2-iconbanwei" title="班委"></iep-identity-mark>
            <iep-identity-mark class="mark" icon="iep2-iconweiyuanhuizhuren" title="委员会主任"></iep-identity-mark>
            <iep-identity-mark class="mark" icon="iep2-iconweiyuanhui" title="委员会"></iep-identity-mark>
            <iep-identity-mark class="mark" icon="iep2-iconzhuanjia1" title="专家"></iep-identity-mark>
          </span>
        </div>
        <span class="autograph">个性签名：{{autograph}}</span>
        <div class="classTags">
          <div class="classTag">
            <el-tag type="white" v-for="item in tags" :key="item.id">{{item.tag}}</el-tag>
          </div>
          <el-button class="text-btn" type="text" @click="show"><span :class="isShow?'hide':'dib'">展示全部</span><span :class="isShow?'dib':'hide'">收起全部</span><i class="el-icon--right" :class="isShow?'el-icon-arrow-up':'el-icon-arrow-down'"></i></el-button>
          <div class="classTag" v-show="isShow">
            <el-tag type="white" v-for="item1 in tags1" :key="item1.id">{{item1.tag1}}</el-tag>
          </div>
        </div>
      </div>
      <div class="right-con">
        <div class="labs-con">
          <div class="data-lab" v-for="lab in labList" :key="lab.id">
            <div class="count">{{lab.data}}</div>
            <div class="labTitle"><span>{{lab.labTitle}}</span></div>
          </div>
        </div>
        <el-row>
          <el-button size="mini" type="danger" plain>邮件</el-button>
          <el-button size="mini" type="danger" plain>拜师</el-button>
          <el-button size="mini" type="danger" plain>打赏</el-button>
          <el-button size="mini" type="danger">PK</el-button>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShow: false,
      img: require('./img/pr1.jpg'),
      personName: '何舟杰',
      post: '后端开发工程师',
      show1: 'show',
      show2: 'show',
      show3: 'show',
      autograph: '做中学，学中悟，悟中得！',
      tags: [
        {
          tag: '后端开发',
        },
        {
          tag: '系统架构',
        },
        {
          tag: '数据库规划',
        },
        {
          tag: 'PHP开发',
        },
        {
          tag: '项目管理',
        },
      ],
      tags1: [
        {
          tag1: '后端开发',
        },
        {
          tag1: '系统架构',
        },
        {
          tag1: '数据库规划',
        },
        {
          tag1: 'PHP开发',
        },
        {
          tag1: '项目管理',
        },
      ],
      labList: [
        {
          data: '670',
          labTitle: '信用值',
        },
        {
          data: '11',
          labTitle: '活跃度',
        },
        {
          data: '5',
          labTitle: '资产排名',
        },
      ],
    }
  },
  methods: {
    show () {
      this.name = 'el-icon-arrow-up',
        this.isShow = !this.isShow
    },
  },
}
</script>
<style lang="scss" scoped>
.hide {
  display: none;
}
.dib {
  display: inline-block;
}
.personal-top {
  margin-top: 30px;
  .box-card {
    .img-con {
      display: flex;
      margin-top: 15px;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      align-content: center;
      .img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid #ebeef5;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          height: 100%;
          transition: 0.5s;
          border-radius: 50%;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
    .labs-con {
      display: flex;
      justify-content: space-between;
      .data-lab {
        padding: 0 20px;
        border-right: 1px solid #eee;
        text-align: center;
        .labTitle {
          color: #999;
        }
      }
    }
    .text {
      flex: 2;
      margin-left: 30px;
      padding-right: 20px;
    }
    .post {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #999;
      .mark {
        margin: 0 5px;
      }
    }
    .classTags {
      margin-top: 20px;
      transition: all 0.5s;
      .text-btn {
        color: #666;
        &:hover {
          color: #999;
        }
      }
    }
    .classTag {
      margin-bottom: 10px;
      .el-tag {
        margin-right: 5px;
        &:hover {
          color: #cb3737;
          background: #fef0f0;
          border-color: #cb3737;
        }
      }
    }
    .right-con {
      display: flex;
      margin-top: 15px;
      flex-direction: column;
      align-items: center;
    }
    .labs-con {
      margin-bottom: 30px;
      .count {
        font-size: 24px;
      }
      .data-lab {
        &:nth-child(3) {
          border: 0;
        }
      }
    }
    .name-con {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      margin-bottom: 10px;
      .name {
        margin-right: 10px;
        font-size: 20px;
      }
    }
    .autograph {
      color: #666;
    }
    .dn {
      opacity: 0;
    }
    .show {
      opacity: 1;
    }
    .show1 {
      display: inline-block;
      margin: 0 5px 0 10px;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      background-color: #cb3737;
      color: #fff;
    }
    .show2 {
      display: inline-block;
      margin-right: 5px;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      line-height: 16px;
      font-size: 12px;
      text-align: center;
      background-color: #ff9961;
      color: #fff;
    }
    .show3 {
      display: inline-block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      text-align: center;
      background-color: #fec751;
      color: #fff;
    }
  }
}
</style>
<style scoped>
.personal-top >>> .el-card__body {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}
.personal-top >>> .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
.personal-top >>> .el-button--danger {
  color: #fff;
  background: #cb3737;
  border-color: #cb3737;
}
.personal-top >>> .el-button--danger:hover {
  color: #cb3737;
  background: #fef0f0;
  border-color: #cb3737;
}
.personal-top >>> .el-button--danger.is-plain {
  color: #cb3737;
  background: #fef0f0;
  border-color: #cb3737;
}
.personal-top >>> .el-button--danger.is-plain:hover {
  color: #fff;
  background: #cb3737;
}
</style>
