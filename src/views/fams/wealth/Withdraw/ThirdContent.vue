<template>
  <div>
    <iep-result type="success" :description="description" :title="title">
      <template slot="action">
        <a-button type="primary" @click="handleBack">返回列表</a-button>
        <a-button @click="handleBack">撤销</a-button>
      </template>
    </iep-result>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '提交成功',
      description: '等待财务审核，财务审核通过后提现资金将被冻结。同时在财务未审核通过前撤销申请。',
    }
  },
  methods: {
    handleBack () {
      this.$emit('on-data')
    },
  },
}
</script>
