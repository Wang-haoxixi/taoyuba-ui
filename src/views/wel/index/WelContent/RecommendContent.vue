<template>
  <div class="navContent">
    <el-row>
      <el-col :span="4">
        <div class="iep-ellipsis title">船员服务中心简介</div>
      </el-col>
      <el-col :span="18">
        <el-tag type="info" class="tag">海洋渔业</el-tag>
        <el-tag type="info" class="tag">轮机维修</el-tag>
        <el-tag type="info" class="tag">船员考证</el-tag>
        <el-tag type="info" class="tag">海员家属</el-tag>
        <el-tag type="info" class="tag">海陆一家</el-tag>
      </el-col>
      <el-col :span="2">
        <div class="title small">船务中心</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="iep-ellipsis title">船员服务培训中心</div>
      </el-col>
      <el-col :span="18">
        <el-tag type="info" class="tag">海洋渔业</el-tag>
        <el-tag type="info" class="tag">轮机维修</el-tag>
        <el-tag type="info" class="tag">船员考证</el-tag>
        <el-tag type="info" class="tag">海员家属</el-tag>
      </el-col>
      <el-col :span="2">
        <div class="title small">培训机构</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="iep-ellipsis title">船员服务中介</div>
      </el-col>
      <el-col :span="18">
        <el-tag type="info" class="tag">海洋渔业</el-tag>
        <el-tag type="info" class="tag">轮机维修</el-tag>
        <el-tag type="info" class="tag">船员考证</el-tag>
      </el-col>
      <el-col :span="2">
        <div class="title small">船务中心</div>
      </el-col>
    </el-row>
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
