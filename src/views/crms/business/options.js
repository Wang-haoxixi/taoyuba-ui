const initForm = () => {
  return {
    id: '', // ID
    clientName: '', // 客户名称 clientName
    projectName: '', // 项目名称 projectName
    businessType: [], // 业务类型 businessType
    intentionLevelKey: '', // 意向程度 intentionLevel
    tags: [], // 商机标签 businessTag
    opportunityDes: '', // 商机描述
    publisher: '', //发布者
    publishDate: '', //发布日期
    reciver: '', //认领人
  }
}
// 全部客户搜索
const allSearchForm = () => {
  return {
    clientName: '',
    intentionLevel: '',
    projectName: '',
    statusValue: '',
    businessTypeKey: [],
    publisherName: '',
    isCreate: '',
  }
}
// 我的客户/协作客户搜索
const initSearchForm = () => {
  return {
    clientName: '',
    intentionLevel: '',
    projectName: '',
    businessTypeKey: [],
    publisherName: '',
    isCreate: '',
  }
}
const rules = {
  clientName: [
    { required: true, message: '请输入客户名称', trigger: 'blur' },
    { max: 20, message: '长度不超过20个字符', trigger: 'blur' },
  ],
  projectName: [
    { required: true, message: '请输入项目名称', trigger: 'blur' },
    { max: 20, message: '长度不超过20个字符', trigger: 'blur' },
  ],
  businessType: [
    { required: true, message: '请选择业务类型', trigger: 'blur' },
  ],
  intentionLevel: [
    { required: true, message: '请选择意向程度', trigger: 'blur' },
  ],
  tags: [{ required: true, message: '请添加商机标签', trigger: 'blur' }],
  opportunityDes: [
    { required: true, message: '请输入商机描述', trigger: 'blur' },
  ],
}
const initBusinessForm = () => {
  return {
    clientId: '',
    clientName: '', //客户名称
    clientTypeKey: [], //客户类型
    districtType: '', // 区域类型
    businessTypeKey: [], // 业务类型
    specificBusinessType: '', //具体业务类型
    clientRela: '', //客户关系
    followUpStatus: '', // 跟进状态
    marketManager: '', // 市场经理
    lastTime: '', // 距离上次拜访已有(全部客户没有但依然存着)
    phoneNumber: '', //手机号码
    respDept: '', //负责部门
    companyUrl: '', //单位网址
    companyFunction: '', //单位职能
    contractAddress: '', //单位地址
    otherDesc: '', //其他说明
    tags: [],
    collaborations: [],
  }
}
export { initForm, allSearchForm, initSearchForm, rules, initBusinessForm }
