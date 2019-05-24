// org config options
const dictsMap = {
  startTime: {
    1: '请假开始时间',
    2: '出差开始时间',
    3: '加班开始时间',
    4: '入职时间',
    5: '入职时间',
    6: '入职时间',
  },
  endTime: {
    1: '请假结束时间',
    2: '出差结束时间',
    3: '加班结束时间',
    4: '转正时间',
    5: '离职时间',
    6: '调岗时间',
  },
  status: {
    0: '未审核',
    1: '通过',
    2: '拒绝',
  },
  sStatus: {
    1: '通过',
    2: '拒绝',
  },
}

const columnsMap = [
  {
    prop: 'startTime',
    label: '申请开始时间',
  },
  {
    prop: 'endTime',
    label: '申请结束时间',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
]

const initForm = () => {
  return {
    'id': '', // ID
    'name': '', // 申请人
    'avatar': '', // 头像
    'type': 1, // 
    'deptList': [], // 所属部门
    'approverList':[],
    'attachFile': [], // 附件
    'createTime': '', // 创建时间
    'startTime': '', // 开始时间(1:请假开始时间；2:出差开始时间;3:加班开始时间;4:入职时间;5:入职时间）
    'endTime': '', // 结束时间(1:请假结束时间；2:出差结束时间;3:加班结束时间;4:转正时间;5:离职时间;6:调岗时间）
    'job': '', // 职务
    'title': '', // 职称
    'reason': '', // 申请理由
    'annex': '', // 附件
    'status': 0,
    'processList': [], // 申请流程
    'cc': '', // 抄送人
    'ccList': [], // 抄送人
    'userId': '', // 抄送人
  }
}

const initSearchForm = () => {
  return {
    name: '',
    type: '',
    status: '',
  }
}

export { dictsMap, columnsMap, initForm, initSearchForm }
