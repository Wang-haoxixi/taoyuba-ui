<template>
  <div>
    <div class="gov-person-top">
      <h3><span>国脉人，</span>人人都要成为专家</h3>
      <template>
        <div class="search-con">
          <operation-search>
            <advance-search></advance-search>
          </operation-search>
          <el-button type="danger" plain>高级搜索</el-button>
        </div>
      </template>
    </div>
    <top-class></top-class>
  </div>
</template>
<script>
import TopClass from './TopClass'
export default {
  components: { TopClass },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.gov-person-top {
  margin: 0 auto;
  padding: 25px 20px;
  text-align: center;
  background: #fafafa url(./linebg.png) no-repeat;
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
</style>
<style scoped>
.gov-person-top >>> .el-card__body {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.gov-person-top >>> .el-input--small input {
  height: 40px !important;
}
.gov-person-top >>> .el-card {
  background-color: #fafafa;
}
.gov-person-top >>> .search-con .input-wrapper {
  max-width: 510px;
  width: 510px;
}
.gov-person-top >>> .el-button--danger.is-plain {
  color: #0185d8;
  background: #fef0f0;
  border-color: #0185d8;
}
.gov-person-top >>> .el-button--danger.is-plain:hover,
.gov-person-top >>> .el-button--danger.is-plain:focus {
  background: #0185d8;
  border-color: #ba1b21;
  color: #fff;
}
</style>
