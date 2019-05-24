<template>
  <div>
    <template v-for="item in task">
      <el-timeline class="pro_time_box" :key="item.id">
        <el-timeline-item size='large'>
          <!-- 循环el-card -->
          <el-card class="por_mile_bors">
            <p class="">{{item.plannedStartTime.split(' ')[0]}}  -  {{item.plannedTime.split(' ')[0]}}</p>
            <p>
              {{item.taskName}}
              <el-tag :type="getTag(item.status)">{{item.statusForShow}}</el-tag>
            </p>
            <p class="pro_man">
              协同部门：{{item.developerForShow}}
              <el-tag :type="getTag(item.taskType)">{{item.taskTypeForShow}}</el-tag>
            </p>
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
import { getTaskPage } from '@/api/projectManagement/projectTask'
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
      task: [],
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
    //获取任务
    getTask () {
      var params = {dependentProjectId:this.id,page:this.pagination.currentPage,limit:this.pagination.pageSize}
      getTaskPage(params).then(({data}) => {
        this.task = data.data.records
        this.pagination.total = data.data.total
      })
    },
    // 每页条数改变时会触发
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.getTask()
    },
    // 当前页改变时会触发
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getTask()
    },
  },
}
</script>


<style lang="scss" scoped>
.pro_lef{
  display:inline-block;
  vertical-align: top;
  margin-right: 10px;
  width: 97px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  border-right: 2px solid #409EFF;
  color: #409EFF;
}
.pro_right{
  display:inline-block;
  vertical-align: top;
  padding-left: 12px;
  padding-right: 12px;
  width: 89%;
  .righ_htwo{
    text-align: center;
    padding: 30px;
  }
}
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
