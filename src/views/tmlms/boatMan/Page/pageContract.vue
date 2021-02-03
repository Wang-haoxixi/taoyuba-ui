<template>
  <div class="contract-container">
    <el-table
      :data="data"
      stripe
      max-height="400"
      style="width: 100%">
      <el-table-column
        prop="船名"
        label="shipName">
      </el-table-column>
      <el-table-column
        prop="持证人"
        label="shipownerName">
      </el-table-column>
      <el-table-column
        prop="雇主（甲方）"
        label="employerName">
      </el-table-column>
      <el-table-column
        prop="雇员（乙方）"
        label="employeeName">
      </el-table-column>
      <el-table-column
        prop="合同创建日期"
        label="createTime">
      </el-table-column>
      <el-table-column
        prop="合同状态"
        label="status">
        <template slot-scope="scope">
          <span>{{getCertNames(scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="合同发布者"
        label="userName">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getContractList } from '@/api/tmlms/newContract'
import { getUserName } from '@/api/admin/user'
const MAP_DATA = {
  status: [
    { lable: '', value: '全部'},
    { lable: 0, value: '未审核' },
    { lable: 1, value: '合同成立' },
    { lable: 2, value: '未通过审核' },
    { lable: 3, value: '合同纠纷' },
    { lable: 4, value: '合同解除' },
    { lable: 5, value: '合同过期' },
    { lable: 6, value: '未签纸质合同' },
  ],
}
export default {
  data () {
    return {
      data: [],
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
    getList (name) {
      if (!name) {
        return
      }
      getContractList({employeeName: name}).then(({ data }) => {
        if (data.code === 0) {
          this.data = data.data.records
          this.data.forEach(async (item) => {
            await this.getUserName(item.userId, item)
          })
        }
      })
    },
    getUserName (userId, row) {
      getUserName(userId).then(({ data }) => {
        if (data.code === 0) {
          row.userName = data.data.realName
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.contract-container {

}
</style>