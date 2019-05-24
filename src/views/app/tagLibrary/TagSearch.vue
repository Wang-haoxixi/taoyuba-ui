<template>
    <div class="TagSearch-search">
        <h3>标签库</h3>
        <template>
            <div class="search-con">
                <operation-search>
                <advance-search></advance-search>
                </operation-search>
                <el-button type="danger" plain>人物标签排行</el-button>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.TagSearch-search {
  margin: 0 auto;
  padding: 30px 20px;
  text-align: center;
  background-color: #f6f6f6;
  h3 {
    font-size: 24px;
    color:#000;
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
.TagSearch-search >>> .el-card__body {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.TagSearch-search >>> .el-input--small input {
  height: 40px !important;
}
.TagSearch-search >>> .el-card {
  background-color: #fafafa;
}
.TagSearch-search >>> .search-con .input-wrapper {
  max-width: 510px;
  width: 510px;
}
.TagSearch-search >>> .el-button--danger.is-plain {
  color: #cb3737;
  background: #fef0f0;
  border-color: #cb3737;
}
.TagSearch-search >>> .el-button--danger.is-plain:hover,
.TagSearch-search >>> .el-button--danger.is-plain:focus {
  background: #cb3737;
  border-color: #ba1b21;
  color: #fff;
}
</style>