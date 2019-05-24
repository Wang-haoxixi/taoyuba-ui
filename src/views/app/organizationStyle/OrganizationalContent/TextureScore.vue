<template>
  <div class="texture-score">
    <IepAppTabCard :title="title" :linkName="linkName">
      <el-button style="float: right; padding: 5px 0;" type="text" slot="right">我要评价</el-button>
      <div class="texture-score-list">
        <div v-for="(item,index) in textureScoreList" :key="index" class="piece">
          <div class="img"><img :src="item.photo"></div>
          <div class="box">
            <div class="piece-title">
              <span class="name">{{item.name}}<span class="department">{{item.department}}</span><span class="time">{{item.time}}</span></span>
            </div>
            <p class="feed">{{item.feed}}</p>
          </div>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '组织评价',
      linkName: '',
      textureScoreList: [
        { photo: require('../img/people1.png'), name: '姚静', department: '上海国脉互联知政信息咨询有限公司', feed: '合作下来非常愉快，技术团队强大，产品功能非常满足我们的需求，期待下次合作！', time: '2019-02-15' },
        { photo: require('../img/people2.jpg'), name: '邵佳欢', department: '国脉技术研发中心', feed: '严谨的工作态度，良好的沟通能力，整个组织非常有活力。', time: '2019-01-30' },
        { photo: require('../img/people3.jpg'), name: '林毅宁', department: '广东国脉信息发展有限公司', feed: '通过这次合作，让我对我们国脉的研发中心有了进一步的了解，这是一个非常有创造力的部门，值得大', time: '2019-12-26' },
        { photo: require('../img/people3.jpg'), name: '张路', department: '广东国脉信息发展有限公司', feed: '通过这次合作，让我对我们国脉的研发中心有了进一步的了解，这是一个非常有创造力的部门，值得大', time: '2019-12-26' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.texture-score {
  margin: 30px 0 60px;
}
.texture-score-list {
  height: 261px;
  .piece {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    overflow: hidden;
    .img {
      float: left;
      margin-right: 10px;
      width: 60px;
      height: 60px;
      border: 1px solid #ebeef5;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        transition: 0.5s;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .box {
      flex: 3;
      .piece-title {
        .name {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          margin-right: 8px;
        }
        .department {
          flex: 2;
          margin-left: 10px;
        }
        .department,
        .time {
          font-size: 14px;
          color: #999;
        }
      }
      .feed {
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        &:hover {
          color: #ba1b21;
        }
      }
    }
  }
}
</style>
<style scoped>
.texture-score >>> .el-card__body {
  padding: 0;
  overflow-x: hidden;
}
.texture-score >>> .el-card__body::-webkit-scrollbar {
  border-radius: 10px;
  width: 6px;
  background-color: #fff;
}
.texture-score >>> .el-card__body::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
.texture-score >>> .el-card__body::-webkit-scrollbar-thumb {
  border-radius: 10px;
  display: none;
  background-color: #ddd;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.texture-score >>> .el-card:hover ::-webkit-scrollbar-thumb {
  display: block;
}

.el-card {
  padding: 0 20px;
}
</style>
