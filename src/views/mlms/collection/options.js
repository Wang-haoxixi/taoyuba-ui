// import { mergeByFirst } from '@/util/util'
const dictsMap = {
}

const rules = {
  name: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
}

const initFormData = () => {
  return {
    name: '',
  }
}

const columnsMap = [
  {
    prop: 'addFavouriteTime',
    label: '收藏时间',
    width: '250',
  },
]

const initSearchForm = () => {
  return {
    name: '',
  }
}

export { dictsMap, columnsMap, initSearchForm, rules, initFormData }