const columnsMap = [
  {
    prop: 'name',
    label: '岗位分类名称',
    width: 300,
  },
  {
    prop: 'description',
    label: '分类说明',
  },
]

const initForm = () => {
  return {
    id: '',
    name: '',
    description: '',
  }
}

const initSearchForm = () => {
  return {
    name: '',
  }
}

export { columnsMap, initForm, initSearchForm }
