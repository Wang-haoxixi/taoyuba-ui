<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="基层浏览记录"></page-header>
      <div class="shipowner_title">
        <!-- <el-button type="primary" size="small" icon="el-icon-edit" @click="addShipowner">新增</el-button> -->
        <div style="float:right;display:flex;align-items:center">
          <span><el-input v-model.trim="params.realName" placeholder="请输入用户名" size="small" clearable></el-input></span>
          <span style="width:240px"><el-date-picker v-model="params.timeLists" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" clearable
            value-format="yyyy-MM-dd" size="small"></el-date-picker>
          </span>
          <!-- <span><el-input v-model="params.idcard" placeholder="请输入身份证" size="small"></el-input></span>
          <span><el-input v-model="params.phone" placeholder="请输入电话" size="small"></el-input></span> -->
          <!-- <span><el-select v-model="params.status" placeholder="请选择状态" size="small">
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span> -->
          <el-button size="small" @click="onSearch">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="historyList"
          stripe
          style="width: 100%">
          <el-table-column
            v-for="(item,index) in options.columns"
            :key="index"
            :prop="item.value"
            :label="item.text"
          >
          </el-table-column>
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-view" size="mini" @click="handleView(scope.row.idcard)">查看
              </el-button> -->
              <!-- <el-button type="text" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row.idcard)">编辑
              </el-button> -->
            <!-- </template>
          </el-table-column> -->
        </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="total"
          :current-page.sync="params.current"
          :page-size="params.size"
          @current-change="currentChange">
        </el-pagination>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getVisitRecordList } from '@/api/tmlms/History'
import { mapGetters } from 'vuex'
// import { getUserInfo } from '@/api/login'
export default {
  data () {
    return {
      historyList: [],
      timeLists:[],
      total: 0,
      // 查询数据
      params: {
        current: 1,
        size: 10,
        realName: '',
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '基层组织',
            value: 'realName',
          },
          {
            text: '浏览内容',
            value: 'content',
          },
          {
            text: '浏览时间',
            value: 'createTime',
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
    onSearch () {
      this.params.current = 1
      this.getData()
    },
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
      // getUserInfo().then(data => {
      //   this.userId = data.data.data.sysUser.userId
      //   // detailVillage(this.userId).then(data => {
      //   //   console.log(data.data.data)
      //   //   this.villageId = data.data.data.villageId
      //     this.params.villageId = this.userId
      //     getVillageShipowner(this.params).then(res=>{
      //       this.shipownerList = res.data.data.records
      //       this.total = res.data.data.total
      //     })
      //   // })
      // })
      this.params.realName = this.params.realName.replace(/\s*/g,'')
      if (this.params.timeLists) {
        this.params.timeStart = this.params.timeLists[0]
        this.params.timeEnd = this.params.timeLists[1]
      }
      this.params.orgId = this.userInfo.orgId
      getVisitRecordList(this.params).then(res=>{
        this.historyList = res.data.data.records
        this.total = res.data.data.total
      })
    },
  },
computed: {
    ...mapGetters(['userInfo']),
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
