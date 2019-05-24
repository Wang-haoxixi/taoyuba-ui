<template>
  <div class="menus">
    <a-menu @click="handleClick" :defaultSelectedKeys="['1']" :openKeys="openKeys" @openChange="onOpenChange" mode="inline">
      <a-sub-menu v-for="item in data" :key="item.id" @titleClick="titleClick">
        <span slot="title"><span>{{item.levelName}} （{{item.materialCount}}）</span></span>
        <a-menu-item v-for="t in item.childrens" :key="t.id">{{t.levelName}}</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { getMenuList } from '@/api/app/mlms/index'

export default {
  data () {
    return {
      menuList: [],
      current: ['mail'],
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      openKeys: ['sub1'],
      data: [],
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('change_page', e.key)
    },
    titleClick () {
      // console.log('titleClick', e)
    },
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    getMenuList () {
      getMenuList().then(({data}) => {
        this.data = data.data
      })
    },
  },
  created () {
    this.getMenuList()
  },
  watch: {
    openKeys () {
      // console.log('openKeys', val)
    },
  },
}
</script>
<style lang="scss" scoped>
.menus {
  border-right: 1px solid #eee;
  height: 100%;
  .ant-menu-inline {
    border-right: 0;
  }
}
</style>
