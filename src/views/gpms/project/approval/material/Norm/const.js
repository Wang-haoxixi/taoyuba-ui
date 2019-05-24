export const columnsMap = [
  {
    prop: 'name',
    label: '联系人名称',
  },
  {
    prop: 'zhiwu',
    label: '联系人职务',
  },
  {
    prop: 'duiying',
    label: '对应客户',
  },
]

export const initForm = () => {
  return {
    name: '',
    isOpen: false,
    intro: '',
  }
}