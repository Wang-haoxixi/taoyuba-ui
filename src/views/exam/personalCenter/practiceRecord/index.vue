<template>
  <div>
    <basic-container>
      <page-header title="模拟练习记录" :data="[10, 5]"></page-header>
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
        :columnsMap="columnsMap"
        :dictsMap="dictsMap"
        :pagination="pagination"
        :pagedTable="pagedTable"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="text">重新练习</iep-button>
              <iep-button type="text">查看报告</iep-button>
              <iep-button type="text">提交批改</iep-button>
              <iep-button type="text" @click="keepPracticing(scope.row)">继续练习</iep-button>
              <iep-button type="text">查看成绩</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <el-dialog title="提示" visible.sync="showPrompt">
      <span>跳转外页应试界面</span>
      <template slot="footer">
        <iep-button @click="showPrompt=false">确定</iep-button>
        <iep-button @click="showPrompt=false">取消</iep-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
const columnsMap = [
  {
    prop: 'type',
    label: '分类',
  },
  {
    prop: 'name',
    label: '名称',
  },
  {
    prop: 'practiceProgress',
    label: '练习进度',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
  {
    prop: 'correctRate',
    label: '正确率',
  },
]
const dictsMap = {
  status: {
    0: '进行中',
    1: '已完成',
    2: '批改中',
    3: '已批改',
  },
}
import { fetchList } from '@/api/admin/org'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dictsMap,
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
    keepPracticing () {
      this.showPrompt = true
    },
  },
}
</script>
