<template>
  <gov-layout-main>
    <gov-layout-body>
      <avue-crud 
        :option="tableOption" 
        :data="tableList" 
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :page="pagination">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button @click="handleDetail(scope.row)" type="text">详情</gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
     <main-dialog 
      @successForm="successForm"
      ref="mainDialog" 
      :temp="formData" 
      :title="title"
      :status="dialogStatus">
    </main-dialog>
  </gov-layout-main>
</template>
<script>
import mainDialog from './mainDialog'
import mixin from '@/mixins/mixin'
import {tableOption} from './const/index'
import {getPage} from '@/api/dataTemplate/domainClassification'
export default {
  mixins: [mixin],
  components: { mainDialog },
  data () {
    return {
      tableOption,
      title: '',
    }
  },
  created () {
    this.initApi()
  },
  methods: {
    initApi () {
      this.getList()
    },
    // 查看
    handleDetail (row) {
      this.dialogStatus = this.dialog.textName.detail
      this.formData = Object.assign({}, row)
      this.title = row.dmnClsNm
      this.$refs['mainDialog'].open()
    },
    getList () {
      this.tableLoading = true
      // this.listQuery.rltOrgId = this.listQuery.rltOrgId + ''
      getPage(this.listQuery).then(({data}) => {
        if (data.code === 0) {
          this.tableList = data.data.records
          this.pagination.total = data.data.total
        }
        this.tableLoading = false
      })
    },
  },
}
</script>

