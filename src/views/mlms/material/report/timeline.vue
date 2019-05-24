<template>
  <div class="time-line">
    <div class="chosen-year">
      <el-date-picker
        v-model="selectYear"
        type="year"
        placeholder="选择年"
        ref="selectYear"
        @change="changeYear"
        value-format="yyyy">
      </el-date-picker>
    </div>
    <div v-for="(item, index) in option.list" :key=index>
      <div class="item" v-if="todayTime.timeStamp > item.timeStamp || item.year">
        <div class="before year" v-if="item.year" @click="chosenYear(item.year)">{{item.year}}年</div>
        <div class="middle">
          <div class="tail"></div>
          <div class="date icon" v-if="item.year" @click="chosenYear(item.year)"><i class="icon-jiantouxiangyou"></i></div>
          <div class="date" v-else @click="actively(index, 'month', item)" :class="active===index?'actively':''">{{item.date}}</div>
          <div class="content">
            <slot name="content" :row="item" :index="index"></slot>
          </div>
        </div>
        <!-- 展开的子级 -->
        <div v-if="active===index">
          <div v-for="(child, i) in item.children" :key="i">
            <div class="child" :class="activeChild===i?'actively':''" v-if="todayTime.timeStamp > child.timeStamp">
              <div class="before" @click="actively(i, 'week', child)">
                <div class="title" v-text="`第${toChinesNum(child.index)}周`"></div>
                <div class="sub-title">{{child.startTime}} ~ {{child.endTime}}</div>
              </div>
              <div class="middle">
                <div class="tail"></div>
                <div class="date" @click="actively(i, 'week', child)"><i class="spot"></i></div>
                <div class="content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toChinesNum, getMonday } from './util'

export default {
  name: 'timeline',
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
  },
  data () {
    let active = this.option.active
    let activeChild = this.option.activeChild
    return {
      active: active,
      activeChild: activeChild,
      selectYear: '',
      todayTime: getMonday(new Date()),
    }
  },
  methods: {
    // 周月点击事件
    actively (index, type, item) {
      // 点击时间轴首先判断是否到达时间，若为未来时，点击无效
      if (item.timeStamp > (+new Date())) {
        // this.$message('未到时间')
        return
      }
      if (type === 'month') {
        if (this.option.isParentClick) {
          if (this.activeChild == -1 && this.active == index) {
            this.active = -1
          } else {
            this.active = index
          }
        } else {
          this.active = this.active == index ? -1 : index
        }
        this.activeChild = -1
        // 去获取数据
      } else {
        this.activeChild = index
      }
      item.$index = index
      this.$emit('actively', item, type)
    },
    toChinesNum (index) {
      return toChinesNum(index)
    },
    // 年份点击事件
    chosenYear () {
      this.$refs['selectYear'].focus()
    },
    changeYear (val) {
      this.$emit('changeYear', val)
    },
  },
  watch: {
  },
}
</script>

<style lang="scss" scoped>
.time-line {
  .item {
    width: 150px;
    position: relative;
    min-height: 50px;
    .before {
      width: 100px;
      padding: 5px 0 0;
      position: absolute;
      top: 0px;
      text-align: right;
    }
    .year {
      cursor: pointer;
    }
    .middle {
      margin-left: 100px;
      position: relative;
      padding-left: 10px;
      .tail {
        position: absolute;
        left: 27px;
        top: 33px;
        height: calc(100% - 33px);
        border-left: 1px solid #e4e7ed;
        :last-of-type {
          border: 0;
        }
      }
      .tail:last-of-type {
        border: 0;
      }
      .date {
        border-radius: 50%;
        border: 1px solid #ddd;
        width: 34px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        font-size: 12px;
        cursor: pointer;
      }
      .icon {
        transform: rotate(134deg);
        color: #999;
      }
      .active {
        border: 1px solid #F56C6C;
        color: #F56C6C;
        background: #fef0f0;
        border-color: #fbc4c4;
      }
      .content {
        position: relative;
        margin-left: 43px;
        top: -33px;
        min-height: 40px;
      }
    }
    .child {
      position: relative;
      min-height: 50px;
      .before {
        cursor: pointer;
        text-align: right;
        margin-top: -20px;
        .title {
          font-size: 14px;
          color: #666;
        }
        .sub-title {
          font-size: 12px;
          color: #999;
        }
      }
      .middle {
        margin-left: 109px;
      }
      .tail {
        left: 18px;
        top: 18px;
        height: calc(100% - 18px);
      }
      .date {
        width: 18px;
        height: 18px;
        .spot:before {
          content: "";
          position: absolute;
          height: 4px;
          width: 4px;
          border: 2px solid #ddd;
          border-radius: 50%;
          background-color: #ddd;
          top: 7px;
          left: 17px;
        }
      }
    }
    .actively {
      color: #F56C6C;
      .title {
        color: #F56C6C !important;
      }
      .date {
        border: 1px solid #F56C6C;
        .spot:before {
          border: 2px solid #F56C6C;
          background-color: #F56C6C;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.chosen-year {
  width: 0;
  height: 0;
  input {
    width: 0;
    height: 0;
    border: 0;
  }
  span {
    display: none;
  }
}
</style>
