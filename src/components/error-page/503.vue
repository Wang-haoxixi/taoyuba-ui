<template>
  <div class="Error503">
    <div class="Error503-body-con">
      <div class="Error503-btn-con">
        <iep-button @click="goHome" size="large" style="width: 200px;" type="default">返回首页</iep-button>
        <iep-button @click="backPage" size="large" style="width: 200px;margin-left: 40px;" type="primary">返回上一页</iep-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error503',
  methods: {
    backPage () {
      this.$router.go(-1)
    },
    goHome () {
      this.$router.push({
        path: '/',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.Error503 {
  &-body-con {
    width: 700px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: url(./images/503.png) no-repeat center;
  }
  &-btn-con {
    text-align: center;
    padding: 20px 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    bottom: 0;
  }
}
</style>
