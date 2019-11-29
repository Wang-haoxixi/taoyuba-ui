<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="签到记录"></page-header>
      <div class="shipowner_title">
        <div style="margin-left: 90px">
          <span><el-input v-model="params.deptName" placeholder="请输入机构名称" size="mini" clearable></el-input></span>
          <span><el-input v-model="params.trainName" placeholder="请输入培训信息" size="mini" clearable></el-input></span>
          <span><el-input v-model="params.trainTitle" placeholder="请输入培训课程" size="mini" clearable></el-input></span>
          <span><el-input v-model="params.userName" placeholder="请输入签到人" size="mini" clearable></el-input></span>
          <span><el-input v-model="params.signPlace" placeholder="请输入签到地点" size="mini" clearable></el-input></span>
          <span style="width:240px"><el-date-picker v-model="params.timeLists" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" 
              value-format="yyyy-MM-dd HH:mm:ss"  size="mini"></el-date-picker></span>
          <el-button size="mini"  @click="getParamData">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="signList"
          :header-cell-style="{background:'#eef1f6', color:'#606266'}"
          stripe
          style="width: 100%; margin-top: 30px">
          <el-table-column
            prop="userId"
            label="签到人"
            width="100"
            >
            <template slot-scope="scope">
              <div @click="getSerachList('userName', scope.row.userId)" style="cursor:pointer">{{scope.row.userId}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="deptId"
            label="机构名称"
            width="150">
            <template slot-scope="scope">
              <div @click="getSerachList('deptName', scope.row.deptId)" style="cursor:pointer">{{scope.row.deptId}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="trainId"
            label="培训信息"
            width="150">
            <template slot-scope="scope">
              <div @click="getSerachList('trainName', scope.row.trainId)" style="cursor:pointer">{{scope.row.trainId}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="trainTitle"
            label="培训课程"
            width="150">
            <template slot-scope="scope">
              <div @click="getSerachList('trainTitle', scope.row.trainTitle)" style="cursor:pointer">{{scope.row.trainTitle}}</div>
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
import { detailClass } from '@/api/train/class'
// import { lessonById } from '@/api/train/lesson'
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
        deptName: '',
        trainName: '',
      },
      options: {
        expandAll: false,
        columns: [
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
          getObj(v.userId).then(m => {
            v.userId = m.data.data.realName
          })
          getObj(v.deptId).then(n => {
            v.deptId = n.data.data.realName
          })
          detailClass(v.trainId).then(k => {
            v.trainId = k.data.data.title
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
    getSerachList (name, val) {
      let obj = {}
      if(name === 'userName') {
        obj = { userName: val, current: 1, size: 10 }
      }
      if(name === 'deptName') {
        obj = { deptName: val, current: 1, size: 10 }
      }
      if(name === 'trainName') {
        obj = { trainName: val, current: 1, size: 10 }
      }
      if(name === 'trainTitle') {
        obj = { trainTitle: val, current: 1, size: 10 }
      }
      getSignPage(obj).then(data => {
        this.signList = data.data.data.records
        this.signList.forEach(v => {
          getObj(v.userId).then(m => {
            v.userId = m.data.data.realName
          })
          getObj(v.deptId).then(n => {
            v.deptId = n.data.data.realName
          })
          detailClass(v.trainId).then(k => {
            v.trainId = k.data.data.title
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
<style>
</style>
