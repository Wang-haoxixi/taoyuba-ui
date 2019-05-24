<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header :title="`${currentName}单`" :backOption="backOption"></page-header>
      <component :is="currentLabel" :type="applicType" :form="form" @load-page="loadPage"></component>
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
// import ItemUse from './ItemUse/'
// import Reimburse from './Reimburse/'
import { getAdministrativeApprovalById } from '@/api/hrms/administrative_approval'
import { initForm } from './options'
// hrms_applic_type
const componentMap = {
  转正申请: 'Positive',
  请假申请: 'Leaving',
  调岗申请: 'Transfer',
  离职申请: 'Leave',
  加班申请: 'Overtime',
  出差申请: 'BusinessTrip',
  // 物品领用申请: 'ItemUse',
  // 报销申请: 'Reimburse',
}
export default {
  components: {
    Positive,
    Leaving,
    Transfer,
    Leave,
    Overtime,
    BusinessTrip,
    // ItemUse,
    // Reimburse,
  },
  data () {
    return {
      backOption: {
        isBack: true,
      },
      form: initForm(),
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
    id () {
      return +this.$route.params.id
    },
    currentName () {
      return this.dictGroup['hrms_applic_type'].find(m => m.value === this.applicType).label
    },
    currentLabel () {
      return componentMap[this.currentName]
    },
    applicType () {
      return this.form.type + ''
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getAdministrativeApprovalById(this.id).then(({ data }) => {
        this.form = data.data
      })
    },
  },
}
</script>
