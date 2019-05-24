<template>
  <inline-form-table :table-data="value.welfare" :columns="welfareColumns" requestName="welfare" type="employee_profile" :rid="value.id" @load-page="handleSave"></inline-form-table>
</template>
<script>
import InlineFormTable from '@/views/hrms/Components/InlineFormTable/'
import { welfareColumns} from '@/views/hrms/Components/options'
export default {
  components: {InlineFormTable},
  props: ['value'],
  data () {
    return {
      welfareColumns,
    }
  },
  methods: {
    handleSave () {
      this.$emit('on-save')
    },
  },
}
</script>
