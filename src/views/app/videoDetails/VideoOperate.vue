<template>
  <div class="video-operate">
    <span class="operate" v-for="operate in operateList" :key="operate.id">
      <i class="iconfont" :class="operate.icon"></i>
      <span>{{operate.operate}}</span>
    </span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      operateList: [
        {
          icon: 'icon-shoucang1',
          operate: '收藏',
        },
        {
          icon: 'icon-share',
          operate: '转发',
        },
        {
          icon: 'icon-download',
          operate: '下载',
        },
        {
          icon: 'icon-chakantiezigengduojubao',
          operate: '纠错',
        },
        {
          icon: 'icon-yuanbao',
          operate: '打赏',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.video-operate {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.operate {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0 30px;
  padding: 0 18px;
  border-right: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    color: #c73e3e;
  }
  i {
    margin-right: 5px;
    font-size: 22px;
  }
  &:last-child {
    border: 0;
  }
  &:last-child i {
    font-size: 28px;
  }
}
</style>
