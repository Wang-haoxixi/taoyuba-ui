<template>
  <div class="navContent">
    <el-steps :active="1" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="派遣中"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <p style="font-size: 15px;">我中心已于20**年**月**日收到关于浙岭渔（运）*****的检验申报。将会在3个工作日内联系您并到舟山海晨船厂进行检验，期间请保持
手机通话畅通。指派验船师电话：张船长</p>
    <!-- <iep-no-data v-if="!contentData.length" message="暂无内容"></iep-no-data>
    <el-row v-else v-for="(item,index) in contentData" :key="index">
      <el-col :span="16">
        <div class="iep-ellipsis title" @click="handleDetail(item)">{{item.name}}</div>
      </el-col>
      <el-col :span="6" v-if="item.subName">
        <div class="iep-ellipsis">{{item.subName}}</div>
      </el-col>
      <el-col :span="6" v-if="item.process">
        <el-progress :percentage="item.process" color="#68C769"></el-progress>
      </el-col>
      <el-col :span="2">
        <div class="iep-ellipsis text-right text-time">{{item.time | parseTime('{m}-{d}')}}</div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
export default {
  props: {
    contentData: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleDetail (row) {
      this.$emit('on-detail', row)
    },
  },
}
</script>
<style>
.navContent .el-step__head.is-process{
  color: #0185d8;
  border-color: #0185d8;
}
.navContent .el-step__title.is-process{
  color: #0185d8;
}
.navContent .el-step__title.is-success{
  color: #303133;
}
.navContent .el-step__head.is-success{
  color: #303133;
  border-color: #303133;
}
</style>
<style lang="scss" scoped>
.navContent {
  // /deep/.el-step__head.is-process{
  //   color: #0185d8;
  //   border-color: #0185d8;
  // }
  // /deep/.el-step__title.is-process{
  //   color: #0185d8;
  // }
  // /deep/.el-step__title.is-success{
  //   color: #303133;
  // }
  // /deep/.el-step__head.is-success{
  //   color: #303133;
  //   border-color: #303133;
  // }
  padding: 10px 0;
  .el-row {
    padding: 5px 0;
    color: #5f5f5f;
    .title {
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #0185d8;
      }
    }
    .el-progress {
      width: 120px;
    }
    .text-right {
      text-align: right;
    }
    .text-time {
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
