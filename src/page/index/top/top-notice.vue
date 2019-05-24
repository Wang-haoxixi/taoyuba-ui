<template>
  <el-badge :value="infoNum" :max="99">
    <i class="el-icon-bell"></i>
  </el-badge>
</template>
<script>
  export default {
    data () {
      return {
        infoNum: '',
      }
    },
  }
</script>
