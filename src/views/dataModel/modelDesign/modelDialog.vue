<template>
  <!-- 模型表模板新增 -->
  <gov-dialog
    ref="dialog"
    width="80%"
    :btnGroup="btnGroup"
    @nextStep="nextStep"
    :title="dialogOption[status].title">
    <gov-search-bar
      @handleFilter="handleFilter"
      :listQuery="listQuery"
      :formProps="formProps"/>
    <avue-crud
      :table-loading="tableLoading"
      :data="mainTableData"
      :option="mainTableOption"
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
import {
  getModelTableData,
} from '@/api/dataModel/modelDesign'

export default {
  name: "modelDialog",
  mixins: [mixin],
  data () {
    return {
      dialogOption: {
        detail: {
          title: '详情',
        },
        create: {
          title: "新增",
        },
      },
      formProps: [
        {
          label: '信息资源中文名称',
          prop: 'infoResrcChnNm',
        },
      ],
      mainTableData: [],
      mainTableOption: {
        page: true,
        menu: false,
        header: false,
        selection: true,
        column: [
          {
            label: "信息资源中文名称",
            prop: "infoResrcChnNm",
          }, {
            label: "信息资源提供方",
            prop: "infoResrcPrvd",
          },
        ],
      },
      btnGroup: [
        {
          label: '下一步',
          type: 'primary',
          fn: 'nextStep',
        }, {
          label: '取消',
          type: 'default',
          fn: 'handleCancel',
        },
      ],
      tableSeltction: [],
    }
  },
  props: {
    status: {
      type: String,
      default: 'detail',
    },
  },
  methods: {
    open () {
      this.getList()
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 获取表内容
    getList () {
      this.tableLoading = true
      getModelTableData(this.listQuery).then(({data})=>{
        this.mainTableData = data.data.records
        this.pagination.total = data.data.total
        this.tableLoading = false
      })
    },
    selectionChange (list) {
      this.tableSeltction = list
    },
    // 下一步
    nextStep () {
      if (this.tableSeltction.length === 0) {
        this.$message.error('请选择一条信息资源')
      } else if (this.tableSeltction.length > 1) {
        this.$message.error('只能选择一条信息资源')
      } else {
        let form = this.tableSeltction[0]
        this.$emit('submit', {...form})
      }
    },
  },
}
</script>