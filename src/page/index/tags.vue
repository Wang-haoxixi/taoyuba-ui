<template>
  <div class="breadcrumb-box">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }" class="home">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="tag">{{tag}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    tag () {
      if (this.$route.matched[this.$route.matched.length-1].meta.title) {
        return this.$route.matched[this.$route.matched.length-1].meta.title
      } else {
        return false
      }
    },
  },
}
</script>
<style lang="scss">
.breadcrumb-box {
  .home {
    .el-breadcrumb__separator, .el-breadcrumb__inner {
      color: rgba(0,0,0,.45);
      font-weight: 400;
    }
  }
}
</style>
<style lang="scss" scoped>
.breadcrumb-box {
  margin-bottom: -4px;
  // height: 46px;
  background: #eee;
  // box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.3);
  padding: 16px 32px 16px 32px;
  overflow: hidden;
  z-index: 10;
}
</style>
