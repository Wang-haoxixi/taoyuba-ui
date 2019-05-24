// import { pagination } from '@/util/util'
import _ from 'lodash'
import Pagination from '@/components/deprecated/pagination'
import { validatenull } from '@/util/validate'
function pageOption () {
  return {
    page: 1,
    limit: 10,
    orderByField: undefined,
    isAsc: true,
  }
}
const optNameMap = {
  delete: '删除',
}
export default {
  data () {
    return {
      isLoadTable: false,
      records: [],
      pagedTable: [],
      paginationOption: {
        current: 1,
        size: 0,
        total: 0,
      },
      pageOption: pageOption(),
    }
  },
  methods: {
    search () {
      this.pageOption = pageOption()
      this.load()
    },
    _handleGlobalDeleteById (id, delFunction) {
      this._handleGlobalById(id, delFunction, 'delete')
    },
    _handleGlobalDeleteAll (delFunction) {
      this._handleGlobalAll(delFunction, 'delete')
    },
    _handleGlobalById (id, optFunction, opt = 'delete') {
      const optName = optNameMap[opt]
      this.$confirm(`此操作将永久${optName}该数据, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        optFunction(id).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: `${optName}成功!`,
            })
          } else {
            this.$message({
              type: 'info',
              message: `${optName}失败，${res.data.msg}`,
            })
          }
          this.load()
        })
      })
    },
    _handleGlobalAll (optFunction, opt = 'delete') {
      let Ids = this.mutipleSelection
      const optName = optNameMap[opt]
      if (Ids === undefined || Ids.length === 0) {
        this.$message(`请先选择需要${optName}的选项`)
        return
      }
      this.$confirm(`此操作将永久${optName}这些数据, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        optFunction(Ids).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: `${optName}成功!`,
            })
            this.pageOption = pageOption()
          } else {
            this.$message({
              type: 'info',
              message: `${optName}失败，${res.data.msg}`,
            })
          }
          this.load()
        })
      })
    },
    _handleComfirm (id, functionName, msg, detailMsg, feelbackMsg) {
      this.$confirm(detailMsg ? detailMsg : `是否${msg}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        functionName(id).then((res) => {
          const { data } = res
          if (data.data) {
            this.$message({
              type: 'success',
              message: feelbackMsg || `${msg}成功!`,
            })
          } else {
            this.$message({
              type: 'info',
              message: `${data.msg}`,
            })
          }
          this.load()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取消${msg}`,
        })
      })
    },
    _mapPickDeptName (list) {
      if (validatenull(list)) {
        return []
      }
      return _(list)
        .map(item => {
          return _.pick(item, ['deptId', 'title'])
        })
        .value()
    },
    _mapPickUserIdName (list) {
      if (validatenull(list)) {
        return []
      }
      return _(list)
        .map(item => {
          return _.pick(item, ['id', 'realName'])
        })
        .value()
    },
    _mapPickTagIdName (list) {
      if (validatenull(list)) {
        return []
      }
      return list.map(m => {
        return { name: m.commonName, tagId: m.commonId }
      })
    },
    tableRowClassName ({ row }) {
      if (row.unread === 1) {
        return 'success-row'
      }
      return 'un-obvious-row'
    },
    handleSizeChange (val) {
      this.paginationOption.size = val
      this.pageOption.page = this.paginationOption.current
      this.pageOption.limit = this.paginationOption.size
      this.load()
    },
    handleCurrentChange (val) {
      this.paginationOption.current = val
      this.pageOption.page = this.paginationOption.current
      this.pageOption.limit = this.paginationOption.size
      this.load()
    },
    loadTable (data) {
      const { records, size, total, current } = data
      this.records = records
      this.paginationOption = {
        current,
        size,
        total,
      }
      this.pagedTable = this.records
      this.isLoadTable = false
    },
  },
  components: {
    Pagination,
  },
}
