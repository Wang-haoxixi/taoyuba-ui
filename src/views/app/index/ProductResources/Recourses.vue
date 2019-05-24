<template>
  <div class="resources">
    <div v-for="(item,index) in resourcesList" :key="index" class="piece">
      <i :class="item.icon" class="iconfont"></i>
      <span class="name">{{item.name}}</span>
      <span class="number">{{item.number}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      resourcesList: [
        { icon: 'icon-dangan', name: '材料库', number: '10306' },
        { icon: 'icon-renwu', name: '项目库', number: '1075' },
        { icon: 'icon-gongzuotai', name: '产品库', number: '33' },
        { icon: 'icon-kehu', name: '客户库', number: '6043' },
        { icon: 'icon-peixun', name: '培训库', number: '101' },
        { icon: 'icon-shangjifaxian', name: '商机库', number: '214' },
        { icon: 'icon-hetongliebiao', name: '资质库', number: '67' },
        { icon: 'icon-dingwei', name: '招标库', number: '88' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
@keyframes iconRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.resources {
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-row-gap: 40px;
  grid-column-gap: 20px;
  padding: 15px 0;
  .piece {
    width: 100%;
    text-align: center;
    .iconfont {
      width: 55%;
      font-size: 30px;
      padding: 10px 0;
      border-radius: 50%;
      background-color: #f0f0f0;
      text-align: center;
      display: block;
      margin: 0 auto;
      &:hover {
        cursor: pointer;
        background-color: #cb3737;
        color: #fff;
        animation: iconRotate 1s linear infinite;
      }
    }
    .name,
    .number {
      width: 50%;
      display: block;
      margin: 0 auto;
      font-size: 16px;
    }
    .name {
      height: 28px;
      line-height: 28px;
    }
    .number {
      color: #999;
    }
  }
}
</style>
