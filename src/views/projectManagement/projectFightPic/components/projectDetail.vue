<template>
  <div class="project-detail" :style="getStyle">
    <div class="detail-left" :style="getLabelStyle">
      <i class="iconfont icon-lichengbei-lanse" style="font-size: 18px;color: #409EFF"></i>
      {{label}}
    </div>
    <div class="detail-right" :style="getContentStyle">
      <div class="detail-content" :style="getPosition" v-if="detail">
        <el-tooltip v-for="(item, index) in detail.timeLine"
                    :key="index"
                    class="detail-timelines"
                    :style="getTimelineStyle(item)"
                    effect="light"
                    :content="item.time"
                    :visible-arrow="false"
                    placement="top">
          <span><i v-if="item.expection === -1 || item.degree === 100" class="iconfont" :class="item.degree === 100 ? 'icon-cz-yes' : 'icon-chaoqi'"></i>{{getDegree(item)}}</span>
        </el-tooltip>
        <el-tooltip effect="light"
                    :style="getEndLineStyle"
                    :content="`预计时间${detail.expectTime}`"
                    :visible-arrow="false"
                    placement="right">
          <div class="end-line"></div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
  import { getMonthDiff, getFullDay } from '@/util/date.js'
export default {
  name: 'project-detail',
  props: {
    /*
    组件宽度
     */
    width: {
      type: String,
      default: '100%',
    },
    /*
    组件高度
     */
    height: {
      type: Number,
      default: 50,
    },
    /*
    头部内容文字
     */
    label: {
      type: String,
    },
    /*
    头部内容宽度
     */
    labelWidth: {
      type: Number,
      default: 200,
    },
    /*
    时间线
    */
    detail: {
      type: Object,
      default () {
        return {}
      },
    },
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
    getDegree (timeLine) {
      if (timeLine.degree === 100) {
        if (timeLine.expection === -1) {
          return '延期完成'
        } else if (timeLine.expection === 0) {
          return '准时完成'
        } else {
          return '提前完成'
        }
      } else {
        return `已完成${timeLine.degree}%`
      }
    },
    getTimelineStyle (degree) {
      let date = new Date(degree.time)
      let month = getMonthDiff(this.startMonth, degree.time) - 1
      let days = date.getDate()
      let fullDay = getFullDay(date)
      let left = month * 400 + Math.round(days / fullDay * 400)
      let color = degree.expection === -1 ? '#F56C6C' : degree.expection === 0 ? '#409EFF' : '#67C23A'
      return {
        left: `${left}px`,
        color,
      }
    },
  },
  computed: {
    getStyle () {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
        lineHeight: this.height + 'px',
      }
    },
    getLabelStyle () {
      return {
        fontSize: '12px',
        color: '#909399',
        width: this.labelWidth + 'px',
      }
    },
    getContentStyle () {
      return {
        left: this.labelWidth + 'px',
      }
    },
    getPosition () {
      let month = getMonthDiff(this.startMonth, this.endMonth)
      return {
        width: `${month * 400}px`,
        transform: `translateX(${-this.scrollLeft}px)`,
      }
    },
    getEndLineStyle () {
      let date = new Date(this.detail.expectTime)
      let month = getMonthDiff(this.startMonth, this.detail.expectTime) - 1
      let days = (date.getDate())
      let fullDay = getFullDay(date)
      let left = month * 400 + Math.round(days / fullDay * 400) - 4
      return {
        left: `${left}px`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.project-detail {
  position: relative;
  border-bottom: 1px solid #E4E7ED;
}
.detail-left {
  padding: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.detail-right {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.detail-content {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  min-width: 100%;
  transform: translate3D(0, 0, 0);
  -webkit-transform: translate3D(0, 0, 0);
  .detail-timelines {
    position: absolute;
    left: 15px;
    top: 15px;
    line-height: 20px;
  }
}
.end-line {
  position: absolute;
  width: 7px;
  height: 100%;
  &::after {
    display: block;
    content: '';
    margin: 0 auto;
    height: 100%;
    width: 0;
    border-right: 1px dashed #409EFF;
  }
}
</style>
