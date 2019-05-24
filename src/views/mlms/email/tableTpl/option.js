export const dictsMap = {
  type: {
    1: '类型1',
    2: '类型2',
  },
}

export const tableOption = [
  // {
  //   label: '发件人',
  //   prop: 'sendRealName',
  // },
]

export const reportTableOption = [
  {
    label: '任务名称',
    prop: 'name',
  }, {
    label: '任务说明',
    prop: 'shuoming',
  }, {
    label: '进度',
    prop: 'jindu',
  }, {
    label: '负责人',
    prop: 'fuzeren',
  }, {
    label: '备注',
    prop: 'beizhu',
  },
]

export const initFormData = () => {
  return {
    content: '',
    attachmentRelatios: [],
    projectRelatios: [],
    materialRelatios: [],
    summaryRelatios: [],
  }
}
