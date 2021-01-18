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
    setQuery () {
      sessionStorage.setItem('query', JSON.stringify(this.params))
    },
  },
}