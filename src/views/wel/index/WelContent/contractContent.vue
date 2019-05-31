<template>
  <div class="navContent">
    <el-row v-for="item of contentData" :key="item.id">
      <el-col :span="10">
        <div class="iep-ellipsis title">{{item.contractNumber}}</div>
      </el-col>
      <el-col :span="6">
        <div class="iep-ellipsis title">{{item.shipowner}}</div>
      </el-col>
      <el-col :span="4">
        <div class="title small">{{item.employeeName}}</div>
      </el-col>
      <el-col :span="4">
        <div class="title small">{{item.shipName}}</div>
      </el-col>
    </el-row>
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
<style lang="scss" scoped>
.navContent {
  padding: 10px 0;
  .tag{
    margin: 0 15px;
  }
  .el-row {
    padding: 5px 0;
    color: #5f5f5f;
    .title {
      font-size: 16px;
      cursor: pointer;
      &:hover {
        color: #0185d8;
      }
    }
    .small{
      color: #888;
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
