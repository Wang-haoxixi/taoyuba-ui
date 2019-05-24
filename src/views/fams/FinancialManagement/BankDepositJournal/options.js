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
    prop: 'number',
    label: '序号',
  },
  {
    prop: 'date',
    label: '日期',
  },
  {
    prop: 'abstract',
    label: '摘要',
  },
  // {
  //   prop: 'money',
  //   label: '金额',
  //   children:[
  //     {
  //       prop: 'aaaa',
  //       label: '收入',
  //     },
  //     {
  //       prop: 'bbbb',
  //       label: '支出',
  //     },
  //     {
  //       prop: 'cccc',
  //       label: '本期余额',
  //     },
  //   ],
  // },
  // {
  //   prop: 'departments',
  //   label: '备注',
  // },
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
    company: '',
    cashAccount: '',
    date: '',
  }
}

export { dictsMap, columnsMap, initForm, formToDto, initSearchForm }