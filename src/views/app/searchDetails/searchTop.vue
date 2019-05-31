<template>
  <div class="search">
    <h2 class="title">以奋斗者为本，做智慧国脉系!</h2>
    <template>
      <div class="search-con">
        <operation-search>
        </operation-search>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.search {
  margin: 0 auto;
  padding: 25px 20px;
  background-color: #f6f7fb;
  text-align: center;
  h3 {
    font-size: 24px;
    span {
      color: #0185d8;
    }
  }
  .search-con {
    display: flex;
    margin: 0 auto;
    max-width: 600px;
    justify-content: space-between;
  }
}
.title {
  text-align: center;
  line-height: 1.7;
  color: #0185d8;
  font-size: 24px;
}
</style>
<style scoped>
.search-con >>> .el-button{
  background-color: #ba1b21;
  color:#fff;
  border-radius: 0 3px 3px 0;
  width:80px;
  height:39px;
}
.search >>> .el-card{
  border:none;
}
.search >>> .el-input--small input {
  height: 40px !important;
}
.search >>> .el-card {
  background-color: #fafafa;
}
.search >>> .search-con .input-wrapper {
  max-width: 100%;
  width: 100%;
}
.search >>> .el-button--danger.is-plain {
  color: #0185d8;
  background: #fef0f0;
  border-color: #0185d8;
}
.search >>> .el-button--danger.is-plain:hover,
.search >>> .el-button--danger.is-plain:focus {
  background: #0185d8;
  border-color: #ba1b21;
  color: #fff;
}
</style>
