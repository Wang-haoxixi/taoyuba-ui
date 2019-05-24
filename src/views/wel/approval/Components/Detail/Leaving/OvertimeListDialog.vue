<template>
  <iep-dialog :dialog-show="dialogShow" title="加班详情" width="520px" @close="loadPage">
    <el-table :data="tableData" style="width: 100%" size="small">
      <el-table-column prop="recordTime" label="开始时间" width="180">
      </el-table-column>
      <el-table-column prop="recordTimeSecond" label="结束时间" width="180">
      </el-table-column>
      <el-table-column prop="duration" label="时长">
      </el-table-column>
      <el-table-column prop="msg" label="理由">
      </el-table-column>
    </el-table>
  </iep-dialog>
</template>
<script>
import { getUserRecordOvertimeListById } from '@/api/hrms/user_record'
export default {
  data () {
    return {
      dialogShow: false,
      tableData: [],
      userId: '',
    }
  },
  created () {
  },
  methods: {
    load () {
      getUserRecordOvertimeListById(this.userId).then(({ data }) => {
        this.tableData = data.data
      })
    },
    loadPage () {
      this.dialogShow = false
    },
  },
}
</script>
