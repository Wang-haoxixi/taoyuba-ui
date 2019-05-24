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
    prop: 'intro',
    label: '联盟描述',
  },
  // {
  //   prop: 'isOpen',
  //   label: '允许加入',
  //   type: 'dict',
  // },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
  {
    prop: 'createTime',
    label: '创建时间',
    minWidth: 120,
  },
]

const checkboxInit = (row) => {
  if (row.status === 0)
    return 0 //不可勾选
  else
    return 1 //可勾选
}


export { dictsMap, columnsMap, checkboxInit }