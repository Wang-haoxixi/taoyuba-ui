<template>
<!-- 船员/面对面教育/人员管理 -->
  <div class="contract-box">
    <basic-container v-if="detailType === 0 ">
      <page-header title="培训人员管理" v-if="!trainMeetId"></page-header>
      <div class="shipowner_title">
        <el-button @click="getData" type="default" size="small" v-if="!trainMeetId">刷新</el-button>
        <el-button @click="handleStatistics" type="default" size="small" v-if="!trainMeetId">统计</el-button>
        <el-button @click="signature" type="default" size="small" v-if="!trainMeetId">补签</el-button>
        <el-button @click="getInformation" type="default" size="small">导出信息</el-button>
        <div style="float:right;display:flex;align-items:center">
          <span style="width:120px"><el-input v-model.trim="params.meetName" placeholder="会议标题" size="small" clearable v-if="!trainMeetId"></el-input></span>
          <span style="width:120px"><el-input v-model.trim="params.realName" placeholder="姓名" size="small" clearable></el-input></span>
          <span style="width:120px">
              <el-select v-model="params.userType" filterable placeholder="请选择" size="small" clearable>
                <el-option v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </span>
          <span style="width:120px">
              <el-select v-model="params.sourceType" filterable placeholder="请选择来源" size="small" clearable>
                <el-option label="小程序" :value="0"></el-option>
                <el-option label="设备" :value="1"></el-option>
              </el-select>
          </span>
          <el-button size="small"  @click="getData">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="faceList"
          stripe
          :row-class-name="tableRowClassName"
          style="width: 100%">
          <el-table-column
            prop="realName"
            label="姓名"
            width="200"
          >
          <template slot-scope="scope">
                {{scope.row.realName?scope.row.realName:'--'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="300"
          >
          <template slot-scope="scope">
                {{scope.row.phone?scope.row.phone:'--'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="userType"
            label="角色"
            width="100"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.userType === 0 ? '船东' : scope.row.userType === 1 ? '职务船员' : '渔船监护人'  }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="signInTime"
            label="签到时间"
            width="300"
          >
          <template slot-scope="scope">
                {{scope.row.signInTime?scope.row.signInTime:'--'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="signOutTime"
            label="签退时间"
            width="300"
          >
          <template slot-scope="scope">
                {{scope.row.signOutTime?scope.row.signOutTime:'--'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="meetName"
            label="培训名称"
          >
          <template slot-scope="scope">
                {{scope.row.meetName?scope.row.meetName:'--'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="cooperateNames"
            label="合作社"
          >
          <template slot-scope="scope">
                {{scope.row.cooperateNames?scope.row.cooperateNames:'--'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="sourceType"
            label="来源"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.sourceType === 0 ? '小程序' : scope.row.sourceType === 2 ? '补签' :'设备'  }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.row.id)">查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="page.total"
          :page-size="page.size"
          :current-page.sync="page.current"
          @current-change="currentChange">
        </el-pagination>
      </div>
    </basic-container>
    <detail v-if="detailType === 1" ref="detail" @back="detailType = 0"></detail>
    <statistics v-if="detailType === 2" ref="statistics" @back="detailType = 0"></statistics>
    <signature v-if="detailType === 3" ref="signature" @back="detailType = 0"></signature>
  </div>
</template>
<script>
import { listPeople } from '@/api/tmlms/faceList'
import { exportExcelPeople} from '@/api/post/recruit'
import detail from './detail.vue'
import statistics from './statistics.vue'
import signature from './signature.vue'
export default {
  name: 'faceList',
  mixins: [],
  props: {
    trainMeetId: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      options: [{
        label: '船东',
        value: 0,
      },{
        label: '职务船员',
        value: 1,
      },{
        label: '渔船监护人',
        value: 2,
      }],
      page: {
        size: 10,
        current: 1,
        total: 0,
      },
      params: {},
      detailType: 0,
      faceList: [],
    }
  },
  created () {
    this.getData()
  },
  methods: {
        // 分页
    currentChange (val) {
      this.page.current = val
      this.getData()
    },
    getData () {
      listPeople({trainMeetId: this.trainMeetId == 0 ? '' : this.trainMeetId,...this.params,...this.page}).then(res=>{
        this.faceList = res.data.data.records
        this.page = {
          size: res.data.data.size,
          current: res.data.data.current,
          total: res.data.data.total,
        }
      })
    },
    // 查看详情
    handleView (id) {
      this.detailType = 1
      this.$nextTick(()=>{
        this.$refs.detail.getDetail(id)
      })
    },
    // 查看统计
    handleStatistics (id) {
      this.detailType = 2
      this.$nextTick(()=>{
        this.$refs.statistics.getDetail(id)
      })
    },
    tableRowClassName ({row}) {
      if( row.status === 0 ){
        return 'warning-row'
      }else{
        return ''
      }
    },
    getInformation () {
      if( !this.params.userType && this.params.userType !== 0 ){
        this.$message.warning('请先选择导出人员类型！')
        return false
      }
      if(this.params.userType === 2){
        this.$message.warning('无法导出渔船监护人信息！')
        return false
      }
      let data = this.params.userType === 0 ? '船东信息' : '职务船员信息'
      exportExcelPeople(this.params.userType,data,this.trainMeetId || '').then(res=>{
        console.log(res)
      })
    },
    // 补签
    signature () {
      this.detailType = 3
    },
  },
  components: {
    detail,
    statistics,
    signature,
  },
  filters: {
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
.shipowner {
  padding: 20px;
}
.shipowner_title {
  text-align: left;
  span {
    width: 150px;
    display: inline-block;
    margin: 0 5px;
  }
}
.export-btn-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.export-btn {
  margin-bottom: 10px;
  margin-left: 0;
  margin-right: 10px;
}
::v-deep .el-table .warning-row {
    color: red !important;
}
</style>
