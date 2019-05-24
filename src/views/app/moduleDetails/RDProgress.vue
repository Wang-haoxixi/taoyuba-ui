<template>
  <div class="progress">
    <div class="title">
      <div>研发进度</div>
    </div>
    <div class="box">
      <div :class="form.schedule===1 ? 'red' : ''">
        <div class="piece">
          <i class="iconfont icon-lixiang"></i>
        </div>
        <span>立项</span>
      </div>
      <div :class="form.schedule===2 ? 'red' : ''">
        <div class="piece">
          <i class="iconfont icon-yanfa"></i>
        </div>
        <span>研发中</span>
      </div>
      <div :class="form.schedule===3 ? 'red' : ''">
        <div class="piece">
          <i class="iconfont icon-ceshi"></i>
        </div>
        <span>测试中</span>
      </div>
      <div :class="form.schedule===4 ? 'red' : ''">
        <div class="piece">
          <i class="iconfont icon-chenggong1"></i>
        </div>
        <span>验收中</span>
      </div>
      <div :class="form.schedule===5 ? 'red' : ''">
        <div class="last-piece">
          <i class="iconfont icon-shangjia"></i>
        </div>
        <span>已上架</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['form'],
}
</script>
<style lang="scss" scoped>
.progress {
  margin-top: 20px;
  .title {
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    color: #333;
  }
  .box {
    display: grid;
    grid-auto-flow: row dense;
    grid-template-columns: 1fr 1fr 1fr 1fr 80px;
    .piece,
    .last-piece {
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      background: #f8f8f8;
      border-radius: 50%;
      border: 1px solid #dcdcdc;
      position: relative;
      > i {
        font-size: 40px;
        color: #999;
      }
    }
    .piece:before {
      content: "";
      width: 195px;
      height: 2px;
      border-top: 2px dashed #999;
      position: absolute;
      top: 50%;
      left: 80px;
    }
    span {
      width: 80px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      display: block;
    }
    .red {
      .piece,
      .last-piece {
        border: 1px solid #dd7f83;
        > i {
          color: #dd7f83;
        }
      }
      span {
        color: #dd7f83;
      }
    }
  }
}
</style>
<style scoped>
</style>
