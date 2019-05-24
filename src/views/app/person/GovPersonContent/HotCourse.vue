<template>
  <div class="course-con">
    <iepAppTabCard :title="title" :linkName="linkName" :data="data" isMore>
      <div class="hot-course">
        <div class="con-course">
          <div class="con" v-for="(con, index) in conCourse" :key="index">
            <div class="img"><img :src="con.theme_pictures" alt=""></div>
            <span class="text">{{con.training_theme}}</span>
            <span class="num">{{con.views}} 人已学习</span>
          </div>
        </div>
        <div v-for="(item, index) in hotCourse" :key="index" class="piece">
          <span class="name">{{item.training_theme}}</span>
          <span class="num">{{item.views}} 人已学习</span>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>

<script>
import { getHottestList } from '@/api/app/hrms/'

export default {
  data () {
    return {
      title: '热门课程',
      data: '',
      hotCourse: [],
      conCourse: [],
      linkName: '/app/resource/training',
    }
  },
  methods: {
    loadList () {
      getHottestList().then(({data}) => {
        this.conCourse = data.data.slice(0, 2)
        this.hotCourse = data.data.slice(2)
      })
    },
  },
  created () {
    this.loadList()
  },
}
</script>
<style lang="scss" scoped>
.hot-course {
  .piece {
    cursor: pointer;
    position: relative;
    margin-left: 15px;
    .name {
      display: inline-block;
      width: 200px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .num {
      float: right;
      height: 30px;
      line-height: 30px;
      color: #999;
    }
    &:hover {
      color: #cb3737;
      &:before {
        background-color: #cb3737;
      }
    }
    &:before {
      content: "";
      position: absolute;
      left: -15px;
      top: 14px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;
    }
  }
  .con-course {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    .con {
      width: 48%;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
    .img {
      margin-bottom: 5px;
      width: 100%;
      height: 90px;
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
    .num {
      color: #999;
    }
    .text {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
<style scoped>
.course-con >>> .el-card__body {
  height: 270px;
}
</style>
