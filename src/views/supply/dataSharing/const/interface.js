import {
  getDic,
} from '@/util/dic'
export const tableOption = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  header: false,
  menu: false,
  selection: false,
  menuWidth: '180',
  indexLabel: '序号',
  index: false,
  align: 'center',
  page:false,
  border: false,
  height: '300',
  column: [
    {
      label: '接口名称',
      prop: 'nameCn',
      span: 24,
      maxlength: 50,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'blur',
      }],
    },
    {
      label: '接入类型',
      prop: 'linkType',
      type: 'dic',
      dicData: getDic('ELEMENT_ACCESS_TYPE'),
    },
    {
      label: '操作',
      prop: 'menu',
      span: 24,
      solt: true,
      maxlength: 50,
    },
  ],
}
export const tableOptionChild = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  header: false,
  menu: false,
  selection: true,
  menuWidth: '180',
  indexLabel: '序号',
  index: false,
  align: 'center',
  border: false,
  height: '300',
  column: [
    {
      label: '接口名称',
      prop: 'nameCn',
      span: 24,
      maxlength: 50,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'blur',
      }],
    },
    {
      label: '接入类型',
      prop: 'linkType',
      type: 'dic',
      dicData: getDic('ELEMENT_ACCESS_TYPE'),
    },
  ],
}
