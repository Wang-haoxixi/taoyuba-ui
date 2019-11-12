<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="报名管理"></page-header>
      <div class="shipowner_title">
        <div style="float:right">
          <span><el-input v-model="params.title" placeholder="请输入开班名称" size="small" clearable></el-input></span>
          <span><el-input v-model="params.realName" placeholder="请输入报名人" size="small" clearable></el-input></span>
          <span><el-input v-model="params.idcard" placeholder="请输入身份证" size="small" clearable></el-input></span>
          <span><el-input v-model="params.phone" placeholder="请输入联系电话" size="small" clearable></el-input></span>
          <span><el-date-picker v-model="params.openTime" type="date" value-format="yyyy-MM-dd" placeholder="请输入开班日期"></el-date-picker></span>
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
              <el-button v-if="scope.row.status === '正常'" type="text" icon="el-icon-delete" size="mini" @click="handleCancel(scope.row.id)">取消</el-button>
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
        realName: '',
        idcard: '',
        phone: '',
        openTime: '',
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
            text: '报名人',
            value: 'realName',
          },
          {
            text: '联系电话',
            value: 'phone',
          },
          {
            text: '身份证',
            value: 'idcard',
          },
          {
            text: '报名时间',
            value: 'createTime',
          },
          {
            text: '状态',
            value: 'status',
          },
        ],
      },
      statusList: [
        {
          label: '取消',
          value: 0,
        }, {
          label: '正常',
          value: 1,
        },
      ],
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
    getData () {
      getApplyPage(this.params).then(data => {
        this.trainClassList = data.data.data.records
        this.trainClassList.forEach(v => {
          this.statusList.forEach(m => {
            if (m.value === v.status) {
              v.status = m.label
            }
          })
          getObj(v.trauserId).then(data => {
            v.trauserId = data.data.data.realName
          })
        })
      })
    },
    handleSign (val) {
      this.$router.push({ path: `/article_spa/sign_list/${val}` })
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
    getUserInfo () {
      getUserInfo().then(res => {
        if (res.data.data.roles.indexOf(111) === -1) {
          this.mangner = false
        } else {
          this.mangner = true
        }
        if (this.mangner === false) {
          this.options.columns.splice(1, 1)
        }
      })
    },
  },
  created () {
    this.getUserInfo()
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
