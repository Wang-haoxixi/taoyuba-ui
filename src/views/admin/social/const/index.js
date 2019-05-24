import {getDic} from '@/util/dic'
export const tableOption = {
  align: 'center',
  editBtn: false,
  delBtn: false,
  addBtn: false,
  header: false,
  menuWidth: '180px',
  column: [
    {label:'类型', prop:'type', type: 'dic', dicData: getDic('SOCIAL_TYPE')},
    {label:'描述', prop:'remark'},
    {label:'appId', prop:'appId'},
    {label:'appSecret', prop:'appSecret'},
    {label:'回调地址', prop:'redirectUrl'},
    {label:'创建时间', prop:'createTime'},
  ],
}
let updateSpan = 24
// 编辑参数
export let updateProps = {
  labelWidth: '150',
  menuBtn: false,
  column: [
    {
      label: 'id',
      prop: 'id',
      span: updateSpan,
      disabled: true,
    },
    {
      label: '类型',
      prop: 'type',
      span: updateSpan,
      type: 'select',
      dicData: getDic('SOCIAL_TYPE'),
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
    },
    {
      label: '描述',
      prop: 'remark',
      span: updateSpan,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
    },
    {
      label: 'appId',
      prop: 'appId',
      span: updateSpan,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
    },
    {
      label: 'appSecret',
      prop: 'appSecret',
      span: updateSpan,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
    },
    {
      label: '回调地址',
      prop: 'redirectUrl',
      span: updateSpan,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
    },
    {
      label: '创建时间',
      prop: 'createTime',
      span: updateSpan,
      disabled: true,
    },
  ],
}

export const form = {
  id: '',
  type: '',
  remark: '',
  appId: '',
  appSecret: '',
  redirectUrl: '',
  createTime: '',
}
