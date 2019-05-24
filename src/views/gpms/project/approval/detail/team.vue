<template>
  <div class="plate">
    <div class="head">
      <p class="title">项目团队</p>
      <div class="button">
        <iep-button size="small">管理</iep-button>
      </div>
    </div>
    <div class="content">
      <div class="box">
        <div class="title">市场经理：</div>
        <div class="item">超级管理员</div>
      </div>
      <div class="box">
        <div class="title">项目经理：</div>
        <div class="item">张三</div>
      </div>
      <div class="box">
        <div class="title">项目指导人：</div>
        <div class="item">李四</div>
      </div>
      <div class="box">
        <div class="title">项目成员：</div>
        <div class="item">赵文、赵武</div>
      </div>
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
    .box {
      display: flex;
      height: 40px;
      .title {
        width: 150px;
        padding: 0 12px 0 0;
        text-align: right;
      }
    }
  }
}
</style>
