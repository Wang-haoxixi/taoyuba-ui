<template>
  <el-card class="studyExponent-box" shadow="hover">
    <div slot="header" class="clearfix">
      <span>学习指数</span>
    </div>
    <el-row>
      <el-col :span="8" class="tab">
        <p>考试</p>
        <p>28&nbsp;场</p>
        <p>80%</p>
        <p>及格率</p>
      </el-col>
      <el-col :span="8" class="tab">
        <p>练习</p>
        <p>28&nbsp;场</p>
        <p>80%</p>
        <p>及格率</p>
      </el-col>
      <el-col :span="8" class="tab">
        <p>试题</p>
        <p>28&nbsp;场</p>
        <p>80%</p>
        <p>及格率</p>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      infoList: {
        num: 12,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.studyExponent-box {
  .el-row {
    .el-col {
      border-right: 1px solid #ddd;
      &:last-child {
        border: 0;
      }
    }
  }
  .tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    color: #666;
    p {
      margin: 0px;
      line-height: 40px;
      &:first-child {
        font-weight: 700px;
        font-size: 30px;
      }
    }
    p:nth-child(2) {
      color: #409eff;
      font-size: 26px;
    }
    p:nth-child(3) {
      color: #409eff;
      font-size: 26px;
    }
  }
}
</style>

