import {
  getDic,
  getDept,
} from '@/util/dic'

export const searchOption = [
  {
    label: '信息资源名称',
    prop: 'name',
  }, {
    label: '信息资源提供方',
    prop: 'deptId',
    type: 'select',
    data: getDept(),
  }, {
    label: '重点领域分类',
    prop: 'areaType',
    type: 'select',
    data: getDic('AREA_TYPE'),
  },
]

export const mainTableOption = {
  page: true,
  menu: false,
  index: false,
  header: false,
  selection: false,
  column: [
    {label: '信息资源名称', prop: 'name'},
    {label: '信息资源提供方', prop: 'deptId', type: 'dic', dicData: getDept()},
    {label: '信息资源格式', prop: 'fmtList', type: 'cascader', dicData: getDic('FMT')},
    {label: '重点领域分类', prop: 'areaTypeList', type: 'dic', dicData: getDic('AREA_TYPE')},
    {label: '目录状态', prop: 'status', type: 'dic', dicData: getDic('INFORMATION_STATUS')},
    {label: '归集状态', prop: 'collectStatus', type: 'dic', dicData: getDic('COLLECT_STATUS')},
    {label: '操作', prop: 'menu', solt: true, width: 200},
  ],
}

export const tableOption = {
  page: false,
  menu: false,
  index: false,
  header: false,
  selection: false,
  column: [
    {label:'中文名称', prop:'chName'},
    {label:'英文名称', prop:'enName'},
    {label:'数据类型', prop:'dataTypeList', type: 'cascader', dicData: getDic('DATA_TYPE')},
    {label:'数据长度', prop:'dataLength'},
    {label:'共享类型', prop:'sharingType', type: 'dic', dicData: getDic('SHARING_TYPE')},
    {label:'开放属性', prop:'isOpen', type: 'dic', dicData: getDic('IS_NOT')},
    {label: '操作', prop: 'menu', solt: true, width: 100},
  ],
}

export const infoDetailOption = {
  option: [
    {
      column: [
        {label: '中文名称', prop: 'chName', span: 12 },
        {label: '英文名称', prop: 'enName', span: 12 },
        {label: '数据类型', prop: 'dataTypeList', type: 'cascader', dicData: getDic('ELEMENT_DATA_TYPE'), span: 12 },
        {label: '字段描述', prop: 'description', span: 12 },
        {label: '数据长度', prop: 'dataLength', span: 12 },
        {label: '默认值', prop: 'defaultValue', span: 12 },
        {label: '对象类型', prop: 'objectType', type: 'select', dicData: getDic('OBJECT_TYPE'), span: 12 },
        {label: '来源部门', prop: 'deptIdForShow', span: 12 },
        {label: '是否字典项', prop: 'isDict', type: 'select', dicData: getDic('IS_NOT'), span: 12 },
        {label: '共享类型', prop: 'sharingType', type: 'select', dicData: getDic('SHARING_TYPE'), span: 12 },
        {label: '共享条件', prop: 'sharingCond', span: 12 },
        {label: '共享方式', prop: 'sharingModeList', type: 'cascader', dicData: getDic('SHARING_MODE'), span: 12 },
        {label: '是否向全社会开放', prop: 'isOpen', type: 'select', dicData: getDic('IS_NOT'), span: 12 },
        {label: '开放条件', prop: 'openCond', span: 12 },
        {label: '更新周期', prop: 'updCycle', type: 'select', dicData: getDic('UPD_CYCLE'), span: 12 },
        {label: '是否主键', prop: 'isPk', type: 'select', dicData: getDic('IS_NOT'), span: 12 },
        {label: '是否为空', prop: 'isNull', type: 'select', dicData: getDic('IS_NOT'), span: 12 },
      ],
    },
  ],
}