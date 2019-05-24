// org config options
const dictsMap = {
  isOpen: {
    0: '开',
    1: '关',
  },
  status: {
    0: '审核通过',
    1: '待审核',
    2: '审核驳回',
  },
}

const columnsMap = [
  {
    prop: '培训老师',
    label: '培训老师',
  },
  {
    prop: '培训主题',
    label: '培训主题',
  },
  {
    prop: '培训时间',
    label: '培训时间',
    width: 300,
  },
  {
    prop: '培训类型',
    label: '培训类型',
  },
  {
    prop: '培训方式',
    label: '培训方式',
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
    teacher: '',
    type: '',
    date: '',
  }
}

export { dictsMap, columnsMap, initForm, initSearchForm }
