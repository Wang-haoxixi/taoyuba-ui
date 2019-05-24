import { mergeByFirst } from '@/util/util'
import { initNow } from '@/util/date'

const dictsMap = {
  status: {
    0: '暂无',
    1: '正式员工',
    2: '试用期员工',
    3: '实习期员工',
    4: '兼职员工',
    5: '其他',
    6: '离职员工',
  },
  lockOrg: {
    0: '正常',
    1: '审核中',
    2: '锁定',
  },
}

const initForm = () => {
  return {
    id: '', // 用户ID 不可编辑
    name: '', // 姓名 不可编辑
    userName: '', // 用户名 不可编辑
    orgId: '', // 组织ID 不可编辑
    orgName: '', // 组织名 不可编辑
    orgList: [], // 组织名 不可编辑
    staffId: '', // 工号
    isStaff: false, // 是否设置了工号
    identityMark: [], // 身份标识
    identityMarks: [], // 身份标识
    avatar: '', // 头像
    roleName: [], // 角色
    // orgName: '组织', // 资产所属公司 不可编辑
    position: [], // 岗位
    positionName: '', // 岗位
    externalTitle: '', // 外部头衔
    socialRela: '', // 对外头衔
    people: [], // 标签名字
    job: '', // 职务
    jobId: '', // 职务
    title: '', // 职称
    titleId: '', // 职称
    entryTime: '', // 入职时间
    positiveTime: '', // 转正时间
    transferTime: '', // 调动时间
    status: '', // 员工状态
    deptList: [], // 所属部门
    deptIds: [], // 所属部门
    dept: [], // 所属部门
    deptQm: '', // 资产所属组织
    birthday: '', // 出生年月
    sex: '', // 性别
    sexName: '', // 性别
    nationality: '', // 民族
    politics: '', // 政治面貌字典
    marriage: '', // 婚姻状况
    bear: '', // 生育状况
    language: '', // 外语水平
    education: '', // 最高学历
    university: '', // 毕业学校
    profession: '', // 专业
    graduationTime: '', // 毕业时间
    referrer: '', // 推荐人
    abilityTag: [], // 卓越标签
    projectTag: [], // 专业标签
    learningTag: [], // 进步标签
    workExperience: [], // 工作经历
    trainingSituation: [], // 培训情况
    eduSituation: [], // 学习情况
    userCert: [], // 资质证书
    accountTypeId: '', // 户口类别
    accountTypeName: '', // 户口类别
    accountLocation: '', // 户口所在地
    residenceCities: [], // (户口)
    residenceAddress: '', // 户籍地址
    provinceName: '', // 户籍地址
    cityName: '', // 户籍地址
    currentCities: [], // 现住
    currentAddress: '', // 现住地址
    IDCard: '', // 身份证
    phone: '', // 联系手机
    wechat: '', // 微信
    qq: '', // QQ
    email: '', // 邮箱
    home: '', // 邮箱
    birthplaceProvince: '', //所属省（户口）
    birthplaceCity: '',//所属市（户口）
    province: '', //所属省（现住）
    city: '',  //所属市（现住）
    emergencyName: '', // 应急联系人
    emergencyPhone: '', // 应急联系方式
    signingTime: '', // 劳动合同签订时间
    benefitsStartTime: '', // 社保福利起缴时间
    benefitsStopTime: '', // 社保福利停缴时间
    separationTime: '', // 离职时间
    careerPlanning: '',//职业规划
    laborContract: [],//劳动合同
    welfare: [],//社保福利
    transfer: [],//调动情况
    dimission: [],//离职信息
  }
}

