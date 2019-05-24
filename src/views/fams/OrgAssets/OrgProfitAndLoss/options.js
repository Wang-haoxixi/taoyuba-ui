const dictsMap = {
  status: {
  },
}

const columnsMap = [
  {
    prop: 'month',
    label: '月份',
  },
  {
    prop: 'contractSigning',
    label: '合同签订',
  },
  {
    prop: 'departmentalIncome',
    label: '部门收入',
  },
  {
    prop: 'departmentalApply',
    label: '部门支出',
  },
  {
    prop: 'operatingProfit',
    label: '营业利润',
  },
  {
    prop: 'netProfit',
    label: '净利润',
  },
]

const initForm = () => {
  return {
    region:'',
    'amount': 0,
    'deductionInvoice': 0,
  }
}


export { columnsMap, dictsMap, initForm }