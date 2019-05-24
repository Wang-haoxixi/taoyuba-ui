// import mergeWith from 'lodash/mergeWith'
import {getDic} from '@/util/dic'

// 信息项table 参数
// export let elementTableProps = mergeWith({
//   page: false,
//   menuWidth: '150px',
//   maxHeight: 250,
//   selection: true,
//   column: [
//     {label:'中文名称', prop:'chName'},
//     {label:'英文名称', prop:'enName'},
//     {label:'数据类型', prop:'dataTypeList', type: 'dic', dicData: getDic('DATA_TYPE')},
//     {label:'数据长度', prop:'dataLength'},
//     {label:'共享类型', prop:'sharingType', type: 'dic', dicData: getDic('SHARING_TYPE')},
//     {label:'开放属性', prop:'isOpen', type: 'dic', dicData: getDic('IS_NOT')},
//   ],
// }, config)

export const elementTableProps = {
  page: false,
  menu: false,
  header: false,
  selection: false,
  column: [
    {label:'中文名称', prop:'chName'},
    {label:'英文名称', prop:'enName'},
    // {label:'数据类型', prop:'dataTypeList', type: 'dic', dicData: getDic('DATA_TYPE')},
    {label:'数据长度', prop:'dataLength'},
    {label:'共享类型', prop:'sharingTypeList', type: 'dic', dicData: getDic('SHARING_TYPE')},
    {label:'开放属性', prop:'isOpen', type: 'dic', dicData: getDic('IS_NOT')},
    {label:'菜单', prop:'menu', solt: true},
  ],
}

const updateSpan = 24
const detailSpan = 24
// 详情参数
export let elementDetailProps = {
  option: [
    {
      column: [
        {
          label: '中文名称',
          prop: 'chName',
          span: detailSpan,
          // labelWidth: '200',
        },
        {
          label: '英文名称',
          prop: 'enName',
          span: detailSpan,
        },
        {
          label: '数据类型',
          prop: 'dataTypeList',
          span: detailSpan,
          type: 'dic',
          dicData: getDic('DATA_TYPE'),
        },
        {
          label: '字段描述',
          prop: 'description',
          span: detailSpan,
        },
        {
          label: '数据长度',
          prop: 'dataLength',
          span: detailSpan,
        },
        {
          label: '默认值',
          prop: 'defaultValue',
          span: detailSpan,
        },
        {
          label: '对象类型',
          prop: 'objectType',
          span: detailSpan,
          type: 'dic',
          dicData: getDic('OBJECT_TYPE'),
        },
        {
          label: '来源部门',
          prop: 'deptIdForShow',
          span: detailSpan,
        },
        {
          label: '是否字典项',
          prop: 'isDict',
          span: detailSpan,
          type: 'dic',
          dicData: getDic('IS_NOT'),
        },
        {
          label: '共享类型',
          prop: 'sharingType',
          span: detailSpan,
          type: 'dic',
          dicData: getDic('SHARING_TYPE'),
        },
        {
          label: '共享条件',
          prop: 'sharingCond',
          span: detailSpan,
        },
        {
          label: '共享方式',
          prop: 'sharingModeList',
          span: detailSpan,
          type: 'dic',
          dicData: getDic('SHARING_MODE'),
        },
        {
          label: '是否向全社会开放',
          prop: 'isOpen',
          span: detailSpan,
          type: 'dic',
          dicData: getDic('IS_NOT'),
        },
        {
          label: '开放条件',
          prop: 'openCond',
          span: updateSpan,
          visdiplay: false,
        },
        {
          label: '更新周期',
          prop: 'updCycle',
          span: detailSpan,
          type: 'dic',
          dicData: getDic('UPD_CYCLE'),
        },
        {
          label: '是否主键',
          prop: 'isPk',
          span: detailSpan,
          type: 'dic',
          dicData: getDic('IS_NOT'),
        },
        {
          label: '是否为空',
          prop: 'isNull',
          span: detailSpan,
          type: 'dic',
          dicData: getDic('IS_NOT'),
        },
      ],
    },
  ],
}

// 编辑参数
export let elementUpdateProps = {
  labelWidth: '140',
  menuBtn: false,
  column: [
    {
      label: '中文名称',
      prop: 'chName',
      span: updateSpan,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      maxlength: 100,
    },
    {
      label: '英文名称',
      prop: 'enName',
      span: updateSpan,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      maxlength: 100,
    },
    {
      label: '数据类型',
      prop: 'dataTypeList',
      span: updateSpan,
      type: 'cascader',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('DATA_TYPE'),
    },
    {
      label: '字段描述',
      prop: 'description',
      span: updateSpan,
      maxlength: 100,
    },
    {
      label: '数据长度',
      prop: 'dataLength',
      span: updateSpan,
      // type: 'number',
      maxlength: 100,
    },
    {
      label: '默认值',
      prop: 'defaultValue',
      span: updateSpan,
      maxlength: 100,
    },
    {
      label: '对象类型',
      prop: 'objectType',
      span: updateSpan,
      type: 'select',
      dicData: getDic('OBJECT_TYPE'),
    },
    {
      label: '是否字典项',
      prop: 'isDict',
      type: 'select',
      span: updateSpan,
      dicData: getDic('IS_NOT'),
    },
    {
      label: '共享类型',
      prop: 'sharingType',
      span: updateSpan,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('SHARING_TYPE'),
    },
    {
      label: '共享条件',
      prop: 'sharingCond',
      span: updateSpan,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      maxlength: 100,
    },
    {
      label: '共享方式',
      prop: 'sharingModeList',
      span: updateSpan,
      type: 'cascader',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('SHARING_MODE'),
    },
    {
      label: '是否向全社会开放',
      prop: 'isOpen',
      span: updateSpan,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('IS_NOT'),
    },
    {
      label: '开放条件',
      prop: 'openCond',
      span: updateSpan,
      visdiplay: false,
      maxlength: 100,
    },
    {
      label: '更新周期',
      prop: 'updCycle',
      span: updateSpan,
      type: 'select',
      dicData: getDic('UPD_CYCLE'),
    },
    {
      label: '是否主键',
      prop: 'isPk',
      span: updateSpan,
      type: 'select',
      dicData: getDic('IS_NOT'),
    },
    {
      label: '是否为空',
      prop: 'isNull',
      span: updateSpan,
      type: 'select',
      dicData: getDic('IS_NOT'),
    },
  ],
}
// form
export let form = {
  id: '',
  chName: '', // 中文名
  enName: '', // 英文名
  dataTypeList: '', // 数据类型
  description: '', // 字段描述
  dataLength: '', // 数据长度
  defaultValue: '', // 默认值
  objectType: '', // 对象类型
  deptId: '', // 来源部门
  isDict: '', // 是否字典项
  sharingType: '', // 共享类型
  sharingCond: '', // 共享条件
  sharingModeList: '', // 共享方式
  isOpen: '', // 是否向全社会开放
  updCycle: '', // 更新周期
  isPk: '', // 是否主键
  isNull: '', // 是否为空
  openCond: '', // 开放条件
}
