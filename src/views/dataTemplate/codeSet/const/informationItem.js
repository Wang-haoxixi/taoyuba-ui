// import { tableOptions} from '@/config/avueBase'
// import merge from 'lodash'
// 信息项
export const tableOption = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  header: false,
  selection: false,
  menuWidth: '180',
  indexLabel: '序号',
  index: false,
  align: 'center',
  page:false,
  border: false,
  height: '300',
  column: [
    { label: '代码名称', prop: 'cdNm' },
    { label: '代码', prop: 'cd' },
    // { label: '说明', prop: 'desc' },
  ],
}

const column = [
  {
    label: '代码名称',
    prop: 'cdNm',
    span: 24,
    maxlength: 50,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'blur',
    }],
  },
  {
    label: '代码',
    prop: 'cd',
    maxlength: 10,
    span: 24,
  },
  {
    label: '说明',
    prop: 'desc',
    maxlength: 200,
    span: 24,
  },
]

export let editOption = {
  menuBtn: false,
  labelWidth: 100,
  column,
}

export const detailOption = {
  option: [
    {
      column,
    },
  ],
}

export const form = {
  id: '',
  cdNm: '',
  cd: '',
  desc: '',
}
