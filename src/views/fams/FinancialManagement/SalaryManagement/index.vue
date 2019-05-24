<template>
  <div>
    <basic-container>
      <page-header title="工资" :replaceText="replaceText"></page-header>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column prop="operation" label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleDetail(scope.row)">查看</iep-button>
              <iep-button @click="handleUpload(scope.row)">上传</iep-button>
              <iep-button @click="handleSend(scope.row)">发放</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <iep-upload-dialog ref="uploadDialog" :action="action" @on-finish="handleFinish"></iep-upload-dialog>
  </div>
</template>
<script>
import { getSalaryPage, grantSalaryById } from '@/api/fams/salary'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dictsMap,
      actionId: 0,
      replaceText: () => '（说明：每月5日前需完成上月工资，可更新上传，发送后无法修改已上传的工资单。若当月工资核算有误，在下月工资调整匹配。）',
    }
  },
  computed: {
    action () {
      return '/api/fams/salary/import/payroll/' + this.actionId
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleUpload (row) {
      this.actionId = row.id
      this.$refs['uploadDialog'].dialogShow = true
    },
    handleFinish () {
      this.loadPage()
    },
    handleSend (row) {
      this._handleComfirm(row.id, grantSalaryById, '发放')
    },
    handleDetail (row) {
      this.$openPage(`/fams_spa/salary_detail/${row.id}`)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getSalaryPage)
    },
    handleAdd () {
      this.$emit('onEdit', {
        methodName: '提现申请',
        id: false,
      })
    },
  },
}
</script>