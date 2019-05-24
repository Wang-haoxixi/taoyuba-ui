<template>
  <!-- 操作日志 -->
  <gov-dialog
    ref="dialog"
    @closed="handleClosedDialog"
    width="60%"
    :isBtnGroup="false"
    title="操作日志">
    <div class="block">
      <el-timeline>
        <el-timeline-item 
          :timestamp="item.operatingTime" 
          placement="top" 
          v-for="(item, index) in operLogData" 
          :key="index">
          <el-card>
            <p>操作人: {{item.operatorForShow}}</p>
            <p>{{item.msg}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <!-- 分页 -->
      <div class="pagination" v-if="pagination.show">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage ? pagination.currentPage : 1"
          :page-sizes="pagination.pageSizes ? pagination.pageSizes : [10, 20, 30, 50]"
          :page-size="pagination.pageSize ? pagination.pageSize : 10"
          :layout="pagination.layout ? pagination.layout : 'total, sizes, prev, pager, next, jumper'"
          background
          :total="pagination.total ? pagination.total : 0">
        </el-pagination>
      </div>
    </div>
  </gov-dialog>
</template>
<script>
import {checkOperLog} from '@/api/projectManagement/projectMilestone'
export default {
  name: "operLogDialog",
  data () {
    return {
      operLogData: [],
      // 分页
      pagination: {
        show: true,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSizes: [10, 20, 30, 50],
      },
      rowData: {},
    }
  },
  methods: {
    //打开弹窗
    openDialog (row) {
      this.$refs["dialog"].open()
      this.$nextTick(() => {
        this.getList(row)
        this.rowData.typeId = row.typeId
        this.rowData.type = row.type
      })
    },
    getList (row) {
      row.page = this.pagination.currentPage
      row.limit = this.pagination.pageSize
      checkOperLog(row).then(({data}) => {
        this.operLogData = data.data.records
        this.pagination.total = data.data.total
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleClosedDialog () {
      this.close()
    },
    // 每页条数改变时会触发
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.getList(this.rowData)
    },
    // 当前页改变时会触发
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getList(this.rowData)
    },
  },
}
</script>

<style scoped>
</style>


