<template>
  <el-card class="myRead" shadow="hover">
    <div slot="header">
      <span>我的审阅</span>
    </div>
    <el-row>
      <el-col :span="5">
        <span class="num">20</span>
        <span class="sub-title">批卷</span>
      </el-col>
      <el-col :span="5">
        <span class="num">20</span>
        <span class="sub-title">审核试题</span>
      </el-col>
      <el-col :span="4">
        <span class="num">20</span>
        <span class="sub-title">创建试卷</span>
      </el-col>
      <el-col :span="5">
        <span class="num">20</span>
        <span class="sub-title">创建考试</span>
      </el-col>
      <el-col :span="5">
        <span class="num">20</span>
        <span class="sub-title">创建证书</span>
      </el-col>
    </el-row>
  </el-card>
</template>

<style lang="scss" scoped>
.myRead {
  .el-row {
    .el-col {
      border-right: 1px solid #ebeef5;
      &:last-child {
        border: 0;
      }
    }
    span {
      display: block;
      text-align: center;
    }
    .num {
      font-size: 36px;
      color: #409eff;
    }
    .sub-title {
      color: #999;
      font-size: 24px;
    }
  }
}
</style>
