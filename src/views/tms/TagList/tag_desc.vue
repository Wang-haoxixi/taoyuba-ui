<template>
  <div>
    <avue-crud ref="crud" :page="page" :data="tableData" :table-loading="tableLoading" :option="tableOption" @refresh-change="refreshChange" @size-change="sizeChange" @search-change="searchChange" @row-update="rowUpdate" @row-del="rowDel">
      <template slot="menuLeft">
      </template>
    </avue-crud>
  </div>
</template>
<script>
import { getTagDescriptionPageByTagId, putTagDesc, deleteTagDescById } from '@/api/tms/description'
// import crudTable from '@/components/crud-table'
import dialogMixins from '@/mixins/deprecated/dialog_mixins'
import paginationMixins from '@/mixins/deprecated/pagination_mixins'
export default {
  mixins: [dialogMixins, paginationMixins],
  // components: { crudTable },
  props: {
    tagId: {
      type: Number,
      required: true,
    },
  },
  data () {
    return {
      tableData: [],
      page: {
        pageSizes: [6, 12, 18],
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 6, // 每页显示多少条
      },
      listQuery: {
        page: 1,
        limit: 6,
      },
      tableLoading: false,
      tableOption: {
        // menu: false,
        addBtn: false,
        selection: false,
        highlightCurrentRow: false,
        border: true,
        index: true,
        stripe: true,
        cellBtn: true,
        editBtn: false,
        align: 'center',
        column: [
          {
            label: '注释内容',
            prop: 'description',
            'maxRow': 4,
            'minRow': 4,
            cell: true,
          },
          {
            label: '注释用户',
            prop: 'creatorRealName',
          },
        ],
      },
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.tableLoading = true
      getTagDescriptionPageByTagId(this.tagId, this.listQuery).then(res => {
        this.tableData = res.data.records
        this.page.total = res.data.total
        this.tableLoading = false
      })
    },
    rowUpdate (form, index, done) {
      putTagDesc(form).then(() => {
        this.$message.success('更新数据成功')
        done()
      })
    },
    rowDel (form) {
      deleteTagDescById(form.descriptionId).then(() => {
        this.$message.success('删除数据成功')
        this.getList()
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
