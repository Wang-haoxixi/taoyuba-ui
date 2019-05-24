<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :list-query="listQuery"
        label-width="80px"
        :form-props="searchOption"
        :is-string="false"
        :reset-ignore="['isAsc', 'limit', 'page']"
        @handleFilter="handleFilter">
      </gov-search-bar>
      <gov-layout-button-group>
      </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        :data="mainTableData"
        :option="mainTableOption"
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :page="pagination"
        @refresh-change="getList">
        <template slot-scope="scope" slot="demandType">
          {{scope.row.demandType === 1 ? '外部共享' : '内部共享'}}
        </template>
        <template slot-scope="scope" slot="directoryList">
          <div class="cell curP text-green" v-if="!scope.row.directoryList || scope.row.directoryList.length === 0" type="text" @click="handleMenu(scope.row)">
            目录编制
          </div>
          <div class="cell curP text-blue" v-else @click="handleMenu(scope.row)">
            已编目{{(scope.row.directoryList && scope.row.directoryList.length) ? scope.row.directoryList.length : 0}}条
          </div>
        </template>
        <template slot-scope="scope" slot="interfaceList">
          <div class="cell curP text-green" v-if="!scope.row.interfaceList || scope.row.interfaceList.length === 0" type="text" @click="handleInterface(scope.row)">
            关联接口
          </div>
          <div class="cell curP text-blue" v-else @click="handleInterface(scope.row)">
            已关联{{(scope.row.interfaceList && scope.row.interfaceList.length) ? scope.row.interfaceList.length : 0}}条
          </div>
        </template>
        <template slot-scope="scope" slot="updateCycle">
          <div class="cell curP text-green" v-if="!scope.row.updateCycle" type="text" @click="handleUpdateCycle(scope.row)">
            填写
          </div>
          <div class="cell curP text-blue" v-else type="text" @click="handleUpdateCycle(scope.row)">
            {{scope.row.updateCycle}}
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <info-menu-dialog ref="menuDialog" @successForm="successForm" @cancelForm="cancelForm"></info-menu-dialog>
    <interface-dialog ref="interfaceDialog" @successForm="successForm" @cancelForm="cancelForm"></interface-dialog>
    <update-cycle-dialog ref="updateCycleDialog" @successForm="successForm"></update-cycle-dialog>
  </gov-layout-main>
</template>

<script>
/*eslint-disable*/
import { mainTableOption } from './const/index'
import { getDept, getDic, getDeptById } from '@/util/dic'
import mainDialog from './mainDialog'
import infoMenuDialog from './infoMenuDialog'
import interfaceDialog from './interfaceDialog'
import updateCycleDialog from './updateCycleDialog'
import { getTableData, deleteData, submitTj, getMatterData, getSupplyExcelExport } from '@/api/supply/demand'
import { getConfirmData } from '@/api/supply/material'
import mixin from '@/mixins/mixin'
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'Demand',
  mixins: [mixin],
  components: { mainDialog, infoMenuDialog, interfaceDialog, updateCycleDialog },
  computed: {
    searchOption () {
      return [
        {label: '事项名称', prop: 'matName'},
        {label: '事项编码', prop: 'matCode'},
        {label: '需求部门', prop: 'deptId', type:'select', data: this.deptList, show: this.deptType },
        {label: '数源部门', prop: 'dutyId', type:'select', data: this.deptList, show: this.deptType },
      ]
    },
    mainTableOption () {
      return mainTableOption
    },
    ...mapGetters(['userInfo','permissions']),
    deptType () {
      return getDeptById(this.userInfo.deptId).type ? true : false
    },
  },
  data () {
    return {
      tableLoading: true,
      cityList: [],
      mainTableData: [], // 主表数据
      formData: {},
      deptList: getDept(),
      statusList: [{value: 0, label: '待提交'}, {value: 1, label: '待确认'}, {value: 2, label: '已确认'}],
      sup_demand_add: false,
      sup_demand_export: false,
      sup_demand_edit: false,
      sup_demand_del: false,
    }
  },
  methods: {
    handleDetail (row) {
      this.$refs['mainDialog'].open(row)
    },
    handleMenu (row) {
      this.$refs['menuDialog'].open(row)
    },
    handleInterface (row) {
      this.$refs['interfaceDialog'].open(row)
    },
    handleUpdateCycle (row) {
      this.$refs['updateCycleDialog'].open(row)
    },
    //保存成功
    successForm (){
      this.$message.success("保存成功！")
      this.getList()
    },
    //handleCancel
    cancelForm (){
      this.getList()
    },
    // 获取主表数据
    getList () {
      let data = Object.assign({}, this.listQuery)
      delete data.type
      // getTableData(data).then((res) => {
      //   this.pagination.total = res.data.data.total
      //   this.mainTableData = res.data.data.records
      //   this.tableLoading = false
      // })
      getConfirmData(data).then(({data})=>{
        this.pagination.total = data.data.total
        this.mainTableData = data.data.records
        this.tableLoading = false
      })
    },
  },
  watch: {
    'listQuery.type' (newVal) {
      this.listQuery.types = newVal.toString()
    },
  },
  created () {
    this.getList()
    this.sup_demand_add = this.permissions['sup_demand_add']
    this.sup_demand_export = this.permissions['sup_demand_export']
    this.sup_demand_edit = this.permissions['sup_demand_edit']
    this.sup_demand_del = this.permissions['sup_demand_del']

  },
}
</script>
<style lang="scss" scoped>
.text-blue{
  color: #409EFF;
}
.curP{
  cursor: pointer;
}
.text-green{
  color: #67C23A;
}
</style>
