<template>
  <div>
    <search @search-page="searchData"></search>
    <div class="module">
      <el-card class="module-item" v-for="(item,index) in moduleList" :key="index" shadow="hover">
        <div class="content">
          <!-- <i class="iconfont icon-tongyongleiziyuanpeizhi"></i> -->
          <div class="img"><img :src="item.imageUrl" alt=""></div>
          <div class="text">
            <h4 class="item-title">{{item.name}}</h4>
            <p class="con">{{item.synopsis}}</p>
            <div class="classTag">
              <el-tag type="white" v-for="(tag, index) in item.tagKeywords" :key="index">{{tag}}</el-tag>
            </div>
          </div>
        </div>
        <div class="header clearfix">
          <span class="price">指导价：¥{{item.guidePrice}}</span>
          <el-button icon="el-icon-plus"></el-button>
        </div>
      </el-card>
    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Search from './Search'
import { getModulePage } from '@/api/app/cpms/channel'

export default {
  data () {
    return {
      moduleList: [],
      paramForm: {},
      params: {
        current: 1,
        size: 12,
      },
      total: 0,
    }
  },
  components: {
    Search,
  },
  methods: {
    searchData (val) {
      this.paramForm = val
      this.params.current = 1
      this.getModulePage()
    },
    getModulePage () {
      getModulePage(Object.assign({}, this.params, this.paramForm)).then(({data}) => {
        this.moduleList = data.data.records
        this.total = data.data.total
      })
    },
    currentChange (val) {
      this.params.current = val
      this.getModulePage()
    },
  },
  created () {
    this.getModulePage()
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
    border-top: 1px solid #ebeef5;
    padding: 10px 15px;
    background-color: #fafafa;
    .price {
      display: inline-block;
      flex: 1;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 15px;
    i {
      display: inline-block;
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 30px;
      text-align: center;
      border-radius: 50%;
      background-color: #cb3737;
      color: #fff;
      &:hover {
        animation: iconRotate-data-v-300a8671 1s linear infinite;
      }
    }
    .img {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .text {
      width: 80%;
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
