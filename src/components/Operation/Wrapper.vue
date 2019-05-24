<template>
  <div class="operation-wrapper">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'OperationWrapper',
}
</script>

<style lang="scss" scoped>
.operation-wrapper > * {
  margin-right: 5px;
  margin-bottom: 5px;
  &:last-child {
    margin-right: 0;
  }
}
.operation-wrapper > button {
  margin-right: 5px;
  margin-bottom: 5px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
