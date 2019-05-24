<template>
  <router-link :to="routerToGo">
    <i class="iconfont icon-setting"></i>
  </router-link>
</template>
<script>
  export default {
    data () {
      return {
        routerToGo: {},
      }
    },
  }
</script>
