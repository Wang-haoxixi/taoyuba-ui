export default {
  methods: {
    getQuery () {
      let query = sessionStorage.getItem('query')
      if (sessionStorage.getItem('query')) {
        let val = JSON.parse(query)
        for (let key in this.params) {
          if (val[key]) {
            this.params[key] = val[key]
          }
        }
      }
    },
    setQuery (params) {
      if (params) {
        let query = sessionStorage.getItem('query')
        if (sessionStorage.getItem('query')) {
          let val = JSON.parse(query)
          for (let key in params) {
            val[key] = params[key]
          }
          sessionStorage.setItem('query', JSON.stringify(val))
        } else {
          sessionStorage.setItem('query', JSON.stringify(params))
        }
      } else {
        sessionStorage.setItem('query', JSON.stringify(this.params))
      }
    },
  },
}