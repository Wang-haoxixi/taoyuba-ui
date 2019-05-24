import { mergeByFirst } from '@/util/util'
// import { initNow } from '@/util/date'

const dictsMap = {
  status: {
  },
}

const columnsMap = [
  {
    prop: 'time',
    label: '时间',
    width:300,
  },
  {
    prop: 'behavior',
    label: '行为',
  },
]

const initForm = () => {
  return {
  }
}

const initDtoForm = () => {
  return {
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
    { required: true, message: '请填写部门', trigger: 'blur' },
  ],
  recruitsCount: [
    { required: true, message: '请填写招聘人数', trigger: 'blur' },
  ],
  targetCount: [
    { required: true, message: '请填写目标人数', trigger: 'blur' },
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
    { required: true, message: '请填写福利待遇', trigger: 'blur' },
  ],
  duties: [
    { required: true, message: '请填写岗位职责', trigger: 'blur' },
  ],
  claim: [
    { required: true, message: '请填写岗位要求', trigger: 'blur' },
  ],
}

export { dictsMap, columnsMap, initForm, initSearchForm, formToDto, toDtoSearchForm, rules }