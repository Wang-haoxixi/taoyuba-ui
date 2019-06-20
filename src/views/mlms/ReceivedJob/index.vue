<template>
  <div class="contract-box">
    <basic-container>
      <div class="shipowner_title">
        <div style="float:right">
          <span><el-input v-model="params.realName" placeholder="请输入姓名" size="small"></el-input></span>
          <span><el-input v-model="params.contactPhone" placeholder="请输入电话" size="small"></el-input></span>
          <el-button size="small"  @click="getData">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="shipownerList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="realName"
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            prop="contactPhone"
            label="联系电话"
          >
          </el-table-column>
          <el-table-column
            prop="education"
            label="教育背景"
          >
          <template slot-scope="scope">
             {{ changePosition(scope.row.education,'education') }}
          </template>
          </el-table-column>
          <el-table-column
            label="工作方式"
          >
          <template slot-scope="scope">
             {{ changePosition(scope.row.job,'worktype') }}
          </template>
          </el-table-column>
          <el-table-column
            prop="expectSalary"
            label="期望月薪"
          >
          </el-table-column>
          <el-table-column
            prop="birthday"
            label="出生日期"
          >
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleView(scope.row.resumeId)">查看
              </el-button>
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
import { getPage } from '@/api/post/ReceivedJob'
import { getPosition } from '@/api/post/admin'
export default {
  data () {
    return {
      shipownerList: [],
      total: 10,
      // 查询数据
      params: {
        current: 1,
        size: 10,
        agentName: '',
        status: '',
      },
      position: [],
      age: [],
      worktype: [],
      education: [],
      workMode: [],
      status: [
        {
          label: '审核中',
          value: 1,
        },
        {
          label: '审核通过',
          value: 2,
        },
        {
          label: '审核失败',
          value: 3,
        },
      ],
    }
  },
  methods: {
    // 分页
    currentChange (val) {
      this.params.current = val
      this.getData()
    },
        // 查看
    handleView (val) {
      this.$router.push({name: 'receiveResumeDetail',query:{ see: val }})
    },
    // 获取列表数据
    getData () {
      getPage(this.params).then(res=>{
        this.shipownerList = res.data.data.records
        this.shipownerList.forEach( item=>{
          if(item.status === 2){
            item.swith = true
          }else{
            item.swith = false
          }
        })
        this.total = res.data.data.total
      })
    },
    // 删除
    // handleDel (id) {
    //     this.$confirm('此操作将永久删除该求职, 是否继续?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning',
    //     }).then(() => {
    //       deleteById(id).then(res=>{
    //         this.$message({
    //           type: 'success',
    //           message: res.data.msg,
    //         })
    //         this.getData()
    //       }).catch(err=>{
    //         this.$message.error(err.data.msg)
    //       })
    //     }).catch(() => {         
    //     })
    // },
    // 获取职位列表
    getSomePosition (type,name) {
      getPosition(type).then(res=>{
        this[name] = res.data.data
      })
    },
    // 对应展示列表名称
    changePosition (value,name) {
      let data = value
      this[name].forEach(item => {
        if(String(item.value) === String(value)) {
          data = item.label
        }
      })
      return data
    },
  },
  computed: {
  },
  created () {
    this.getData()
    // this.getSomePosition('tyb_resume_position','position')
    // this.getSomePosition('tyb_position_agerequirement','age')
    this.getSomePosition('tyb_resume_education','education')
    this.getSomePosition('tyb_resume_worktype','worktype')
  },
  filters: {
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
</style>