const formToDto = (row) => {
  const newForm = mergeByFirst(initForm(), row)
  newForm.province = row.currentCities[0]
  newForm.city = row.currentCities[1]
  newForm.birthplaceProvince = row.residenceCities[0]
  newForm.birthplaceCity = row.residenceCities[1]
  newForm.positionId = row.position[row.position.length - 1]
  newForm.deptIds = row.dept.map(m => m.id)
  return newForm
}
// 入职 0,6
// 转正 2,3,4,5
// 调动 1,2,3,4,5
// 离职 1,2,3,4,5
const columnsMap = [
  {
    prop: 'sex',
    label: '性别',
    width: 55,
    sortable: true,
    key: 'sex',
  },
  {
    prop: 'userName',
    label: '用户名',
    hidden: true,
    key: 'userName',
  },
  {
    prop: 'position',
    label: '岗位',
    hidden: false,
    key: 'position',
  },
  {
    prop: 'staffId',
    label: '工号',
    hidden: true,
    key: 'staffNo',
  },
  {
    prop: 'status',
    label: '员工状态',
    type: 'dict',
    hidden: false,
    key: 'userStatus',
  },
  {
    prop: 'lockOrg',
    label: '锁定状态',
    type: 'dict',
    hidden: true,
    key: 'lockOrg',
  },
  {
    prop: 'IDCard',
    label: '身份证',
    hidden: false,
    key: 'idCard',
  },
  {
    prop: 'socialRela',
    label: '对外头衔',
    hidden: true,
    key: 'socialRela',
  },
  {
    prop: 'externalTitle',
    label: '外部头衔',
    hidden: true,
    key: 'externalTitle',
  },
  {
    prop: 'job',
    label: '职务',
    hidden: true,
    key: 'job',
  },
  {
    prop: 'title',
    label: '职称',
    hidden: true,
    key: 'title',
  },

  {
    prop: 'positiveTime',
    label: '转正时间',
    hidden: true,
    key: 'regDate',
  },
  {
    prop: 'transferTime',
    label: '调动时间',
    hidden: true,
    key: 'transferTime',
  },
  {
    prop: 'birthday',
    label: '出生年月',
    hidden: true,
    key: 'birthDate',
  },
  {
    prop: 'nationality',
    label: '民族',
    hidden: true,
    key: 'nation',
  },
  {
    prop: 'politicsName',
    label: '政治面貌',
    hidden: true,
    key: 'politicsName',
  },
  {
    prop: 'marriageName',
    label: '婚姻状况',
    hidden: true,
    key: 'marriageName',
  },
  {
    prop: 'bearName',
    label: '生育状况',
    hidden: true,
    key: 'bearName',
  },
  // {
  //   prop: 'language',
  //   label: '外语水平',
  //   hidden: true,
  // },
  {
    prop: 'education',
    label: '最高学历',
    hidden: true,
    key: 'education',
  },
  {
    prop: 'university',
    label: '毕业学校',
    hidden: true,
    key: 'university',
  },
  {
    prop: 'profession',
    label: '专业',
    hidden: true,
    key: 'major',
  },
  {
    prop: 'graduationTime',
    label: '毕业时间',
    hidden: true,
    key: 'graduateTime',
  },
  {
    prop: 'referrer',
    label: '推荐人',
    hidden: true,
    key: 'recommend',
  },
  {
    prop: 'accountTypes',
    label: '户口类别',
    hidden: true,
    key: 'accountTypes',
  },
  // {
  //   prop: 'accountLocation',
  //   label: '户口所在地',
  //   hidden: true,
  // },
  {
    prop: 'residenceAddress',
    label: '户籍地址',
    hidden: true,
    key: 'residenceAddress',
  },
  {
    prop: 'currentAddress',
    label: '现住地址',
    hidden: true,
    key: 'currentAddress',
  },
  {
    prop: 'phone',
    label: '联系手机',
    hidden: true,
    key: 'phone',
  },
  {
    prop: 'weChat',
    label: '微信',
    hidden: true,
    key: 'wechat',
  },
  {
    prop: 'qq',
    label: 'QQ',
    hidden: true,
    key: 'qq',
  },
  {
    prop: 'email',
    label: '邮箱',
    hidden: true,
    key: 'email',
  },
  {
    prop: 'emergencyName',
    label: '应急联系人',
    hidden: true,
    key: 'emergencyPerson',
  },
  {
    prop: 'emergencyPhone',
    label: '应急联系方式',
    hidden: true,
    key: 'emergencyContact',
  },
  {
    prop: 'signingTime',
    label: '劳动合同签订时间',
    hidden: true,
    key: 'signingTime',
  },
  {
    prop: 'benefitsStartTime',
    label: '社保福利起缴时间',
    hidden: true,
    key: 'benefitsStartTime',
  },
  {
    prop: 'benefitsStopTime',
    label: '社保福利停缴时间',
    hidden: true,
    key: 'benefitsStopTime',
  },
  {
    prop: 'separationTime',
    label: '离职时间',
    hidden: true,
    key: 'separationTime',
  },
  {
    prop: 'deptList',
    label: '所属部门',
    hidden: true,
    width: 100,
    type: 'tag',
    key: 'deptList',
  },
]

const initSearchForm = () => {
  return {
    name: '',
    sex: '',
    dept: [],
    position: [],
    jobId: '',
    titleId: '',
    cities: [],
    rangeTime: [],
    status: '',
    lockOrg: '',
  }
}
const initDtoSearchForm = () => {
  return {
    name: '',
    sex: '',
    deptId: '',
    positionId: '',
    jobId: '',
    titleId: '',
    province: '',
    city: '',
    startTime: '',
    endTime: '',
    status: '',
    lockOrg: '',
  }
}
const toDtoSearchForm = (row) => {
  const newForm = mergeByFirst(initDtoSearchForm(), row)
  newForm.startTime = row.rangeTime[0]
  newForm.endTime = row.rangeTime[1]
  newForm.province = row.cities[0]
  newForm.city = row.cities[1]
  newForm.positionId = row.position[row.position.length - 1]
  newForm.deptId = row.dept[row.dept.length - 1]
  return newForm
}

const initTransferForm = () => {
  return {
    id: '',
    // dept: [],
    position: [],
    jobId: '',
    titleId: '',
    transferTime: initNow(),
  }
}
const initDtoTransferForm = () => {
  return {
    id: '',
    // deptId: '',
    positionId: '',
    jobId: '',
    titleId: '',
    transferTime: '',
  }
}

