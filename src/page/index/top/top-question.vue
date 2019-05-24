<template>
  <router-link :to="routerToGo">
    <i class="el-icon-question"></i>
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
