export const dictsMap = {
  type: {
    1: '类型1',
    2: '类型2',
  },
}

export const tableOption = {
  props: [
    { label: '分类名称', prop: 'levelName', slot: true },
    { label: '优先级', prop: 'sort', slot: true },
    { label: '编码', prop: 'number', slot: true },
    { label: '创建时间', prop: 'createTime', slot: true },
    { label: '操作', prop: 'menu', slot: true },
  ],
}

export const initFormData = () => {
  return {
    parentId: 0,
    levelName: '',
    sort: '',
    number: '',
  }
}

export const rules = {
  name: [
    { required: true, message: '请输入组织名称', trigger: 'blur' },
  ],
}
