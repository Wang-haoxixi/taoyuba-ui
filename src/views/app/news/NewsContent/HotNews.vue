<template>
  <el-card class="hot-news" shadow="never">
    <div slot="header" class="clearfix">
      <span class="sub-title">{{title}}</span>
    </div>
    <div v-for="hot in hotData" :key="hot.id">
      <div class="title-con">{{hot.title}}</div>
    </div>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      title: '热点要闻',
      hotData: [
        {
          id: '1',
          title: '国脉总经理郑爱军荣获“浙江创业女杰”',
        },
        {
          id: '2',
          title: '2019国脉春季中高层研讨会在舟山圆满举行',
        },
        {
          id: '3',
          title: '中国建设银行总行首席经济学家黄志凌一行莅临舟山国脉考察',
        },
        {
          id: '4',
          title: '2018年度国脉“精彩瞬间评选”活动进入投票环节：请您投票 助力国脉精彩',
        },
        {
          id: '5',
          title: '2018国脉互联广佛秋季团建活动圆满收官',
        },
        {
          id: '6',
          title: '国脉海南项目获海南省十佳大数据应用案例',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.hot-news {
  .title {
    font-size: 14px;
    cursor: pointer;
    &:hover {
      color: #cb3737;
    }
  }
  .grid-content {
    font-size: 14px;
  }
  .el-progress {
    width: 120px;
  }
  .text-right {
    text-align: right;
  }
  .text-time {
    color: #999;
  }
  .title-con {
    position: relative;
    margin-bottom: 5px;
    padding-left: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 20px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;
    }
    &:hover {
      color: #cb3737;
    }
    &:nth-child(1) {
      padding-top: 10px;
    }
    i {
      margin-right: 5px;
    }
  }
}
.el-card {
  border: 0;
}
.text {
  font-size: 14px;
}

.item {
  margin-right: 15px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
<style scoped>
.hot-news >>> .el-card__body {
  padding: 10px 0;
}
</style>
