import { mergeByFirst } from '@/util/util'
const dictsMap = {
  status: {
    1: '考核中',
    2: '考核完成',
    3: '已过期',
  },
}

const columnsMap = [
  {
    prop: 'num',
    label: '工号',
  },
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'wages',
    label: '税后工资/实发工资',
  },
  // {
  //   prop: 'assessModule',
  //   label: '考核模板',
  // },
  // {
  //   prop: 'assessePerson',
  //   label: '考核人',
  // },
  // {
  //   prop: 'assessedPerson',
  //   label: '被考核人',
  // },
  // {
  //   prop: 'selfWeight',
  //   label: '员工自评权重',
  // },
  // {
  //   prop: 'personWeight',
  //   label: '考核人评分权重',
  // },
  // {
  //   prop: 'personScoringMethod',
  //   label: '考核人评分方式    ',
  // },
  {
    prop: 'bankSubstituting',
    label: '银行代发',
  },
  {
    prop: 'intranetRelease',
    label: '内网发放',
  },
]

const initForm = () => {
  return {
    id: '',
    assessmentName: '',
    assessmentTime: '',
    assessModule: '',
    assessePerson: '',
    assessedPerson: '',
    selfWeight: '',
    personWeight: '',
    personScoringMethod: '',
  }
}

const initDtoForm = () => {
  return {
    'id': '',
    'name': '',
    'sex': 1,
    'avatar': '',
    'birthday': '',
    'title': '',
    'phone': '',
    'age': '',
    'email': '',
    'height': '',
    'weight': '',
    'nation': '',
    'address': '',
    'politics': '',
    'health': '',
    'marriage': '',
    'bear': 1,
    'university': '',
    'education': 2,
    'relation': '',
    'referrer': '',
    'appWay': 9,
    'source': 4,
    'hobbies': '',
    'advantage': '',
    'honor': '',
    'result': '',
    'positionId': 3,
    'arrive': '',
    'salary': '',
    'workPlace': '',
    'attach': '',
    'workExperience': [],
    'trainingSituation': [],
    'eduSituation': [],
    'userCert': [],
    'blacklistArea': '',
    'blacklistReasons': '',
    'cities': [],
  }
}

const formToDto = (form) => {
  const newForm = mergeByFirst(initDtoForm(), form)
  newForm.positionId = form.position[form.position.length - 1]
  return newForm
}

const initSearchForm = () => {
  return {
    name: '',
    assessName: '',
  }
}

const initPositiveForm = () => {
  return {
    id: '',
    assessName:'',
  }
}
const initrejectedForm = () => {
  return {
    msg: '',

  }
}
export { dictsMap, columnsMap, initPositiveForm, initForm, initSearchForm, initrejectedForm, formToDto }