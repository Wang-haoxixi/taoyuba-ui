<template>
  <!-- 数据元弹窗 -->
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
    <element-dialog
      ref="elementDialog" 
      :temp="formData" 
      :status="elementDialog.status">
    </element-dialog>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
import {tableOption} from './const/element'
import {getPage} from '@/api/dataTemplate/element'
import elementDialog from '../element/mainDialog'
export default {
  mixins: [mixin],
  components: {elementDialog},
  data () {
    return {
      tableOption,
      // 数据元
      elementDialog: {
        status: 'detail',
        textMap: {
          detail: '数据元详情',
        },
      },
    }
  },
  created () {
    this.dialog.textMap.detail = '关联数据元'
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
      this.$refs['elementDialog'].open()
    },
  },
}
</script>

