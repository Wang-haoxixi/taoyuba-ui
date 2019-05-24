<template>
  <inline-form-table :table-data="value.laborContract" :columns="laborContractColumns" requestName="labor_contract" type="employee_profile" :rid="value.id" @load-page="handleSave"></inline-form-table>
</template>
<script>
import InlineFormTable from '@/views/hrms/Components/InlineFormTable/'
import { laborContractColumns} from '@/views/hrms/Components/options'
export default {
  components: {InlineFormTable},
  props: ['value'],
  data () {
    return {
      laborContractColumns,
    }
  },
  methods: {
    handleSave () {
      this.$emit('on-save')
    },
  },
}
</script>
