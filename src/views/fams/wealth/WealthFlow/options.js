import { mergeByFirst } from '@/util/util'
const dictsMap = {
  type: {
    'L': '支出',
    'A': '收入',
  },
}
const columnsMap = [
  {
    prop: 'type',
    label: '分类',
    type: 'dict',
  },
  {
    prop: 'amount',
    label: '金额',
  },
  {
    prop: 'currentAmount',
    label: '当前金额',
  },
  {
    prop: 'time',
    label: '日期',
  },
  {
    prop: 'remarks',
    label: '备注',
    minWidth: '400',
  },
]

const initSearchForm = () => {
  return {
    name: null, // 流水
    type: null, // 分类ID
    rangeTime: null, // 日期
    rangeAmount: null, // 金额
  }
}
const initDtoSearchForm = () => {
  return {
    name: '', // 流水
    type: null, // 分类ID
    startTime: null, // 日期
    endTime: null, // 日期
    minAmount: null, // 金额
    maxAmount: null, // 金额
  }
}
const toDtoSearchForm = (row) => {
  const newForm = mergeByFirst(initDtoSearchForm(), row)
  if (row.rangeTime) {
    newForm.startTime = row.rangeTime[0]
    newForm.endTime = row.rangeTime[1]
  }
  if (row.rangeAmount) {
    newForm.minAmount = row.rangeAmount[0]
    newForm.maxAmount = row.rangeAmount[1]
  }
  return newForm
}
export { columnsMap, initSearchForm, initDtoSearchForm, toDtoSearchForm, dictsMap }