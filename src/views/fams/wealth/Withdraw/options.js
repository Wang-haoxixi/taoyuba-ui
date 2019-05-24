import { mergeByFirst } from '@/util/util'

const dictsMap = {
  status: {
    '0': '待审',
    '1': '待发放',
    '2': '已发放',
    '3': '提现失败',
    '4': '提现失败',
  },
}

const columnsMap = [
  {
    prop: 'amount',
    label: '提现金额',
  },
  {
    prop: 'deductionInvoice',
    label: '发票抵扣金额',
  },
  {
    prop: 'taxation',
    label: '税费',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
  {
    prop: 'auditorName',
    label: '审核人',
  },
  {
    prop: 'createTime',
    label: '申请日期',
  },
  {
    prop: 'auditingTime',
    label: '审核日期',
  },
  {
    prop: 'grantTime',
    label: '发放日期',
  },
  {
    prop: 'remarks',
    label: '备注',
  },
]

const initForm = () => {
  return {
    'amount': 0,
    'deductionInvoice': 0,
  }
}

const formToDto = (form) => {
  const newForm = mergeByFirst(initForm(), form)
  newForm.positionId = form.position[form.position.length - 1]
  return newForm
}

const initSearchForm = () => {
  return {
  }
}

export { columnsMap, dictsMap, initForm, initSearchForm, formToDto }