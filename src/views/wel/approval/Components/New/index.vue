<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header :title="`${currentName}单`" :backOption="backOption"></page-header>
      <component :is="currentLabel" :type="applicType"></component>
    </basic-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Positive from './Positive/'
import Leaving from './Leaving/'
import Transfer from './Transfer/'
import Leave from './Leave/'
import Overtime from './Overtime/'
import BusinessTrip from './BusinessTrip/'
import ItemUse from './ItemUse/'
import Reimburse from './Reimburse/'
// hrms_applic_type
const componentMap = {
  转正申请: 'Positive',
  请假申请: 'Leaving',
  调岗申请: 'Transfer',
  离职申请: 'Leave',
  加班申请: 'Overtime',
  出差申请: 'BusinessTrip',
  物品领用申请: 'ItemUse',
  报销申请: 'Reimburse',
}
export default {
  components: {
    Positive,
    Leaving,
    Transfer,
    Leave,
    Overtime,
    BusinessTrip,
    ItemUse,
    Reimburse,
  },
  data () {
    return {
      backOption: {
        isBack: true,
      },
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
    applicType () {
      return this.$route.query.type + ''
    },
    currentName () {
      const hrms_applic_type = this.dictGroup['hrms_applic_type']
      return hrms_applic_type.find(m => m.value === this.applicType).label
    },
    currentLabel () {
      return componentMap[this.currentName]
    },
  },
}
</script>
