const dictsMap = {
  status: {
    0: '正常',
    1: '待审核',
    2: '锁定',
    3: '待配置',
  },
}

const columnsMap = [
  {
    prop: 'title',
    label: '标题',
    width: 400,
  },
  {
    prop: 'publisher',
    label: '发布人',
  },
  {
    prop: 'releaseTime',
    label: '发布时间',
  },
  {
    prop: 'priority',
    label: '优先级',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
]

const initForm = () => {
  return {
    id: '',
    title: '',
    publisher: '',
    releaseTime: '',
    priority: '',
    status: '',
  }
}


export { dictsMap, columnsMap, initForm }
