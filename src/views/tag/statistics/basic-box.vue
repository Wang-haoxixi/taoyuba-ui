<template>
  <div class="basic-box">
    <el-card>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'basicContainer',
}
</script>

<style lang="scss">
.basic-box {
  padding-bottom: 20px;
}
</style>
