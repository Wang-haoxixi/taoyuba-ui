<template>
  <div class="biglog_box">
    <div class="log_box" v-for="(item,index) in logs" :key="index">
      <p><i class="el-icon-time"></i>{{item.operatingTime}}</p>
      <p>操作人：{{item.operatorForShow}}</p>
      <p class="small_ay">{{item.msg}}</p>
    </div>
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
</template>

<script>
import { checkOperLog } from '@/api/projectManagement/projectList'
export default {
  data () {
    return{
      // 分页
      pagination: {
        show: true,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSizes: [10, 20, 30, 50],
      },
      logs: [],
    }
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    //获取操作日志
    getLog () {
      var params = {projectId:this.id,page:this.pagination.currentPage,limit:this.pagination.pageSize}
      checkOperLog(params).then(({data}) => {
        this.logs = data.data.records
        this.pagination.total = data.data.total
      })
    },
    // 每页条数改变时会触发
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.getLog()
    },
    // 当前页改变时会触发
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getLog()
    },
  },
}
</script>

<style lang="scss" scoped>
.biglog_box{
  padding: 10px;
  .log_box{
    padding: 20px;
    font-size: 14px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    color: #303133;
    border-radius: 4px;
    overflow: hidden;
    line-height: 25px;
    .small_ay{
      color: rgb(153, 153, 153);
      font-size: 12px;
    }
  }
}

</style>
