<template>
  <div class="leaderBoard">
    <IepAppTabsCard :isMore="isMore" :linkName="linkName">
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Inner'" v-slot:Inner>
          <inner v-loading="activeTab !=='Inner'"></inner>
        </template>
        <template v-if="activeTab ==='Outer'" v-slot:Outer>
          <outer v-loading="activeTab !=='Outer'"></outer>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Inner from './Inner'
import Outer from './Outer'
export default {
  components: {
    Inner,
    Outer,
  },
  data () {
    return {
      isMore:true,
      linkName: '',
      tabList: [{
        label: '内部专家',
        value: 'Inner',
      }, {
        label: '外部专家',
        value: 'Outer',
      }],
      activeTab: 'Inner',
    }
  },
}
</script>
<style scoped>
</style>

