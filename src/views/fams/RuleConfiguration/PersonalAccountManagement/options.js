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
    prop: 'ranking',
    label: '排名',
  },
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'departments',
    label: '所属部门',
  },
  {
    prop: 'income',
    label: '收入',
  },
  {
    prop: 'expenditure',
    label: '支出',
  },
  {
    prop: 'balance',
    label: '余额',
  },
  {
    prop: 'status',
    label: '账户状态',
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