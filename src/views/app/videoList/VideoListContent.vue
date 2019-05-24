<template>
  <div class="video-list-con">
    <div class="module">
      <el-card class="module-item" v-for="(item,index) in moduleList" :key="index" shadow="hover">
        <div class="content" @click="handleOpen()">
          <div class="video-con">
            <video class="video" controls>
              <source :src="item.video" controls poster="" alt="">
            </video>
            <span class="sub-title">{{item.subTitle}}</span>
          </div>
          <div class="info">
            <span class="img"><img :src="item.img" alt=""></span>
            <span class="time">{{item.time}}</span>
            <span class="see"><i class="iconfont icon-yanjing"></i><span>{{item.see}}</span></span>
          </div>
        </div>
      </el-card>
    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      moduleList: [
        {
          video: '',
          subTitle: '国脉集团宣传片',
          img: require('./img/e12.jpg'),
          time: '2019-03-12',
          see: '120人已浏览',
        },
        {
          video: '',
          subTitle: '营商通宣传片',
          img: require('./img/e1.jpg'),
          time: '2019-04-10',
          see: '38人已浏览',
        },
        {
          video: '',
          subTitle: '数据基因宣传片',
          img: require('./img/e2.jpg'),
          time: '2019-05-06',
          see: '67人已浏览',
        },
        {
          video: '',
          subTitle: 'DIPS宣传片',
          img: require('./img/e4.jpg'),
          time: '2019-02-12',
          see: '88人已浏览',
        },
        {
          video: '',
          subTitle: 'DIPS宣传片',
          img: require('./img/e1.jpg'),
          time: '2019-04-21',
          see: '58人已浏览',
        },
        {
          video: '',
          subTitle: 'DIPS宣传片',
          img: require('./img/e5.jpg'),
          time: '2019-03-23',
          see: '73人已浏览',
        },
        {
          video: '',
          subTitle: 'DIPS宣传片',
          img: require('./img/e4.jpg'),
          time: '2019-03-07',
          see: '47人已浏览',
        },
        {
          video: '',
          subTitle: 'DIPS宣传片',
          img: require('./img/e6.jpg'),
          time: '2019-03-15',
          see: '83人已浏览',
        },
        {
          video: '',
          subTitle: 'DIPS宣传片',
          img: require('./img/e7.jpg'),
          time: '2019-03-12',
          see: '61人已浏览',
        },
        {
          video: '',
          subTitle: 'DIPS宣传片',
          img: require('./img/e8.jpg'),
          time: '2019-03-12',
          see: '106人已浏览',
        },
        {
          video: '',
          subTitle: 'DIPS宣传片',
          img: require('./img/e9.jpg'),
          time: '2019-03-12',
          see: '112人已浏览',
        },
        {
          video: '',
          subTitle: 'DIPS宣传片',
          img: require('./img/e10.jpg'),
          time: '2019-03-12',
          see: '79人已浏览',
        },
      ],
    }
  },
  methods: {
    handleOpen () {
      this.$router.push({
        path: '/app/video_detail',
      })
    },
  },
}
</script>

<style scoped lang="scss">
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.video-list-con {
  margin-bottom: 25px;
}
.module {
  display: grid;
  margin: 0 auto 25px;
  width: 1200px;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 3fr) minmax(100px, 3fr) minmax(
      100px,
      3fr
    );
  .module-item {
    .img {
      margin-right: 10px;
      width: 40px;
      height: 40px;
      border: 1px solid #dcdfe6;
      border-radius: 50%;
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
    .time {
      flex: 2;
      color: #999;
    }
    .see {
      color: #999;
      font-size: 12px;
      i {
        display: inline-block;
        margin-right: 5px;
        font-size: 16px;
      }
    }
  }
  .content {
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
    .video-con {
      position: relative;
    }
    .sub-title {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 10px;
      padding: 0 10px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      z-index: 10;
    }
    .video {
      width: 100%;
      height: 240px;
    }
    .info {
      display: flex;
      padding: 10px;
      justify-content: space-between;
      align-items: center;
    }
    .text {
      width: 55%;
      .item-title {
        font-size: 15px;
      }
      .con {
        height: 47px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #999;
      }
    }
  }
}
.page {
  text-align: center;
}
</style>
<style scoped>
.header >>> .el-button {
  padding: 0;
  width: 22px;
  height: 22px;
  line-height: 22px;
  border-radius: 50%;
}
.module >>> .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
.module >>> .el-card__body {
  padding: 0;
}
.module >>> .el-card.module-item {
  border: 1px solid #dcdfe6;
}
</style>
