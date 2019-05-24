import { mergeByFirst } from '@/util/util'
// org config options
const dictsMap = {
  status: {
    0: '审核通过',
    1: '待审核',
    2: '审核驳回',
  },
}

const columnsMap = [
  {
    prop: 'ruler',
    label: '规则名称',
  },
  {
    prop: 'action',
    label: '动作',
  },
  {
    prop: 'attribute',
    label: '属性',
  },
  {
    prop: 'govValue',
    label: '国脉贝值',
  },
  {
    prop: 'govUpper',
    label: '上限国脉贝',
  },
  {
    prop: 'accumulatedApply',
    label: '累计支出',
  },
]

const initForm = () => {
  return {
    isOpen: false,
    intro: '',
  }
}

const initDtoForm = () => {
  return {
    isOpen: false,
    intro: '',
  }
}

const formToDto = (row) => {
  const newForm = mergeByFirst(initDtoForm(), row)
  newForm.positionId = row.position[row.position.length - 1]
  newForm.deptId = row.dept[row.dept.length - 1]
  return newForm
}

const initSearchForm = () => {
  return {
    keyword: '',
    applyTime: '',
    sendTime: '',
    sum1: '',
    sum2: '',
    type: '',
    name: '',
    status: '',
    seller: '',
  }
}

export { dictsMap, columnsMap, initForm, formToDto, initSearchForm }