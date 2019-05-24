export const dictsMap = {
  type: {
    1: '类型1',
    2: '类型2',
  },
}

export const tableOption = [
  {
    label: '创建人',
    prop: 'create',
  }, {
    label: '创建时间',
    prop: 'date',
  },
]

export const workListTable = [
  {
    label: '分类',
    prop: 'fenlei',
  }, {
    label: '名称',
    prop: 'mingchen',
  }, {
    label: '进度',
    prop: 'jindu',
  }, {
    label: '开始时间',
    prop: 'kaishishijian',
  }, {
    label: '完成时间（计划）',
    prop: 'wanchengshijian',
  }, {
    label: '负责人',
    prop: 'fuzeren',
  }, {
    label: '说明',
    prop: 'shuming',
  },
]

export const initFormData = () => {
  return {
    id: '',
    name: '',
  }
}

export const rules = {
  name: [
    { required: true, message: '请输入组织名称', trigger: 'blur' },
  ],
}
