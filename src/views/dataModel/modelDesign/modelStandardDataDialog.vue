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
      :formProps="formProps"/>
    <avue-crud
      :table-loading="tableLoading"
      :data="standardData"
      :option="standardDataTableOption"
      :page="pagination"
      @selection-change="selectionChange"
      @size-change="sizeChange"
      @current-change="currentChange"
      @refresh-change="getList">
    </avue-crud>
  </gov-dialog>  
</template>
<script>
import mixin from "@/mixins/mixin"
import { getDic } from '@/util/dic'
import { standardDataTableOption } from './const/index'
import { getModelStandardDataPage} from '@/api/dataModel/modelDesign'
export default {
  mixins: [mixin],
  props: ['title'],
  data () {
    return {
      selectData: [],
      standardDataTableOption: standardDataTableOption,
    }
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
        }, {
          label: "所属分类",
          prop: "status",
          type: "select",
          data: getDic('READ_STATUS'),
        },
      ]
    },
  },
  methods: {
    //获取表格数据
    getList () {
      this.tableLoading = true
      getModelStandardDataPage(this.listQuery).then(({data})=>{
        this.standardData = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      })
    },
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

<style>

</style>

