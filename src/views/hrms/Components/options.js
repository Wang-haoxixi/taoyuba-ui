const studyColumns = [
  {
    prop: 'name',
    label: '学习(教育)单位',
  },
  {
    prop: 'startTime',
    label: '起止时间',
    type: 'daterange',
  },
  {
    prop: 'content',
    label: '学习内容',
    type: 'area',
  },
]

const workExpColumns = [
  {
    prop: 'name',
    label: '公司',
  },
  {
    prop: 'position',
    label: '岗位',
  },
  {
    prop: 'startTime',
    label: '起止时间',
    type: 'daterange',
  },
  {
    prop: 'description',
    label: '工作描述',
    type: 'area',
  },
]

const trainingColumns = [
  {
    prop: 'name',
    label: '培训名称',
  },
  {
    prop: 'place',
    label: '培训单位',
  },
  {
    prop: 'method',
    label: '培训方式',
    dictName: 'hrms_training_mode',
    type: 'dict',
  },
  {
    prop: 'startTime',
    label: '起止时间',
    type: 'daterange',
  },
]

const certificateColumns = [
  {
    prop: 'name',
    label: '证书名称',
  },
  {
    prop: 'number',
    label: '证书编号',
  },
  {
    prop: 'issuedPlace',
    label: '颁发单位',
  },
  {
    prop: 'annex',
    label: '附件',
    type: 'file',
  },
]


const laborContractColumns = [
  {
    prop: 'type',
    label: '合同类型',
    dictName: 'hrms_labor_contract_type',
    type: 'dict',
  },
  {
    prop: 'company',
    label: '归属公司',
    type: 'list',
    prefixUrl: 'fams/company',
  },
  {
    prop: 'startTime',
    label: '开始日期',
    type: 'date',
  },
  {
    prop: 'endTime',
    label: '到期日期',
    type: 'date',
  },
  {
    prop: 'annex',
    label: '合同附件',
    type: 'file',
  },
]
const welfareColumns = [
  {
    prop: 'type',
    label: '缴纳类型',
    dictName: 'hrms_welfare_type',
    type: 'dict',
  },
  {
    prop: 'company',
    label: '归属公司',
    type: 'list',
    prefixUrl: 'fams/company',
  },
  {
    prop: 'startTime',
    label: '起缴时间',
    type: 'date',
  },
  {
    prop: 'endTime',
    label: '停缴时间',
    type: 'date',
  },
  {
    prop: 'remark',
    label: '备注',
  },
]
const transferColumns = [
  {
    prop: 'type',
    label: '调动类型',
    dictName: 'hrms_transfer_type',
    type: 'dict',
  },
  {
    prop: 'transferTime',
    label: '调动日期',
    type: 'date',
  },
  {
    prop: 'changeContent',
    label: '变更后',
  },
]
const dimissionColumns = [
  {
    prop: 'leaveTime',
    label: '离职时间',
    type: 'date',
  },
  {
    prop: 'reason',
    label: '离职原因',
  },
  {
    prop: 'dept',
    label: '部门',
  },
]

export { workExpColumns, studyColumns, trainingColumns, certificateColumns, laborContractColumns, welfareColumns, transferColumns, dimissionColumns }