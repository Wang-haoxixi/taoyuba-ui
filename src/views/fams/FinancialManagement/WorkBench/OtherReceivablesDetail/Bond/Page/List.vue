<template>
  <div>
    <operation-container>
      <template slot="right">
        <operation-search @search-page="searchPage" advance-search>
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
      <template slot="before-columns">
        <el-table-column label="序号" width="90px">
          <template slot-scope="scope">
            <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="120">
        <template>
          <operation-wrapper>
            <el-dropdown size="medium">
              <iep-button type="warning" plain>
                回款
              </iep-button>
            </el-dropdown>
            <!-- <iep-button @click="handleEdit(scope.row)">编辑</iep-button> -->
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import { getTalentPoolPage, changeTalentPoolStatus } from '@/api/hrms/talent_pool'
import mixins from '@/mixins/mixins'
import AdvanceSearch from './AdvanceSearch'
import { columnsMap, dictsMap } from '../options'
export default {
  mixins: [mixins],
  components: { AdvanceSearch },
  data () {
    return {
      dictsMap,
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleToResumeBatch () {
      // TODO: 是否多选提醒
      if (!this.multipleSelection.length) {
        this.$message('请先选择需要的选项')
        return
      }
      this.handleToResume(this.multipleSelection)
    },
    handleChangeStatus (ids, status) {
      changeTalentPoolStatus(ids, status).then(() => {
        this.loadPage()
      })
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    // handleEdit (row) {
    //   this.$emit('onEdit', {
    //     formRequestFn: putTalentPool,
    //     methodName: '编辑',
    //     id: row.id,
    //   })
    // },
    // handleAdd () {
    //   this.$emit('onEdit', {
    //     formRequestFn: postTalentPool,
    //     methodName: '新增',
    //     id: false,
    //   })
    // },
    // handleRejected (row) {
    //   console.log(row)
    //   this.$refs['RejectedDialog'].dialogShow = true
    // },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getTalentPoolPage)
    },
  },
}
</script>
