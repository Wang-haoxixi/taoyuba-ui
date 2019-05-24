import { getStore } from '@/util/store'

export const dictMap = {
  projectType: getStore({ name: 'dictGroup' }).prms_project_type,
  businessType: getStore({ name: 'dictGroup' }).prms_business_type,
  isRelevanceProduct: [
    { value: 1, label: '是' },
    { value: 2, label: '否' },
  ],
  approvalStatus: [
    { value: 1, label: '未提交' },
    { value: 2, label: '待审核' },
    { value: 3, label: '审核通过' },
    { value: 4, label: '审核不通过' },
  ],
}

export const infoList = [
  { label: '审批状态：', value: 'approvalStatus', type: 'dict' },
  { label: '申请人：', value: 'applicantName' },
  { label: '审批人：', value: 'approverName' },
  { label: '申请时间：', value: 'applyTime' },
  { label: '审批时间：', value: 'approvalTime' },
  { label: '指导建议：', value: 'guideSugges' },
  { label: '审批不通过理由：', value: 'approvalFailReason' },
]

export const setUpList = [
  { label: '编号：', value: 'serialNo' },
  { label: '项目名称：', value: 'projectName' },
  { label: '项目类型：', value: 'projectType', type: 'dict' },
  { label: '业务类型：', value: 'businessType', type: 'dict' },
  { label: '相关客户：', value: 'relatedClientName' },
  { label: '项目预算（万元）：', value: 'projectBudget' },
  { label: '项目标签：', value: 'projectTagList', type: 'tag' },
  { label: '是否关联产品：', value: 'isRelevanceProduct', type: 'dict' },
  { label: '相关产品：', value: 'aa-aa', type: 'tag' },
  { label: '承接部门：', value: 'inChargeDeptName' },
  { label: '合作部门：', value: 'coopDeptName' },
  { label: '集团外部合作伙伴：', value: 'groupExternalCooperatePartnerName' },
  { label: '发布人：', value: 'publisherName' },
  { label: '发布时间：', value: 'publishTime' },
]

export function initFormData () {
  return {
    serialNo: '',
    projectName: '',
    approver: '',
    approverObj: {
      id: '',
      name: '',
    },
    ccPersonList: [],
    ccPersonLists: {
      orgs: [],
      users: [],
      unions: [],
    },
    approvalStatus: 2,
  }
}

export function getDictMap (value, list) {
  for (let item of list) {
    if (item.value == value) {
      return item.label
    }
  }
}
