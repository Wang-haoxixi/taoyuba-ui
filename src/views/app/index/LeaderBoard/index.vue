<template>
  <div class="leaderBoard">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='ContributionList'" v-slot:ContributionList>
          <contribution-list v-loading="activeTab !=='ContributionList'"></contribution-list>
        </template>
        <template v-if="activeTab ==='CreditList'" v-slot:CreditList>
          <credit-list v-loading="activeTab !=='CreditList'"></credit-list>
        </template>
        <template v-if="activeTab ==='PreformanceList'" v-slot:PreformanceList>
          <preformance-list v-loading="activeTab !=='PreformanceList'"></preformance-list>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import ContributionList from './ContributionList'
import CreditList from './CreditList'
import PreformanceList from './PreformanceList'
export default {
  components: {
    ContributionList,
    CreditList,
    PreformanceList,
  },
  data () {
    return {
      tabList: [{
        label: '贡献榜',
        value: 'ContributionList',
      }, {
        label: '信用榜',
        value: 'CreditList',
      }, {
        label: '业绩榜',
        value: 'PreformanceList',
      }],
      activeTab: 'ContributionList',
    }
  },
}
</script>

