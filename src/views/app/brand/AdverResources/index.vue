<template>
  <div class="leaderBoard">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Advert'" v-slot:Advert>
          <advert v-loading="activeTab !=='Advert'"></advert>
        </template>
        <template v-if="activeTab ==='Media'" v-slot:Media>
          <media v-loading="activeTab !=='Media'"></media>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Advert from './Advert'
import Media from './Media'
export default {
  components: {
    Advert,
    Media,
  },
  data () {
    return {
      tabList: [{
        label: '广告资源',
        value: 'Advert',
      }, {
        label: '媒体资源',
        value: 'Media',
      }],
      activeTab: 'Advert',
    }
  },
}
</script>
<style scoped>
</style>