const transferFormToDto = (form) => {
  const newForm = mergeByFirst(initDtoTransferForm(), form)
  newForm.positionId = form.position[form.position.length - 1]
  // newForm.deptId = form.dept[form.dept.length - 1]
  return newForm
}

const initDepartureForm = () => {
  return {
    id: '',
    departureTime: initNow(),
    reason: '',
  }
}
const initInductionForm = () => {
  return {
    id: '',
    status: 2,
    inductionTime: initNow(),
  }
}
const initPositiveForm = () => {
  return {
    id: '',
    positiveTime: initNow(),
  }
}

const rules = {
  staffId: [
    { required: true, message: '请填写员工编号', trigger: 'blur' },
  ],
  position: [
    { required: true, message: '请填写岗位', trigger: 'blur' },
  ],
  jobId: [
    { required: true, message: '请填写职务', trigger: 'blur' },
  ],
  titleId: [
    { required: true, message: '请填写职称', trigger: 'blur' },
  ],
  entryTime: [
    { required: true, message: '请填写入职时间', trigger: 'blur' },
  ],
  positiveTime: [
    { required: true, message: '请填写转正时间', trigger: 'blur' },
  ],
  status: [
    { required: true, message: '请填写员工状态', trigger: 'blur' },
  ],
  externalTitle: [
    { min: 2, message: '外部头衔至少 2 个字符以上', trigger: 'blur' },
    { max: 20, message: '外部头衔不得超过 20 个字符', trigger: 'blur' },
  ],
  abilityTag: [
    { type: 'array', max: 20, message: '标签不得超过 20 个', trigger: 'change' },
  ],
  projectTag: [
    { type: 'array', max: 20, message: '标签不得超过 20 个', trigger: 'change' },
    // { type: 'array', required: true, message: '请填写专业标签', trigger: 'change' },
  ],
  learningTag: [
    { type: 'array', max: 20, message: '标签不得超过 20 个', trigger: 'change' },
    // { type: 'array', required: true, message: '请填写进步标签', trigger: 'change' },
  ],
  careerPlanning: [
    { max: 2000, message: '字符不得超过 2000 个', trigger: 'change' },
  ],
}

const selfRules = {
  ...rules,
  avatar: [
    { required: true, message: '请上传头像', trigger: 'blur' },
  ],
  dept: [
    { required: true, message: '请填写所属部门', trigger: 'blur' },
  ],
  socialRela: [
    { required: true, message: '请填写外部头衔', trigger: 'blur' },
  ],
  birthday: [
    { required: true, message: '请填写出生年月', trigger: 'blur' },
  ],
  sex: [
    { required: true, message: '请填写性别', trigger: 'blur' },
  ],
  nationality: [
    { required: true, message: '请填写民族', trigger: 'blur' },
  ],
  politics: [
    { required: true, message: '请填写政治面貌', trigger: 'blur' },
  ],
  marriage: [
    { required: true, message: '请填写婚姻状况', trigger: 'blur' },
  ],
  bear: [
    { required: true, message: '请填写生育状况', trigger: 'blur' },
  ],
  language: [
    { required: false, message: '请填写外语水平', trigger: 'blur' },
  ],
  education: [
    { required: true, message: '请填写最高学历', trigger: 'blur' },
  ],
  university: [
    { required: true, message: '请填写毕业学校', trigger: 'blur' },
  ],
  profession: [
    { required: true, message: '请填写专业', trigger: 'blur' },
  ],
  graduationTime: [
    { required: true, message: '请填写毕业时间', trigger: 'blur' },
  ],
  referrer: [
    { required: false, message: '请填写推荐人', trigger: 'blur' },
  ],
  accountTypeId: [
    { required: true, message: '请填写户口类型', trigger: 'blur' },
  ],
  residenceAddress: [
    { required: true, message: '请填写户籍地址', trigger: 'blur' },
  ],
  currentAddress: [
    { required: true, message: '请填写现住地址', trigger: 'blur' },
  ],
  IDCard: [
    { required: true, message: '请填写身份证号码', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请填写联系电话', trigger: 'blur' },
  ],
  wechat: [
    { required: true, message: '请填写微信', trigger: 'blur' },
  ],
  qq: [
    { required: true, message: '请填写qq', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请填写邮箱', trigger: 'blur' },
  ],
  home: [
    { max: 2000, message: '字符不得超过 2000 个', trigger: 'change' },
  ],
  emergencyName: [
    { required: true, message: '请填写应急联系人', trigger: 'blur' },
  ],
  emergencyPhone: [
    { required: true, message: '请填写应急联系人电话', trigger: 'blur' },
  ],
}

export { dictsMap, columnsMap, initForm, formToDto, transferFormToDto, initSearchForm, initTransferForm, initDepartureForm, initInductionForm, initPositiveForm, toDtoSearchForm, rules, selfRules }