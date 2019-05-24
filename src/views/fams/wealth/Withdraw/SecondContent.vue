<template>
  <steps-content>
    <a-form class="content-wrapper">
      <a-alert :closable="true" type="error" message="确认提现后，财务将对您的提现申请进行审核。" style="margin-bottom: 24px;" />
      <a-form-item label="提现金额：" :labelCol="labelCol" :wrapperCol="wrapperCol" class="stepFormText">
        ￥ {{formatNumber(data.amount)}}
      </a-form-item>
      <a-form-item label="发票抵税：" :labelCol="labelCol" :wrapperCol="wrapperCol" class="stepFormText">
        ￥ {{formatNumber(data.deductionInvoice)}}
      </a-form-item>
    </a-form>
    <template v-slot:action>
      <a-button type="primary" :loading="submitLoading" @click="handleSubmit">
        提交
      </a-button>
      <a-button style="margin-left: 8px" @click="handlePrev">
        上一步
      </a-button>
    </template>
  </steps-content>

</template>
<script>
import StepsContent from './StepsContent'
import { postWithdraw } from '@/api/fams/withdraw'
function formatNumber (value) {
  value += ''
  const list = value.split('.')
  const prefix = list[0].charAt(0) === '-' ? '-' : ''
  let num = prefix ? list[0].slice(1) : list[0]
  let result = ''
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`
}
export default {
  props: ['data'],
  components: { StepsContent },
  data () {
    return {
      labelCol: { lg: { span: 12 }, sm: { span: 12 } },
      wrapperCol: { lg: { span: 12 }, sm: { span: 12 } },
      formLayout: 'horizontal',
      submitLoading: false,
    }
  },
  created () {
  },
  methods: {
    formatNumber,
    handlePrev () {
      this.$emit('prev', this.form)
    },
    async handleSubmit () {
      this.submitLoading = true
      try {
        const { data } = await postWithdraw(this.data)
        if (data.data) {
          this.$emit('on-data', data.data)
        } else {
          this.$message(data.msg)
        }
      } catch (error) {
        this.$message('似乎出现了一些问题')
      }
      this.submitLoading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  max-width: 500px;
  margin: 40px auto 0;
}
</style>
