export default {
  data () {
    return {
      importTypeName: '',
      importDialogShow: false,
    }
  },
  methods: {
    handleImport (functionName = '行政权力') {
      this.importTypeName = functionName
      this.importDialogShow = true
    },
    handleCloseImport (res) {
      this.importDialogShow = false
      this.load()
      if (res.data) {
        this.$message({
          message: `成功!${res.msg}`,
          type: 'success',
          duration: 15000,
        })
      } else {
        this.$message({
          message: `警告!${res.msg}`,
          type: 'warning',
          duration: 15000,
        })
      }
    },
  },
}
