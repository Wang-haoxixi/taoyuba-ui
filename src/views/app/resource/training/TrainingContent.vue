<template>
  <div class="past-training">
    <el-row>
      <el-col>
        <el-card :body-style=" { padding: '0px' }" shadow="never">
          <div class="sub-title clearfix" slot="header">
            <span class="cardTitle">{{title}}</span>
            <el-button class="more" type="text" @click="getMore">更多></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="past-training-list">
      <el-row>
        <el-col>
          <el-card shadow="hover" v-for="(item,index) in pastTrainingList" :key="index" @click.native="handleOpen(item)">
            <div class="img"><img :src="item.trainerImage" alt=""></div>
            <span class="item-title">{{item.trainingTheme}}</span>
            <p class="content">{{item.trainingBrief}}</p>
            <div class="classTag">
              <el-tag type="white" v-for="(tag, index) in item.trainingTags" :key="index">{{tag}}</el-tag>
              <span class="see"><i class="iconfont icon-yanjing"></i>{{item.views}} 人浏览</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getPastList } from '@/api/app/hrms/'

export default {
  name: 'AppPastTraining',
  data () {
    return {
      title: '往期培训',
      pastTrainingList: [],
    }
  },
  methods: {
    getMore () {
      this.$router.push({
        path: '/app/training_list',
      })
    },
    getPastList () {
      getPastList ().then(({data}) => {
        this.pastTrainingList = data.data
      })
    },
    handleOpen (row) {
      this.$router.push({
        path: `/app/resource/training/training_detail/${row.id}`,
      })
    },
  },
  created () {
    this.getPastList()
  },
}
</script>
<style lang="scss" scoped>
.past-training {
  .classTag {
    .el-tag {
      margin-right: 5px;
      &:hover {
        color: #cb3737;
        background: #fef0f0;
        border-color: #cb3737;
      }
    }
    .see {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      float: right;
      font-size: 12px;
      line-height: 28px;
      color: #999;
    }
  }
  .past-training-list {
    margin: 25px 0 25px;
    .el-card {
      border: 1px solid #ebeef5;
      cursor: pointer;
    }
    .classTag,
    .content {
      text-align: left;
      width: 100%;
    }
    .item-title {
      margin: 10px 0;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .content {
      overflow: hidden;
      height: 50px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #999;
    }
    .img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 1px solid #ebeef5;
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
  }
}
</style>
<style scoped>
.past-training >>> .el-card {
  border: 0;
}
.past-training-list >>> .el-card__body {
  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: column;
}
.past-training-list >>> .el-tag--white {
  border: 1px solid #dcdfe6;
  max-width: 70px;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.past-training-list >>> .el-col {
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 3fr) minmax(100px, 3fr) minmax(
      100px,
      3fr
    );
}
</style>