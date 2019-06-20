<template>
  <el-card class="box-card" shadow="always">
    <el-row>
      <el-col :span="4" class="dotted">
        <div class="left">
          <div class="img">
            <iep-img-avatar :size="180" :src="userInfo.avatar" alt="头像"></iep-img-avatar>
          </div>
        </div>
      </el-col>

      <el-col :span="20">
        <div class="right">
          <div class="user-poster">
            <div class="user">
              <p class="iep-ellipsis">{{indexData.name}}</p>
              <div class="user-right-info">
                <span class="iep-ellipsis">{{indexData.staffId}}</span>
                <br>
                <span class="iep-ellipsis">{{indexData.job}}</span>&nbsp;
                <span class="iep-ellipsis">xx岗位</span>
              </div>
            </div>
            <el-switch
              v-model="reviewCenter"
              active-color="#409EFF"
              :active-text="switchText"
              @change="switchChange"
            ></el-switch>
          </div>

          <div class="user-info">
            <span class="iep-ellipsis">数据咨询师</span>&nbsp;
            <span class="iep-ellipsis">DIPS产品中心</span>&nbsp;
            <span class="iep-ellipsis">产品与技术委员会</span>&nbsp;
          </div>
          <hr>

          <div class="examination-status">
            <el-row>
              <el-col :span="7">
                <div class="iep-ellipsis">最近参加的考试</div>
              </el-col>
              <el-col :span="3">
                <div class="iep-ellipsis">状态</div>
              </el-col>
              <el-col :span="4">
                <div class="iep-ellipsis">日期</div>
              </el-col>
              <el-col :span="3">
                <div class="iep-ellipsis">完成度</div>
              </el-col>
              <el-col :span="3"></el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <div class="iep-ellipsis">2018第三季国脉内网能力考试</div>
              </el-col>
              <el-col :span="3">
                <div class="iep-ellipsis">
                  <li>正在进行</li>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="iep-ellipsis">2018.12.15</div>
              </el-col>
              <el-col :span="5">
                <el-progress
                  :text-inside="true"
                  :stroke-width="18"
                  :percentage="70"
                  color="#409eff"
                ></el-progress>
              </el-col>
              <el-col :span="5">
                <iep-button type="primary" icon="el-icon-edit">继续考试</iep-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { getIndex } from '@/api/wel/index'
const initIndexForm = () => {
  return {
    name: '李舜生',//名字
    staffId: 'GM0071',//工号
    job: '产品经理',//职位
    title: 'xx岗位',//职称
    tagNum: 10,//标签
    materialNum: 10,//材料
    credit: 10,//信用
  }
}
export default {
  data () {
    return {
      pageLoading: true,
      reviewCenter: false,//审阅中心
      switchText: '考试中心',
      indexData: initIndexForm(),
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    //滑块滑动事件
    switchChange (status) {
      if (status == true) {
        this.switchText = '审阅中心'
      } else {
        this.switchText = '考试中心'
      }
    },
    loadPage () {
      this.pageLoading = true
      getIndex().then(({ data }) => {
        this.indexData = this.$mergeByFirst(initIndexForm(), data.data)
        this.pageLoading = false
      })
    },
  },
}
</script>


<style lang="scss" scoped>
.el-row {
  .el-col {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 10px 0px;
    margin: 0;
  }
  .left {
    width: 100%;
    .img {
      margin: 0 auto;
      width: 180px;
      height: 180px;
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid #ebeef5;
    }
  }
  .right {
    width: 100%;
    > div {
      padding-top: 5px;
    }
    .user-poster {
      display: flex;
      justify-content: space-between;
      .user {
        display: flex;
        p {
          font-size: 36px;
          color: #409eff;
          padding: 0px;
          margin: 0px;
        }
        .user-right-info {
          font-size: 14px;
          margin-left: 15px;
          margin-top: 8px;
        }
      }
    }
    .user-info {
      display: flex;
      justify-content: flex-start;
      font-size: 14px;
    }
    hr {
      margin-top: 10px;
      margin-bottom: 0px;
    }
    .examination-status {
      font-size: 14px;
      .el-progress {
        width: 80%;
      }
      .el-button {
        margin-top: -10px;
      }
    }
  }
}

@media (min-width: 0px) and (max-width: 769px) {
  .dotted {
    display: none !important;
  }
}
</style>