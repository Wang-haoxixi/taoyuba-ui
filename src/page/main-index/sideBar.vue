<template>
  <ul class="side-menu">
    <li><router-link to="/element/elementDataList"><i class="iconfont icon-tianxie"></i>信息共享中心</router-link></li>
    <li><router-link to="/lookdata"><i class="iconfont icon-tianxie"></i>指挥控制中心</router-link></li>
    <li><router-link to="/admin/user"><i class="iconfont icon-tianxie"></i>用户中心</router-link></li>
  </ul>
</template>
<script>
export default {
  name: 'sideBar',
}
</script>
<style lang="scss" scoped>
  .side-menu {
    li {
      font-size: 14px;
      a {
        padding: 8px 15px;
        line-height: 40px;
        text-decoration: none;
        color: rgba(255, 255, 255, 0.65);
        display: block;
        .iconfont {
          margin-right: 5px;
        }
        &:hover {
          color: #fff;
        }
      }
    }
  }
</style>
