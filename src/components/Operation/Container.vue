<template>
  <div class="operation-container">
    <div>
      <slot name="left"></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OperationContainer',
}
</script>

<style lang="scss" scoped>
.operation-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & > div > * {
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
<style scoped>
.operation-container >>> .el-checkbox-group {
  margin-left: 10px;
}
.operation-container >>> .el-checkbox {
  margin-right: 10px;
}
</style>
