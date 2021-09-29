<template>
  <iep-dialog :dialog-show="dialogShow" title="组织人员" width="50%" @close="loadPage" @slot-mounted="load">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.isReview === 0 ? '通过' : ''}}</span>
          <span>{{scope.row.isReview === 1 ? '待审核' : ''}}</span>
          <span>{{scope.row.isReview === 2 ? '驳回' : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handlePass(scope.row)" type="text" size="small">通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-button @click="loadPage">关闭</el-button>
    </template>
  </iep-dialog>
</template>
<script>
import { applyPersonList, passPerson } from '@/api/admin/org'
export default {
  data () {
    return {
      dialogShow: false,
      tableData: [],
      orgId: 0,
    }
  },
  methods: {
    loadPage () {
      this.dialogShow = false
      this.$emit('load-page')
    },
    handlePass (row) {
      passPerson({
        orgId: this.orgId,
        userId: row.userId,
      }).then(() => {
        this.loadPage()
      })
    },
    load () {
      applyPersonList(this.orgId).then(({ data }) => {
        this.tableData = data.data
      })
    },
  },
}
</script>
