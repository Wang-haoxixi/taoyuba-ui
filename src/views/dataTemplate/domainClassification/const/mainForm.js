import {getDept} from '@/util/dic'

const deptData = getDept()

let column =  [
    {
      label: '领域编码',
      prop: 'dmnSerNo',
      span: 24,
      maxlength: 10,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'blur',
      }],
    },
    {
      label: '领域名称',
      prop: 'dmnClsNm',
      maxlength: 10,
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'blur',
      }],
    },
    {
      label: '关联组织机构',
      prop: 'rltOrgIdList',
      span: 24,
      type: 'select',
      multiple: true,
      dicData: deptData,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'change',
      }],
    },
]

export let detailOption = {
  option: [
    {
      column,
    },
  ],
}

export let editOption = {
  menuBtn: false,
  labelWidth: '180',
  labelPosition: 'right',
  column,
}

export const tableOption = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  header: false,
  selection: true,
  menuWidth: '180px',
  indexLabel: '序号',
  index: false,
  align: 'center',
  border: false,
  column: [
    { label: '领域编码', prop: 'dmnSerNo' },
    { label: '领域名称', prop: 'dmnClsNm' },
    { label: '关联组织机构', prop: 'rltOrgIdList', type: 'dic', dicData: deptData },
  ],
}

export let searchOption = [
  { label: '领域名称', prop: 'dmnClsNm', type: 'input', placeholder: '请输入领域名称' },
  { label: '关联组织机构', prop: 'rltOrgId', type: 'select', placeholder: '请输入关联组织机构名称', data: deptData },
]

export const form = {
  id: '',
  dmnSerNo: '',
  dmnClsNm: '',
  rltOrgIdList: [],
}
