<template>
  <div class="thoughts">
    <IepAppTabCard :title="title" :linkName="linkName">
      <el-button class="charge" type="text" slot="right">我要发表</el-button>
      <div class="thoughtsList">
        <div v-for="(item,index) in thoughtsList" :key="index" class="piece">
          <div class="img-con"><img :src="item.img" class="img"></div>
          <div class="box">
            <div class="pieceTitle">
              <span class="name">{{item.name}}</span>
              <span class="time">{{item.time}}</span>
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
      title: '意见反馈',
      data: '（35次）',
      linkName: '',
      thoughtsList: [
        { img: '../img/person/p015.jpg', name: '刘丹', time: '2019-04-09', feed: '国脉之最可以不断增加，建立增加签单量NO1，签单金额NO1，收款速度NO1等' },
        { img: '../img/person/p016.jpg', name: '陈一萍', time: '2019-04-15', feed: '内网编辑器有格式问题，一样的格式和字体粘贴进去会自动变化成不同的字体和大' },
        { img: '../img/person/p017.jpg', name: '张小燕', time: '2019-04-23', feed: '内网可加入考勤审批功能，上传资料能多份文件同时插入上传区' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 18px;
}
.datas {
  font-size: 16px;
  color: #999;
}
.thoughtsList {
  .piece {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    overflow: hidden;
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
      width: 77%;
      height: 62px;
      .pieceTitle {
        .name {
          font-size: 16px;
          margin-right: 8px;
        }
        .time {
          color: #999;
        }
      }
      .feed,
      .job {
        line-height: 1.4;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #666;
        &:hover {
          color: #ba1b21;
        }
      }
    }
    &:last-child {
      margin-bottom: 12px;
    }
  }
}
</style>
<style scoped>
.thoughts >>> .el-button {
  float: right;
  padding: 5px 0;
  color: #cb3737;
}
.thoughts >>> .el-button :hover {
  color: #f56c6c;
}
</style>