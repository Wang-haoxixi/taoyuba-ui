<template>
  <div>
    <div class="qualification-search">
      <h3>{{title}}<span>{{num}}</span></h3>
      <template>
        <div class="search-con">
          <operation-search>
            <advance-search></advance-search>
          </operation-search>
          <el-button type="danger" plain>高级搜索</el-button>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '学堂',
      num: '（共9865个）',
    }
  },
}
</script>
<style lang="scss" scoped>
.qualification-search {
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
.qualification-search >>> .el-card__body {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.qualification-search >>> .el-input--small input {
  height: 40px !important;
}
.qualification-search >>> .el-card {
  background-color: #fafafa;
}
.qualification-search >>> .search-con .input-wrapper {
  max-width: 510px;
  width: 510px;
}
.qualification-search >>> .el-button--danger.is-plain {
  color: #cb3737;
  background: #fef0f0;
  border-color: #cb3737;
}
.qualification-search >>> .el-button--danger.is-plain:hover,
.qualification-search >>> .el-button--danger.is-plain:focus {
  background: #cb3737;
  border-color: #ba1b21;
  color: #fff;
}
</style>