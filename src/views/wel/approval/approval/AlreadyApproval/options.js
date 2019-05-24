// org config options
const dictsMap = {
  status: {
    0: '待审核',
    1: '审核通过',
    2: '审核不通过',
    3: '转交',
  },
}

const columnsMap = [
  {
    prop: 'applyType',
    label: '申请类型',
  },
  {
    prop: 'applyStartTime',
    label: '发起时间',
  },
  {
    prop: 'applyEndTime',
    label: '审批时间',
  },
  {
    prop: 'approverName',
    label: '审核人',
  },
  {
    prop: 'status',
    label: '审批结果',
    type: 'dict',
  },
]

const initForm = () => {
  return {
    name: '',
    isOpen: false,
    intro: '',
  }
}

const initSearchForm = () => {
  return {
    name: '',
    sex: '',
  }
}

export { dictsMap, columnsMap, initForm, initSearchForm }