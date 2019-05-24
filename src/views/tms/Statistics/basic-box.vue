<template>
  <div class="basic-box">
    <el-card>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'BasicContainer',
}
</script>

<style lang="scss" scoped>
.basic-box {
  padding-bottom: 20px;
}
</style>
