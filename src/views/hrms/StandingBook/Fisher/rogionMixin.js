import { getRogionList } from '@/api/post/admin'
export default {
  data () {
    return {
      rogionList: [],
    }
  },
  methods: {
    getRogionList () {
      return new Promise((resolve, reject) => {
        getRogionList(0).then(({ data }) => {
          if (data.code === 0) {
            this.rogionList = data.data
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    getProvinceIdName (value) {
      let result = ''
      this.rogionList.forEach((item) => {
        if (item.areaCode === value) {
          result = item.name
        }
      })
      return result
    },
  },
}