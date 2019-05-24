import merge from 'lodash/merge'
var config = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  header: false,
}
export const informationTableProps = merge({
  addBtn: false,
  editBtn: false,
  delBtn: false,
  header: false,
  menuWidth: '180px',
  column: [
    {label:'信息资源名称', prop:'name'},
    {label:'资源提供方', prop:'from'},
    {label:'信息资源格式', prop:'fmtList'},
  ],
}, config)

export let elementTableProps = merge({
  page: false,
  menuWidth: '150px',
  maxHeight: 250,
  selection: true,
  column: [
    {label:'中文名称', prop:'chName'},
    {label:'英文名称', prop:'enName'},
    {label:'数据类型', prop:'dataTypeList', type: 'dic'},
    {label:'数据长度', prop:'dataLength'},
    {label:'共享类型', prop:'sharingModeList', type: 'dic'},
    {label:'开放属性', prop:'isOpen', type: 'dic'},
  ],
}, config)

export const form = {
  id: '',
  name: '',
  resType: '',
  summ: '',
  surveyIdList: [],
  fmtList: [],
  topicType: '',
  areaTypeList: [],
  updCycle: '',
  sharingType: '',
  sharingCond: '',
  sharingModeList: [],
  isOpen: '',
  rescode: '',
  createTime: '',
}
export const elementOption = {
  labelWidth: '140',
  menuBtn: false,
  column: [
    {
      label: '中文名称',
      prop: 'chName',
      span: 24,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
    },
    {
      label: '英文名称',
      prop: 'enName',
      span: 24,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
    },
    {
      label: '数据类型',
      prop: 'dataTypeList',
      span: 24,
      type: 'cascader',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
    },
    {
      label: '字段描述',
      prop: 'description',
      span: 24,
    },
    {
      label: '数据长度',
      prop: 'dataLength',
      span: 24,
      // type: 'number',
    },
    {
      label: '默认值',
      prop: 'defaultValue',
      span: 24,
    },
    {
      label: '对象类型',
      prop: 'objectType',
      span: 24,
      type: 'select',
    },
    {
      label: '是否字典项',
      prop: 'isDict',
      type: 'select',
      span: 24,
    },
    {
      label: '共享类型',
      prop: 'sharingType',
      span: 24,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
    },
    {
      label: '共享条件',
      prop: 'sharingCond',
      span: 24,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
    },
    {
      label: '共享方式',
      prop: 'sharingModeList',
      span: 24,
      type: 'cascader',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
    },
    {
      label: '是否向全社会开放',
      prop: 'isOpen',
      span: 24,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
    },
    {
      label: '更新周期',
      prop: 'updCycle',
      span: 24,
      type: 'select',
    },
    {
      label: '是否主键',
      prop: 'isPk',
      span: 24,
      type: 'select',
    },
    {
      label: '是否为空',
      prop: 'isNull',
      span: 24,
      type: 'select',
    },
  ],
}
