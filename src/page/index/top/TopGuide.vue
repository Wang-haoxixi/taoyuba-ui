<template>
  <el-tooltip class="item" effect="dark" content="使用指南" placement="bottom">
    <iep-button @click="handleOpen()"><i class="el-icon-question"></i></iep-button>
  </el-tooltip>
</template>
<script>
// import { openWindow } from '@/util/util'
export default {
  methods: {
    handleOpen () {
      this.$message.success('暂无内容')
      // openWindow('https://www.yuque.com/govmade/lq2610', '国脉内网使用指南', 800, 600)
    },
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
