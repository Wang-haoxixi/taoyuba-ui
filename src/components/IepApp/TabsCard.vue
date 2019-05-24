<template>
  <el-card class="index-card" shadow="never">
    <el-button class="btn" type="text" v-if="isMore" @click="getMore">更多></el-button>
    <slot></slot>
  </el-card>
</template>
<script>
export default {
  name: 'IepAppTabsCard',
  props: {
    isMore: {
      type: Boolean,
      default: false,
    },
    linkName: {
      type: String,
      default: '/app/index',
    },
  },
  data () {
    return {
    }
  },
  methods: {
    getMore () {
      this.$router.push({
        path: this.linkName,
      })
    },
  },
}
</script>
<style scoped>
.el-card >>> .el-card__body {
  position: relative;
  padding: 0;
}
.btn {
  line-height: 53px;
  position: absolute;
  right: 20px;
  top: 0px;
  padding: 0;
  color: #999;
  z-index: 3;
}
.index-card >>> .el-tabs__nav {
  line-height: 53px;
}
.index-card >>> .el-tabs__item {
  font-size: 16px;
}
.index-card >>> .el-card__body {
  padding: 2px 0 15px;
}
.el-card {
  padding: 0 20px;
}
</style>
