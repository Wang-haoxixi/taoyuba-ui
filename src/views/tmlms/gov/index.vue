<template>
  <div class="contract-box">
    <basic-container>
      <div class="shipowner_title">
        <el-button type="primary" size="small" @click="addGov">新增</el-button>
        <div style="float:right">
          <span><el-input v-model.trim="params.govName" placeholder="请输入主管单位名称" size="small" clearable></el-input></span>
          <span><el-input v-model.trim="params.contactName" placeholder="请输入联系人" size="small" clearable></el-input></span>
          <span><el-input v-model.trim="params.phone" placeholder="请输入联系电话" size="small" clearable></el-input></span>   
          <span><el-input v-model.trim="params.address" placeholder="请输入机构地址" size="small" clearable></el-input></span>
          <el-button size="small"  @click="getData">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="govList"
          stripe
          style="width: 100%">
          <el-table-column
            v-for="(item,index) in options.columns"
            :key="index"
            :prop="item.value"
            :label="item.text"
          >
          </el-table-column>
          <el-table-column label="操作" width="220" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.row.userId)">查看</el-button>
              <el-button size="mini" @click="handleEdit(scope.row.userId)">编辑</el-button>
              <el-button size="mini" @click="handleDel(scope.row.userId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination
          background layout="total, prev, pager, next, jumper"
          :total="total"
          :page-size="params.size"
          @current-change="currentChange">
        </el-pagination>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getGov, delGov } from '@/api/tmlms/gov'
export default {
  data () {
    return {
      govList: [],
      total: 10,
      // 查询数据
      params: {
        current: 1,
        size: 10,
        govName: '',
        contactName: '',
        phone: '',
        address: '',
      },
      options: {
        columns: [
          {
            text: '主管单位名称',
            value: 'govName',
          },
          {
            text: '联系人',
            value: 'contactName',
          },
          {
            text: '联系电话',
            value: 'phone',
          },
          {
            text: '机构地址',
            value: 'address',
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
    // 跳转新增页面
    addGov () {
      this.$router.push({name: 'detailGov'})
    },
    // 查看
    handleView (val) {
      this.$router.push({name: 'detailGov',query:{ see: val }})
    },
    // 编辑
    handleEdit (val) {
      this.$router.push({name: 'detailGov',query:{ edit: val }})
    },
    // 获取列表数据
    getData () {
      getGov(this.params).then(res=>{
        this.govList = res.data.data.records
        this.total = res.data.data.total
      })
    },
    // 删除
    handleDel (id) {
        this.$confirm('此操作将永久删除该培训机构, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          delGov(id).then(res=>{
            this.$message({
              type: 'success',
              message: res.data.msg,
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
