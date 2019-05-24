<template>
  <div class="grid-content">
    <iepAppTabCard :title="title" :linkName="linkName">
      <div class="introduce">
        <span v-text="introduce"></span>
        <el-button class="red" type="text">【详细】</el-button>
        <div class="person">
          <el-carousel height="84px" :interval="5000" arrow="always">
            <el-carousel-item v-for="item in 4" :key="item">
              <div v-for="(item,index) in wonderfulList" :key="index" class="piece">
                <div class="img">
                  <span class="bgb">{{item.post}}</span>
                  <img :src="item.img" class="img">
                </div>
                <span class="name">{{item.name}}<span class="dn show1" :class="item.show1">V</span></span>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="feedback">
          <span> <i class="icon-custom"></i> 意见与建议（24）</span>
          <span class="fr"> <i class="icon-tousu"></i> 投诉与举报（12）</span>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '项目执行与质量委员会',
      linkName: '',
      wonderfulList: [
        { img: '//183.131.134.242:10060/upload/iep/201904/2cab9b7e-77cd-4e5c-9039-6c05f27e2529_20180709150516_jg3j6m3qre.jpg', name: '杨冰之' },
        { img: '//183.131.134.242:10060/upload/iep/201904/2cab9b7e-77cd-4e5c-9039-6c05f27e2529_20180709150516_jg3j6m3qre.jpg', name: '郑爱军' },
        { img: '//183.131.134.242:10060/upload/iep/201904/2cab9b7e-77cd-4e5c-9039-6c05f27e2529_20180709150516_jg3j6m3qre.jpg', name: '王路燕' },
        { img: '//183.131.134.242:10060/upload/iep/201904/2cab9b7e-77cd-4e5c-9039-6c05f27e2529_20180709150516_jg3j6m3qre.jpg', name: '刘林英' },
        { img: '//183.131.134.242:10060/upload/iep/201904/2cab9b7e-77cd-4e5c-9039-6c05f27e2529_20180709150516_jg3j6m3qre.jpg', name: '谢海艳' },
      ],
      introduce: '委员会作出的决策都是经过集体讨论并通过的，因而它有利于避免权力过分集中，防止一个人独断专行。委员会作出的决策都是经过集体讨论并通过的，因而它有利于避免权力过分集中，防止一个人独断专行。',
    }
  },
}
</script>
<style lang='scss' scoped>
.title {
  color: #333;
}
.introduce {
  & > span {
    line-height: 25px;
  }
  .person {
    padding-top: 15px;
    margin-bottom: 15px;
    overflow: hidden;
    .dn {
      opacity: 0;
    }
    .show {
      opacity: 1;
    }
    .show1 {
      display: inline-block;
      margin: 0 5px;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      background-color: #cb3737;
      color: #fff;
    }
    .name {
      line-height: 24px;
    }
    .piece {
      float: left;
      margin: 0 15px;
      width: 60px;
      text-align: center;
      overflow: hidden;
      .img {
        position: relative;
        width: 100%;
        height: 60px;
        overflow: hidden;
        border-radius: 50%;
        cursor: pointer;
        .bgb {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          line-height: 60px;
          font-size: 12px;
          text-align: center;
          display: block;
          border-radius: 50%;
          color: #fff;
          z-index: 100;
          opacity: 0;
          transition: all 0.5s;
        }
        &:hover .bgb {
          background: rgba(0, 0, 0, 0.5);
          opacity: 1;
        }
        img {
          width: 100%;
          height: 60px;
          transition: 0.5s;
          border-radius: 50%;
          &:hover {
            cursor: pointer;
            transform: scale(1.1);
          }
        }
      }
    }
  }
}
.feedback {
  display: flex;
  justify-content: space-between;
  span {
    display: inline-block;
    padding-left: 20px;
    width: 45%;
    background-color: #f2f2f2;
    line-height: 35px;
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
    i {
      margin-right: 15px;
      font-size: 28px !important;
      color: #aaa;
      vertical-align: -4px;
    }
  }
}
.red {
  display: inline-block;
  color: #bb1a20;
  cursor: pointer;
  &:hover {
    color: #f56c6c;
  }
}
</style>
<style scoped>
.person >>> .el-carousel__arrow--left {
  left: 0;
}
.person >>> .el-carousel__arrow--right {
  right: 0;
}
.person >>> .el-carousel__item {
  left: 40px;
}
.person >>> .el-carousel__indicators {
  display: none;
}
</style>