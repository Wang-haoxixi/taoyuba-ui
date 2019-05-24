<template>
  <div class="most">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Hottest'" v-slot:Hottest>
          <hottest v-loading="activeTab !=='Hottest'" :list="hotList"></hottest>
        </template>
        <template v-if="activeTab ==='Download'" v-slot:Download>
          <download v-loading="activeTab !=='Download'" :list="downloadList"></download>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Hottest from './Hottest'
import Download from './Download'
import { getBestList } from '@/api/app/mlms/index'

export default {
  components: {
    Hottest,
    Download,
  },
  data () {
    return {
      tabList: [{
        label: '查看最多',
        value: 'Hottest',
      }, {
        label: '下载最多',
        value: 'Download',
      }],
      activeTab: 'Hottest',
      hotList: [],
      downloadList: [],
    }
  },
  created () {
    getBestList().then(({data}) => {
      this.hotList = data.data.hot
      this.downloadList = data.data.download
    })
  },
}
</script>
<style lang="scss" scoped>
.el-card{
  border:0;
}
</style>