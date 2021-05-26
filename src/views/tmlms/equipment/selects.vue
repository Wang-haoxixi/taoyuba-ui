<template>
  <div class="contract-box">
    <basic-container>
      <div class="shipowner_title">
        <div style="float:right">
          <span style="width:120px"><el-input v-model.trim="params.shipName" placeholder="名称" size="small" clearable></el-input></span>
          <el-button size="small"  @click="getData">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="faceList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="meetName"
            label="会议标题"
          >
          </el-table-column>
          <el-table-column
            prop="meetStartTime"
            label="培训时间"
          >
            <template slot-scope="scope">
              {{ scope.row.meetStartTime.slice(0,10) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="培训地点"
          >
          </el-table-column>
          <el-table-column
            prop="lecturer"
            label="培训讲师"
          >
          </el-table-column>
          <el-table-column
            prop="typeNames"
            label="参会人员"
          >
          </el-table-column>
          <el-table-column
          width="180"
            prop="meetStartSignTime"
            label="培训开始时间"
          >
          </el-table-column>
          <el-table-column
          width="180"
            prop="meetEndSignTime"
            label="培训结束时间"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleSelectionChange(scope.row)">选择
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
  </div>
</template>
<script>
import { page } from '@/api/tmlms/consultation/index'
export default {
  mixins: [],
  data () {
    return {
      page: {
        size: 10,
        current: 1,
        total: 0,
      },
      params: {},
      faceList: [],
      userId: '',
      roleId: [],
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
      // this.userId = JSON.parse(localStorage.getItem('user')).sysUser.userId
      // this.roleId = JSON.parse(localStorage.getItem('user')).roles
      page({...this.params,...this.page}).then(res=>{
        this.faceList = res.data.data.records
        this.page = {
          size: res.data.data.size,
          current: res.data.data.current,
          total: res.data.data.total,
        }
      })
    },
    handleSelectionChange (val) {
      this.$emit('sumbit',val)
    },
  },
  components: {
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
</style>
