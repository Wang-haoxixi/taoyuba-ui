<template>
  <!-- 标准数据元池 -->
  <gov-dialog
    ref="dialog"
    @closed="handleClosed"
    width="60%"
    :isBtnGroup="status !=='detail'"
    :title="dialog.textMap[status]">
    <gov-layout-form>
      <template v-if="status === 'detail'">
        <div class="detail-wrapper">
          <gov-detail-form v-model="formData" :option="dataOption"></gov-detail-form>
        </div>
      </template>
      <template v-else>
        <div class="form-wrapper">
          <avue-form ref="mainForm" :option="standardDataFormOption" v-model="formData"></avue-form>
        </div>
      </template>
    </gov-layout-form> 
   
    <avue-crud
      :table-loading="tableLoading"
      :data="mainTableData"
      :option="standardDataDetailTableOption"
      :page="pagination"
      @selection-change="selectionChange"
      @size-change="sizeChange"
      @current-change="currentChange"
      @refresh-change="getList">
      <template slot-scope="scope" slot="menu">
        <div class="table-btn-group">
          <el-button @click="handleDetail(scope.row)" type="text" size="small">查看</el-button>  
        </div>
      </template>
    </avue-crud>
    <standard-data-detail-dialog ref="detailDialog" :title="detailDialogTitle" :operationStatus="operationStatus" @submit="detailDialogSubmit"></standard-data-detail-dialog>
  </gov-dialog>
</template>

<script>
import { standardDataFormOption, standardDataDetailTableOption} from './const/index'
import { getDic, getDept } from '@/util/dic'
import { getDetailPage } from '@/api/dataModel/standardDataPool'
import standardDataDetailDialog from './standardDataDetailDialog'

import mixin from "@/mixins/mixin"

export default {
  components: {standardDataDetailDialog},
  mixins: [mixin],
  data () {
    return {
      id:"",
      formData: {},
      mainTableData: [], // 主表数据
      detailDialogTitle: '详情',
      standardDataFormOption: standardDataFormOption,
      standardDataDetailTableOption: standardDataDetailTableOption,
    }
  },
  props: {
    status: {
      type: String,
      default: 'detail',
    },
  },
  computed: {
    dataOption () {
      return {
        option: [
          {
            column: this.standardDataFormOption.column,
          },
        ],
      }
    },
  },
  methods: {
    getList (id) {
      this.tableLoading = true
      this.listQuery.standardDataId = id
      getDetailPage(this.listQuery).then(({data})=>{
        this.mainTableData = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      })
    }, 
    openDialog (formData) {
      this.formData = formData
      this.$refs['dialog'].open()
      this.getList(formData.id)
    },
    close () {
      this.$refs['dialog'].close()
    },
    getDic (dicName) {
      return getDic(dicName)
    },
    getDept () {
      return getDept()
    },
    handleDetail (rowData) {
      this.operationStatus = true
      this.$nextTick(()=>{
        this.$refs['detailDialog'].openDialog({...rowData})
      })
    },
    handleClosed () {
      this.$emit("closed")
      this.$nextTick(()=>{
        this.mainTableData = []
        this.formData = {}
        this.status !== 'detail' ? this.$refs['mainForm'].resetForm() : ""      
      })
    },
  },
}
</script>
