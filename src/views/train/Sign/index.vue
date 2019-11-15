<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="签到记录"></page-header>
      <div class="shipowner_title">
        <div style="float:right">
          <span><el-input v-model="params.trainTitle" placeholder="请输入培训课程" size="small" clearable></el-input></span>
          <span><el-input v-model="params.userId" placeholder="请输入签到人" size="small" clearable></el-input></span>
          <span><el-input v-model="params.signPlace" placeholder="请输入签到地点" size="small" clearable></el-input></span>
          <span><el-date-picker v-model="params.createTime" type="date" value-format="yyyy-MM-dd" placeholder="请输入开班日期"></el-date-picker></span>
          <el-button size="small"  @click="getData">搜索</el-button>
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
          </el-table-column>
          <el-table-column
            v-for="(item,index) in options.columns"
            :key="index"
            :prop="item.value"  
            :label="item.text"
          >
          </el-table-column>
        </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
    </basic-container>
  </div>
</template>
<script>
// import { getUserInfo } from '@/api/login'
// import { getObj } from '@/api/admin/user'
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
        userId: '',
        signPlace: '',
        createTime: '',
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
          {
            text: '进度',
            value: 'plan',
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
