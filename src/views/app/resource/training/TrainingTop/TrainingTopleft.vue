<template>
  <div class="training-top-left">
    <el-row>
      <el-col>
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <span class="item"><span>NEW</span></span>
          <div class="con" @click="handleOpen(data)">
            <img :src="data.themePictures" class="img">
            <div class="text">
              <h3 class="sub-title">
                {{data.trainingTheme}}
              </h3>
              <div class="classTag">
                <el-tag type="white" v-for="(tag, index) in data.trainingTags" :key="index">{{tag}}</el-tag>
              </div>
              <p class="con-text">{{data.trainingBrief}}</p>
              <div class="info">
                <span class="info-con"><i class="iconfont icon-denglu"></i><span>{{data.trainerName}}</span></span>
                <span class="info-con">
                  <i class="icon-font icon-shijian"></i><span>{{data.startTime}}</span>
                </span>
                <span class="info-con">
                  <i class="icon-font icon-place"></i><span>{{data.place}}</span></span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getNewestList } from '@/api/app/hrms/'

export default {
  data () {
    return {
      data: {
        trainingBrief: [],
      },
    }
  },
  methods: {
    handleOpen (row) {
      this.$router.push({
        path: `/app/resource/training/training_detail/${row.id}`,
      })
    },
    getNewestList () {
      getNewestList().then(({data}) => {
        this.data = data.data
      })
    },
  },
  created () {
    this.getNewestList()
  },
}
</script>
<style lang="scss" scoped>
.training-top-left {
  position: relative;
  cursor: pointer;
  .con {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  .img {
    display: inline-block;
    width: 340px;
    height: 350px;
  }
  .text {
    margin-left: 20px;
    flex: 1;
    .sub-title {
      margin-bottom: 18px;
      font-size: 18px;
    }
    .con-text {
      margin: 20px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      color: #999;
    }
  }
  .classTag {
    .el-tag {
      margin-right: 5px;
      &:hover {
        color: #cb3737;
        background: #fef0f0;
        border-color: #cb3737;
      }
    }
  }
  .info {
    padding-top: 20px;
    border-top: 1px solid #ebeef5;
    .info-con {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 12px;
      color: #666;
      span {
        margin-right: 5px;
        &:last-child {
          margin: 0;
        }
      }
      i {
        margin-right: 8px;
        font-size: 18px;
        color: #999;
      }
    }
  }
}
.item {
  position: absolute;
  top: 0;
  right: 0;
  height: 0;
  width: 0;
  border-style: solid;
  border-color: #cb3737 transparent transparent transparent;
  border-width: 40px 0 60px 50px;
  background: none;
  span {
    position: absolute;
    top: -35px;
    right: 3px;
    color: #fff;
    transform: rotate(37deg);
    font-size: 12px;
  }
}
.training-top-left .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
</style>