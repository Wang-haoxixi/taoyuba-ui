<template>
  <div class="aside">
    <span class="popup-btn" @click="hideAside"><i :class="{ 'el-icon-caret-left' : isA, 'el-icon-caret-right': !isA}"></i></span>
    <el-scrollbar>
      <slot></slot>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isA: false,
    }
  },
  methods: {
    hideAside () {
      this.$emit('aside-hide')
      this.isA = !this.isA
    },
  },
}
</script>
<style  lang="scss" scoped>
.aside {
  background: #fafafa;
  font-size: 12px;
  margin: 0;
  box-sizing: border-box;
  .popup-btn {
    position: absolute;
    top: 40%;
    left: -20px;
    margin-top: -15px;
    width: 20px;
    height: 30px;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #eee;
    border-right: 0;
    border-radius: 3px 0 0 3px;
    color: #bfbfbf;
    background: #fafafa;
    cursor: pointer;
    &:hover,
    &:focus {
      background-color: #eee;
      color: #fff;
      box-shadow: 0 1px 1px 1px #eee;
    }
    i {
      transition: all 0.3s ease;
    }
  }
  .el-scrollbar {
    position: relative;
    height: calc(100% - 64px);
    padding: 0;
    .el-scrollbar__view {
      > div {
        padding: 10px 10px 20px 10px;
        border-bottom: 1px solid #ececec;
      }
    }
  }
}
</style>
