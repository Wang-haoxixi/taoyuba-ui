<template>
  <el-tabs class="iep-tabs" v-bind="$attrs" v-on="$listeners">
    <el-tab-pane v-for="tab in tabList" :label="tab.label" :name="tab.value" :key="tab.value">
      <slot :name="tab.value"></slot>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'IepTabs',
  inheritAttrs: false,
  props: {
    tabList: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {

    }
  },
}
</script>
<style scoped>
.iep-tabs >>> .el-tabs__nav-wrap::after {
  height: 1px;
}
.iep-tabs >>> .el-tabs__active-bar {
  background-color: #ba1b21;
}
.iep-tabs >>> .el-tabs__item.is-active {
  color: #ba1b21;
}
.iep-tabs >>> .el-tabs__item {
  font-size: 17px;
  height: 44px;
}
</style>
