<template>
  <div>
    <gov-layout-header>
      <gov-search-bar
        label-width="80px"
        :list-query="listQuery"
        :form-props="formProps"
        @handleFilter="handleFilter"
      ></gov-search-bar>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud 
        :data="mainTableData" 
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :option="mainTableOption" 
        :page="pagination"
        @refresh-change="getList">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button type="text" @click="yesAudit(scope.row)" text="是数源部门"></gov-button>
            <gov-button type="text" @click="noAudit(scope.row)" text="非数源部门" :disabled="scope.row.step==3"></gov-button>
          </div>
        </template>
      </avue-crud>

    </gov-layout-body>
    <!-- 弹窗 -->
    <disAgree-dialog ref="noDialog" @submitForm="submitForm"></disAgree-dialog>
    <agree-dialog ref="yesDialog" @submitForm="submitForm"></agree-dialog>
  </div>
</template>

<script>
import { getDept, getDic } from '@/util/dic'
import mixin from '@/mixins/mixin'
import agreeDialog from './yesDialog'
import disAgreeDialog from './noDialog'
import { getUnconfirmData } from '@/api/supply/item'
import { itemTableOption } from '../const/index'

export default {
  name: 'Demand',
  mixins: [mixin],
  components: { disAgreeDialog, agreeDialog },
  computed: {
    formProps () {
      return [
        { label: '事项名称', prop: 'matName' },
        { label: '事项编码', prop: 'matCode' },
        { label: '需求部门', prop: 'deptId', type: 'select', data: getDept() },
        { label: '材料类型', prop: 'materialType', type: 'select', data: getDic('SUPPLU_MATERIAL_TYPE') },
      ]
    },
    mainTableOption () {
      return itemTableOption
    },
  },
  data () {
    return {
      tableLoading: true,
      mainTableData: [], // 主表数据
    }
  },
  methods: {
    // 是数源部门
    yesAudit (row) {
      this.$refs['yesDialog'].open({...row})
    },
    //不是数源部门
    noAudit (row){
      this.$refs['noDialog'].open({...row})
    },
    submitForm () {
      this.getList()
    },
    // 获取主表数据
    getList () {
      getUnconfirmData(this.listQuery).then((res) => {
        this.pagination.total = res.data.data.total
        this.mainTableData = res.data.data.records
        this.tableLoading = false
      })
    },
    handleCloseMainDialog () {
      this.$refs['mainDialog'].close()
    },
  },
  created () {
  },
}
</script>

<style lang="scss" scoped>
</style>
