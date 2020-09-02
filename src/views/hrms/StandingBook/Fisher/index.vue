<template>
  <component :record="record" :is="currentComponet"></component>
</template>
<script>
import List from './Page/List'

export default {
  name: 'TableListWrapper',
  components: { List },
  data () {
    return {
      currentComponet: 'List',
      record: '',
    }
  },
  created () {
  },
  methods: {
    handleGoBack () {
      this.record = ''
      this.currentComponet = 'List'
    },
  },
  watch: {
    '$route.path' () {
      this.record = ''
      this.currentComponet = 'List'
    },
  },
  beforeRouteLeave (to, from, next) { 
    console.log(to)
  // 设置下一个路由的 meta
  if (to.path !=='/hrms_spa/village_ship_detail' && to.name!=='contract_tmp'&&to.name!=='渔船下所有船员'&&to.name!=='渔船股东'&&to.name!=='渔船船员表单') {
    sessionStorage.removeItem('query')
  }
  next()
  },
  // beforeUpdate () {
  // console.log('tttt')
  // sessionStorage.setItem('query', JSON.stringify(this.params))
  // },
}
</script>