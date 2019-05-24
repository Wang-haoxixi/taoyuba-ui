<template>
  <div class="news-top">
    <h3>{{title}}</h3>
    <template>
      <div class="search-con">
        <operation-search>
          <advance-search></advance-search>
        </operation-search>
        <el-button type="danger" plain>高级搜索</el-button>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '国脉要闻',
    }
  },
}
</script>

<style lang="scss" scoped>
.news-top {
  margin: 0 auto;
  padding: 30px 20px;
  text-align: center;
  background: #fafafa url(./linebg.png) no-repeat;
  h3 {
    font-size: 24px;
  }
  .search-con {
    display: flex;
    margin: 0 auto;
    max-width: 600px;
    justify-content: space-between;
    .right-search {
      margin-left: 5px;
      font-size: 14px;
    }
  }
}
</style>
<style scoped>
.news-top >>> .el-card__body {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.news-top >>> .el-input--small input {
  height: 40px !important;
}
.news-top >>> .el-card {
  background-color: #fafafa;
}
.news-top >>> .search-con .input-wrapper {
  max-width: 510px;
  width: 510px;
}
.news-top >>> .el-button--danger.is-plain {
  color: #cb3737;
  background: #fef0f0;
  border-color: #cb3737;
}
.news-top >>> .el-button--danger.is-plain:hover,
.news-top >>> .el-button--danger.is-plain:focus {
  background: #cb3737;
  border-color: #ba1b21;
  color: #fff;
}
</style>
