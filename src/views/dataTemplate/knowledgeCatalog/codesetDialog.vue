<template>
  <!-- 代码集弹窗 -->
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
    <code-set-dialog
      ref="codeSetDialog"
      :temp="formData"
      :status="codeSetDialog.status">
    </code-set-dialog>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
import codeSetMixin from '../codeSet/const/mixin'
import {getPage} from '@/api/dataTemplate/codeSet'
import codeSetDialog from '../codeSet/mainDialog'
export default {
  mixins: [mixin, codeSetMixin],
  components: {codeSetDialog},
  data () {
    return {
      codeSetDialog: {
        status: 'detail',
        textMap: {
          detail: '代码集详情',
        },
      },
    }
  },
  created () {
    this.tableOption.selection = false
    this.dialog.textMap.detail = '关联代码集'
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
      this.$refs['codeSetDialog'].open()
    },
  },
}
</script>
