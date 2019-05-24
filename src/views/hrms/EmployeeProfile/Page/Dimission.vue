<template>
  <!-- <inline-form-table :table-data="value.dimission" :columns="dimissionColumns" requestName="dimission" type="employee_profile" :rid="value.id" @load-page="handleSave"></inline-form-table> -->
  <inline-form-table-detail :data="value.dimission" :columns="dimissionColumns"></inline-form-table-detail>
</template>
<script>
// import InlineFormTable from '@/views/hrms/Components/InlineFormTable/'
import InlineFormTableDetail from '@/views/hrms/Components/InlineFormTable/detail'
import { dimissionColumns } from '@/views/hrms/Components/options'
export default {
  components: { InlineFormTableDetail },
  props: ['value'],
  data () {
    return {
      dimissionColumns,
    }
  },
  methods: {
    handleSave () {
      this.$emit('on-save')
    },
  },
}
</script>
