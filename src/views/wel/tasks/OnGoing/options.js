// org config options
const dictsMap = {
  taskStatus: {
    0: '接收任务',
    1: '进行中',
    2: '已完成',
  },
}

const columnsMap = [
  {
    prop: 'taskDate',
    label: '日期',
  },
  {
    prop: 'taskName',
    label: '任务名称',
  },
  {
    prop: 'taskStatus',
    label: '状态',
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