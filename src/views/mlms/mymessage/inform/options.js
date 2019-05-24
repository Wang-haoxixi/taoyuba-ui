// org config options
const dictsMap = {
  isOpen: {
    0: '开',
    1: '关',
  },
  status: {
    0: '审核通过',
    1: '待审核',
    2: '审核驳回',
  },
}

const columnsMap = [
  {
    prop: '性别',
    label: '性别',
    width: 55,
    hidden: false,
  },
  {
    prop: '部门',
    label: '部门',
    hidden: false,
  },
  {
    prop: '入职时间',
    label: '入职时间',
    hidden: false,
  },
  {
    prop: '员工状态',
    label: '员工状态',
    hidden: false,
  },
  {
    prop: '岗位',
    label: '岗位',
    hidden: false,
  },
  {
    prop: '身份证号码',
    label: '身份证号码',
    minWidth: 120,
    hidden: true,
  },
]

const initOrgForm = () => {
  return {
    name: '',
    isOpen: false,
    intro: '',
  }
}

const initSearchForm = () => {
  return {
    name: '',
    sex: '',
    organization: '',
    department: '',
    job_category: '',
    job_name: '',
    status: '',
    position: '',
    job_title: '',
    entry_time: '',
  }
}

export { dictsMap, columnsMap, initOrgForm, initSearchForm }