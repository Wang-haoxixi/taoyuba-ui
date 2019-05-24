<template>
  <div class="resources">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Recruit'" v-slot:Recruit>
          <recruit v-loading="activeTab !=='Recruit'"></recruit>
        </template>
        <template v-if="activeTab ==='Reward'" v-slot:Reward>
          <reward v-loading="activeTab !=='Reward'"></reward>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Recruit from './Recruit'
import Reward from './Reward'
export default {
  components: {
    Recruit,
    Reward,
  },
  data () {
    return {
      tabList: [{
        label: '突击队招募任务',
        value: 'Recruit',
      }, {
        label: '协作悬赏任务',
        value: 'Reward',
      }],
      activeTab: 'Recruit',
    }
  },
}
</script>

