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

const Approval = [
  {
    id : 1,
    label:'未提交',
    value: 1,
  },
  {
      id : 2,
      label:'待审批',
      value: 2,
  },
  {
    id : 3,
    label:'审批通过',
    value: 3,
  },
  {
    id : 4,
    label:'审批不通过',
    value: 4,
  },
]

const  columnsMap = [
  {
    prop: 'name',
    label: '项目名称',
    width:400,
  },
  {
      prop: 'budget',
      label: '申请类别',
  },
  {
      prop: 'manay',
      label: '编号',
  },
  {
      prop: 'stage',
      label: '审批状态',
  },
  {
      prop: 'issue',
      label: '申请人',
  },
  {
      prop: 'issuename',
      label: '审批人',
  },
]

const pagedTable = [
  {
      id: 1270253,
      name:'20181212滨州市指挥交通转向规划',
      budget:'立项申请',
      manay:'GM20190001',
      stage:'待审批',
      issue:'杨晓凤',
      issuename:'张三',
      ProjectBudget:'30',
  },
  {
    id: 1270254,
    name:'20181101宁津县委18年末及19年上半年政务公开评估',
    budget:'项目经理授权申请',
    manay:'GM20190004',
    stage:'审批通过',
    issue:'杨晓凤',
    issuename:'李四',
    ProjectBudget:'101',
},
]

export { undertakeOptions,Approval, columnsMap,pagedTable}