var receiverValidate = (rule, value, callback) => {
  if (value.orgs.length == 0 && value.users.length == 0) {
    callback(new Error())
  } else {
    callback()
  }
}
export const shareRules = {
  subject: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  receiverList: [
    { validator: receiverValidate, message: '必填', trigger: 'change' },
  ],
  content: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
}

// 分享
export function initShareForm () {
  return {
    attachmentIds: [],
    content: '',
    emailId: 0,
    materialIds: [],
    materialList: [],
    projectIds: [],
    collectionList: [], // 收藏页面特殊字段
    receiverIds: [],
    receiverList: {
      unions: [],
      orgs: [],
      users: [],
    },
    reportIds: [],
    status: 1,
    subject: '',
    summaryIds: [],
    summaryList: [],
    tagKeyWords: [],
    type: 2, // 类型为分享
    kind: 0,
  }
}

export const shareType = {
  summary: {
    ids: 'summaryIds',
    list: 'summaryList',
    name: '纪要',
  },
  material: {
    ids: 'materialIds',
    list: 'materialList',
    name: '材料',
  },
  aptitude: {
    ids: 'aptitudeIds',
    list: 'aptitudeList',
    name: '荣誉资质',
  },
}

// 批示
export function initInstrForm () {
  return {
    attachmentIds: [],
    content: '',
    emailId: 0,
    materialIds: [],
    projectIds: [],
    receiverIds: [],
    receiverList: {
      unions: [],
      orgs: [],
      users: [],
    },
    reportIds: [],
    status: 1,
    subject: '',
    summaryIds: [],
    summaryList: [],
    tagKeyWords: [],
    type: 1, // 类型为分享
    kind: 0,
  }
}