<template>
  <div class="no-data">
    <a-icon type="frown-o" />{{message}}</div>
</template>
<script>
export default {
  name: 'IepNoData',
  props: {
    message: {
      type: String,
      default: '暂无数据',
    },
  },
}
</script>

<style lang="scss" scoped>
.no-data {
  color: rgba(0, 0, 0, 0.25);
  text-align: center;
  line-height: 64px;
  font-size: 16px;

  i {
    font-size: 24px;
    margin-right: 16px;
    position: relative;
    top: 3px;
  }
}
</style>
