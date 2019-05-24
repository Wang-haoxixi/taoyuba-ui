<template>
  <div class="ranking">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Search'" v-slot:Search>
          <search v-loading="activeTab !=='Search'"></search>
        </template>
        <template v-if="activeTab ==='Contribution'" v-slot:Contribution>
          <contribution v-loading="activeTab !=='Contribution'"></contribution>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Search from './Search'
import Contribution from './Contribution'
export default {
  components: {
    Search,
    Contribution,
  },
  data () {
    return {
      tabList: [{
        label: '热搜榜',
        value: 'Search',
      }, {
        label: '贡献达人',
        value: 'Contribution',
      }],
      activeTab: 'Search',
    }
  },
}
</script>
<style lang="scss" scoped>
.el-card{
  border:0;
}
</style>

