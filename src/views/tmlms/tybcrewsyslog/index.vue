<template>
  <div>
    <basic-container>
      <page-header title="上下船登记统计"></page-header>
      <operation-container>
        <template slot="right">
            <div style="width: 320px;">
                <el-date-picker
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="rangeTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
          <el-button size="small"  @click="onSearch()">搜索</el-button>
        </template>
      </operation-container>
      <div>
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="villageName"
            label="基层名">
          </el-table-column>
          <el-table-column
            prop="upCount"
            label="上船数量">
          </el-table-column>
          <el-table-column
            prop="downCount"
            label="下船数量">
          </el-table-column>
        </el-table>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getPage } from '@/api/tmlms/tybcrewsyslog'

export default {
  data () {
    return {
      rangeTime: [],
      total: 0,
      tableData: [],
      loading: false,
    }
  },
  mounted () {
    function nowTime () {//获取当前时间
        let now = new Date()
        let _month = ( 10 > (now.getMonth()+1) ) ? '0' + (now.getMonth()+1) : now.getMonth()+1
        let _day = ( 10 > now.getDate() ) ? '0' + now.getDate() : now.getDate()
        let _hour = ( 10 > now.getHours() ) ? '0' + now.getHours() : now.getHours()
        let _minute = ( 10 > now.getMinutes() ) ? '0' + now.getMinutes() : now.getMinutes()
        let _second = ( 10 > now.getSeconds() ) ? '0' + now.getSeconds() : now.getSeconds()
        return now.getFullYear() + '-' + _month + '-' + _day + ' ' + _hour + ':' + _minute + ':' + _second
    }
    this.rangeTime = [nowTime(),nowTime()]
    this.getList()
  },
  methods: {
    onSearch () {
      this.getList()
    },
    getList () {
      this.loading = true
      let data = {
          startTime: this.rangeTime[0],
          endTime: this.rangeTime[1],
      }
      getPage(data).then(({ data }) => {
        this.loading = false
        if (data.code === 0) {
          this.tableData = data.data
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 分页
    currentChange (val) {
      this.params.current = val
      this.getList()
    },
    onBack () {
      this.show = true,
      this.showForm = false
    },
    onSuccess () {
      this.onBack()
      this.getList()
    },
  },
}
</script>
<style scoped lang="scss"></style>