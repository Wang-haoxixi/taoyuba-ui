<template>
  <gov-layout-main>
    <gov-layout-header>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-date-picker
            v-model="selectedTime"
            type="monthrange"
            value-format="yyyy-MM"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            @change="changeMonth">
          </el-date-picker>
        </el-col>
      </el-row>   
    </gov-layout-header>
    <gov-layout-body>
      <div class="project-table-title" ref="tabeltitle">
        <div class="project-title">
          项目/里程碑
        </div>
        <project-time-line
          :startMonth="startMonth"
          :endMonth="endMonth"
          style="margin-left: 200px;"
          :scrollLeft="scrollLeft"
        @positionMove="positionMove"></project-time-line>
      </div>
      <div style="position: relative">
        <div class="time-line-box">
          <el-tooltip effect="light"
                      :style="getTimeLineStyle"
                      :content="`当前时间:${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`"
                      :visible-arrow="false"
                      placement="right">
            <div class="time-line"></div>
          </el-tooltip>
        </div>
        <project-item
          v-for="project in data.projects"
          :key="project.id"
          :startMonth="startMonth"
          :endMonth="endMonth"
          :project="project"
          :scrollLeft="scrollLeft"></project-item>
      </div>
    </gov-layout-body>
  </gov-layout-main>
</template>

<script>
import projectTimeLine from './components/projectTimeLine.vue'
import projectItem from './components/projectItem.vue'
import { getProjectFightPic } from '@/api/projectManagement/projectFightPic'
import { getMonthDiff, getFullDay, getNextMonth } from '@/util/date.js'
export default {
  name: 'projectFightPic', // 项目作战图
  components: {
    projectItem,
    projectTimeLine,
  },
  data () {
    return {
      data: '',
      scrollLeft: 0,
      monthDiff: 0,
      selectedTime: '',
      startMonth: '',
      endMonth: '',
    }
  },
  created () {
    this.initMonth()
  },
  watch: {
    'selectedTime': {
      handler (val) {
        if (val) {
          this.startMonth = val[0]
          this.endMonth = val[1]
        }
      },
    },
  },
  methods: {
    initMonth () {
      let preMonth = getNextMonth({num: -2})
      this.startMonth = preMonth.getFullYear() + '-' + (preMonth.getMonth() < 9 ? `0${preMonth.getMonth() + 1}` : (preMonth.getMonth() + 1))
      let nextMonth = getNextMonth()
      this.endMonth = nextMonth.getFullYear() + '-' + (nextMonth.getMonth() < 9 ? `0${nextMonth.getMonth() + 2}` : (nextMonth.getMonth() + 2))
      this.getProjectFightPic()
    },
    changeMonth () {
      this.getProjectFightPic()
    },
    getProjectFightPic () {
      getProjectFightPic({startMonth: this.startMonth,endMonth: this.endMonth}).then(({data}) => {
        this.data = data
        this.monthDiff = getMonthDiff(this.data.startMonth, this.data.endMonth)
      })

    },
    positionMove (distance) {
      let boxWidth = this.$refs.tabeltitle.clientWidth - 200
      if (this.scrollLeft - distance >= 0 && this.scrollLeft - distance <= (this.monthDiff * 400 - boxWidth)) {
        this.scrollLeft = this.scrollLeft - distance
      } else {
        this.scrollLeft = this.scrollLeft - distance < 0 ? 0 : (this.monthDiff * 400 - boxWidth)
      }
    },
  },
  computed: {
    getTimeLineStyle () {
      return {
        left: `${this.getCurrentDateLeft - this.scrollLeft}px`,
      }
    },
    getCurrentDateLeft () {
      let date = new Date()
      let month = getMonthDiff(this.startMonth, date) - 1
      let days = (date.getDate())
      let fullDay = getFullDay(date)
      return month * 400 + Math.round(days / fullDay * 400) - 4
    },
  },
}
</script>

<style lang="scss" scoped>
.project-table-title {
  height: 42px;
  line-height: 42px;
  position: relative;
  border: 1px solid #DCDFE6;
}
.project-title {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  z-index: 2;
  background: #FFFFFF;
  text-align: center;
  border-right: 1px solid #DCDFE6;
}
.time-line-box {
  position: absolute;
  left: 200px;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 2;
  overflow: hidden;
  pointer-events: none;
  .time-line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 7px;
    z-index: 2;
    pointer-events: auto;
    &::after {
      display: block;
      content: '';
      margin: 0 auto;
      height: 100%;
      width: 0;
      border-right: 1px dashed red;
    }
  }
}
</style>
