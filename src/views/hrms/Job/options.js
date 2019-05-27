
const dictsMap = {
    resumeStatus: {
      0: '待审核', 1: '正常', 2: '不通过',
    },
  }

const columnsMap = [
    {
      prop: 'realName',
      label: '姓名',
    },
    {
      prop: 'resumeName',
      label: '简历名字',
    },
    {
      prop: 'job',
      label: '应聘职位',
    },
    {
      prop: 'updateTime',
      label: '更新时间',
    },
    {
      prop: 'resumeStatus',
      label: '简历状态',
      type: 'dict',
    },
  ]

export{columnsMap, dictsMap}