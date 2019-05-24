<template>
  <div>
    <basic-container>
      <page-header title="其他应收款"></page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Bond'" v-slot:Bond>
          <bond v-loading="activeTab !=='Bond'"></bond>
        </template>
        <template v-if="activeTab ==='Rent'" v-slot:Rent>
          <rent v-loading="activeTab !=='Rent'"></rent>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import Bond from './Bond/'
import Rent from './Rent/'
export default {
  components: { Bond, Rent },
  data () {
    return {
      // replaceText: (data) => `（本周新增${data[0]}条招聘信息，收到${data[1]}份简历）`,
      tabList: [{
        label: '保证金',
        value: 'Bond',
      }, {
        label: '房租押金',
        value: 'Rent',
      }],
      activeTab: 'Bond',
    }
  },
}
</script>
