import { mergeByFirst } from '@/util/util'
import { initNow } from '@/util/date'

const dictsMap = {
  status: {
    1: '待发布', 2: '招聘中', 3: '结束招聘',
  },
  targetCount: { // 是否紧缺
    0: '否', 1: '是',
  },
}

const columnsMap = [
  {
    prop: 'dept',
    label: '招聘部门',
  },
  {
    prop: 'recruitsCount',
    label: '招聘人数',
  },
  {
    prop: 'jobType',
    label: '工作类型',
  },
  {
    prop: 'applicationTime',
    label: '招聘发布时间',
  },
  {
    prop: 'status',
    label: '招聘状态',
    type: 'dict',
  },
]

const initForm = () => {
  return {
    id: '', // ID
    position: [],
    positionName: '',
    dept: [],
    // positionId: '', // 岗位 positionName
    // positionName: '', // 岗位 positionName
    // deptId: '', // 所属部门 deptnName
    deptName: '', // 所属部门 deptnName
    recruitsCount: 0, // 招聘人数
    targetCount: 0, // 目标人数
    academicId: '', // 学历要求(dict) hrms_highest_educational
    jobTypeId: '', // 工作类型(dict) hrms_work_type
    years: '', // 工作年限
    profession: '', // 专业要求
    place: '', // 工作地点
    sex: 1, // 性别
    sexName: '', // 性别
    treatment: '', // 工资待遇
    language: '', // 外语要求
    term: initNow(), // 招聘期限
    welfare: [], // 福利待遇
    welfareTreatmentList: [], // 福利待遇
    status: '', // 状态
    duties: '', // 岗位职责
    claim: '', // 岗位要求
  }
}

const initDtoForm = () => {
  return {
    id: '', // ID
    // position: [],
    // dept: [],
    positionId: '', // 岗位 positionName
    // positionName: '', // 岗位 positionName
    deptId: '', // 所属部门 deptnName
    // deptName: '', // 所属部门 deptnName
    recruitsCount: 0, // 招聘人数
    targetCount: 0, // 是否紧急
    academicId: '', // 学历要求(dict) hrms_highest_educational
    jobTypeId: '', // 工作类型(dict) hrms_work_type
    years: 0, // 工作年限
    profession: '', // 专业要求
    place: '', // 工作地点
    sex: 1, // 性别
    treatment: '', // 工资待遇
    language: '', // 外语要求
    term: '', // 招聘期限
    welfare: '', // 福利待遇
    duties: '', // 岗位职责
    claim: '', // 岗位要求
  }
}

const formToDto = (row) => {
  const newForm = mergeByFirst(initDtoForm(), row)
  newForm.positionId = row.position[row.position.length - 1]
  newForm.deptId = row.dept[row.dept.length - 1]
  return newForm
}
const initSearchForm = () => {
  return {
    position: [], // 岗位id
    dept: [], // 部门ID
    sex: 0, // 性别id
    status: null, // 招聘状态id
    rangeTime: null, // 开始时间
  }
}
const initDtoSearchForm = () => {
  return {
    positionId: null, // 岗位id
    deptId: null, // 部门ID
    sex: 0, // 性别id
    status: null, // 招聘状态id
    startTime: null, // 开始时间
    endTime: null, // 结束时间
  }
}
// positionId: 1, // 岗位id
// deptId: 1, // 部门ID
// sex: 1, // 性别id
// status: 1, // 招聘状态id
// startTime: initNow(), // 开始时间
// endTime: initNow(), // 结束时间
const toDtoSearchForm = (row) => {
  const newForm = mergeByFirst(initDtoSearchForm(), row)
  newForm.sex = row.sex ? row.sex : null
  newForm.positionId = row.position.length && row.position[row.position.length - 1]
  newForm.deptId = row.dept && row.dept[row.dept.length - 1]
  if (row.rangeTime) {
    newForm.startTime = row.rangeTime[0]
    newForm.endTime = row.rangeTime[1]
  }
  return newForm
}

const rules = {
  position: [
    { required: true, type: 'array', message: '请填写岗位', trigger: 'blur' },
  ],
  dept: [
    { required: false, message: '请填写部门', trigger: 'blur' },
  ],
  recruitsCount: [
    { required: true, message: '请填写招聘人数', trigger: 'blur' },
  ],
  targetCount: [
    { required: true, message: '请选择是否紧急', trigger: 'blur' },
  ],
  academicId: [
    { required: true, message: '请填写学历要求', trigger: 'blur' },
  ],
  jobTypeId: [
    { required: true, message: '请填写工作类型', trigger: 'blur' },
  ],
  years: [
    { required: true, message: '请填写工作年限', trigger: 'blur' },
  ],
  profession: [
    { required: true, message: '请填写专业要求', trigger: 'blur' },
  ],
  place: [
    { required: true, message: '请填写工作地点', trigger: 'blur' },
  ],
  sex: [
    { required: true, message: '请填写性别', trigger: 'blur' },
  ],
  treatment: [
    { required: true, message: '请填写工资待遇', trigger: 'blur' },
  ],
  language: [
    { required: true, message: '请填写外语要求', trigger: 'blur' },
  ],
  term: [
    { required: true, message: '请填写招聘期限', trigger: 'blur' },
  ],
  welfare: [
    { type:'array', required: true, message: '请填写福利待遇', trigger: 'blur' },
  ],
  duties: [
    { required: true, message: '请填写岗位职责', trigger: 'blur' },
  ],
  claim: [
    { required: true, message: '请填写岗位要求', trigger: 'blur' },
  ],
}

export { dictsMap, columnsMap, initForm, initSearchForm, formToDto, toDtoSearchForm, rules }