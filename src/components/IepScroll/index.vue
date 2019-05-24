<template>
  <div class="iep-scroll" ref="myScroll" @scroll.passive="onScroll($event)">
    <slot></slot>
    <div class="footer">{{stateList[state]}}</div>
  </div>
</template>

<script>
export default {
  props: {
    loadData: {
      type: Function,
    },
    load: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      myScroll: null,
      myScrollList: null,
      state: 0,
      stateList: {
        0: '',
        1: '刷新中',
        2: '松开刷新',
        3: '刷新完成',
        4: '加载中',
        5: '加载完成',
        6: '下拉刷新',
        7: '暂无更多数据',
      },
    }
  },
  methods: {
    onScroll (e) {
      let listHeight = this.myScrollList.offsetHeight // 列表总高度
      let listScrollTop = e.target.scrollTop + this.myScroll.offsetHeight // 当前滚动条位置
      if (this.state == 0 && listHeight - listScrollTop < 100) {
        this.bottomCallback()
      }
    },
    // 加载回调
    bottomCallback () {
      if (this.state != 7) {
        this.state = 4
        this.$emit('load-page', true)
      }
    },
  },
  watch: {
    load (newVal) {
      this.state = newVal
    },
  },
  mounted () {
    this.myScroll = this.$refs.myScroll // 获取滑条dom
    this.myScrollList = this.myScroll.children[0] // 获取列表dom
  },
}
</script>

<style>
.iep-scroll {
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  will-change: transform;
  transition: all 450ms;
  backface-visibility: hidden;
  perspective: 1000;
}
.footer {
  font-size: 12px;
  color: #999;
  text-align: center;
  margin-bottom: 20px;
  height: 18px;
}
</style>
