import cloneDeep from 'lodash/cloneDeep'

export default {
    watch: {
        'tableTree.pagination.currentPage': {
          handler (newVal) {
            this.listQuery.page = cloneDeep(newVal)
          },
          deep: true,
          immediate: true,
        },
        'tableTree.pagination.pageSize': {
          handler (newVal) {
            this.listQuery.limit = cloneDeep(newVal)
          },
          deep: true,
          immediate: true,
        },
        'tableTree.pagination.total': {
          handler (newVal) {
            let total = newVal
            let currentPage = this.tableTree.pagination.currentPage
            let pageSize = this.tableTree.pagination.pageSize
            if (total !== 0 && !(total > pageSize * (currentPage - 1))) {
              let result = total / pageSize
              let v = total <= pageSize * currentPage && total > pageSize * (currentPage - 1)
              if (total / pageSize === 0 && !v) {
                this.tableTree.pagination.currentPage = Math.ceil(result)
              } else if (!v) {
                this.tableTree.pagination.currentPage = Math.ceil(result)
              }
            }
            setTimeout(() => {
              this.getList()
            }, 50)
          },
          deep: true,
        },
    },
}    