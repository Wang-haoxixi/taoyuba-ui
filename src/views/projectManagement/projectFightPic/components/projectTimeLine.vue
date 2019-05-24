<template>
  <div class="swiper-outer"
       @mousedown="mousedown($event)"
       @mousemove="mousemove($event)"
       @mouseout="mouseout()"
       @mouseup="mouseup($event)">
    <div class="swiper-inner" :style="getPosition">
      <div class="swiper-months" v-for="(month, index) in getMonth" :key="index">
        <div class="swiper-month">{{month}}</div>
        <ol class="swiper-weaks">
          <li class="swiper-weak">第一周</li>
          <li class="swiper-weak">第二周</li>
          <li class="swiper-weak">第三周</li>
          <li class="swiper-weak">第四周</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { getNextMonth, getMonthDiff} from '@/util/date.js'
export default {
  name: 'project-time-line',
  data () {
    return {
      startX: null,
    }
  },
  props: {
    startMonth: {
      type: String,
    },
    endMonth: {
      type: String,
    },
    scrollLeft: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    mousedown (e) {
      this.startX = e.offsetX
    },
    mousemove (e) {
      if (this.startX) {
        this.$emit('positionMove', e.offsetX - this.startX)
        this.startX = e.offsetX
      }
    },
    mouseout () {
      this.startX = null
    },
    mouseup () {
      this.startX = null
    },
  },
  computed: {
    getMonth () {
      let monthArr = []
      let startDate = new Date(this.startMonth)
      let monthDiff = getMonthDiff(this.startMonth, this.endMonth)
      for (let i = 0; i < monthDiff; i++) {
        monthArr.push(`${startDate.getFullYear()}年${startDate.getMonth() + 1}月`)
        startDate = getNextMonth({date: startDate})
      }
      return monthArr
    },
    getPosition () {
      return {
        transform: `translateX(${-this.scrollLeft}px)`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.swiper-outer {
  position: relative;
  height: 42px;
  overflow: hidden;
  cursor: move;
  user-select: none;
}
.swiper-inner {
  position: absolute;
  top: 0;
  bottom: 0;
  white-space: nowrap;
  pointer-events: none;
  font-size: 14px;
  transform: translate3D(0, 0, 0);
  -webkit-transform: translate3D(0, 0, 0);
}
.swiper-months {
  display: inline-block;
  vertical-align: top;
  height: 40px;
  line-height: 40px;
  width: 400px;
  text-align: center;
  color: #FFFFFF;
  .swiper-month {
    height: 20px;
    line-height: 20px;
    background: #409EFF;
  }
}
.swiper-weaks {
  line-height: 20px;
  color: #333333;
  .swiper-weak {
    display: inline-block;
    width: 25%;
    height: 20px;
    line-height: 20px;
    border-right: 1px solid #DCDFE6;
  }
}
</style>
