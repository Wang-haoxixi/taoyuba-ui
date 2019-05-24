<template>
  <div>
    <keep-alive>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='visit'" v-slot:visit>
          <visit v-loading="activeTab !=='visit'"></visit>
        </template>
        <template v-if="activeTab ==='contact'" v-slot:contact>
          <contact v-loading="activeTab !=='contact'"></contact>
        </template>
      </iep-tabs>
    </keep-alive>
  </div>
</template>

<script>
import Visit from './Visit'
import Contact from './Contact'
export default {
  name: 'contract',
  components: { Visit, Contact },
  data () {
    return {
      activeTab: 'visit',
      tabList: [{
        label: '拜访记录',
        value: 'visit',
      }, {
        label: '拜访日志',
        value: 'contact',
      }],
    }
  },
}
</script>