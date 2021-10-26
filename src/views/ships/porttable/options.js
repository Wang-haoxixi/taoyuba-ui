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
  // {
  //   prop: 'isOpen',
  //   label: '允许加入',
  //   type: 'dict',
  // },
  // {
  //   prop: 'status',
  //   label: '状态',
  //   type: 'dict',
  // },
  // {
  //   prop: 'createTime',
  //   label: '创建时间',
  //   minWidth: 120,
  //   type: 'ldate',
  // }
  // ,
  // {
  //   prop: 'creator',
  //   label: '创建人',
  // },
]

const initForm = () => {
  return {
    latitude: '',
    latitudeBranch: '',
    name: '',
    latitudeDegree: '',
    latitudeDown: '',
    latitudeSecond: '',
    latitudeUp: '',
    longitude: '',
    longitudeBranch: '',
    longitudeDegree: '',
    longitudeDown: '',
    longitudeSecond: '',
    longitudeUp: '',
    id: '',
    distance:'',
  }
}

const initOrgSearchForm = () => {
  return {
    name: '',
  }
}

export { dictsMap, columnsMap, initForm, initOrgSearchForm }