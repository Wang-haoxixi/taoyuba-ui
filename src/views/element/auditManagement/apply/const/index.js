import {
  getDic,
  getDept,
} from '@/util/dic'

export const searchOption = [
  {
    label: '状态',
    prop: 'auditState',
    type: 'select',
    data: getDic('APPLY_STATUS'),
  }, {
    label: '部门名称',
    prop: 'deptId',
    type: 'select',
    data: getDept(),
  }, {
    label: '服务中文名称',
    prop: 'nameCn',
  },
]

export const mainTableOption = {
  page: true,
  menu: false,
  index: false,
  header: false,
  selection: false,
  column: [
    {label: '申请方', prop: 'applyName'},
    {label: '联系人姓名', prop: 'lxName'},
    {label: '联系电话', prop: 'lxTel'},
    {label: '联系邮箱', prop: 'lxEmail'},
    {label: '使用范围说明', prop: 'rangeRemark'},
    {label: '状态', prop: 'auditState', type: 'dic', dicData: getDic('APPLY_STATUS')},
    {label: '操作', prop: 'menu', solt: true, width: 100},
  ],
}

export const formOption = {
  option: [
    {
      column: [
        {label: '申请方', prop: 'applyName', span: 24},
        {label: '联系人姓名', prop: 'lxName', span: 24},
        {label: '联系电话', prop: 'lxTel', span: 24},
        {label: '联系邮箱', prop: 'lxEmail', span: 24},
        {label: '使用范围说明', prop: 'rangeRemark', type: 'textarea', span: 24},
      ],
    },
  ],
}