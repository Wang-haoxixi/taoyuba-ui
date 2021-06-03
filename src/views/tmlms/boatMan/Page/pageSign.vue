<template>
  <div class="contract-container">
    <el-table
      :data="data"
      stripe
      style="width: 100%">
       <el-table-column
            prop="realName"
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
          >
          </el-table-column>
          <el-table-column
            prop="userType"
            label="角色"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.userType === 0 ? '船东' : scope.row.userType === 1 ? '职务船员' : '渔船监护人'  }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="signInTime"
            label="签到时间"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="signOutTime"
            label="签退时间"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="meetName"
            label="培训名称"
          >
          </el-table-column>
          <el-table-column
            prop="cooperateNames"
            label="合作社"
          >
          </el-table-column>
    </el-table>
    <div style="text-align:center;margin-top: 20px;">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="page.current"
        layout="total, prev, pager, next"
        :page-size="page.size"
        :total="page.total">
      </el-pagination>
    </div>
    <div style="text-align:center;margin-top: 30px;">
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>
<script>
import { listPeople } from '@/api/tmlms/faceList'
export default {
  data () {
    return {
      data: [],
      page: {
        size: 10,
        current: 1,
        total: 0,
      },
    }
  },
  props: {
    idcard: {
      default: '',
      type: String,
    },
  },
  methods: {
    getList () {
      listPeople({...this.page,idcard: this.idcard || ''}).then(({ data }) => {
        if (data.code === 0) {
          this.data = data.data.records
          this.page.total = data.data.total
        }
      })
    },
    handleCurrentChange (val) {
      this.page.current = val
      this.getList()
    },
  },
}
</script>