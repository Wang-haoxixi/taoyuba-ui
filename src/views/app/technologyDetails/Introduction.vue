<template>
  <div class="introduction">
    <div class="left">
      <img :src="form.imageUrl" :alt="form.name">
    </div>
    <div class="right">
      <div class="title">
        <span class="name">{{form.name}}</span>
        <span class="status">{{dictsMap.status[form.status]}}</span>
      </div>
      <div class="tag">
        <span v-for="(item,index) in form.tagKeywords" :key="index">{{item}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { dictsMap } from '@/views/cpms/technologys/options'
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
.introduction {
  overflow: hidden;
  .left {
    width: 80px;
    height: 80px;
    border: 1px solid #ebeaea;
    border-radius: 2px;
    background-color: #f8f8f8;
    text-align: center;
    margin-right: 30px;
    float: left;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    float: left;
    width: 770px;
    .title {
      height: 50px;
      line-height: 40px;
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
  }
}
</style>
<style scoped>
.introduction >>> .el-card__body {
  padding: 0;
}
</style>
