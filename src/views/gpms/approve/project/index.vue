<template>
  <div>

    <iep-tabs v-model="tabName" :tab-list="tabList">
      <template v-if="tabName ==='allTab'" v-slot:allTab>
        <tablePage ref="page" :status="'0'" @approve="handleApprove"></tablePage>
      </template>
      <template v-if="tabName ==='PendingTab'" v-slot:PendingTab>
        <tablePage ref="page" :status="'2'" @approve="handleApprove"></tablePage>
      </template>
      <template v-if="tabName ==='approvalTab'" v-slot:approvalTab>
        <tablePage ref="page" :status="'3'" @approve="handleApprove"></tablePage>
      </template>
      <template v-if="tabName ==='failureTab'" v-slot:failureTab>
        <tablePage ref="page" :status="'4'" @approve="handleApprove"></tablePage>
      </template>
    </iep-tabs>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import tablePage from './tablePage/'

export default {
  mixins: [mixins],
  name: 'index',
  components: { tablePage },
  data () {
    return {
      tabName: 'allTab',
      tabList: [
        {
          label: '全部',
          value: 'allTab',
        }, {
          label: '待审批',
          value: 'PendingTab',
        }, {
          label: '审批通过',
          value: 'approvalTab',
        }, {
          label: '审批不通过',
          value: 'failureTab',
        },
      ],
      formData: {},
      selectIndex: 1,
    }
  },
  methods: {
    handleApprove (row) {
      this.$emit('handleApprove', row)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>