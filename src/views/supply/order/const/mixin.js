export default {
  created () {
    this.getList()
  },
  methods: {
    handleCurrentChange (val) {
      this.currentChange(val)
    },
    handleSizeChange (val) {
      this.sizeChange(val)
    },
    ignoreData (val) {
      let result = {}
      if (val && Object.keys(val).length > 0){
        for (let key in val) {
          if (key === 'page') {
            continue
          } else if (key === 'limit') {
            continue
          } else {
            result[key] = val[key]
          }
        }
      }
      return result
    },
  },
}