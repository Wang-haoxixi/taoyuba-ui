<template>
  <el-submenu
    :index="data.path"
    v-if="data.children && data.children.length > 0">
    <template slot="title">
      <i class="iconfont" :class="data.icon" v-if="data.icon"></i>
      <span>{{ data.label }}</span>
    </template>
    <sub-menu
      @goto-route="handleGotoRoute"
      v-for="menu in data.children"
      :key="menu.id"
      :data="menu">
    </sub-menu>
  </el-submenu>
  <el-menu-item v-else :index="data.path" @click="handleGotoRoute(data)" :key="data.label">
    <i class="iconfont" :class="data.icon" v-if="data.icon"></i>
    <span slot="title">{{ data.label }}</span>
  </el-menu-item>
</template>

<script>
import SubMenu from './subMenu'
export default {
  name: 'SubMenu',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: { SubMenu },
  methods: {
    filterPath (path, index) {
      return path == null ? index + '' : path
    },
    // 菜单切换
    handleGotoRoute (menu) {
      // if (menu.isBlank === 1) {
      //   window.open(menu.path, '_blank')
      // }
      this.$emit('goto-route', menu)
    },
  },
}
</script>
<style lang="scss" scoped>
  .iconfont {
    width: 16px;
    margin-right: 4px;
    display: inline-block;
  }
</style>
