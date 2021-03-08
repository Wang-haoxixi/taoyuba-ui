<template>
  <div>
    <basic-container>
      <page-header :title="getTitle" :backOption="backOption"></page-header>
      <page-info v-model="shipInfo"></page-info>
      <page-content :options="options" :status="status" v-model="form" :disabled="status === 'detail'"></page-content>
    </basic-container>
  </div>
</template>
<script>
import pageInfo from './info'
import pageContent from './content.vue'
import { getPageById } from '@/api/tmlms/report'
import formMixin from './form.js'
import { getShipInfo } from '@/api/tmlms/danger'
export default {
  mixins: [formMixin],
  props: {
    status: String,
  },
  components: {
    pageInfo,
    pageContent,
  },
  data () {
    return {
      data: {},
      form: {},
      shipInfo: {},
    }
  },
  computed: {
    getTitle () {
      let text = '勘验报告'
      return (this.status === 'create' || this.status === 'createNoSearch') ? `新增${text}` : (this.status === 'update' ? `编辑${text}` : text)
    },
  },
  methods: {
    getShipInfo (shipName) {
      if (shipName) {
        getShipInfo({shipName}).then(({ data }) => {
          if (data.code === 0) {
              let val = data.data.records
              this.shipInfo = val ? data.data.records[0] : {}
            }
        })
      }
    },
    getList (id) {
      if (id) {
        getPageById(id).then(({ data }) => {
          if (data.code === 0) {
            let data = data.data
            this.data = data.data
            this.form = this.setFormImage(data)
          }
        })
      }
    },
    setFormImage (data) {
      let obj = {}
      for (let key in data) {
        if (key.indexOf('Image') > -1) {
          if (data[key].length > 0) {
            obj[key] = data[key].join(',')
          } else {
            obj[key] = []
          }
        } else {
          obj[key] = data[key]
        }
      }
      return obj
    },
  },
}
</script>
<style lang="scss" scoped>
</style>