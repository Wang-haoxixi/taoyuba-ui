<!-- 面包屑导航 -->
<template>
  <el-breadcrumb class="breadcrumb-box" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <template v-for="item in levelList">
        <el-breadcrumb-item v-if="item.meta.title" :key="item.path">
          {{item.meta.title}}
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data () {
    return {
      levelList: null,
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    },
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      // console.log('route', this.$route)
      this.levelList = this.$route.match
    },
  },
}
</script>

<style lang="scss" scoped>
.breadcrumb-box {
  background: #eee;
  padding: 16px 32px 0 32px;
  overflow: hidden;
}
</style>
