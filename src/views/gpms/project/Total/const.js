export const dictMap = {
  is_yes: [
    { value: 1, label: '是' },
    { value: 2, label: '否' },
  ],
  status: [
    { value: 1, label: '未提交' },
    { value: 2, label: '待审核' },
    { value: 3, label: '审核通过' },
    { value: 4, label: '审核不通过' },
  ],
  projectStage: {
    1: '立项阶段',
    2: '实施阶段',
    3: '收尾阶段',
    4: '完结阶段',
    5: '失败阶段',
  },
  stageOptions: [],
  typeOptions: [
    { id: 1, value: '1', label: '类型一' },
  ],
  workTypeOne: [
    { id: 1, value: '1', label: '类型一' },
  ],
  bustypeOptions: [],
  isRelevOptions: [],
  undertakeOptions: [],
}

export const columnsMap = [
  {
    prop: 'projectBudget',
    label: '项目预算',
  },
  {
    prop: 'contractAmount',
    label: '合同金额',
  },
  {
    prop: 'projectStage',
    label: '项目阶段',
    type: 'dict',
  },
  {
    prop: 'publisherName',
    label: '发布人',
  },
  {
    prop: 'publishTime',
    label: '发布时间',
  },
]

export const rules = {
  projectName: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  projectType: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  businessType: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  relatedClient: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  projectBudget: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  mktManagerList: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  projectMentorList: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  projectTagList: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  isRelevanceProduct: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  notRelevanceProductReason: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  inChargeDeptList: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  coopDeptList: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  groupExternalCooperatePartner: [
    { required: true, message: '必填', trigger: 'change' },
  ],
}

export function paramForm () {
  return {
    name: '',//项目名称
    stage: '',//项目阶段
    protype: '',//项目类型
    bustype: '',//业务类型
    budget:{
      num1 : null,
      num2 : null,
    },//项目预算
    pact: {
      num1:null,
      num2:null,
    },//合同金额
    manager: '',//市场经理
    guide: '',//项目指导
    relevancy: '',//关联产品
    carry: '',//承接部门
    join: '',//合作部门
    time:{
      opentime:null,
      closetime:null,
    },
    issue: '',//发布人
  }
}

export function initFormData () {
  return {
    projectName: '', // 项目名称
    projectType: '', // 项目类型
    businessType: '', // 业务类型
    businessTypeSec: '', // 其他
    relatedClient: '', // 相关客户
    projectBudget: '', // 项目预算
    mktManager: '', // 市场经理
    mktManagerList: {
      id: 0,
      name: '',
    },
    projectMentor: '', // 项目指导人
    projectMentorList: {
      id: 0,
      name: '',
    },
    projectTagList: [], // 项目标签
    isRelevanceProduct: '', // 是否关联产品
    notRelevanceProductReason: '', // 不关联理由
    inChargeDept: '', // 承接部门
    inChargeDeptList: {},
    coopDept: '', // 合作部门
    coopDeptList: {},
    groupExternalCooperatePartner: '', // 集团外部合作伙伴
  }
}

