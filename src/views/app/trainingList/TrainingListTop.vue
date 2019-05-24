<template>
  <div>
    <div class="training-search">
      <h3>{{title}}<span>{{num}}</span></h3>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '培训库',
      num: '（共9865个）',
    }
  },
}
</script>
<style lang="scss" scoped>
.training-search {
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
.training-search >>> .el-card__body {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.training-search >>> .el-input--small input {
  height: 40px !important;
}
.training-search >>> .el-card {
  background-color: #fafafa;
}
.training-search >>> .search-con .input-wrapper {
  max-width: 510px;
  width: 510px;
}
.training-search >>> .el-button--danger.is-plain {
  color: #cb3737;
  background: #fef0f0;
  border-color: #cb3737;
}
.training-search >>> .el-button--danger.is-plain:hover,
.training-search >>> .el-button--danger.is-plain:focus {
  background: #cb3737;
  border-color: #ba1b21;
  color: #fff;
}
</style>