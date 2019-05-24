<template>
  <div class="training-list-con">
    <search></search>
    <div class="module">
      <el-card class="module-item" v-for="(item,index) in moduleList" :key="index" shadow="hover">
        <div @click="handleOpen()">
          <div class="header clearfix">
            <div class="img"><img :src="item.trainerImage" alt=""></div>
            <span class="time">{{item.startTime}}</span>
            <el-tag class="dn" :class="item.show" size="small">{{item.tag}}</el-tag>
          </div>
          <div class="content">
            <h4 class="item-title">{{item.trainingTheme}}</h4>
            <p class="con">{{item.trainingBrief}}</p>
            <div class="detail">
              <div class="classTag">
                <el-tag type="white" v-for="(tag, index) in item.trainingTags" :key="index">{{tag}}</el-tag>
              </div>
              <span><i class="el-icon-view"></i>{{item.views}} 人浏览</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="12" @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Search from './Search'
import { getRecruitPage } from '@/api/app/hrms/'

export default {
  data () {
    return {
      moduleList: [],
      total: 0,
      params: {
        current: 1,
        size: 12,
      },
    }
  },
  components: {
    Search,
  },
  methods: {
    handleOpen () {
      this.$router.push({
        path: '/app/training_detail',
      })
    },
    getRecruitPage () {
      getRecruitPage(this.params).then(({data}) => {
        this.moduleList = data.data.records
        this.total = data.data.total
      })
    },
    currentChange (val) {
      this.params.current = val
      this.getRecruitPage()
    },
  },
  created () {
    this.getRecruitPage()
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
.training-list-con {
  margin: 0 auto 30px auto;
  width: 1200px;
}
.dn {
  display: none;
}
.module {
  display: grid;
  margin: 25px 0;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 3fr) minmax(100px, 3fr) minmax(
      100px,
      3fr
    );
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ebeef5;
    margin: 0 15px;
    padding: 5px 0;
    .time {
      display: inline-block;
      flex: 2;
      color: #999;
    }
    .show {
      display: inline-block;
    }
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
  }
  .content {
    padding: 15px;
    .item-title {
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .con {
      margin-bottom: 1.5em;
      height: 47px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #999;
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
    .detail {
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
      align-items: center;
      span {
        display: inline-block;
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
  cursor: pointer;
}
</style>
