export default {
  methods: {
    /**
     * 字符串转数组
     * @param str {string}
     * @return {number[]} This is the result
     */
    decodeSplitStr (str) {
      if (!str) {
        return []
      }
      let strArr = str.split(',')
      return strArr.filter(m => {
        return m !== ''
      })
    },
    /**
     * 数组转字符串
     * @param arr {number[]} This is the result
     * @return {string}
     */
    encodeSplitStr (arr) {
      if (!arr) {
        return ''
      }
      return arr.join(',') === '' ? '' : arr.join(',') + ','
    },
  },
}
