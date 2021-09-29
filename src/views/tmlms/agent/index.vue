<template>
  <div class="contract-box">
    <basic-container>
      <div class="shipowner_title">
        <el-button type="primary" size="small" @click="addShipowner">新增</el-button>
        <div style="float:right">
          <span><el-input v-model.trim="params.agentName" placeholder="请输入中介名称" size="small" clearable></el-input></span>
          <span><el-input v-model.trim="params.contactName" placeholder="请输入联系人" size="small" clearable></el-input></span>
          <span><el-input v-model.trim="params.phone" placeholder="请输入联系电话" size="small" clearable></el-input></span>   
          <span><el-input v-model.trim="params.address" placeholder="请输入联系地址" size="small" clearable></el-input></span>  
          <span>
            <el-select v-model.trim="params.status" placeholder="请选择状态" size="small" clearable>
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
          <el-button size="small" @click="onSearch">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="shipownerList"
          stripe
          style="width: 100%">
          <el-table-column
            v-for="(item,index) in options.columns"
            :key="index"
            :prop="item.value"
            :label="item.text"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="审核操作"
          >
          <template slot-scope="scope">
            <div>
              <el-switch
                v-model="scope.row.swith"
                active-color="#13ce66"
                @change="getStatus(scope.row.swith,scope.row.userId)"
                inactive-color="#ff4949">
              </el-switch>
            </div>
          </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="审核状态"
          >
          <template slot-scope="scope">
            {{ scope.row.status | typeFilter}}
          </template>
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
          :current-page.sync="params.current"
          @current-change="currentChange">
        </el-pagination>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getAgent, deleteAgent,statusAgent } from '@/api/tmlms/agent'
import queryMixin from '@/mixins/query'
export default {
  mixins: [queryMixin],
  data () {
    return {
      shipownerList: [],
      total: 10,
      // 查询数据
      params: {
        current: 1,
        size: 10,
        agentName: '',
        contactName: '',
        phone: '',
        address: '',
        status: '',
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '中介名称',
            value: 'agentName',
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
            text: '联系地址',
            value: 'address',
          },
        ],
      },
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
    onSearch () {
      this.params.current = 1
      this.setQuery()
      this.getData()
    },
    // 分页
    currentChange (val) {
      this.params.current = val
      this.setQuery({ current: this.params.current })
      this.getData()
    },
    // 跳转新增页面
    addShipowner () {
      this.$router.push({name: 'detailAgent'})
    },
        // 查看
    handleView (val) {
      this.$router.push({name: 'detailAgent',query:{ see: val }})
    },
    // 编辑
    handleEdit (val) {
      this.$router.push({name: 'detailAgent',query:{ edit: val }})
    },
    // 获取列表数据
    getData () {
      getAgent(this.params).then(res=>{
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
    handleDel (id) {
        this.$confirm('此操作将永久删除该中介, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteAgent(id).then(res=>{
            console.log(res)
            this.$message({
              type: 'success',
              message: '操作成功',
            })
            this.getData()
          }).catch(err=>{
            this.$message.error(err.data.msg)
          })
        }).catch(() => {         
        })
    },
    // 审核
    getStatus (switchs,userId) {
      let data = ''
      if(switchs){
        data = 2
      }else{
        data = 3
      }
      statusAgent(data,userId).then( res=>{
          this.$message({
            type: 'success',
            message: res.data.msg,
          })
          this.getData()
      })
    },
  },
  computed: {
  },
  created () {
    this.getQuery()
    this.getData()
  },
  filters: {
    typeFilter (type) {
      const typeMap = {
        1: '审核中',
        2: '审核通过',
        3: '审核失败',
      }
      return typeMap[type]
    },
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
