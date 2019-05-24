<template>
  <div>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button size="small" type="danger" @click="handleApprove(scope.row)" v-if="scope.row.approvalStatus==2">审批</iep-button>
            <iep-button size="small" @click="hanleNotApp(scope.row)" v-if="scope.row.approvalStatus==3">取消审批</iep-button>
            <iep-button size="small" @click="handleMore(scope.row)" v-if="scope.row.approvalStatus==2">转交</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <!-- 转交 -->
    <transferDialog ref="transfer" :form="formData" @load-page="loadPage()"></transferDialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './option.js'
import { getApprovalList, updateData } from '@/api/gpms/index'
import transferDialog from '../transfer/index'

export default {
  mixins: [mixins],
  components: { transferDialog },
  props: {
    status: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      isLoadTable: false,
      columnsMap,
      dictsMap,
      pageState: 'list',
      formData: {},
    }
  },
  methods: {
    loadPage (param) {
      this.loadTable(param, getApprovalList)
    },
    // 审批
    handleApprove (row) {
      this.$emit('approve', row)
    },
    // 转交
    handleMore (row) {
      this.$refs['transfer'].open(row)
    },
    // 取消审批
    hanleNotApp (row) {
      updateData({
        id: row.id,
        approvalStatus: 2,
      }).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success',
        })
        this.loadPage({ approvalStatus: this.status })
      })
    },
  },
  created () {
    this.loadPage({ approvalStatus: this.status })
  },
}
</script>
