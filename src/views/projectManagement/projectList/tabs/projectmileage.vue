<template>
  <div>
    <template v-for="item in milestone">
      <el-timeline class="pro_time_box" :key="item.id">
        <el-timeline-item size='large'>
          <!-- 循环el-card -->
          <el-card class="por_mile_bors">
            <p>计划达成时间：{{item.plannedTime.split(' ')[0]}}</p>
            <p>
              {{item.milestoneName}}
              <el-tag :type="getTag(item.status)">{{item.statusForShow}}</el-tag>
              进度：{{item.scheduleForShow}}
            </p>
            <p class="pro_man">负责人：{{item.principalForShow}}</p>
            <p class="pro_man">{{item.description}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </template>
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
import { getProjectMilestonePage } from '@/api/projectManagement/projectMilestone'
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
      milestone: [],
    }
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    getTag (progressStatus) {
      let colors = ['info', '', 'warning','danger', 'success']
      return colors[progressStatus-1]
    },
    //获取里程碑
    getMilestone () {
      var params = {projectId:this.id,page:this.pagination.currentPage,limit:this.pagination.pageSize}
      getProjectMilestonePage(params).then(({data}) => {
        this.milestone = data.data.records
        this.pagination.total = data.data.total
      })
    },
    // 每页条数改变时会触发
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.getMilestone()
    },
    // 当前页改变时会触发
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getMilestone()
    },
  },
}
</script>


<style lang="scss" scoped>
.pro_time_box{
  padding: 10px;
  line-height: 25px;
  .por_mile_bors{
    box-shadow: none;
    border: 1px solid #f3f3f3;
    p{
      color: rgb(51, 51, 51);
      font-size: 14px;
    }
    .pro_man{
      color: #999;
      font-size: 12px;
    }
  }
}

</style>
