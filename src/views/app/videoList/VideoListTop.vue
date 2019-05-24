<template>
  <div>
    <div class="video-list-search">
      <h3>{{title}}<span>{{num}}</span></h3>
      <search></search>
    </div>
  </div>
</template>
<script>
import Search from './Search'
export default {
  components: {
    Search,
  },
  data () {
    return {
      title: '视频库',
      num: '（共9865个）',
    }
  },
}
</script>
<style lang="scss" scoped>
.video-list-search {
  margin: 0 auto;
  padding: 25px 20px;
  text-align: center;
  h3 {
    font-size: 24px;
    span {
      font-size: 14px;
      color: #999;
    }
  }
  .search-con {
    display: flex;
    margin: 0 auto;
    max-width: 600px;
    justify-content: space-between;
  }
}
</style>

<style scoped>
.video-list-search >>> .el-card__body {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.video-list-search >>> .el-input--small input {
  height: 40px !important;
}
.video-list-search >>> .el-card {
  background-color: #fafafa;
}
.video-list-search >>> .search-con .input-wrapper {
  max-width: 510px;
  width: 510px;
}
.video-list-search >>> .el-button--danger.is-plain {
  color: #cb3737;
  background: #fef0f0;
  border-color: #cb3737;
}
.video-list-search >>> .el-button--danger.is-plain:hover,
.video-list-search >>> .el-button--danger.is-plain:focus {
  background: #cb3737;
  border-color: #ba1b21;
  color: #fff;
}
</style>