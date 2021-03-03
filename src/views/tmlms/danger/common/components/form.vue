<template>
  <div>
    <basic-container>
      <page-header :title="getTitle" :backOption="backOption"></page-header>
      <div v-show="showSearch">
        <page-search-ship @shipInfo="getShipInfo"></page-search-ship>
      </div>
      <div class="content-wrapper" v-show="showForm">
        <page-content :options="options" v-model="form" :disabled="status === 'detail'" :historyData="historyData" @submit="onSubmit"></page-content>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getPageById, getPageByShipNo, createPage, updatePage, getShipInfo } from '@/api/tmlms/danger'
// import pageInfo from './info'
import formMixin from './form.js'
import pageContent from './content'
import pageSearchShip from './searchShip'
export default {
  mixins: [formMixin],
  components: {
    pageContent,
    pageSearchShip,
    // pageInfo,
  },
  props: {
    status: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      historyData: {},
      rules: {},
      showForm: false,
      showSearch: false,
    }
  },
  computed: {
    getTitle () {
      let text = '一般性隐患排查'
      return this.status === 'create' ? `新增${text}` : (this.status === 'update' ? `编辑${text}` : text)
    },
  },
  watch: {
    status: {
      handler  (newVal) {
        this.showSearch = newVal === 'create'
        this.showForm = newVal !== 'create'
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getShipBaseInfo (shipName) {
      if (shipName) {
        getShipInfo({shipName: shipName}).then(({ data }) => {
          if (data.code === 0) {
            let val = data.data.records
            this.shipInfo = val ? data.data.records[0] : {}
          }
        })
      }
    },
    getShipInfo (data) {
      this.shipInfo = data
      this.showSearch = false
      this.showForm = true
      this.setFormInfo()
      this.setFormShipInfo()
      this.getPageByShipNo()
    },
    getList (id) {
      this.showSearch = false
      this.showForm = true
      if (id) {
        getPageById(id).then(({ data }) => {
          if (data.code === 0) {
            let result = data.data
            this.getLastHistory(result.lastId)
            this.setForm(result)
            if (this.status !== 'create') {
              // this.getShipBaseInfo(result.shipName)
            }
          }
        })
      }
    },
    getLastHistory (id) {
      if (id) {
        getPageById(id).then(({ data }) => {
          if (data.code === 0) {
            this.setForm(data.data, 'historyData')
          }
        })
      }
    },
    getPageByShipNo () {
      let params = {}
      if (this.shipInfo.shipNo) {
        params.shipNo = this.shipInfo.shipNo
      } else {
        params.shipName = this.shipInfo.shipName
      }
      getPageByShipNo(params).then(({ data }) => {
        if (data.code === 0) {
          let val = data.data.records
          if (val.length !== 0) {
            this.setForm(val[0], 'historyData')
            console.log('historyData', this.historyData)
            // this.historyData = val[0]
          }
        }
      })
    },
    getHistoryData (id) {
      if (id) {
        getPageById(id).then(({ data }) => {
          if (data.code === 0) {
            this.historyData = data.data
          }
        })
      }
    },
    onSubmit () {
      let form = Object.assign({}, this.value)
      this.setResult(form)
      form.lastId = Object.keys(this.historyData).length > 0 ? this.historyData.lastId : 0
      console.log('form', form)
      let api = this.status === 'create' ? createPage : (this.status === 'update' ? updatePage : null)
      if (api) {
        api(form).then(({ data }) => {
          let text = this.status === 'create' ? '新增' : '编辑'
          if (data.code === 0) {
            this.$message.success(`${text}成功`)
            this.onGoBack()
          } else {
            this.$message.error(data.msg || `${text}失败`)
          }
        })
      }
    },
  },
}
</script>
<style scoped lang="scss"></style>