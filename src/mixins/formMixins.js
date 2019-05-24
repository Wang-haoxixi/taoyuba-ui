export default {
  methods: {
    mixinsValidate () {
      return new Promise((resolve, reject) => {
        this.$refs['form'].validate((v, o) => {
          if (v) {
            resolve(v)
          } else {
            reject(o)
          }
        })
      })
    },
  },
}