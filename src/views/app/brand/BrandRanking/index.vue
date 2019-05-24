<template>
  <div class="leaderBoard">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Rank'" v-slot:Rank>
          <rank v-loading="activeTab !=='Rank'"></rank>
        </template>
        <template v-if="activeTab ==='HotMan'" v-slot:HotMan>
          <hot-man v-loading="activeTab !=='HotMan'"></hot-man>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Rank from './Rank'
import HotMan from './HotMan'
export default {
  components: {
    Rank,
    HotMan,
  },
  data () {
    return {
      tabList: [{
        label: '联络员排名',
        value: 'Rank',
      }, {
        label: '品牌达人',
        value: 'HotMan',
      }],
      activeTab: 'Rank',
    }
  },
}
</script>
<style scoped>
</style>

