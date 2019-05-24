<template>
  <div class="grid-content">
    <IepAppTabsCard :isMore="isMore" :linkName="linkName">
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='User'" v-slot:User>
          <user v-loading="activeTab !=='User'"></user>
        </template>
        <template v-if="activeTab ==='Media'" v-slot:Media>
          <media v-loading="activeTab !=='Media'"></media>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import User from './User'
import Media from './Media'
export default {
  components: {
    User,
    Media,
  },
  data () {
    return {
      isMore:true,
      linkName: '',
      tabList: [{
        label: '用户资料',
        value: 'User',
      }, {
        label: '媒体资源',
        value: 'Media',
      }],
      activeTab: 'User',
    }
  },
}
</script>
<style scoped>
</style>

