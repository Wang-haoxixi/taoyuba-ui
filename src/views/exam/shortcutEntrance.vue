<template>
  <el-card class="shortcutEntrance-box" shadow="hover">
    <div slot="header" class="clearfix">
      <span>快捷入口</span>
      <iep-button type="primary" icon="el-icon-plus" plain style="float: right;">添加</iep-button>
    </div>
    <ul>
      <li>互助基金</li>
      <li>发票提交</li>
      <li>开票通知</li>
      <li>我要提现</li>
      <li>我要打赏</li>
      <li>我要投资</li>
    </ul>
  </el-card>
</template>

<style lang="scss" scoped>
.shortcutEntrance-box {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    li {
      cursor: pointer;
      padding: 5px 0px;
      font-size: 18px;
      &:hover {
        color: #cb3737;
      }
    }
  }
}
</style>