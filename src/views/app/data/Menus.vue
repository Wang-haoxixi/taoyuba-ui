<template>
  <div class="menus">
    <a-menu @click="handleClick" :openKeys.sync="openKeys">
      <a-menu-item key="sub1">
        <i class="iconfont icon-zichanguanli"></i>
        资产众览
      </a-menu-item>
      <a-menu-item key="sub2">
        <i class="iconfont icon-zichanguanli"></i>
        客户资产
      </a-menu-item>
      <a-menu-item key="sub3">
        <i class="iconfont icon-zichanguanli"></i>
        项目资产
      </a-menu-item>
      <a-menu-item key="sub4">
        <i class="iconfont icon-zichanguanli"></i>
        产品资源
      </a-menu-item>
      <a-menu-item key="sub5">
        <i class="iconfont icon-zichanguanli"></i>
        人力资源
      </a-menu-item>
      <a-menu-item key="sub6">
        <i class="iconfont icon-zichanguanli"></i>
        财富统计
      </a-menu-item>
      <a-menu-item key="sub7">
        <i class="iconfont icon-zichanguanli"></i>
        财务报表
      </a-menu-item>
      <a-menu-item key="sub7">
        <i class="iconfont icon-zichanguanli"></i>
        投资指数
      </a-menu-item>
      <a-menu-item key="sub7">
        <i class="iconfont icon-zichanguanli"></i>
        学习资源
      </a-menu-item>
      <a-menu-item key="sub7">
        <i class="iconfont icon-zichanguanli"></i>
        我的数据
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: ['(86)','(16)','(25)','(25)','(80)','(58)','(36)','(126)','(96)'],
      current: ['mail'],
      openKeys: ['sub1'],
    }
  },
  methods: {
    handleClick (e) {
      console.log('click', e)
    },
    titleClick (e) {
      console.log('titleClick', e)
    },
  },
  watch: {
    openKeys (val) {
      console.log('openKeys', val)
    },
  },
}
</script>
<style lang="scss" scoped>
.menus {
  border-right: 1px solid #eee;
  height: 100%;
  .ant-menu-vertical {
    border-right: 0;
  }
}
</style>


