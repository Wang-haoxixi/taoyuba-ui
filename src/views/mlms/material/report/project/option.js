export const initFormData = () => {
  return {
    projectId: 0,
    projectName: '',
    estimateSignTime: '',
    contractSignTime: '',
    clientRqmt: '',
    workSummary: '',
    workPlan: '',
    remark: '',
    paymentRelations: [],
  }
}

export const rules = {
  estimateSignTime: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  contractSignTime: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  workSummary: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  workPlan: [
    { required: true, message: '必填', trigger: 'change' },
  ],
}

export const tipContent = {
  estimateSignTime:'无',
  contractSignTime:'自动读取',
  paymentRelations:'请务必准确选择月份，回款金额单位为“元”',
  clientRqmt:'1、简明扼要、清晰的罗列客户需求，如1、2、3、<br/>' +
  '2、需求明确，切不可模棱两可，并说明解决需求对应产品；<br/>',
  workSummary:'1、对本周计划的落实情况说明，要数据化且可查询（工作成果发送相关领导）；<br/>' +
  '2、计划未完成的进行说明原因并提出改进措施；<br/>' +
  '3、如有困难说明困难点和寻求领导解决的方案',
  workPlan:'1、计划条理清楚，符合项目推进计划、符合集团发展战略；<br/>' +
  '2、计划要量化和标准，如预计完成时间，数量，完成要求<br/>' +
  '3、具体细项计划要落实到人，<br/>' +
  '4、计划与总结做到闭环化；<br/>',
}