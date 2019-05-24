<template>
  <gov-layout-main>
    <gov-layout-body>
      <avue-crud
        :page="pagination"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        @current-change="currentChange"
        @size-change="sizeChange">
        <template slot-scope="scope" slot="menu">
          <el-button type="text" v-if="permissions.sys_client_del" size="mini" @click="handleDelete(scope.row, scope.index)">删除</el-button>
        </template>
      </avue-crud>
    </gov-layout-body>
  </gov-layout-main>
</template>

<script>
import { getList, deleteToken } from '@/api/admin/token'
import { tableOption } from './const/token'
// import searchBar from '@/components/searchBar'
import allMixins from '@/mixins/mixin'
import { mapGetters } from 'vuex'
export default {
  name: 'token',
  mixins: [allMixins],
  data () {
    return {
      tableData: [],
      tableOption,
      formProps: [
        { label: '用户名', prop: 'user_name', type: 'input' },
      ],
      listQuery: {
        user_name: undefined,
      },
    }
  },
  created () {
    this.getList()
  },
  mounted: function () { },
  components: {
    // searchBar,
  },
  computed: {
    ...mapGetters(['permissions']),
  },
  methods: {
    getList () {
      this.tableLoading = true
      getList(this.listQuery).then(response => {
        this.tableData = response.data.records
        this.pagination.total = response.data.total
        this.tableLoading = false
      })
    },
    handleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        deleteToken(row.id).then(() => {
          this.getList()
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
