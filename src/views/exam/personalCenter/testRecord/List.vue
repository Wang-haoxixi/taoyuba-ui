<template>
  <div>
    <basic-container>
      <page-header title="专题考试记录" :data="[10, 5]"></page-header>
      <operation-container>
        <template slot="right">
          <el-button-group>
            <iep-button size="middle" type="primary" plain @click="handleSelect ('month')">本月</iep-button>
            <iep-button size="middle" type="primary" plain @click="handleSelect ('year')">本年</iep-button>
            <iep-button size="middle" type="primary" plain @click="handleSelect ()">全部</iep-button>
          </el-button-group>
        </template>
      </operation-container>
      <iep-table
        :isLoadTable="isLoadTable"
        :pagination="pagination"
        :pagedTable="pagedTable"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="fieldName" label="科目">
          <template slot-scope="scope">
            {{scope.row.fieldName}}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="名称">
          <template slot-scope="scope">
            {{scope.row.title}}
          </template>
        </el-table-column>
        <el-table-column prop="beginTime" label="考试时间" width="350">
          <template slot-scope="scope">
            {{scope.row.beginTime}} ~ {{scope.row.endTime}}
          </template>
        </el-table-column>
        <el-table-column prop="examStatus" label="个人中心状态" width="150">
          <template slot-scope="scope">
            <el-tag type="success" size="medium" v-if="scope.row.examStatus === 0">已报名</el-tag>
            <el-tag type="warning" size="medium" v-if="scope.row.examStatus === 1">进行中</el-tag>
            <el-tag type="warning" size="medium" v-if="scope.row.examStatus === 3">批卷中</el-tag>
            <el-tag type="info" size="medium" v-if="scope.row.examStatus === 4">已结束</el-tag>
            <el-tag type="success" size="medium" v-if="scope.row.examStatus === 8">已完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="250">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" v-if="scope.row.examStatus === 0" disabled plain>开始考试</iep-button>
              <iep-button type="warning" plain v-if="scope.row.examStatus === 1" @click="handleStartExam(scope.row)">开始考试</iep-button>
              <iep-button type="warning" v-if="scope.row.examStatus === 3" disabled plain>查看成绩</iep-button>

              <iep-button type="warning" v-if="scope.row.examStatus === 4" disabled plain>查看成绩</iep-button>
              <iep-button v-if="scope.row.examStatus === 4" disabled plain>查看证书</iep-button>

              <iep-button type="warning" plain v-if="scope.row.examStatus === 8" @click="handleShowResult(scope.row)">查看成绩</iep-button>
              <iep-button v-if="scope.row.examStatus === 8" plain @click="handleShowCER(scope.row)">查看证书</iep-button>

            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getTestRecordList } from '@/api/exam/personalCenter/testRecord/testRecord'
import mixins from '@/mixins/mixins'
// const columnsMap = [
//   {
//     prop: 'fieldName',
//     label: '科目',
//   },
//   {
//     prop: 'title',
//     label: '名称',
//   },
//   {
//     prop: 'examTime',
//     label: '考试时间',
//   },
//   {
//     prop: 'status',
//     label: '状态',
//     type: 'dict',
//   },
//   {
//     prop: 'examMarks',
//     label: '考试分数',
//   },
// ]

export default {
  mixins: [mixins],
  data () {
    return {
      // columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    /**
     * 点击筛选
     */
    handleSelect ( state ) {
      this.pageOption.current = 1
      this.searchForm = {
        state: state,
      }
      this.loadTable({...this.searchForm}, getTestRecordList)
    },
    loadPage (param = this.searchForm) {
      this.loadTable({...this.pageOption,...param}, getTestRecordList)
    },
    /**
     * 点击开始考试
     */
    handleStartExam (row) {
      this.$confirm('此操作将开始考试, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '开始考试!',
        })
        this.$emit('onStartExam', row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消考试',
        })
      })
    },
    /**
     * 点击成绩
     */
    handleShowResult (row) {
      this.$emit('onShowResult', row)
    },
    /**
     * 点击证书
     */
    handleShowCER (row) {
      console.log(row)
    },
  },
}
</script>
