<template>
  <basic-container>
    <iep-tabs v-model="activeTab" :tab-list="tabList">
      <template v-if="activeTab ==='ProApp'" v-slot:ProApp>
        <pro-app v-loading="activeTab !=='ProApp'" :form="formData" @submitSuccess="submitSuccess"></pro-app>
      </template>
      <template v-if="activeTab ==='Accredit'" v-slot:Accredit>
        <accredit v-loading="activeTab !=='Accredit'" :projectInfoId="form.id" @toggle-show="handleFormOpera" @toggle-detail="handleDetail"></accredit>
      </template>
    </iep-tabs>
  </basic-container>
</template>

<script>
import ProApp from './ProApp/' // 项目立项
import Accredit from './Accredit/' // 项目经理授权

export default {
  components: { ProApp, Accredit },
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    formData () {
      return this.form
    },
  },
  data () {
    return {
      detailDialogShow: false,
      tabList: [{
        label: '项目立项',
        value: 'ProApp',
      }, {
        label: '项目经理授权',
        value: 'Accredit',
      }],
      activeTab: 'ProApp',
    }
  },
  methods: {
    changePage (name) {
      this.activeTab = ''
      this.$nextTick(() => {
        console.log('name: ', name)
        this.activeTab = name
      })
    },
    handleDetail (row) {
      this.$emit('author_detail', row, this.formData)
    },
    handleFormOpera (type, formData) {
      this.$emit('author_opera', type, formData)
    },
    submitSuccess () {
      this.$emit('submitSuccess', true)
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
