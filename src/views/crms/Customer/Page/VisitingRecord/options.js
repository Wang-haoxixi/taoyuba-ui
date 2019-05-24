const columnsMap = [
  { label: '联系主题', prop: 'theme' },
  { label: '联系时间', prop: 'visitTime' },
  { label: '联系记录', prop: 'contactRecord' },
]
const visitColumnsMap = [
  { label: '拜访主题', prop: 'title', width: 400 },
  { label: '拜访时间', prop: 'meetingTime' },
  // { label: '类型', prop: 'contactRecord' },
]
const initForm = () => {
  return {
    theme: '',
    visitTime: '',
    contactRecord: '',
    clientId: '',
  }
}

export const dictsMap = {
  meetingType: {
    0: '管理会议',
    1: '市场会议',
    2: '项目会议',
    3: '产品会议',
    4: '培训会议',
    5: '日常例会',
    6: '拜访纪要',
    7: '其他',
  },
  visitType: {
    0: '当面拜访',
    1: '电话拜访',
    2: '聊天软件拜访',
    3: '其他',
  },
}

export const initFormData = () => {
  return {
    type: 1, // 0 是会议纪要，1 是拜访记录
    meetingType: '6',
    title: '',
    meetingContent: '',
    meetingCon: '',
    thoughtsProblem: '',
    meetingTime: '',
    meetingLocation: '',
    tagKeyWords: [],
    receiverIds: [],
    receiver: {
      orgs: [],
      users: [],
      unions: [],
    },
    attendee: {
      orgs: [],
      users: [],
      unions: [],
    },
    hostId: '',
    remark: '',
    visitType: 1,
    visitingAddress: '',
    visitingUserId: [],
    status: 0,
  }
}

export const initSearchForm = () => {
  return {
    name: '',
  }
}

export const rules = {
  title: [
    { required: true, message: '必填', trigger: 'blur' },
    { max: 50, message: '长度不可超过50个字符', trigger: 'blur' },
  ],
  meetingContent: [
    { required: true, message: '必填', trigger: 'blur' },
    { max: 255, message: '长度不可超过255个字符', trigger: 'blur' },
  ],
  meetingTime: [{ required: true, message: '必填', trigger: 'blur' }],
}
export { columnsMap, initForm, visitColumnsMap }
