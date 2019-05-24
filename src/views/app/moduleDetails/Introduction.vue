<template>
  <div class="introduction">
    <el-card shadow="hover" class="introduction-card">
      <div class="left">
        <iep-img :src="form.imageUrl" alt=""></iep-img>
      </div>
      <div class="right">
        <div class="title">
          <span class="name">{{form.name}}</span>
          <span class="status">{{dictsMap.schedule[form.schedule]}}</span>
        </div>
        <div class="tag">
          <span v-for="(item,index) in form.tagKeywords" :key="index">{{item}}</span>
        </div>
        <span class="updateTime">更新时间：{{form.updateTime}}</span>
        <el-button class="join">加入定制</el-button>
        <el-button class="use">立即使用</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { dictsMap } from '@/views/cpms/modules/options'
export default {
  props: ['form'],
  data () {
    return {
      dictsMap,
    }
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  color: #333;
}
.introduction {
  .introduction-card {
    padding: 30px;
  }
  .left {
    width: 160px;
    height: 160px;
    line-height: 160px;
    border: 1px solid #ebeaea;
    border-radius: 2px;
    background-color: #f8f8f8;
    text-align: center;
    margin-right: 30px;
    float: left;
    img {
      display: block;
      padding: 10px;
      width: 100%;
      height: 100%;
    }
    > i {
      font-size: 60px;
      color: #999;
    }
  }
  .right {
    float: left;
    width: 940px;
    position: relative;
    .title {
      height: 60px;
      line-height: 60px;
      .name {
        font-size: 20px;
        color: #333;
      }
      .status {
        background: #f8f8f8;
        border-radius: 12px;
        padding: 2px 10px;
        border: 1px solid #ebeaea;
        margin-left: 10px;
      }
    }
    .tag {
      > span {
        display: inline;
        list-style: none;
        border: 1px solid #ebeaea;
        border-radius: 4px;
        padding: 4px 8px;
        margin: 5px;
        color: #999;
      }
    }
    .updateTime {
      height: 60px;
      line-height: 60px;
      color: #999;
    }
    .join,
    .use {
      position: absolute;
      top: 0;
    }
    .join {
      right: 110px;
      background-color: #ba1b21;
      border: 1px solid #ba1b21;
      color: #fff;
      transition: all 0.5s;
      &:hover {
        background-color: #fff;
        border: 1px solid #ba1b21;
        color: #ba1b21;
      }
    }
    .use {
      right: 0;
      background-color: #fff;
      border: 1px solid #ba1b21;
      color: #ba1b21;
      transition: all 0.5s;
      &:hover {
        background-color: #ba1b21;
        border: 1px solid #ba1b21;
        color: #fff;
      }
    }
  }
}
</style>
<style scoped>
.introduction >>> .el-card__body {
  padding: 0;
}
</style>
