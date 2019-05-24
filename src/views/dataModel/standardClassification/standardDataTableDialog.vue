<template>
  <gov-dialog
    ref="dialog"
    @closed="handleClosedDialog"
    width="70%"
    @handleSubmit="handleSubmit"
    :isBtnGroup="status !=='detail'"
    :title="dialog.textMap[status]">
    <gov-layout-header>
      <!-- 搜索 -->
      <gov-search-bar
        @handleFilter="handleFilter"
        :listQuery="listQuery"
        :formProps="formProps"/>
    </gov-layout-header>    
    <avue-crud
      :data="tableList"
      :option="standardDataTableOption"
      :tableLoading="tableLoading"
      :page="pagination"
      @size-change="sizeChange"
      @current-change="currentChange"
      @selection-change="selectionChange"
    >
      <template slot-scope="scope" slot="menu">
        <div class="table-btn-group">
          <el-button @click="handleDetial(scope.row)" type="text" size="small">详情</el-button>
        </div>
      </template>
    </avue-crud>
    <!-- 弹窗 -->
    <standard-data-form-dialog
      :status="formDialogStatus"
      ref="formDialog"/>
  </gov-dialog>
</template>
<script>
import mixin from "@/mixins/mixin"
import { standardDataTableOption } from './const/index'
import { getStandardDataPage } from "@/api/dataModel/standardClassification"
import standardDataFormDialog from './standardDataFormDialog'
export default {
  name: "standardDataTableDialog",
  mixins: [mixin],
  components: { standardDataFormDialog },
  data () {
    return {
      selectList: [],
    }
  },
  props: {

  },
  created () {

  },
  computed: {
    // 查询字段
    formProps () {
      return [
        { 
          label: "中文名称", 
          prop: "dataCn", 
          type: "input",
          maxlength: 100,
        },
      ]
    }, 
    standardDataTableOption () {
      return standardDataTableOption
    },
  },
  methods: {
    selectionChange (list) {
      this.selectList = list
    },
    openDialog () {
      this.getList()
      this.$refs["dialog"].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    getList () {
      this.tableLoading = true
      getStandardDataPage(this.listQuery).then(({ data }) => {
        this.tableList = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      })
    },
    handleSubmit () {
      this.$emit('submit', this.selectList)
      this.close()
    },
    handleDetial (data) {
      this.formDialogStatus = 'detail'
      this.$refs['formDialog'].openDialog(data)
    },
  },
}
</script>
