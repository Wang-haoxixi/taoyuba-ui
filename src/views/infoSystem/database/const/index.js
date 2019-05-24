import { getDept, getDic } from '@/util/dic'

// 主表Options
export const mainTableOption = {
  page: true,
  header: false,
  selection: true,
  menu: false,
  column: [
    {label:'所属部门', prop:'deptId',type: 'dic', dicData: getDept(), align: 'center'},
    {label:'数据库英文名称', prop:'nameEn'},
    {label:'数据库中文名称', prop:'nameCn'},
    {label:'所属信息系统', prop:'systemIdForShow'},
    {label:'数据库类型', prop:'dbType', type: 'dic', dicData: getDic('DB_TYPE')},
    {label:'生成目录进度', prop:'process', align: 'center'},
    {label: '操作', prop: 'menu', solt: true},
  ],
}

// 选择表Options
export const choseTableOption = {
  page: false,
  header: false,
  selection: true,
  menu: false,
  index: true,
  column: [
    {label:'数据库中文名', prop:'nameCn', align: 'center'},
    {label:'数据库英文名称', prop:'nameEn', align: 'center'},
  ],
}

let updateSpan = 24
// 编辑参数
export let informationUpdateProps = {
  labelWidth: '150',
  menuBtn: false,
  column: [
    {
      label: '所属部门',
      prop: 'name',
      span: updateSpan,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      dicData: getDept(),
    },
    {
      label: '所属系统',
      prop: 'number',
      span: updateSpan,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      dicData: [],
    },
    {
      label: '数据库英文名称',
      prop: 'resType',
      span: updateSpan,
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      maxlength: 80,
    },
    {
      label: '数据库中文名称',
      prop: 'summ',
      span: updateSpan,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      maxlength: 80,
    },
    {
      label: '数据库类型',
      prop: 'surveyIdList',
      span: updateSpan,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      typeDic: 'dic',
      dicName: 'FMT',
    },
  ],
}

// form
export let form = {
  id: '',
  name: '',  // 信息资源名称
  number: '', // 信息资源代码
  from: '', //
  resType: '', // 所属目录资源分类
  summ: '', // 信息资源摘要
  surveyIdList: '', // 所属系统名称
  fmtList: '', // 信息资源格式
  topicType: '',  // 主题分类
  areaTypeList: '', // 重点领域分类
  updCycle: '', // 更新周期
  sharingType: '', // 共享类型
  sharingCond: '', // 共享条件
  sharingModeList: '', // 共享方式
  isOpen: '', // 是否向全社会开放
  rescode: '', // 关联资源代码
  createTime: '',
  elements: [],
  openCond: '', // 开放条件
}

//connectform
export let connectForm = {
  id: '',
  name: '',  // 信息资源名称
  number: '', // 信息资源代码
  from: '', //
  resType: '', // 所属目录资源分类
  summ: '', // 信息资源摘要
  surveyIdList: '', // 所属系统名称
  fmtList: '', // 信息资源格式
  topicType: '',  // 主题分类
  areaTypeList: '', // 重点领域分类
  updCycle: '', // 更新周期
  sharingType: '', // 共享类型
  sharingCond: '', // 共享条件
  sharingModeList: '', // 共享方式
  isOpen: '', // 是否向全社会开放
  rescode: '', // 关联资源代码
  createTime: '',
  elements: [],
  openCond: '', // 开放条件
}
