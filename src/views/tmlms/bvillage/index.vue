<template>
<!-- 会员/基层管理 -->
  <div class="contract-box">
    <basic-container>
      <div class="shipowner_title">
        <el-button type="primary" size="small" @click="addShipowner">新增</el-button>
        <div style="float:right">
          <span><el-input v-model.trim="params.villageName" placeholder="请输入基层名称" size="small" clearable></el-input></span>
          <span><el-input v-model.trim="params.contactName" placeholder="请输入联系人" size="small" clearable></el-input></span>
          <span><el-input v-model.trim="params.phone" placeholder="请输入联系电话" size="small" clearable></el-input></span>
          <span>
            <el-select v-model="params.status" placeholder="请选择状态" size="small" clearable>
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
          <el-button size="small"  @click="onSearch">搜索</el-button>
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
           <template slot-scope="scope">
              {{scope.row[item.value]?scope.row[item.value]:'--'}}
          </template>
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
          <el-table-column label="操作" width="310" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.row.userId)">查看</el-button>
              <el-button size="mini" @click="handleEdit(scope.row.userId)">编辑</el-button>
              <el-button size="mini" @click="handleDel(scope.row.userId)">删除</el-button>
              <el-button size="mini" @click="handleShip(scope.row.userId)">渔船分配</el-button>
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
import { getVillage,deleteVillage,statusVillage } from '@/api/tmlms/bvillage'
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
        villageName:'',
        phone: '',
        contactName: '',
        status: '',
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '基层名称',
            value: 'villageName',
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
            text: '基层地址',
            value: 'address',
          },
          {
            text: '介绍',
            value: 'content',
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
      this.setQuery()
      this.params.current = 1
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
      this.$router.push({name: 'detailBvillage'})
    },
    // 查看
    handleView (val) {

      this.$router.push({name: 'detailBvillage',query:{ see: val }})
    },
    // 编辑
    handleEdit (val) {
      this.$router.push({name: 'detailBvillage',query:{ edit: val }})
    },
    //分配渔船
    handleShip (val) {
          this.$router.push({name: 'allotship',query:{ allot: val }})
    },
    // 获取列表数据
    getData () {
      getVillage(this.params).then(res=>{
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
        this.$confirm('此操作将永久删除该渔村, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteVillage(id).then(res=>{
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
    // 审核
    getStatus (switchs,userId) {
      let data = ''
      if(switchs){
        data = 2
      }else{
        data = 3
      }
      statusVillage(data,userId).then( res=>{
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
      if(type){
        const typeMap = {
        1: '审核中',
        2: '审核通过',
        3: '审核失败',
      }
      return typeMap[type]
      }else{
        return '--'
      }
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
// .el-button {
//   margin-bottom: 5px;
// }
</style>
