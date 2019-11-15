<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="我的培训"></page-header>
      <div class="shipowner_title">
        <div style="float:right">
          <span><el-input v-model="params.title" placeholder="请输入开班名称" size="small" clearable></el-input></span>
          <span><el-input v-model="params.address" placeholder="请输入开班地点" size="small" clearable></el-input></span>
          <span><el-date-picker v-model="params.openTime" type="date" value-format="yyyy-MM-dd" placeholder="请输入开班日期"></el-date-picker></span>
          <span><el-date-picker v-model="params.applyStartTime" type="date" value-format="yyyy-MM-dd" placeholder="请输入报名开始日期"></el-date-picker></span>
          <span><el-date-picker v-model="params.applyEndTime" type="date" value-format="yyyy-MM-dd" placeholder="请输入报名结束日期"></el-date-picker></span>
          <el-button size="small"  @click="getData">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="trainClassList"
          stripe
          style="width: 100%">
          <el-table-column
            v-for="(item,index) in options.columns"
            :key="index"
            :prop="item.value"  
            :label="item.text"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status === 1" type="text" icon="el-icon-delete" size="mini" @click="handleCancel(scope.row.id)">取消</el-button>
              <el-button type="text" icon="el-icon-delete" size="mini" @click="handleSign(scope.row.trainId)">签到记录</el-button>
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
import { getApplyPage, reviewApply } from '@/api/train/apply'
import { getUserInfo } from '@/api/login'
import { getObj } from '@/api/admin/user'
export default {
  data () {
    return {
      trainClassList: [],
      total: 10,
      // 查询数据
      params: {
        current: 1,
        size: 10,
        traStatus: 1,
        title: '',
        openTime: '',
        address: '',
        applyStartTime: '',
        applyEndTime: '',
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '开班名称',
            value: 'title',
          },
          {
            text: '机构名称',
            value: 'trauserId',
          },
          {
            text: '开班地点',
            value: 'address',
          },
          {
            text: '开班时间',
            value: 'openTime',
          },
          {
            text: '报名开始日期',
            value: 'applyStartTime',
          },
          {
            text: '报名结束日期',
            value: 'applyEndTime',
          },
        ],
      },
    }
  },
  computed: {
  },
  methods: {
    // 分页
    currentChange (val) {
      this.params.current = val
      this.getData()
    },
    // 获取列表数据
    async getData () {
      var userId  = await getUserInfo().then(res => {
        return res.data.data.sysUser.userId
      })
      this.params.userId = userId
      getApplyPage(this.params).then(data => {
        this.trainClassList = data.data.data.records
        this.trainClassList.forEach(v => {
           getObj(v.trauserId).then(data => {
            v.trauserId = data.data.data.realName
          })
        })
      })
    },
    handleSign (val) {
      this.$router.push({ path: `/article_spa/sign_information/${val}` })
    },
    handleCancel (val) {
      this.$confirm('此操作将取消该培训, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let status = 0
        reviewApply(val, status).then(() => {
          this.$message({
            type: 'success',
            message: '取消成功！',
          })
          this.getData()
        }).catch(err=>{
          this.$message.error(err.data.msg)
        })
      }).catch(() => { 
        this.$message({
          type: 'info',
          message: '已取消该操作',
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
