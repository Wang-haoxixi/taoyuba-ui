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
            <!-- <gov-button type="text" @click="handleDetail(scope.row)" text="查看"></gov-button> -->
            <gov-button type="text" @click="applyBack(scope.row)" text="申请撤回"></gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <!-- 弹窗 -->
    <main-dialog 
    :form-data="formData" 
    ref="mainDialog"></main-dialog>
  </div>
</template>

<script>
import { getDept, getDeptById } from '@/util/dic'
import mixin from '@/mixins/mixin'
import mainDialog from './mainDialog'
import { getConfirmData, applyBack } from '@/api/supply/material'
import { getConfirmDetailData } from '@/api/supply/confirm'
import { materialTableOption } from './const/index'
import { mapGetters } from 'vuex'

export default {
  name: 'Demand',
  mixins: [mixin],
  components: { mainDialog },
  computed: {
    formProps () {
      return [
        { label: '事项名称', prop: 'matName' },
        { label: '事项编码', prop: 'matCode' },
        { label: '需求部门', prop: 'deptId', type: 'select', data: getDept() },
        { label: '数源部门', prop: 'dutyId', type: 'select', data: getDept(), show: this.deptType },
      ]
    },
    mainTableOption () {
      return materialTableOption
    },
    ...mapGetters(['userInfo']),
    deptType () {
      return getDeptById(this.userInfo.deptId).type ? true : false
    },
  },
  data () {
    return {
      listQuery: {
        auditState: 3,
      },
      mainTableData: [],
      formData: {},
    }
  },
  methods: {
    // 申请退回
    applyBack (row) {
      this.$confirm('确认撤回？').then(() => {
        applyBack(row.id).then(() => {
          this.$message.success('申请成功，正在审核中！')
          this.getList()
        })
      }).catch(() => { })
    },
    // 查看
    handleDetail (row){
      getConfirmDetailData(row.materialId).then((res) => {
        this.formData= Object.assign({}, res.data.data)
        this.$refs['mainDialog'].open()
      })
    },
    // 获取主表数据
    getList () {
      getConfirmData(this.listQuery).then((res) => {
        this.pagination.total = res.data.data.total
        this.mainTableData = res.data.data.records
      })
      this.tableLoading = false
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
