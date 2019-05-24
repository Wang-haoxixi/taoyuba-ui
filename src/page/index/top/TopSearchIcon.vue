<template>
  <el-tooltip class="item" effect="dark" content="搜索" placement="bottom">
    <iep-button @click="$openPage('/app/search')"><i class="el-icon-search"></i></iep-button>
  </el-tooltip>
</template>
<script>
export default {
  methods: {
  },
}
</script>

<style lang="css" scoped>
.item >>> .el-badge__content.is-fixed {
  top: 20px;
  right: 22px;
}
</style>
<style lang="scss" scoped>
button {
  border: 0;
  height: 60px;
  i {
    font-size: 20px;
  }
  &:focus,
  &:hover {
    background-color: #eee;
    color: #333;
  }
}
</style>
