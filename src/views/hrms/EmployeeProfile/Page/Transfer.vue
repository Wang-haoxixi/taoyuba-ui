<template>
  <inline-form-table-transfer :table-data="value.transfer" :columns="transferColumns" requestName="transfer" type="employee_profile" :rid="value.id" @load-page="handleSave"></inline-form-table-transfer>
  <!-- <inline-form-table-detail :data="value.transfer" :columns="transferColumns"></inline-form-table-detail> -->
</template>
<script>
import InlineFormTableTransfer from '@/views/hrms/Components/InlineFormTable/transfer'
// import InlineFormTableDetail from '@/views/hrms/Components/InlineFormTable/detail'
import { transferColumns } from '@/views/hrms/Components/options'
export default {
  components: { InlineFormTableTransfer },
  props: ['value'],
  data () {
    return {
      transferColumns,
    }
  },
  methods: {
    handleSave () {
      this.$emit('on-save')
    },
  },
}
</script>
