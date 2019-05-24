<template>
  <div class="sidebar-container" :class="{ 'is-active': isCollapse }">
    <el-menu
      unique-opened
      :default-active="nowTagValue"
      mode="vertical"
      :show-timeout="200"
      :collapse="isCollapse">
      <sub-menu
        @goto-route="open"
        v-for="menuItem in menu"
        :key="menuItem.id"
        :data="menuItem">
      </sub-menu>
    </el-menu>
  </div>
</template>

<script>
import { initMenu, resolveUrlPath } from '@/util/util'
import { mapGetters } from 'vuex'
import { validatenull, validateURL } from '@/util/validate'
import SubMenu from './subMenu'
export default {
  name: 'sidebar',
  components: {SubMenu},
  data () {
    return {}
  },
  created () {
    if (validatenull(this.menu)) {
      this.$store.dispatch('GetMenu').then(({res}) => {
        initMenu(this.$router, res)
      })
    }
  },
  computed: {
    ...mapGetters(['menu', 'tag', 'isCollapse']),
    nowTagValue: function () {
      // return setUrlPath(this.$route)
      // console.log(this.$route)
      const path = this.$route.path
      const index = path.lastIndexOf('/')
      let name = ''
      if (index > -1) {
        name = path.slice(index + 1)
      } else {
        name = path
      }
      return name
    },
  },
  mounted () { },
  methods: {
    filterPath (path, index) {
      return path == null ? String(index) : path
    },
    open (item) {
      console.log('item', item)
      if (!validateURL(item.path)) {
        this.$router.push({
          name: item.name,
          query: item.query,
        })
      } else {
        // console.log('iframe src', resolveUrlPath(item.path, item.label))
        this.$router.push({
          path: resolveUrlPath(item.path, item.label),
          query: item.query,
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import "../../../styles/theme.scss";

.sidebar-container {
  height: 100%;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  position: relative;
  z-index: 10;
  background-color: $layout-sider-background;
  transition: all 0.3s;
  &.collapse {
    overflow: visible;
  }

  /deep/ .el-menu {
    color: $menu-dark-color;
    background: $menu-dark-bg;
    &-item {
      color: $menu-dark-color;
      border-left: 5px solid transparent;
      i {
        color: $menu-dark-color;
        &.icon {
          margin-right: 10px;
        }
      }
      &:hover {
        color: #fff;
        background: transparent;
        > a {
          color: #fff;
        }
        i {
          color: #fff;
        }
      }
      > :focus {
        border-left: 5px solid #00AAFF;
      }
      > a {
        color: $menu-dark-color;
        text-decoration: none;
        outline: none;
      }
      &.is-active {
        color: #fff;
        background-color: #252C35;
        > a {
          color: #fff;
        }
        i {
          color: #00AAFF;
        }
      }
    }

    .el-submenu {
      &__title {
        color: $menu-dark-color;
        > i {
          color: $menu-dark-color;
        }
        &:hover {
          color: #fff;
          background-color: transparent;
          > i {
            color: #00AAFF;
          }
        }

        &__icon-arrow {
          margin-top: -4px;
        }
      }

      &.is-active {
        > .el-submenu__title {
          color: #fff;
          > i {
            color: #00AAFF;
            &.icon {
              margin-right: 10px;
            }
          }
        }
      }
      .icon {
        margin-right: 10px;
      }
    }
  }
}
</style>
