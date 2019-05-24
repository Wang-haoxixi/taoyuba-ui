<template>
  <el-menu class="menu-wrapper" unique-opened :default-active="nowTagValue" mode="vertical" :show-timeout="200" :collapse="collapse">
    <template v-for="item in menu">
      <el-menu-item v-if="validatenull(item[childrenKey]) && vaildRoles(item)" :index="'' + item[pathKey]" @click="open(item)" :key="item[labelKey]" :class="{ 'is-active': vaildAvtive(item) }">
        <i :class="item[iconKey]"></i>
        <span slot="title" :alt="item[pathKey]">{{ item[labelKey] }}</span>
      </el-menu-item>
      <el-submenu v-else-if="!validatenull(item[childrenKey]) && vaildRoles(item)" :index="item[pathKey]" :key="item[labelKey]">
        <template slot="title">
          <i :class="item[iconKey]"></i>
          <span slot="title" :class="{ 'el-menu--display': collapse && first }">{{ item[labelKey] }}</span>
        </template>
        <template v-for="(child, cindex) in item[childrenKey]">
          <el-menu-item :index="'' + child[pathKey]" @click="open(child)" :class="{ 'is-active': vaildAvtive(child) }" v-if="validatenull(child[childrenKey])" :key="child[labelKey]">
            <i :class="child[iconKey]"></i>
            <span slot="title">{{ child[labelKey] }}</span>
          </el-menu-item>
          <sidebar-item v-else :menu="[child]" :key="cindex" :props="props" :screen="screen" :collapse="collapse"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { validatenull } from '@/util/validate'
import config from './config.js'
export default {
  name: 'SidebarItem',
  data () {
    return {
      config: config,
    }
  },
  props: {
    menu: {
      type: Array,
    },
    screen: {
      type: Number,
    },
    first: {
      type: Boolean,
      default: false,
    },
    props: {
      type: Object,
      default: () => {
        return {}
      },
    },
    collapse: {
      type: Boolean,
    },
  },
  created () { },
  mounted () { },
  computed: {
    ...mapGetters(['roles']),
    labelKey () {
      return this.props.label || this.config.propsDefault.label
    },
    pathKey () {
      return this.props.path || this.config.propsDefault.path
    },
    iconKey () {
      return this.props.icon || this.config.propsDefault.icon
    },
    childrenKey () {
      return this.props.children || this.config.propsDefault.children
    },
    nowTagValue () {
      return this.$router.$avueRouter.getValue(this.$route)
    },
  },
  methods: {
    ...mapMutations({ setCollapse: 'SET_COLLAPSE' }),
    vaildAvtive (item) {
      const groupFlag = (item['group'] || []).some(ele =>
        this.$route.path.includes(ele)
      )
      return this.nowTagValue === item[this.pathKey] || groupFlag
    },
    vaildRoles (item) {
      item.meta = item.meta || {}
      return item.meta.roles ? item.meta.roles.includes(this.roles) : true
    },
    validatenull (val) {
      return validatenull(val)
    },
    open (item) {
      if (this.screen <= 1) this.setCollapse()
      this.$router.$avueRouter.group = item.group
      this.$router.push({
        path: this.$router.$avueRouter.getPath({
          name: item[this.labelKey],
          src: item[this.pathKey],
        }),
        query: item.query,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.menu-wrapper {
  .el-menu-item {
    margin-left: 0 !important;
    height: 40px;
    line-height: 40px;
    border-left: 3px solid #fafafa;
    &:hover {
      border-color: #cb3737;
    }
  }
}
.el-menu-item.is-active {
  border-color: #cb3737;
  background: #f9eae7;
  color: #cb3737;
}

.el-menu-item {
  &:hover,
  &:focus {
    background-color: #f9eae7;
    color: #cb3737;
  }
}
</style>
<style scoped>
.menu-wrapper >>> .el-menu {
  border-right: none;
}
</style>
