<template>
  <div>
    <search @search-page="searchData"></search>
    <div class="module">
      <el-card class="module-item" v-for="(item,index) in moduleList" :key="index" shadow="hover">
        <div class="content">
          <div class="img"><img :src="item.imageUrl" alt=""></div>
          <div class="text">
            <h4 class="item-title">{{item.name}}</h4>
            <p class="con">{{item.synopsis}}</p>
            <div class="header clearfix">
              <span class="price">指导价：¥{{item.valuation}}</span>
              <el-button icon="el-icon-plus"></el-button>
            </div>
          </div>
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
import { getDetailsPage } from '@/api/app/cpms/channel'

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
      this.params.current = 1
      this.paramForm = val
      this.getDetailsPage()
    },
    getDetailsPage () {
      getDetailsPage(Object.assign({}, this.params, this.paramForm)).then(({data}) => {
        this.moduleList = data.data.records
        this.total = data.data.total
      })
    },
    currentChange (val) {
      this.params.current = val
      this.getDetailsPage()
    },
  },
  created () {
    this.getDetailsPage()
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
  .module-item {
    .img {
      margin-right: 15px;
      width: 120px;
      height: 120px;
      border: 1px solid #dcdfe6;
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
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      .price {
        display: inline-block;
        flex: 1;
      }
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
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
