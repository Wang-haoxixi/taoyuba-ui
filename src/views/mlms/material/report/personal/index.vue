<template>
  <div class="daily">

    <div class="search">
      <div class="item">
        <el-date-picker v-model="searchData.date" type="date" placeholder="选择日期" size="small"></el-date-picker>
      </div>
      <!-- <div class="item">
        <el-input v-model="searchData.title" placeholder="请输入关键词" size="small"></el-input>
      </div> -->
      <iep-button @click="search">搜索</iep-button>
    </div>
    <div class="content">
      <div class="timeline">
        <time-line ref="timeline" @actively="actively" :option="timeLineOption" @changeYear="changeYear"></time-line>
      </div>
      <div class="form">
        <weekly-form ref="dislog" v-if="contentType==='week'" :data="formData" @success-submit="successSubmit"></weekly-form>
        <monthly-form ref="dislog" v-else :data="formData" @success-submit="successSubmit"></monthly-form>
      </div>
    </div>
      
  </div>
</template>

<script>
import TimeLine from '../timeline'
import weeklyForm from './weekly'
import monthlyForm from './monthly'
import { createWeeks, getWeekOfYear, formatDig, getMonday, getDateObj } from '../util'
import { getTableData } from '@/api/mlms/material/report/personal'

export default {
  name: 'daily',
  components: { TimeLine, weeklyForm, monthlyForm },
  data () {
    return {
      activeIndex: [],
      timeLineOption: {
        list: [],
        isParentClick: true,
      },
      formData: {},
      validate: false,
      searchData: {
        date: '',
        title: '',
      },
      contentType: 'week',
      params: '',
      today: new Date(),
    }
  },
  methods: {
    activeChange (val) {
      this.activeIndex = [val[val.length-1]]
      this.$refs['timeline'].active = this.activeIndex[0]
    },
    submit () {
      
    },
    search () {
      let date = this.searchData.date ? new Date(this.searchData.date) : new Date()
      // 获取到选中的时间，解析出来年月周
      let monday = new Date(getMonday(date).timeStamp)
      // this.timeLineOption.active = monday.getMonth() + 1
      // this.timeLineOption.activeChild = getWeekOfMonth(monday)
      this.loadPage(monday, 'search')
    },
    actively (item, type) {
      this.contentType = type
      this.$nextTick(() => {
        this.$refs['dislog'].dislogState = 'detail'
        this.formData = item
      })
      // 点击月份进行数据的获取
      if (type == 'month') {
        this.params = new Date(item.timeStamp)
        this.loadList(this.params, '', true)
      }
    },
    loadList (date, type, isMonth) {
      // let month = date.getMonth() + 1
      let month = getDateObj(this.timeLineOption.list, date).month
      getTableData({ yearMonthTime: `${date.getFullYear()}-${formatDig(13 - month)}` }).then((res) => {
        let obj = this.timeLineOption.list[month]
        let resObj = {}
        for (let index in obj.children) {
          for (let t of res.data.data) {
            let timeStamp = new Date(t.createTime) - obj.children[index].timeStamp
            // 此条数据生成的时间在一周之内
            if (timeStamp >= 0 && timeStamp < 7*24*60*60*1000 && t.reportType == 0) {
              this.timeLineOption.list[month].children[index] = Object.assign({}, obj.children[index], t)
            }
            if (t.reportType == 1) { // 月报
              resObj = t
            }
          }
        }
        obj = Object.assign({}, obj, resObj)
        if (isMonth) {
          this.formData = obj
        }
        this.$set(this.timeLineOption.list, month, obj)
        // 是否是初次或者搜索
        if (type) {
          this.formData = this.timeLineOption.list[this.timeLineOption.active].children[this.timeLineOption.activeChild]
        }
      })
    },
    successSubmit () {
      this.loadList(this.params)
      this.$refs['dislog'].dislogState = 'detail'
    },
    changeYear (year) {
      this.loadPage(new Date(`${year}-01-01`), 'year')
    },
    loadPage (date, type) {
      // 初始化时间轴，获取到当前的周
      let list = createWeeks((new Date(type === 'year' ? date : getMonday(date).timeStamp)).getFullYear())
      if (type === 'year') {
        // 需要判断是否是当前年，若不是，显示第一个月，若是，显示现在时
        let obj = {}
        if (date.getFullYear() == this.today.getFullYear()) {
          obj = getDateObj(list, this.today)
          date = new Date(`${date.getFullYear()}-${13-obj.month}-01`)
        } else {
          obj = { month: 1, week: 0 }
        }
        this.$refs['timeline'].active = this.timeLineOption.active = obj.month
        this.$refs['timeline'].activeChild = this.timeLineOption.activeChild = obj.week
        this.contentType = 'week'
      } else if (type === 'search') {
        let obj = getDateObj(list, date)
        this.$refs['timeline'].active = this.timeLineOption.active = obj.month
        this.$refs['timeline'].activeChild = this.timeLineOption.activeChild = obj.week
        // this.$refs['timeline'].active = this.timeLineOption.active
        // this.$refs['timeline'].activeChild = this.timeLineOption.activeChild
      } else {
        let obj = getDateObj(list, new Date(getMonday(+this.today).timeStamp))
        this.timeLineOption.active = obj.month
        this.timeLineOption.activeChild = obj.week
      }
      // 赋值时间轴
      this.timeLineOption.list = list
      this.params = date
      this.loadList(this.params, 'start')
    },
  },
  created () {
    // 获取当前的时间，默认显示当前年-当前月
    let date = this.today
    if (getWeekOfYear() == 0) {
      this.today = new Date(date.getFullYear() - 1, 11, 31)
      date = this.today
    }
    this.loadPage(date)
  },
}
</script>

<style lang="scss" scoped>
.daily {
  margin-right: 16%;
  padding: 20px 0 0;
  .search {
    margin-bottom: 20px;
    .item {
      display: inline-block;
      width: 150px;
      margin-right: 15px;
    }
  }
  .content {
    display: flex;
    .timeline {
      width: 180px;
    }
    .form {
      // flex: 1;
      width: calc(100% - 180px);
    }
  }
}
</style>
