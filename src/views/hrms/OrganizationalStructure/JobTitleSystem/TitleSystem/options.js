const columnsMap = [
  {
    prop: 'name',
    label: '职称名称',
    width: 280,
  },
  {
    prop: 'description',
    label: '职称说明',
  },
  {
    prop: 'priority',
    label: '优先级',
    width: 280,
  },
]

const initForm = () => {
  return {
    id: '',
    name: '',
    description: '',
    priority: '',
  }
}

const initSearchForm = () => {
  return {
    name: '',
  }
}

export { columnsMap, initForm, initSearchForm }
