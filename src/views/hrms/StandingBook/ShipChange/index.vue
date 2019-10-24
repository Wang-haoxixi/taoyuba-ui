<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="渔船变更"></page-header>
      <div class="shipowner_title">
        <el-button v-if="ship_change_add" type="primary" size="small" icon="el-icon-edit" @click="addShipowner">新增</el-button>
        <!-- <div style="float:right">
          <span><el-input v-model="params.deptName" placeholder="请输入机构名称" size="small" clearable></el-input></span>
          <span><el-input v-model="params.contactName" placeholder="请输入联系人" size="small" clearable></el-input></span>
          <span><el-input v-model="params.phone" placeholder="请输入联系电话" size="small" clearable></el-input></span>   
          <span><el-input v-model="params.address" placeholder="请输入机构地址" size="small" clearable></el-input></span>   
          <el-button size="small"  @click="getData">搜索</el-button>
        </div> -->
      </div>
        <el-table
          :data="shipChangeList"
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
              <el-button v-if="scope.row.status === '未审核' && ship_change_aud" type="text" icon="el-icon-edit" size="mini" @click="handleAudit(scope.row.id)">审核
              </el-button>
              <el-button v-if="scope.row.status === '未审核' && ship_change_edit" type="text" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row.id)">编辑
              </el-button>
              <el-button v-if="scope.row.status === '未审核' && ship_change_del" type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row.id)">删除
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
import { getShipChange, deleteShipChange, reviewShipChange } from '@/api/hrms/shipchange'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      shipChangeList: [],
      total: 10,
      // 查询数据
      params: {
        current: 1,
        size: 10,
        deptName: '',
        contactName: '',
        phone: '',
        address: '',
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '变更类型',
            value: 'type',
          },
          {
            text: '船名号',
            value: 'shipName',
          },
          {
            text: '渔船编码',
            value: 'shipNo',
          },
          {
            text: '船舶所有人',
            value: 'shipownerName',
          },
          {
            text: '联系电话',
            value: 'shipownerPhone',
          },
          {
            text: '审核状态',
            value: 'status',
          },
        ],
      },
      ship_change_add: false,
      ship_change_edit: false,
      ship_change_del: false,
      ship_change_aud: false,
      statusList: [
        {
          label: '未审核',
          value: 0,
        },{
          label: '已审核',
          value: 1,
        },{
          label: '审核未通过',
          value: 2,
        },
      ],
      typeList: [
        {
          label: '变更船名',
          value: 1,
        }, {
          label: '变更持证人',
          value: 2,
        }, {
          label: '变更服务公司',
          value: 3,
        },
      ],
    }
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
  },
  methods: {
    // 分页
    currentChange (val) {
      this.params.current = val
      this.getData()
    },
    // 跳转新增页面
    addShipowner () {
      this.$router.push({path: '/hrms_spa/shipChange_Detial/0', query:{ add: 0 }}) 
    },
    // 编辑
    handleEdit (val) {
      this.$router.push({path: `/hrms_spa/shipChange_Detial/${val}`, query:{ edit: val }}) 
    },
    handleAudit (val) {
      let type = 1
      this.$confirm('该操作将审核该渔船变更，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          reviewShipChange({id: val, status: type}).then(() => {
            this.$message.success('审核通过！')
            this.getData()
          }).catch(err => {
            this.message.error(err.msg)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 获取列表数据
    getData () {
      getShipChange(this.params).then(res=>{
        this.shipChangeList = res.data.data.records
        this.total = res.data.data.total
        this.shipChangeList.forEach(v =>{
          this.statusList.forEach(m => {
            if (v.status === m.value) {
              v.status = m.label
            }
          })
          this.typeList.forEach(k => {
            if(v.type === k.value) {
              v.type = k.label
            }
          })
        })
      })
    },
    // 删除
    handleDel (id) {
      this.$confirm('此操作将永久删除该渔船变更数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteShipChange(id).then(res=>{
          this.$message({
            type: 'success',
            message: res.data.msg,
          })
          this.getData()
        }).catch(err=>{
          this.$message.error(err.data.msg)
        })
      }).catch(() => { 
        this.$message({
          type: 'info',
          message: '已取消删除',
        })        
      })
    },
  },
  created () {
    this.getData()
    this.ship_change_add = this.permissions['ship_change_add']
    this.ship_change_edit = this.permissions['ship_change_edit']
    this.ship_change_del = this.permissions['ship_change_del']
    this.ship_change_aud = this.permissions['ship_change_aud']
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
