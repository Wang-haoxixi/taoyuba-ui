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

export const normyList =  [
  {
    id:1,
    content:'2018年国脉十四周年年会委员会年度工作总结与2019工作计划汇报会议纪要',
  },
  {
    id:2,
    content:'2018年度国脉十四周年年会会议纪要(23日上午议程)分享',
  },
  {
    id:3,
    content:'2018年国脉年会"十大方案解读与学习培训大会"（下午）会议纪要分享',
  },
]

export const formList = [
  { label: '项目名称：', value: 'projectName' },
  { label: '项目标签：', value: 'projectTagList', type: 'tag' },
  { label: '发布人：', value: 'publisherName' },
  { label: '承接部门：', value: 'inChargeDeptName' },
  { label: '发布时间：', value: 'publishTime' },
  { label: '项目类型：', value: 'projectType', type: 'dict' },
  { label: '编号：', value: 'serialNo' },
  { label: '相关客户：', value: 'relatedClientName' },
  { label: '业务类型：', value: 'businessType', type: 'dict' },
  { label: '合同金额', value: 'contractAmount' },
  { label: '项目预算（万元）：', value: 'projectBudget' },
  { label: '是否关联产品：', value: 'isRelevanceProduct', type: 'dict' },
]
