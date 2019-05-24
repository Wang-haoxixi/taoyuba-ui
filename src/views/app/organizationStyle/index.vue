<template>
  <div>
    <organizational-top :data="data"></organizational-top>
    <organizational-content :data="data"></organizational-content>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>
<script>
import OrganizationalContent from './OrganizationalContent/'
import OrganizationalTop from './OrganizationalTop'
import { getOrgDetail } from '@/api/app/upms/'

export default {
  name: 'organizational',
  components: { OrganizationalContent, OrganizationalTop },
  data () {
    return {
      data: {},
    }
  },
  methods: {
    loadData () {
      getOrgDetail(this.$route.params.id).then(({data}) => {
        this.data = data.data
      })
    },
  },
  created () {
    this.loadData()
  },
}
</script>
