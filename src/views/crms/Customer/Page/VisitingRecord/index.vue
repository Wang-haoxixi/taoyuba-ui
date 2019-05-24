<template>
  <div>
    <keep-alive>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='visit'" v-slot:visit>
          <visit :record="record" v-loading="activeTab !=='visit'" @async="async"></visit>
        </template>
        <template v-if="activeTab ==='contact'" v-slot:contact>
          <contact :record="record" v-loading="activeTab !=='contact'" @async="async"></contact>
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
        label: '拜访日志',
        value: 'visit',
      }, {
        label: '联系记录',
        value: 'contact',
      }],
    }
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  created () {
  },
  methods: {
    async () {
      this.$emit('load-page')
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
  },

}
</script>