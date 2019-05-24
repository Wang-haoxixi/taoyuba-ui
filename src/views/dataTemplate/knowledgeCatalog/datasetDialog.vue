<template>
  <!-- 数据集弹窗 -->
  <gov-dialog
    width="80%"
    ref="dialog"
    @open="handleOpen" 
    @closed="handleClosedDialog"
    :title="dialog.textMap[status] ? dialog.textMap[status] : ''"
    :isBtnGroup="status !== dialog.textName.detail"
    @handleSubmit="dialogSubmit">
    <avue-crud 
      :option="tableOption" 
      :data="tableList" 
      :table-loading="tableLoading"
      @size-change="sizeChange"
      @current-change="currentChange"
      :page="pagination">
      <template slot-scope="scope" slot="menu">
        <div class="table-btn-group">
          <gov-button @click="handlDetail(scope.row)" type="text">详情</gov-button>
        </div>
      </template>
    </avue-crud>
    <data-set-dialog
      ref="dataSetDialog" 
      :temp="formData" 
      :status="dataSetDialog.status">
    </data-set-dialog>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
import {tableOption} from './const/dataSet'
import {getPage} from '@/api/dataTemplate/dataSet'
import dataSetDialog from '../dataSet/mainDialog'
export default {
  mixins: [mixin],
  components: {dataSetDialog},
  data () {
    return {
      tableOption,
      dataSetDialog: {
        status: 'detail',
        textMap: {
          detail: '数据集详情',
        },
      },
    }
  },
  created () {
    this.dialog.textMap.detail = '关联数据集'
  },
  methods: {
    // 弹窗打开时操作
    handleOpen () {
      this.getList()
    },
    getList () {
      this.tableLoading = true
      let result = Object.assign(this.listQuery, {stdDocId: this.temp.id}) 
      getPage(result).then(({data}) => {
        if (data.code === 0) {
          this.tableList = data.data.records
          this.pagination.total = data.data.total
        }
        this.tableLoading = false
      })
    },
    open () {
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    handlDetail (row) {
      this.formData = Object.assign({}, row)
      this.$refs['dataSetDialog'].open()
    },
  },
}
</script>

