<template>
  <gov-dialog
    ref="dialog"
    :title="title"
    width="70%"
    @handleSubmit="submit"
    @closed="handleClosed"
    >
    <gov-search-bar
      @handleFilter="handleFilter"
      :listQuery="listQuery"
      :formProps="modelDataEleQuery"/>
    <avue-crud
      :table-loading="tableLoading"
      :data="modelDataEle"
      :option="modelDataEleDialogTableOption"
      :page="pagination"
      @selection-change="selectionChange"
      @size-change="sizeChange"
      @current-change="currentChange"
      @refresh-change="getList">
    </avue-crud>
  </gov-dialog>
</template>
<script>
import constMixin from './const/mixin'
import mixin from "@/mixins/mixin"
import { getModelDataEleTableData} from '@/api/dataModel/modelDesign'
export default {
  props: ['title'],  
  mixins: [mixin, constMixin],
  data () {
    return {
      selectData: [],
    }
  },
  methods: {
    //打开弹窗
    open () {
      this.$refs['dialog'].open()
      this.$nextTick(()=>{
        this.getList()
      })
    },
    //关闭弹窗
    close () {
      this.$refs['dialog'].close()
    },
    //获取表格数据
    getList () {
      this.tableLoading = true
      getModelDataEleTableData(this.listQuery).then(({data})=>{
        this.modelDataEle = data.data.records
        this.pagination.total = data.data.total
        this.tableLoading = false
      })
    },
    //确定选择项
    submit () {
      this.$emit('submit', this.selectData)
    },
    //选择数据并赋值给数组
    selectionChange (data) {
      this.selectData = data
    },
  },
}
</script>

