<template>
  <gov-layout-main>
    <!-- 头部搜索框 -->
    <gov-layout-header>
      <gov-search-bar label-width="80px" :list-query="listQuery" :form-props="formProps" @handleFilter="handleFilter" />
    </gov-layout-header>
    <!-- 列表 -->
    <gov-layout-body>
      <div class="fixed-table">
        <avue-crud 
          :table-loading="tableLoading" 
          @size-change="sizeChange" 
          @current-change="currentChange" 
          :page="pagination" 
          :data="tableList" 
          :option="informationTableProps"
          @refresh-change="getList">
          <template slot-scope="scope" slot="menu">
            <div class="table-btn-group">
              <template v-if="scope.row.status >= 0">
                <gov-button type="text" @click="handleDetail(scope.row)" :text="buttonList(scope.row).name" :class="buttonList(scope.row).class"></gov-button>
              </template>
              <template v-else>
                <span style="font-size: 12px;">待提交</span>
              </template>
            </div>
          </template>
        </avue-crud>
      </div>
    </gov-layout-body>
    <!-- 主弹窗 -->
    <main-dialog :form-data="formData" ref="mainDialog"></main-dialog>
  </gov-layout-main>
</template>
<script>
import { getDept, getDic } from '@/util/dic'
import mixin from '@/mixins/mixin'
import mainDialog from '../confirm/mainDialog'
import { processingItem } from '../confirm/const/index'
import { supplyResData, getConfirmDetailData } from '@/api/supply/item'

export default {
  mixins: [mixin],
  components: { mainDialog },
  data () {
    return {
    }
  },
  computed: {
    // 搜索表单参数
    formProps () {
      return [
        { label: '事项名称', prop: 'matName', type: 'input' },
        { label: '事项编码', prop: 'matCode', type: 'input' },
        { label: '需求部门', prop: 'deptId', type: 'select', data: getDept() },
        { label: '责任部门', prop: 'dutyId', type: 'select', data: getDept() },
      ]
    },
    informationTableProps () {
      return {
        index: true,
        indexLabel: '序号',
        selection: false,
        menu: false,
        border: false,
        header: false,
        column: [{
            label: '需求情况', prop: '', align: 'center', children: [
              { label: '标记责任部门', prop: 'initialDeptId', align: 'center', type: 'select', dicData: getDept() },
              { label: '需求部门', prop: 'demandDeptId', align: 'center', type: 'select', dicData: getDept(), minWidth: '150px', fixed: 'left' },
              { label: '事项名称', prop: 'matName', align: 'center', minWidth: '150px' },
              { label: '材料名称', prop: 'materialName', align: 'center', minWidth: '150px' },
              { label: '材料类型', prop: 'materialType', align: 'center', type: 'dic', dicData: getDic('SUPPLU_MATERIAL_TYPE'), minWidth: '150px' },
              { label: '数据项名称', prop: 'itemName', align: 'center', minWidth: '150px' },
            ],
          }, {
            label: '认责情况', prop: '', align: 'center', children: [
              { label: '确认数源部门', prop: 'confirmDeptId', align: 'center', type: 'select', dicData: getDept(), minWidth: '150px' },
              { label: '确认材料名称', prop: 'confirmMaterialName', align: 'center', minWidth: '150px' },
              { label: '确认材料类型', prop: 'confirmMaterialType', align: 'center', type: 'dic', dicData: getDic('SUPPLU_MATERIAL_TYPE'), minWidth: '150px' },
              { label: '确认数据项', prop: 'confirmItemName', align: 'center', minWidth: '150px' },
            ],
          },
          { label: '状态', prop: 'menu', solt: true, align: 'center', fixed: 'right' },
        ],
      }
    },
  },
  methods: {
    // 列表
    getList () {
      this.tableLoading = true
      supplyResData(this.listQuery).then((res) => {
        this.pagination.total = res.data.data.total
        this.tableList = res.data.data.records
        this.tableLoading = false
      })
    },
    // 列表详情
    handleDetail (row) {
      getConfirmDetailData(row.id).then((res) => {
        this.dialogStatus = 'detail'
        this.formData = processingItem(res.data.data)
        console.log("formData: ", this.formData)
        this.openDialog('mainDialog')
      })
    },
    buttonList (row) {
      let name = ['待确认', '已确认', '拒绝', '撤回审核', '已撤回']
      let classes = ['yellow', 'blue', 'red', 'green', 'red']
      return {name: name[row.status], class: classes[row.status]}
    },
  },
  created () {
    this.getList()
  },
}
</script>
<style lang="scss" scoped>
.fixed-table {
  width: calc(100vw - 336px);
}
.yellow {
  color: #f59a23;
}
.blue {
  color: #357fca;
}
.red {
  color: #d9001b;
}
.green {
  color: #43d544;
}
.orange {
  color: #d97e00;
}
</style>

