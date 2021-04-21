<template>
  <div class="contract-box">
    <basic-container v-if="detailType === 0 ">
      <div class="shipowner_title">
        <el-button @click="getData" type="default" size="small">刷新</el-button>
        <el-button @click="handleStatistics" type="default" size="small">统计</el-button>
        <el-button @click="getData" type="default" size="small">导出信息</el-button>
        <div style="float:right">
          <span style="width:120px"><el-input v-model.trim="params.realName" placeholder="会议标题" size="small" clearable></el-input></span>
          <span style="width:120px"><el-input v-model.trim="params.realName" placeholder="船名号" size="small" clearable></el-input></span>
          <span style="width:120px"><el-input v-model.trim="params.realName" placeholder="姓名" size="small" clearable></el-input></span>
          <el-button size="small"  @click="getData">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="faceList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="realName"
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            prop="手机号"
            label="手机号"
          >
          </el-table-column>
          <el-table-column
            prop="渔船名"
            label="渔船名"
          >
          </el-table-column>
          <el-table-column
            prop="角色"
            label="角色"
          >
            <template>
              <div>角色</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="签到时间"
            label="签到时间"
          >
          </el-table-column>
          <el-table-column
            prop="签到时间"
            label="签到时间"
          >
          </el-table-column>
          <el-table-column
            prop="签退时间"
            label="签退时间"
          >
          </el-table-column>
          <el-table-column
            prop="培训名称"
            label="培训名称"
          >
          </el-table-column>
          <el-table-column
            prop="合作社"
            label="合作社"
          >
            <template>
              <div>合作社</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.row.id)">查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="page.total"
          :page-size="page.size"
          :current-page.sync="page.current"
          @current-change="currentChange">
        </el-pagination>
      </div>
    </basic-container>
    <detail v-if="detailType === 1" ref="detail" @back="detailType = 0"></detail>
    <statistics v-if="detailType === 2" ref="statistics" @back="detailType = 0"></statistics>
  </div>
</template>
<script>
import { getList } from '@/api/tmlms/faceList'
import detail from './detail.vue'
import statistics from './statistics.vue'
export default {
  name: 'faceList',
  mixins: [],
  data () {
    return {
      page: {
        size: 10,
        current: 1,
        total: 0,
      },
      params: {},
      detailType: 0,
      faceList: [],
    }
  },
  created () {
    this.getData()
  },
  methods: {
        // 分页
    currentChange (val) {
      this.page.current = val
      this.getData()
    },
    getData () {
      getList({...this.params,...this.page}).then(res=>{
        this.faceList = res.data.data.records
        this.page = {
          size: res.data.data.size,
          current: res.data.data.current,
          total: res.data.data.total,
        }
      })
    },
    // 查看详情
    handleView (id) {
      this.detailType = 1
      this.$nextTick(()=>{
        this.$refs.detail.getDetail(id)
      })
    },
    // 查看统计
    handleStatistics (id) {
      this.detailType = 2
      this.$nextTick(()=>{
        this.$refs.statistics.getDetail(id)
      })
    },
  },
  components: {
    detail,
    statistics,
  },
  filters: {
  },
  watch: {
  },
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
.export-btn-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.export-btn {
  margin-bottom: 10px;
  margin-left: 0;
  margin-right: 10px;
}
</style>
