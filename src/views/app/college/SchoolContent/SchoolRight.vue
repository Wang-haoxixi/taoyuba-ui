<template>
  <div class="school-right">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='PayRanking'" v-slot:PayRanking>
          <pay-ranking v-loading="activeTab !=='PayRanking'"></pay-ranking>
        </template>
        <template v-if="activeTab ==='FreeRanking'" v-slot:FreeRanking>
          <free-ranking v-loading="activeTab !=='FreeRanking'"></free-ranking>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import PayRanking from './PayRanking'
import FreeRanking from './FreeRanking'
export default {
  components: {
    PayRanking,
    FreeRanking,
  },
  data () {
    return {
      tabList: [{
        label: '付费排行',
        value: 'PayRanking',
      }, {
        label: '免费排行',
        value: 'FreeRanking',
      }],
      activeTab: 'PayRanking',
    }
  },
}
</script>

