import { mergeByFirst } from '@/util/util'
// org config options
const dictsMap = {
  approveResult: {
    0: '未审核',
    1: '通过',
    2: '拒绝',
  },
}

const columnsMap = [
  {
    prop: 'applyType',
    label: '申请类型',
  },
  {
    prop: 'applyStartTime',
    label: '发起时间',
  },
  {
    prop: 'applyEndTime',
    label: '审批时间',
  },
]

const initForm = () => {
  return {
    name: '',//申请人
    applyStartTime: '',//发起时间
    entryTime: '',//入职时间
    departureTime: '',//离职时间
    positionId: '', // 岗位 positionName
    // positionName: '', // 岗位 positionName
    deptId: '', // 所属部门 deptnName
    // deptName: '', // 所属部门 deptnName
    reason: '',//理由
    annex: '',//附件
    approver: '',//审批人
    copyPerson: '',//抄送人
    job: '',//职务
    title: '',//职称
    becomeTime: '',//转正时间
    startTime: '',//开始时间
    endTime: '',//结束时间
    overtime: '',//加班时长
    businessTime: '',//出差时长
    businessPlace: '',//出差地点
    leavingType: '',//请假类型
    leavingTime: '',//请假时长
    transferTime: '',//调岗时间
    isOpen: false,
    intro: '',
  }
}

const initDtoForm = () => {
  return {
    name: '',//申请人
    applyStartTime: '',//发起时间
    entryTime: '',//入职时间
    departureTime: '',//离职时间
    positionId: '', // 岗位 positionName
    // positionName: '', // 岗位 positionName
    deptId: '', // 所属部门 deptnName
    // deptName: '', // 所属部门 deptnName
    reason: '',//理由
    annex: '',//附件
    approver: '',//审批人
    copyPerson: '',//抄送人
    job: '',//职务
    title: '',//职称
    becomeTime: '',//转正时间
    startTime: '',//开始时间
    endTime: '',//结束时间
    overtime: '',//加班时长
    businessTime: '',//出差时长
    businessPlace: '',//出差地点
    leavingType: '',//请假类型
    leavingTime: '',//请假时长
    transferTime: '',//调岗时间
    isOpen: false,
    intro: '',
  }
}

const formToDto = (row) => {
  const newForm = mergeByFirst(initDtoForm(), row)
  newForm.positionId = row.position[row.position.length - 1]
  newForm.deptId = row.dept[row.dept.length - 1]
  return newForm
}

const initSearchForm = () => {
  return {
    name: '',
    sex: '',
  }
}

export { dictsMap, columnsMap, initForm, formToDto, initSearchForm }