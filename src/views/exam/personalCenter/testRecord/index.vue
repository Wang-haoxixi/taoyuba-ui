<template>
  <div>
    <basic-container>
      <page-header title="专题考试记录" :data="[10, 5]"></page-header>
      <operation-container>
        <template slot="right">
          <el-button-group>
            <iep-button size="middle" type="primary" plain>本月</iep-button>
            <iep-button size="middle" type="primary" plain>本年</iep-button>
            <iep-button size="middle" type="primary" plain>全部</iep-button>
          </el-button-group>
        </template>
      </operation-container>
      <iep-table
        :isLoadTable="isLoadTable"
        :pagination="pagination"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="scope.row.status === 0" @click="startExam(scope.row)">开始考试</iep-button>
              <iep-button v-else-if="scope.row.status === 1">继续考试</iep-button>
              <iep-button
                v-else-if="scope.row.status === 2 || scope.row.status === 3"
                :disabled="scope.row.status === 2 || scope.row.status === 3"
              >查看成绩</iep-button>
              <el-button-group v-else>
                <iep-button>查看成绩</iep-button>
                <iep-button>查看证书</iep-button>
              </el-button-group>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <el-dialog title="提示" :visible.sync="showPrompt" width="300px">
      <span>跳转外页应试界面</span>
      <template slot="footer">
        <iep-button @click="showPrompt=false">确定</iep-button>
        <iep-button @click="showPrompt=false">取消</iep-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList } from '@/api/admin/org'
import mixins from '@/mixins/mixins'
const columnsMap = [
  {
    prop: 'subject',
    label: '科目',
  },
  {
    prop: 'name',
    label: '名称',
  },
  {
    prop: 'examTime',
    label: '考试时间',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
  {
    prop: 'examMarks',
    label: '考试分数',
  },
]

const dictsMap = {
  status: {
    0: '已报名',
    1: '进行中',
    2: '已完成',
    3: '批卷中',
    4: '已结束',
  },
}
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      showPrompt: false,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, fetchList)
    },
    startExam () {
      this.showPrompt = true
    },
    successMessage () {
      this.$message({
        message: '合并成功',
        type: 'success',
      })
      this.showPrompt = false
    },
  },
}
</script>
