export default {
  methods: {
    sliceTitle ({name = '', max = 20}) {
      if (name.length >= max) {
        return name.slice(0, max) + '...'
      }
      return name
    },
  },
}