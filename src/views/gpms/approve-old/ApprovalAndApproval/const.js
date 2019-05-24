const undertakeOptions = [
  {
      id : 1,
      label:'立项申请',
      value: 1,
  },
  {
      id : 2,
      label:'项目经理授权申请',
      value: 2,
  },
  
]

const paramForm = {
  name: '', //项目名称
  num: '', //编号
  ApplicationCategory:'',//申请类别
  ApprovalStatus:'',//审批状态
  Applicant:'',//申请人
  Approver:'',//审批人
}

export { undertakeOptions,paramForm }