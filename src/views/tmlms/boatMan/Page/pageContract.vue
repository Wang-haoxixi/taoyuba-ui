<template>
  <div class="contract-container">
    <el-table
      :data="data"
      stripe
      style="width: 100%">
      <el-table-column
        prop="shipName"
        label="船名">
      </el-table-column>
      <el-table-column
        prop="shipownerName"
        label="持证人">
      </el-table-column>
      <el-table-column
        prop="employerName"
        label="雇主（甲方）">
      </el-table-column>
      <el-table-column
        prop="employeeName"
        label="雇员（乙方）">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="合同创建日期">
      </el-table-column>
      <el-table-column
        prop="status"
        label="合同状态">
        <template slot-scope="scope">
          <span>{{getStatusName(scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="realName"
        label="合同发布者">
      </el-table-column>
    </el-table>
    <div style="text-align:center;margin-top: 20px;">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="page.current"
        layout="total, prev, pager, next"
        :page-size="page.size"
        :total="total">
      </el-pagination>
    </div>
    <div style="text-align:center;margin-top: 30px;">
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>
<script>
import { getContractList } from '@/api/tmlms/newContract'
import { getUserName } from '@/api/admin/user'
const MAP_DATA = {
  status: [
    { value: '', label: '全部'},
    { value: 0, label: '未审核' },
    { value: 1, label: '合同成立' },
    { value: 2, label: '未通过审核' },
    { value: 3, label: '合同纠纷' },
    { value: 4, label: '合同解除' },
    { value: 5, label: '合同过期' },
    { value: 6, label: '未签纸质合同' },
  ],
}
export default {
  data () {
    return {
      data: [],
      total: 0,
      page: {
        size: 10,
        current: 1,
      },
      employeeIdcard: '',
    }
  },
  methods: {
    getMapByVal (data, val) {
      let result = ''
      data.forEach((item) => {
        if (item.value === val) {
          result = item.label
          return false
        }
      })
      return result
    },
    getStatusName (val) {
      return this.getMapByVal(MAP_DATA.status, val)
    },
    getList (employeeIdcard) {
      if (!employeeIdcard) {
        return
      }
      this.employeeIdcard = employeeIdcard
      getContractList({size: this.page.size, current: this.page.current, employeeIdcard: this.employeeIdcard}).then(({ data }) => {
        if (data.code === 0) {
          this.data = data.data.records
          // this.data.forEach(async (item) => {
          //   await this.getUserName(item.userId, item)
          // })
          this.total = data.data.total
        }
      })
    },
    getUserName (userId, row) {
      getUserName(userId).then(({ data }) => {
        if (data.code === 0) {
          this.$set(row, 'userName', data.data.realName)
          // row.userName = data.data.realName
        }
      })
    },
    handleCurrentChange (val) {
      this.page.current = val
      this.getList(this.employeeIdcard)
    },
  },
}
</script>