const optNameMap = {
  delete: '删除',
  shelf: '上架',
  submit: '提交',
  cancel: '撤销',
}
import { pageOption } from '@/const/pageConfig'
export default {
  data () {
    return {
      pagedTable: [],
      multipleSelection: [],
      isLoadTable: true,
      pagination: this._pageOption(),
      pageOption: this._pageOption(),
      searchForm: {},
    }
  },
  methods: {
    _pageOption () {
      return pageOption()
    },
    searchPage (param) {
      this.pageOption = this._pageOption()
      this.searchForm = param
      this.loadPage(param)
    },
    async loadTable (param, requestFn, fn = m => m) {
      this.isLoadTable = true
      const { data } = await requestFn({ ...param, ...this.pageOption })
      const { records, size, total, current } = data.data
      const isBug = total / size + 1 === current
      if (isBug && total !== 0) {
        this.searchPage() // 防止分页为空页的情况
      } else {
        this.pagination = { current, size, total }
      }
      this.pagedTable = records.map(fn)
      this.isLoadTable = false
      return data.data
    },
    handleSizeChange (val) {
      this.pageOption.size = val
      this.loadPage()
    },
    handleCurrentChange (val) {
      this.pageOption.current = val
      this.loadPage()
    },
    _handleGlobalDeleteById (id, delFunction) {
      this._handleGlobalById(id, delFunction, 'delete')
    },
    _handleGlobalDeleteAll (delFunction) {
      this._handleGlobalAll(delFunction, 'delete')
    },
    _handleGlobalById (id, optFunction, opt = 'delete') {
      const optName = optNameMap[opt]
      this.$confirm(`此操作将${optName}该数据, 是否继续?`, '提示', {
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
          this.loadPage()
        })
      })
    },
    async _handleGlobalAll (optFunction, opt = 'delete') {
      let Ids = this.multipleSelection
      const optName = optNameMap[opt]
      if (Ids === undefined || Ids.length === 0) {
        this.$message(`请先选择需要${optName}的选项`)
        return
      }
      this.$confirm(`此操作将${optName}这些数据, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const { data } = await optFunction(Ids)
        if (data.data) {
          this.$message({
            type: 'success',
            message: `${optName}成功!`,
          })
          this.pageOption = this._pageOption()
        } else {
          this.$message({
            type: 'info',
            message: `${optName}失败，${data.msg}`,
          })
        }
        this.loadPage()
      })
    },
    _handleComfirm (id, optFunction, msg, detailMsg, feelbackMsg) {
      this.$confirm(detailMsg || `是否${msg}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const { data } = await optFunction(id)
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
        this.loadPage()
      }).catch((err) => {
        this.$message({
          type: 'info',
          message: `${err}, 已取消${msg}`,
        })
      })
    },
    mixinsCellPointerStyle ({ column }) {
      if (
        column.type === 'index' ||
        column.type === 'selection' ||
        column.label === '操作'
      ) {
        return false
      } else {
        return 'cursor:pointer'
      }
    },
  },
}
