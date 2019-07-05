<template>
  <el-popover placement="bottom" width="336" trigger="click">
    <!-- TODO: -->
    <iep-img src="/img/qrCode.png"></iep-img>
    <el-tooltip slot="reference" effect="dark" content="手机版二维码" placement="bottom">
      <iep-button>
        <a-icon type="scan" />
      </iep-button>
    </el-tooltip>
  </el-popover>
</template>

<style lang="css" scoped>
.item >>> .el-badge__content.is-fixed {
  z-index: 1;
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