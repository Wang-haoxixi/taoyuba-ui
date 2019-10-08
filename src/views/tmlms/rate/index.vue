<template>
  <div class="contract-box">
    <basic-container>
      <div class="shipowner_title">
        <!-- <el-button type="primary" size="small" icon="el-icon-edit" @click="addGov">新增</el-button> -->
        <!-- <div style="float:right">
          <span><el-input v-model="params.govName" placeholder="请输入主管单位名称" size="small" clearable></el-input></span>
          <span><el-input v-model="params.contactName" placeholder="请输入联系人" size="small" clearable></el-input></span>
          <span><el-input v-model="params.phone" placeholder="请输入联系电话" size="small" clearable></el-input></span>   
          <span><el-input v-model="params.address" placeholder="请输入机构地址" size="small" clearable></el-input></span>
          <el-button size="small"  @click="getData">搜索</el-button>
        </div> -->
      </div>
        <el-table
          :data="rateList"
          stripe
          style="width: 100%">
          <el-table-column
            v-for="(item,index) in options.columns"
            :key="index"
            :prop="item.value"  
            :label="item.text"
          >
          </el-table-column>
          <el-table-column label="雇主姓名" prop="employerName" v-if="mangner === true || employee ===true"></el-table-column>
          <el-table-column label="雇员姓名" prop="employeeName" v-if="mangner === true || employer ===true"></el-table-column>
          <el-table-column label="工作环境" prop="rateEnv" v-if="mangner === true || employee ===true"></el-table-column>
          <el-table-column label="劳务关系" prop="rateEmploy" v-if="mangner === true || employee ===true"></el-table-column>
          <el-table-column label="作业技能" prop="rateSkill" v-if="mangner === true || employer ===true"></el-table-column>
          <el-table-column label="身体素质" prop="rateBody" v-if="mangner === true || employer ===true"></el-table-column>
          <el-table-column label="评价内容" prop="content"></el-table-column>
          <el-table-column label="操作" v-if="mangner === true">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row.id)">删除
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
import { getRate, delRate } from '@/api/tmlms/rate'
import { getUserInfo } from '@/api/login'
export default {
  data () {
    return {
      rateList: [],
      total: 10,
      // 查询数据
      params: {
        type: '',
        current: 1,
        size: 10,
      },
      options: {
        columns: [
          {
            text: '合同ID',
            value: 'contractId',
          },
        ],
      },
      typeDict: [
        {
          lable: 1,
          value: '甲方雇主',
        }, 
        {
          lable: 2,
          value: '乙方雇员',
        },
      ],
      statusDict: [
        {
          lable: 0,
          value: '待审核',
        },
        {
          lable: 1,
          value: '已审核',
        },
      ],
      mangner: false,
      employee: false,
      employer: false,
    }
  },
  methods: {
    // 分页
    currentChange (val) {
      this.params.current = val
      this.getData()
    },
    // 获取列表数据
    async getData () {
      this.params.type = await getUserInfo().then(res => {
        if (res.data.data.roles.indexOf(105) !== -1) {
          return 2
        }
        if (res.data.data.roles.indexOf(108) !== -1) {
          return 1
        } 
      })
      getRate(this.params).then(data =>{
        this.rateList = data.data.data.records
        this.rateList.forEach(v => {
          this.statusDict.forEach(a => {
            if (v.status === a.lable) {
              v.status = a.value
            }
          })
          this.typeDict.forEach(b => {
            if (v.type === b.lable) {
              v.type = b.value
            }
          })
        })
      })
    },
    // 删除
    handleDel (id) {
        this.$confirm('此操作将永久删除该评价, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          delRate(id).then(() =>{
            this.$message({
              type: 'success',
              message: '删除成功！',
            })
            this.getData()
          }).catch(err=>{
            this.$message.error(err.data.msg)
          })
        }).catch(() => {         
        })
    },
  },
  computed: {
  },
  created () {
    this.getData()
    getUserInfo().then(res => {
      if (res.data.data.roles.indexOf(111) !== -1) {
        this.mangner = true
      } else {
        this.mangner = false
      }
      if (res.data.data.roles.indexOf(105) !== -1) {
        this.employee = true
        this.params.type = 2
      } else {
        this.employee = false
      }
      if (res.data.data.roles.indexOf(108) !== -1) {
        this.employer = true
        this.params.type = 1
      } else {
        this.employer = false
      }
    })
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
