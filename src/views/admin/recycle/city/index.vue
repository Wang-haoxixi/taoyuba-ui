<template>
  <gov-layout-main>
    <gov-layout-header>
      <!-- 搜索部分 -->
      <gov-search-bar
        @handleFilter="handleFilter"
        :listQuery="listQuery"
        :formProps="searchOption"/>
      <gov-layout-body>
        <!-- 表格 -->
        <avue-crud
          :table-loading="tableLoading"
          :data="tableList"
          :option="tableOption"
          :page="pagination"
          @size-change="sizeChange"
          @current-change="currentChange">
          <template slot-scope="scope" slot="menu">
            <div class="table-btn-group">
              <gov-button @click="handleDelete(scope.row)" type="text">删除</gov-button>
              <gov-button @click="handleRestore(scope.row)" type="text">还原</gov-button>
            </div>
          </template>
        </avue-crud>
      </gov-layout-body>
    </gov-layout-header>
  </gov-layout-main>
</template>

<script>
import mixin from '@/mixins/mixin'
import { getPageRecycle, reductionRecycle, deleteRecycle } from '@/api/umps/city'
export default {
  mixins: [mixin],
  data () {
    return {
      listQuery: {name: undefined},
      searchOption: [
        {
          label: '城市名称',
          prop: 'name',
          type: 'input',
          maxlength: 50,
        },
      ],
      tableOption: {
        page: true,
        menu: false,
        index: false,
        header: false,
        selection: false,
        column: [
          {label: '城市名称', prop: 'name'},
          {label: '操作', prop: 'menu', solt: true, width: 100},
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
      getPageRecycle(this.listQuery).then(({ data }) => {
        this.tableList = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      })
    },
    // 还原
    handleRestore (row) {
      this.$confirm('确定要还原吗').then(() => {
        reductionRecycle([row.id]).then(() => {
          this.$message.success("还原成功！")
          this.getList()
        })
      })
    },
    // 删除
    handleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        deleteRecycle([row.id]).then(() => {
          this.$message.success("删除成功！")
          this.getList()
        })
      })
    },
  },
}
</script>
