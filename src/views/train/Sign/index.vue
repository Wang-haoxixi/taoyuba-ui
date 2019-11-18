<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="签到记录"></page-header>
      <div class="shipowner_title">
        <div style="float:right">
          <span><el-input v-model="params.trainTitle" placeholder="请输入培训课程" size="small" clearable></el-input></span>
          <span><el-input v-model="params.userName" placeholder="请输入签到人" size="small" clearable></el-input></span>
          <span><el-input v-model="params.signPlace" placeholder="请输入签到地点" size="small" clearable></el-input></span>
          <span style="width:240px"><el-date-picker v-model="params.timeLists" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" 
              value-format="yyyy-MM-dd HH:mm:ss"  size="mini"></el-date-picker></span>
          <el-button size="small"  @click="getParamData">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="signList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="userId"
            label="签到人"
            width="180">
            <template slot-scope="scope">
              <div @click="getUserList(scope.row.userId)">{{scope.row.userId}}</div>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item,index) in options.columns"
            :key="index"
            :prop="item.value"  
            :label="item.text"
          >
          </el-table-column>
          <el-table-column prop="progress" label="进度">
            <template slot-scope="scope">
              <el-progress :percentage="scope.row.progress"></el-progress>
            </template>
          </el-table-column>
        </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getSignPage } from '@/api/train/sign'
// import { getUserInfo } from '@/api/login'
import { getObj } from '@/api/admin/user'
// import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      signList: [],
      total: 10,
      // 查询数据
      params: {
        current: 1,
        size: 10,
        type: '',
        trainTitle: '',
        userName: '',
        signPlace: '',
        timeLists: '',
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '培训课程',
            value: 'trainTitle',
          },
          {
            text: '签到地点',
            value: 'signPlace',
          },
          {
            text: '签到时间',
            value: 'createTime',
          },
        ],
      },
    }
  },
  methods: {
    // 分页
    currentChange (val) {
      this.params.current = val
      this.getData()
    },
    // 获取列表数据
    getData () {
      getSignPage(this.params).then(data => {
        this.signList = data.data.data.records
        this.signList.forEach(v => {
          getObj(v.userId).then(data => {
            v.userId = data.data.data.realName
          })
        })
      })
    },
    getParamData () {
      if (this.params.timeLists) {
        this.params.signStartTime = this.params.timeLists[0]
        this.params.signEndTime = this.params.timeLists[1]
      }
      this.params.current = 1
      this.getData()
    },
    getUserList (val) {
      getSignPage({ userName: val, current: 1, size: 10 }).then(data => {
        this.signList = data.data.data.records
        this.signList.forEach(v => {
          getObj(v.userId).then(data => {
            v.userId = data.data.data.realName
          })
        })
      })
    },
  },
  created () {
    this.getData()
  },
  // activated () {
  //   this.getData()
  // },
 }
</script>
<style lang="scss" scoped>
.shipowner {
  padding: 20px;
}
.shipowner_title {
  span {
    width: 150px;
    display: inline-block;
    margin: 0 5px;
  }
}
</style>
