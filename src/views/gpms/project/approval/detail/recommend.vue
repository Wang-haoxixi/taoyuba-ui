<template>
  <div class="plate">
    <div class="head">
      <p class="title">数据推荐</p>
    </div>
    <div class="content">

    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => {},
    },
  },
}
</script>


<style lang="scss" scoped>
.plate {
  border: 1px solid #eee;
  padding: 20px 15px;
  margin-bottom: 20px;
  .head {
    display: flex;
    border-bottom: 1px solid #eee;
    justify-content: space-between;
    height: 47px;
    .title {
      font-size: 18px;
      margin: 0;
    }
    .button {
      padding-bottom: 10px;
      .el-button {
        margin-right: 10px;
      }
      i {
        font-size: 16px !important;
      }
    }
  }
  .content {
    padding: 15px 0;
  }
}
</style>
