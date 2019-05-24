<template>
  <steps-content>
    <a-form class="content-wrapper" :form="form">
      <a-form-item label="提现金额：" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-tooltip :trigger="['focus']" placement="topLeft" overlayClassName="numeric-input">
          <span slot="title" v-if="form.amount" class="numeric-input-title">
            {{value !== '-' ? formatNumber(value) : '-'}}
          </span>
          <template slot="title" v-else>
            可提现金额 {{maxAmount}} 元，最低 100
          </template>
          <a-input-number style="width:100%;" :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :parser="value => value.replace(/\￥\s?|(,*)/g, '')" :min="100" :max="maxAmount" maxLength="25" v-decorator="[ 
          'amount', {
          initialValue: 100,
          rules: [{ required: true, message: '请输入提现金额' }]
        }]" placeholder="请输入提现金额" />
        </a-tooltip>
      </a-form-item>
      <a-form-item label="发票抵税：" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-tooltip :trigger="['focus']" placement="topLeft" overlayClassName="numeric-input">
          <template slot="title">
            可发票抵税 {{maxDeductionInvoice}} 元
          </template>
          <a-input-number style="width:100%;" :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :parser="value => value.replace(/\￥\s?|(,*)/g, '')" :min="0" :max="maxDeductionInvoice" maxLength="25" v-decorator="[
          'deductionInvoice', {
          initialValue: 0,
        }]" placeholder="请输入发票抵税" />
        </a-tooltip>
      </a-form-item>
    </a-form>
    <template v-slot:action>
      <a-button type="primary" @click="handleSubmit">
        下一步
      </a-button>
    </template>
  </steps-content>

</template>
<script>
import StepsContent from './StepsContent'
import { getTotal } from '@/api/fams/total'
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
  components: { StepsContent },
  data () {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      maxAmount: 0,
      maxDeductionInvoice: 0,
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
    }
  },
  created () {
    this.loadTotal()
  },
  methods: {
    async loadTotal () {
      const { data } = await getTotal()
      this.maxAmount = data.data.withdrawableCash
      this.maxDeductionInvoice = data.data.withInvoice
    },
    formatNumber,
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.amount < 100) {
            return
          }
          this.$emit('on-data', values)
        }
      })
    },
  },
}
</script>
<style scoped>
/* to prevent the arrow overflow the popup container,
or the height is not enough when content is empty */
.numeric-input >>> .ant-tooltip-inner {
  min-width: 32px;
  min-height: 37px;
}

.numeric-input >>> .numeric-input-title {
  font-size: 14px;
}
</style>

<style lang="scss" scoped>
.content-wrapper {
  width: 60%;
}
</style>
