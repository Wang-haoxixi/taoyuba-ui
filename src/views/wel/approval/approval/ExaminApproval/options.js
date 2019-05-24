import { mergeByFirst } from '@/util/util'

const dictsMap = {
  status: {
    0: '待审核',
    1: '审核通过',
    2: '审核不通过',
  },
}

const columnsMap = [
  {
    prop: 'applyType',
    label: '申请类型',
  },
  {
    prop: 'applyStartTime',
    label: '发起时间',
  },
]

const initForm = () => {
  return {
    name: '',
    isOpen: false,
    intro: '',
  }
}

const initSearchForm = () => {
  return {
    name: '',
    sex: '',
  }
}

const initDeliverForm = () => {
  return {
    ids: [],
    user: {
      id: null,
      name: null,
    },
  }
}
const dtoDeliverForm = () => {
  return {
    ids: [],
    userId: null,
  }
}

const toDeliverForm = (row) => {
  const newForm = mergeByFirst(dtoDeliverForm(), row)
  newForm.userId = row.user.id
  return newForm
}

export { dictsMap, columnsMap, initForm, initSearchForm, initDeliverForm, dtoDeliverForm, toDeliverForm }