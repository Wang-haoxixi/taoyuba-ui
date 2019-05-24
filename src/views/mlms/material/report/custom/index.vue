<template>
  <div>
    <div v-if="webState">
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" size="small" type="primary">新增</iep-button>
          <el-dropdown size="medium">
            <iep-button size="small" type="default">批量操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>导入</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
              <el-dropdown-item>转移</el-dropdown-item>
              <el-dropdown-item divided>添加协作人</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <operation-search @search="searchPage"></operation-search>
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
        is-index
        isMutipleSelection
        @selection-change="selectionChange">
        <template slot="before-columns">
          <el-table-column label="报表名称">
            <template slot-scope="scope"><div class="custom-name" @click="handleDetail(scope.row)">{{scope.row.name}}</div></template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" min-width="100" align="center">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleEdit(scope.row)" size="small">下载</iep-button>
              <iep-button @click="handleDeleteById(scope.row)" size="small">分享</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </div>
    <div v-else>
      <work-list ref="workDialog" @back="webState=true"></work-list>
    </div>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { tableOption, dictsMap } from './option'
import { fetchList, createData, updateData, deleteDataById } from '@/api/crms/custom'
import WorkList from './workList'

export default {
  name: 'custom',
  mixins: [mixins],
  components: { WorkList },
  computed: {},
  data () {
    return {
      dictsMap,
      columnsMap: tableOption,
      webState: true,
    }
  },
  methods: {
    handleAdd () {
      this.$refs['mainDialog'].methodName = '新增'
      this.$refs['mainDialog'].formRequestFn = createData
      this.$refs['mainDialog'].dialogShow = true
    },
    handleEdit (row) {
      this.$refs['mainDialog'].formData = row
      this.$refs['mainDialog'].methodName = '编辑'
      this.$refs['mainDialog'].formRequestFn = updateData
      this.$refs['mainDialog'].dialogShow = true
    },
    handleDetail (row) {
      this.webState = false
      this.$nextTick(() => {
        this.$refs['workDialog'].info = row
      })
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteDataById)
    },
    selectionChange (val) {
      console.log('val: ', val)
    },
    loadPage (param) {
      this.loadTable(param, fetchList)
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.custom-name {
  cursor: pointer;
  margin-bottom: 10px;
  // text-decoration: underline;
}
.custom-tags {
  margin: 0;
  .el-tag {
    margin-right: 5px;
    height: 26px;
    line-height: 26px;
  }
}
</style>
