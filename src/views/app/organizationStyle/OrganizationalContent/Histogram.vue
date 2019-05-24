<template>
  <div class="histogram">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Performance'" v-slot:Performance>
          <performance v-loading="activeTab !=='Performance'"></performance>
        </template>
        <template v-if="activeTab ==='OrganizationalAssets'" v-slot:OrganizationalAssets>
          <organizational-assets v-loading="activeTab !=='OrganizationalAssets'"></organizational-assets>
        </template>
        <template v-if="activeTab ==='Shareholder'" v-slot:Shareholder>
          <shareholder v-loading="activeTab !=='Shareholder'"></shareholder>
        </template>
        <template v-if="activeTab ==='Investment'" v-slot:Investment>
          <investment v-loading="activeTab !=='Investment'"></investment>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Performance from './Performance'
import OrganizationalAssets from './OrganizationalAssets'
import Shareholder from './Shareholder'
import Investment from './Investment'
export default {
  components: {
    Performance,
    OrganizationalAssets,
    Shareholder,
    Investment,
  },
  data () {
    return {
      tabList: [{
        label: '业绩趋势',
        value: 'Performance',
      },
      {
        label: '组织资产',
        value: 'OrganizationalAssets',
      },
      {
        label: '股东情况',
        value: 'Shareholder',
      },
      {
        label: '投资报告',
        value: 'Investment',
      },
      ],
      activeTab: 'Performance',
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
