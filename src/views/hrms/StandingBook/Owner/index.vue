<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="持证人管理"></page-header>
      <div class="shipowner_title">
        <el-button type="primary" size="small" icon="el-icon-edit" @click="addShipowner">新增</el-button>
        <!-- <div style="float:right">
          <span><el-input v-model="params.idcard" placeholder="请输入身份证" size="small"></el-input></span>
          <span><el-input v-model="params.realName" placeholder="请输入姓名" size="small"></el-input></span>
          <span><el-select v-model="params.status" placeholder="请选择状态" size="small">
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
          <el-button size="small"  @click="getData">搜索</el-button>
        </div> -->
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
            label="审核状态"
          >
          <template slot-scope="scope">
            {{ scope.row.status | typeFilter}}
          </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-view" size="mini" @click="handleView(scope.row.idcard)">查看
              </el-button>
              <el-button type="text" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row.idcard)">编辑
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
import { getVillageShipowner } from '@/api/tmlms/bvillage'
import { getUserInfo } from '@/api/login'
export default {
  data () {
    return {
      shipownerList: [],
      total: 10,
      // 查询数据
      params: {
        current: 1,
        size: 10,
        idcard: '',
        realName: '',
        status: '',
        villageId: 0,
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '姓名',
            value: 'realName',
          },
          {
            text: '身份证号码',
            value: 'idcard',
          },
          {
            text: '联系地址',
            value: 'address',
          },
          {
            text: '联系电话',
            value: 'phone',
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
      userId: '',
      villageId: '',
    }
  },
  methods: {
    // 分页
    currentChange (val) {
      this.params.current = val
      this.getData()
    },
    // 跳转新增页面
    addShipowner () {
      // this.$router.push({path: '/hrms_spa/village_shipOwner_detail/0'})
      this.$router.push({
        path: '/hrms_spa/village_shipOwner_detail',
      })  
    },
    // 查看
    handleView (val) {
      this.$router.push({path: '/hrms_spa/village_shipOwner_detail', query:{ see: val }})
    },
    // 编辑
    handleEdit (val) {
      this.$router.push({path: '/hrms_spa/village_shipOwner_detail', query:{ edit: val }})
    },
    // 获取列表数据
    getData () {
      getUserInfo().then(data => {
        this.userId = data.data.data.sysUser.userId
        // detailVillage(this.userId).then(data => {
        //   console.log(data.data.data)
        //   this.villageId = data.data.data.villageId
          this.params.villageId = this.userId
          getVillageShipowner(this.params).then(res=>{
            this.shipownerList = res.data.data.records
            this.total = res.data.data.total
          })
        // })
      })     
    },
  },
  computed: {
  },
  created () {
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
