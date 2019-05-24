<template>
  <div class="top-main-menu">
    <div class="select">
      <el-select
        v-model="mainMenu"
        placeholder="菜单" @change="changeMenu" >
        <template v-for="item in menuAll">
          <el-option
            v-if="item.isShow === 1 && item.redirectUrl"
            :key="item.name"
            :label="item.label"
            :value="item.name">
          </el-option>
        </template>
      </el-select>
    </div>
  </div>
</template>
<script>
import {mapGetters } from 'vuex'
import menuMixin from '@/mixins/menu'
export default {
  mixins: [menuMixin],
  data () {
    return {
      visible: false,
    }
  },
  computed: {
    ...mapGetters([
      'menuAll',
      'activeMainMenu',
    ]),
    mainMenu: {
      get () { return this.activeMainMenu },
      set (val) { this.$store.commit('SET_ACTIVE_MAIN_MENU', val) },
    },
  },
  methods: {
    changeMenu (val) {
      this.setCurrentMenu(this.menuAll, val)
    },
  },
}
</script>
<style lang="scss">
.top-main-menu {
  .select {
    position: relative;
  }
  .select:before {
    content: "";
    display: block;
    z-index: 100;
    position: absolute;
    left: 2px;
    top: 18px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #b4b4b4;
    font-family: "Microsoft Yahei", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif";
  }
  input {
    border: none;
    width: 140px;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
<style lang="scss" scoped>
.top-main-menu {
  margin-left: -15px;
}
.menu-list-container {
  width: 1000px;
  padding: 10px 20px;
}
.desc-title {
  border-left: 3px solid #3981d9;
  padding-left: 10px;
  margin: 15px 0;
}
.top-main-menu {
  .el-dropdown-link {
    cursor: pointer;
  }
}
.wrapper {
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  .system-wrapper {
    cursor: pointer;
    width: 360px;
    display: flex;
    align-items: center;
    &:hover {
      .icon {
        transition: all 0.5 ease;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
      }
      span {
        font-weight: 600;
      }
    }
    & > .icon {
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 5px;
      border: 1px solid #e1e1e1;
      &.c-green {
        border-color: #36ae8e;
        color: #3ac19d;
      }
      &.c-blue1 {
        border-color: #568bd0;
        color: #3c8ce6;
      }
      &.c-yellow {
        border-color: #f6b65e;
        color: #f6b65e;
      }
      &.c-red {
        border-color: #ee583f;
        color: #ee583f;
      }
      &.c-blue3 {
        border-color: #43bbd5;
        color: #43bbd5;
      }
      &.c-blue2 {
        border-color: #4da9ea;
        color: #4da9ea;
      }
      i {
        font-size: 25px;
      }
    }
    & > div {
      display: flex;
      flex-direction: column;
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>
