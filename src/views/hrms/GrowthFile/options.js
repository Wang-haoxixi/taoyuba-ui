const simpleEmployeeStatus = {
  0: '暂无',
  1: '在职',
  2: '在职',
  3: '在职',
  4: '兼职',
  5: '其他',
  6: '离职',
}
const recordType = [
  {
    label: '人事变动',
    value: 1,
  },
  {
    label: '评价记录',
    value: 2,
  },
  {
    label: '考试情况',
    value: 3,
  },
  {
    label: '奖惩信息',
    value: 4,
  },
  {
    label: '培训记录',
    value: 5,
  },
]

const initForm = () => {
  return {
    avatar: '',
    createTime: '',
    id: '',
    idCard: '',
    isExpert: '',
    job: '',
    jobId: '',
    name: '',
    position: '',
    positionId: '',
    professionalTitleId: '',
    sex: '',
    staffNo: '',
    status: '',
    timeLineList: [],
    abilityTag: [],
    projectTag: [],
    learningTag: [],
    title: '',
    updateTime: '',
  }
}

export { simpleEmployeeStatus, recordType, initForm }