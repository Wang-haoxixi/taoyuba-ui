<template>
  <div>
    <avue-crud ref="crud" :page="page" :data="tableData" :table-loading="tableLoading" :option="tableOption" @current-change="currentChange" @refresh-change="refreshChange" @size-change="sizeChange" @search-change="searchChange" @selection-change="selectionChange" @current-row-change="handleCurrentRowChange">
      <template slot="menuLeft">
        <el-button type="primary" size="small" @click="handleSaveAndExit();">保存</el-button>
        <span>表格总共已选择：</span>
        <el-tag> {{ selectedObjs.length }} 个 </el-tag>
      </template>
    </avue-crud>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  props: {
    selectedList: {
      type: Array,
      require: true,
      default: () => [],
    },
    columnMap: {
      type: Array,
      require: true,
      default: () => [],
    },
    getRequestName: {
      type: Function,
      require: true,
      default: () => { },
    },
    pageLimit: {
      type: Number,
      require: false,
      default: 6,
    },
    isSimple: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  data () {
    const pageLimit = this.pageLimit ? this.pageLimit : 6
    return {
      tableData: [],
      page: {
        pageSizes: [6, 12, 18],
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: pageLimit, // 每页显示多少条
      },
      listQuery: {
        page: 1,
        limit: pageLimit,
      },
      tableLoading: false,
      tableOption: {
        menu: false,
        addBtn: false,
        selection: !this.isSimple,
        highlightCurrentRow: this.isSimple,
        border: true,
        index: true,
        stripe: true,
        align: 'center',
        column: this.columnMap,
      },
      selectedObjs: this.selectedList,
      selectedIds: _.map(this.selectedList, 'value'),
      keyObject: {},
      tempSelectedObjs: [],
    }
  },
  computed: {
    currentSelected () {
      const cSIDS = []
      this.tableData.map(m => {
        if (this.selectedIds.includes(m[this.columnMap[0].prop])) {
          cSIDS.push(m)
        }
      })
      return cSIDS
    },
  },
  created () {
    this.getList()
  },
  mounted: function () { },
  methods: {
    getList () {
      this.tableLoading = true
      this.getRequestName(this.listQuery).then(response => {
        this.tableData = response.data.records
        this.page.total = response.data.total
        this.tableLoading = false

        // 当前页的数据 value 映射
        this.keyObject = _.keyBy(this.tableData, this.columnMap[0].prop)
        // 当前页的临时总数据
        this.tempSelectedObjs = [...this.selectedObjs]
        // 移除当前页的数据 为了与当前页选择的合并.
        for (const key in this.keyObject) {
          const index = this.selectedIds.indexOf(parseInt(key))
          if (this.keyObject.hasOwnProperty(key) && index >= 0) {
            // this.tempSelectedObjs.splice(index, 1)
            _.remove(this.tempSelectedObjs, item => {
              return item.value === parseInt(key)
            })
          }
        }
        window.tempSelectedObjs = this.tempSelectedObjs
        this.$nextTick(() => {
          this._handleSelectStatus()
        })
      })
    },
    /**
     * 刷新回调
     */
    refreshChange () {
      this.getList()
    },
    searchChange (form) {
      this.listQuery = form
      this.getList()
    },
    handleCurrentRowChange (val) {
      const theVal = {
        value: val[this.columnMap[0].prop],
        label: val[this.columnMap[1].prop],
      }
      this.selectedObjs = _([theVal])
        .uniqBy('value')
        .value()
    },
    selectionChange (list) {
      list = list.filter(element => {
        return element !== undefined
      })
      const theVal = list.map(item => {
        return {
          value: item[this.columnMap[0].prop],
          label: item[this.columnMap[1].prop],
        }
      })
      this.selectedObjs = _([...this.tempSelectedObjs, ...theVal])
        .uniqBy('value')
        .value()
    },
    handleSaveAndExit () {
      this.$emit('giveSelectedObjs', this.selectedObjs)
    },
    _handleSelectStatus () {
      const selectList = this.selectedIds.map(id => {
        return this.keyObject[id]
      })
      this.$refs.crud.toggleSelection(selectList)
    },
    currentChange (val) {
      this.page.currentPage = val
      this.listQuery.page = val
      this.getList()
    },
    sizeChange (val) {
      this.page.pageSize = val
      this.listQuery.limit = val
      this.getList()
    },
  },
}
</script>
<style lang="scss" scoped></style>
