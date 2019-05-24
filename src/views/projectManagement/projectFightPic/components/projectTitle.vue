<template>
  <div :style="getStyle" :class="activated ? 'activated project-title' : 'project-title'">
    <div>
      <i class="iconfont icon-bum"></i>
      {{projectName}}
    </div>
    <div style="color: #909399">{{server}}</div>
    <div style="float: right;white-space: nowrap">
      <span>完成度</span>
      <el-rate
        style="display: inline-block;margin: 0 5px;"
        :value="completionDegree / 20"
        disabled
        :colors="['#D81E05', '#D81E05', '#D81E05']">
      </el-rate>
      <span>{{completionDegree}}%</span>
    </div>
    <div style="float: right;">里程碑（{{count}}）</div>
  </div>
</template>

<script>
export default {
  name: 'project-title',
  data () {
    return {
      chosen: false,
    }
  },
  props: {
    /*
    是否激活
     */
    activated : {
      type: Boolean,
      default: false,
    },
    /*
    组件宽度
     */
    width: {
      type: String,
      default: '100%',
    },
    /*
    组件高度
     */
    height: {
      type: Number,
      default: 50,
    },
    /*
    项目名称
     */
    projectName: {
      type: String,
      required: true,
    },
    /*
    项目服务客户
     */
    server: {
      type: String,
      required: true,
    },
    /*
    里程碑数
     */
    count: {
      type: Number,
      required: 0,
    },
    /*
    完成度
     */
    completionDegree: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    getStyle () {
      return {
        padding: '0 20px',
        width: this.width + 'px',
        height: this.height + 'px',
        lineHeight: this.height + 'px',
        color: '#606266',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.project-title {
  position: relative;
  margin-top: 10px;
  background: #FFFFFF;
  &:hover {
    background: #ECF5FF;
  }
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border: 1px solid #E5E5E5;
  }
  &.activated {
    box-shadow: 0 3px 3px #dfdfdf;
    &::after {
      border: 1px solid #2680EB;
    }
  }
  >div {
    margin-right: 20px;
    height: 100%;
    float: left;
  }
}
</style>
