<template>
  <div>
    <div class="material-detail">
      <div class="library">
        <train-details :data="detailData"></train-details>
        <el-row class="down-load">
          相关附件：
          <div class="file" v-for="(item, index) in attachFileList" :key="index">
            <div @click="downLoad(item)"><i class="icon-fujian"></i>{{item.name}}<span class="tip">（消耗5国脉贝下载）</span></div>
          </div>
        </el-row>
        <IepAppRewardCard></IepAppRewardCard>
        <IepAppEvaluationReview></IepAppEvaluationReview>
      </div>
      <div class="piece">
        <IepAppTabCard :title="labelTitle">
          <IepAppLabelCard :dataList="labelList"></IepAppLabelCard>
        </IepAppTabCard>
        <IepAppTabCard :title="listTitle1">
          <div class="recommended-list">
            <div v-for="(item,index) in recommendedList" :key="index" class="piece">
              <div class="img-con"><img :src="item.themePictures" class="img"></div>
              <div class="box">
                <div class="piece-title">
                  <span class="sub-title">{{item.trainingTheme}}</span>
                </div>
                <span class="see"><i class="iconfont icon-yanjing"></i>{{item.views}}</span>
              </div>
            </div>
          </div>
        </IepAppTabCard>
      </div>
    </div>
  </div>
</template>
<script>
import TrainDetails from './TrainDetails'
import { getRectagsList } from '@/api/app/tms/index'
import { getRecruitDetail, getNoticeList } from '@/api/app/hrms/'

export default {
  components: { TrainDetails },
  data () {
    return {
      detailData: {},
      labelTitle: '推荐主题',
      listTitle1: '培训预告',
      labelList: [],
      recommendedList: [],
      routerMatch: this.$route.matched,
      attachFileList: [
        {name:'内网2.0改造项目'},
      ],
    }
  },
  beforeRouteUpdate (to, from, next) {
    //console.log(to, from)
    this.routerMatch = to.matched
    next()
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  methods: {
    getTrainingDetail (id) {
      getRecruitDetail(id).then(({data}) => {
        this.detailData = data.data
      })
    },
    // 推荐主题
    getRectagsList () {
      getRectagsList().then(({data}) => {
        this.labelList = data.data
      })
    },
    // 培训预告
    getNoticeList () {
      getNoticeList().then(({data}) => {
        this.recommendedList = data.data
      })
    },
  },
  created () {
    let params = this.$route.params
    this.getTrainingDetail(params.id)
    this.getRectagsList()
    this.getNoticeList()
  },
}
</script>
<style lang="scss" scoped>
.material-detail {
  width: 1200px;
  margin: 0 auto 20px;
  border-top: 1px solid #eee;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: minmax(100px, 9000px) minmax(100px, 300px);
}
.recommended-list {
  .piece {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    overflow: hidden;
    cursor: pointer;
    &:hover .sub-title {
      color: #ba1b21;
    }
    .img-con {
      float: left;
      margin-right: 15px;
      width: 60px;
      height: 60px;
      border: 1px solid #ebeef5;
      overflow: hidden;
    }
    .img {
      width: 100%;
      height: 100%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
    .box {
      float: left;
      flex: 2;
      height: 64px;
      .piece-title {
        .sub-title {
          font-size: 14px;
          margin-right: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .see {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        float: left;
        font-size: 12px;
        line-height: 28px;
        color: #999;
      }
    }
    &:last-child {
      margin-bottom: 12px;
    }
  }
  .mutual-card {
    margin-top: -1px;
    border-top-color: #fff;
  }
}
.ranking {
  padding: 0;
}
.el-card {
  border: 0;
}
.library {
  padding-right: 20px;
  border-right: 1px solid #ebeef5;
  .down-load {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    .file {
      cursor: pointer;
      i {
        font-size: 16px !important;
        margin-right: 10px;
      }
      .tip {
        margin-left: 10px;
        color: #999;
      }
    }
  }
}
</style>
<style scoped>
.breadcrumb-wrapper >>> .el-breadcrumb__inner.is-link {
  font-weight: normal;
}
</style>
