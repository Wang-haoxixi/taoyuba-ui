import { mergeByFirst } from '@/util/util'
const dictsMap = {
  status: {
    1: '待处理',
    2: '已邀约',
    3: '邀约未面试',
    4: '面试未录用',
    5: '已录用',
  },
}

const columnsMap = [
  {
    prop: 'sex',
    label: '性别',
    width: 55,
  },
  {
    prop: 'age',
    label: '年龄',
    width: 55,
  },
  {
    prop: 'education',
    label: '学历',
  },
  {
    prop: 'applyPosition',
    label: '应聘岗位',
  },
  {
    prop: 'receptionTime',
    label: '简历接受时间',
  },
  {
    prop: 'source',
    label: '来源',
  },
  {
    prop: 'remarks',
    label: '备注',
  },
]

const initForm = () => {
  return {
    'id': '',
    'name': '',
    'sex': 1,
    'avatar': '',
    'birthday': '',
    'title': '',
    'phone': '',
    'age': '',
    'email': '',
    'height': '',
    'weight': '',
    'nation': '',
    'address': '',
    'politics': '',
    'health': '',
    'marriage': '',
    'bear': '',
    'university': '',
    'education': '',
    'relation': '',
    'referrer': '',
    'appWay': '',
    'source': '',
    'hobbies': '',
    'advantage': '',
    'honor': '',
    'result': '',
    'position': [],
    'positionId': '',
    'positionName': '',
    'arrive': '',
    'salary': '',
    'workPlace': '',
    attach: [],
    attachFile: [], // 文件
    'workExperience': [],
    'trainingSituation': [],
    'eduSituation': [],
    'userCert': [],
    'blacklistArea': '',
    'blacklistReasons': '',
    'cities': [],
  }
}

const formToDto = (row) => {
  const newForm = mergeByFirst(initForm(), row)
  newForm.attachFileUrl = row.attach.map(m => m.url)[0]
  newForm.positionId = row.position[row.position.length - 1]
  return newForm
}

const formToVo = (row) => {
  const newForm = mergeByFirst(initForm(), row)
  newForm.attach = row.attachFile || []
  return newForm
}

const initSearchForm = () => {
  return {
    name: '', // 姓名
    positionName: '', // 岗位名称
    position: [], // 岗位id
    educationId: null, // 最高学历字典ID
    sex: 0, // 性别id
    rangeTime: null, // 开始时间
    status: null, // 简历状态id
    rangeAge: null, // 年龄
  }
}
const initDtoSearchForm = () => {
  return {
    name: '', // 姓名
    positionName: '', // 岗位名称
    positionId: null, // 岗位id
    educationId: null, // 最高学历字典ID
    sex: 0, // 性别id
    startTime: null, // 简历接收时间（开始时间）
    endTime: null, // 简历接收时间（结束时间）
    status: null, // 简历状态
    minAge: null, // 最小年龄
    maxAge: null, // 最大年龄
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
  if (row.rangeTime) {
    newForm.startTime = row.rangeTime[0]
    newForm.endTime = row.rangeTime[1]
  }
  if (row.rangeAge) {
    newForm.minAge = row.rangeAge[0]
    newForm.maxAge = row.rangeAge[1]
  }
  return newForm
}

const initToResumeForm = () => {
  return {
    ids: [],
    reason: '',
  }
}
const initToBlacklistForm = () => {
  return {
    ids: [],
    area: '',
    reason: '',
  }
}

const initrejectedForm = () => {
  return {
    msg: '',
  }
}

const studyColumns = [
  {
    prop: 'name',
    label: '学习(教育)单位',
  },
  {
    prop: 'startTime',
    label: '起始时间',
  },
  {
    prop: 'content',
    label: '学习内容',
  },
]

const workExpColumns = [
  {
    prop: 'name',
    label: '公司',
  },
  {
    prop: 'position',
    label: '岗位',
  },
  {
    prop: 'startTime',
    label: '起始时间',
  },
  {
    prop: 'description',
    label: '工作描述',
  },
  {
    prop: 'leavingReason',
    label: '离职原因',
  },
]

const trainingColumns = [
  {
    prop: 'name',
    label: '培训名称',
  },
  {
    prop: 'place',
    label: '培训单位',
  },
  {
    prop: 'method',
    label: '培训方式',
  },
  {
    prop: 'startTime',
    label: '起始时间',
  },
]

const certificateColumns = [
  {
    prop: 'name',
    label: '证书名称',
  },
  {
    prop: 'number',
    label: '证书编号',
  },
  {
    prop: 'issuedPlace',
    label: '颁发单位',
  },
  {
    prop: 'annex',
    label: '附件',
  },
]

const rules = {
  name: [
    { required: true, message: '请填写姓名', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请填写联系电话', trigger: 'blur' },
  ],
  education: [
    { required: true, message: '请填写最高学历', trigger: 'blur' },
  ],
  position: [
    { required: true, type: 'array', message: '请填写应聘岗位', trigger: 'blur' },
  ],
  workPlace: [
    { required: true, message: '请填写期望工作地', trigger: 'blur' },
  ],
}

export { dictsMap, columnsMap, initForm, initrejectedForm, formToDto, initToResumeForm, initToBlacklistForm, workExpColumns, studyColumns, trainingColumns, certificateColumns, initSearchForm, toDtoSearchForm, formToVo, rules }