<template>
  <el-card class="index-card" shadow="never">
    <div slot="header" class="hander-wrapper">
      <div class="title">{{title}}</div>
      <slot name="right"></slot>
    </div>
    <slot></slot>
  </el-card>
</template>
<script>
export default {
  name: 'IepFamsCard',
  props: {
    title: {
      type: String,
      default: '标题',
    },
  },
}
</script>
<style lang="scss" scoped>
.hander-wrapper {
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 16px;
  color: #303133;
  margin: 0 4px;
}
.btn {
  float: right;
  padding: 5px 0;
  color: #999;
}
.datas {
  margin-left: 5px;
  font-size: 14px;
  color: #999;
}
.iconfont {
  margin-left: 5px;
  color: #999;
  cursor: pointer;
}
</style>
<style scoped>
.index-card >>> .el-card__header {
  padding: 18px 0 10px;
}
.index-card >>> .el-card__body {
  padding: 16px 0;
}
.el-card {
  padding: 0 20px;
}
</style>



