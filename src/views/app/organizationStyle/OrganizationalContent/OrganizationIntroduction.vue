<template>
  <div class="organization-introduction">
    <iepAppTabCard :title="title" :linkName="linkName" :data="`（当前${data.memberNum}人）`" isMore>
      <p class="con">{{data.intro}}</p>
      <div class="person">
        <el-carousel height="84px" :interval="5000" arrow="always">
          <el-carousel-item v-for="(item, index) in Math.ceil(members.length/3)" :key="index">
            <div v-for="(item, i) in members.slice(index*3, index*3+3)" :key="i" class="piece">
              <div class="img">
                <span class="bgb">{{item.post}}</span>
                <img :src="item.avatar" class="img">
              </div>
              <span class="name">{{item.name}}<span class="dn show1" :class="item.isExpert==1?item.show1:''">V</span></span>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          members: [],
        }
      },
    },
  },
  computed: {
    members () {
      let members = this.data.members ? this.data.members : []
      return members
    },
  },
  data () {
    return {
      title: '组织介绍',
      wonderfulList: [
        { img: require('../img/people1.png'), name: '姚静', post: '产品经理', show1: 'show' },
        { img: require('../img/people2.jpg'), name: '邵佳欢', post: '视频剪辑' },
        { img: require('../img/people3.jpg'), name: '林毅宁', post: '咨询师' },
      ],
      linkName: '/app/organization_details',
    }
  },
}
</script>
<style lang="scss" scoped>
.organization-introduction {
  margin-bottom: 30px;
  .con {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .person {
    padding-top: 15px;
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
      margin: 0 5px;
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