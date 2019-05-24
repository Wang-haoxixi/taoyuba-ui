<template>
  <gov-dialog
    width="80%"
    ref="dialog"
    @open="handleOpen" 
    @closed="handleClosedDialog"
    :title="`查看：${sliceTitle({name: title})}`"
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
          <gov-button @click="handlDetail(scope.row)" type="text">文件详情</gov-button>
          <gov-button @click="handleElement(scope.row)" type="text">数据元</gov-button>
          <gov-button @click="handleDataset(scope.row)" type="text">数据集</gov-button>
          <gov-button @click="handleCodeset(scope.row)" type="text">代码集</gov-button>
        </div>
      </template>
    </avue-crud>
    <!-- 标准文件 -->
    <standard-file-dialog 
      ref="standardFileDialog" 
      :temp="standardFileForm" 
      :status="standardFileDialog.status">
    </standard-file-dialog>
    <!-- 数据元 -->
    <element-dialog 
      ref="elementdialog" 
      :temp="elementForm" 
      :status="elementDialog.status">
    </element-dialog>
    <!-- 数据集 -->
    <dataset-dialog 
      ref="dataSetDialog" 
      :temp="dataSetForm" 
      :status="dataSetDialog.status">
    </dataset-dialog>
    <!-- 代码集 -->
    <codeset-dialog 
      ref="codeSetDialog" 
      :temp="codeSetForm" 
      :status="codeSetDialog.status">
    </codeset-dialog>
  </gov-dialog>
</template>
<script>
import standardFileDialog from '../standardFile/mainDialog'
import elementDialog from './elementDialog'
import datasetDialog from './datasetDialog'
import codesetDialog from './codesetDialog'
import mixin from '@/mixins/mixin'
import {getPage} from '@/api/dataTemplate/standardFile'
import {tableOption} from './const/main'
import currentMixin from './const/mixin'
export default {
  mixins: [mixin, currentMixin],
  components: { standardFileDialog, elementDialog, datasetDialog, codesetDialog },
  data () {
    return {
      tableOption,
      // 标准文件
      standardFileDialog: {
        status: 'detail',
        textMap: {
          detail: '标准文件详情',
        },
      },
      standardFileForm: {},
      // 数据元
      elementDialog: {
        status: 'detail',
        textMap: {
          detail: '数据元详情',
        },
      },
      elementForm: {},
      // 数据集
      dataSetDialog: {
        status: 'detail',
        textMap: {
          detail: '数据集详情',
        },
      },
      dataSetForm: {},
      // 代码集
      codeSetDialog: {
        status: 'detail',
        textMap: {
          detail: '代码集详情',
        },
      },
      codeSetForm: {},
    }
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  created () {
    this.dialog.textMap.detail = this.standardFileDialog.textMap.detail
  },
  methods: {
    // 弹窗打开时操作
    handleOpen () {
      this.getList()
    },
    getList () {
      this.tableLoading = true
      let result = Object.assign(this.listQuery, {dmnClsId: this.temp.id, state: '1'}) 
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
    // 文件详情
    handlDetail (row) {
      this.standardFileForm = Object.assign({}, row)
      this.$refs['standardFileDialog'].open()
    },
    // 数据元
    handleElement (row) {
      this.elementForm = Object.assign({}, row)
      this.$refs['elementdialog'].open()
    },
    // 数据集
    handleDataset (row) {
      this.dataSetForm = Object.assign({}, row)
      this.$refs['dataSetDialog'].open()
    },
    handleCodeset (row) {
      this.codeSetForm = Object.assign({}, row)
      this.$refs['codeSetDialog'].open()
    },
  },
}
</script>

