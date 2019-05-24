<template>
  <div class="evaluation">
    <div class="title">收到评价</div>
    <div class="block">
      <el-timeline>
        <el-timeline-item v-for="(item, index) in appraise" :key="index" :icon="item.icon" :type="item.type" :color="item.color" :size="item.size">
          {{item}}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
import { getAside } from '@/api/wel/index'
export default {
  props: {
    appraise: {
      type: Array,
      required: true,
    },
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, getAside)
    },
  },
}
</script>
<style lang="scss" scoped>
.evaluation {
  box-sizing: border-box;
  margin: 10px;
  ul {
    margin: 0;
    padding: 0;
    height: 120px;
    overflow-x: hidden;
  }
}
.title {
  padding: 0 0 10px;
  font-size: 16px;
  font-weight: 500;
}
.cursor {
  cursor: pointer;
}
</style>

<style lang="css" scoped>
.evaluation >>> ::-webkit-scrollbar {
  border-radius: 10px;
  width: 5px;
  background-color: #fafafa;
}
.evaluation >>> ::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fafafa;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
.evaluation >>> ::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ddd;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
  display: none;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.evaluation >>> .block:hover ::-webkit-scrollbar-thumb {
  display: block;
}
.evaluation >>> .el-timeline-item__node--normal {
  top: 4px;
  left: 1px;
  width: 8px;
  height: 8px;
}
.evaluation >>> .el-timeline-item__tail {
  left: 5px;
}
.evaluation >>> .el-timeline-item__content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.evaluation >>> .block {
  padding: 5px 0;
}
.evaluation >>> .el-timeline-item {
  padding-bottom: 5px;
}
.evaluation >>> .el-timeline-item:hover .el-timeline-item__node {
  border-color: #cb3737;
  background-color: #cb3737;
}
.evaluation >>> .el-timeline-item:hover .el-timeline-item__content {
  color: #cb3737;
}
.evaluation >>> .el-timeline-item:last-child {
  padding: 0;
}
.evaluation >>> .el-timeline-item__node {
  background-color: #fff;
  border: 1px solid #d7d7d7;
}
.evaluation
  >>> .el-timeline
  .el-timeline-item:last-child
  .el-timeline-item__tail {
  display: block;
}
</style>