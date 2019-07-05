import { mergeByFirst } from '@/util/util'

const dictsMap = { 
  recruitStatus: {
    0: '待审核', 1: '通过', 2: '不通过',
  },
  // isRcmd: {
  //   0: '不推荐', 1: '推荐',
  // },
}

const columnsMap = [
  {
    prop: 'contactName',
    label: '联系人',
  },
  {
    prop: 'positionId',
    label: '招聘岗位',
    dictName: 'tyb_resume_position',
    type: 'dictGroup',
  },
  {
    prop: 'recruitNo',
    label: '招聘人数',
  },
  {
    prop: 'salary',
    label: '月薪',
  },
  {
    prop: 'updateTime',
    label: '更新时间',
  },
  {
    prop: 'recruitStatus',
    label: '招聘状态',
    type: 'dict',
  },
]

const initForm = () => {                                                
  return {          
    recruitId: '',
    contactName: '', //联系人
    positionId: '', //招聘岗位
    contactPhone: '', //联系电话
    recruitNo: '', //招聘人数
    salary: '面议', //月薪
    salaryCurrency: '', //货币种类
    certRequire: '', //证书要求
    ageRequire: '', //年龄要求
    workMode: '', //作业方式
    province: '',//上船地点
    city: '', //上船地点
    town: '', //上船地点
    hullLength: '', //船长（m）
    totalPower: '', //主机总功率
    certLevel:'',
    certTitle: '',
    shipName: '',
    remark: '',
  }
}

const initDtoForm = () => {
  return {
    recruitId: '',
    contactName: '', //联系人
    positionId: '', //招聘岗位
    contactPhone: '', //联系电话
    recruitNo: '', //招聘人数
    salary: '', //月薪
    salaryCurrency: '', //货币种类
    certRequire: '', //证书要求
    ageRequire: '', //年龄要求
    workMode: '', //作业方式
    province: '',//上船地点
    city: '', //上船地点
    town: '', //上船地点
    hullLength: '', //船长（m）
    totalPower: '', //主机总功率
    certLevel:'',
    certTitle: '',
    shipName: '',
    remark: '',
  }
}

const formToDto = (row) => {
  const newForm = mergeByFirst(initDtoForm(), row)
  return newForm
}

const initSearchForm = () => {
  return {
    contactName: '', // 联系人
    positionId: '', // 招聘岗位
  }
}

const initDtoSearchForm = () => {
  return {
    contactName: '', // 联系人
    positionId: '', // 招聘岗位
  }
}

const toDtoSearchForm = (row) => {
  const newForm = mergeByFirst(initDtoSearchForm(), row)
  newForm.contactName = row.contactName ? row.contactName : null
  newForm.positionId = row.positionId ? row.positionId : null
  return newForm
}

const cellPhone = (rules, value, callback) => {
  if (value !== '') {
    var reg = /(^1[0-9]{10}$)|(^0\d{2,3}-?\d{7,8}$)/
    if (!reg.test(value)) {
      callback(new Error('请输入11位的手机号码'))
    }
  }
  callback()
}

// const amount1 = (rules, value, callback) => {
//   var reg = /^\d{0,3}\.{0,1}(\d{1,2})?$/
//   var num = /^\d{0,100}\.{0,1}(\d{1,2})?$/
//   // var dig = /\./
//   if (!num.test(value)) {
//     callback(new Error('为数字类型且小数点后最多两位'))
//   } else if (!reg.test(value)) {
//     callback(new Error('不超过3位整数'))
//   } 
//   // else if (!dig.test(value)) {
//   //   callback(new Error('必须带小数点，如10.01'))
//   // } 
//   callback()
// }

function isNumberValidate (value, length = 3, decimal = 0) {
  let reg = new RegExp('^\\d{0,' + length + '}$')
  if (decimal === 0) {
    return reg.test(value)
  }
  let reg1 = new RegExp('^\\d{0,' + length + '}\\.\\d{0,' + decimal + '}$')
  return reg.test(value) || reg1.test(value)
}

function numberValidate (rule, value, callback) {
  if (value === '') {
    callback(new Error())
  }else  if (!isNumberValidate(value, rule.length, rule.decimal)){
    callback(new Error())
  }else {
    callback()
  }
}

// const amount = (rules, value, callback) => {
//   var reg = /^[1-9]\d*$/
//   if (!reg.test(value)) {
//     callback(new Error('必须是整数'))
//   } 
//   callback()
// }

const rules = {
  contactName: [
    { required: true, message: '请填联系人', trigger: 'blur' },
    { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur'},
  ],
  positionId: [
    { required: true, message: '请填招聘岗位', trigger: 'blur' },
    { max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur'},
  ],
  contactPhone: [
    { required: true, message: '请填联系电话', trigger: 'blur' },
    { validator: cellPhone, trigger: 'blur'},
  ],
  recruitNo: [
    { required: true, message: '请填招聘人数', trigger: 'blur' },
    { max: 4, message: '不得超过5位数', trigger: 'blur'},
  ],
  salary: [
    { required: true, message: '请填月薪', trigger: 'blur' },
    { max: 10, message: '不得超过10位数', trigger: 'blur'},
  ],
  salaryCurrency: [
    { required: true, message: '请填货币种类', trigger: 'blur' },
  ],
  certRequire: [
    { required: true, message: '请填证书要求', trigger: 'blur' },
  ],
  ageRequire: [
    { required: true, message: '请填年龄要求', trigger: 'blur' },
  ],
  workMode: [
    { required: true, message: '请填作业方式', trigger: 'blur' },
  ],
  hullLength: [
    { required: true, message: '请填船长（m）', trigger: 'blur' },
    // { validator: amount, trigger: 'blur'},
    // { max: 3, message: '不得超过4位数', trigger: 'blur'},
    {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 2, message: '请输入0~999.99的整数或小数！'},
  ],
  totalPower: [
    { required: true, message: '请填主机总功率', trigger: 'blur' },
    // { validator: amount1, trigger: 'blur'},
    {required: true, validator: numberValidate, trigger: 'blur', length: 3, decimal: 2, message: '请输入0~999.99的整数或小数！'},
  ],
  shipName: [
    { required: true, message: '请填船名', trigger: 'blur' },
  ],
  // isRcmd: [
  //   { required: true, message: '请填是否推荐', trigger: 'blur' },
  // ],
}

export { columnsMap, dictsMap, initForm, rules, formToDto, initSearchForm, toDtoSearchForm }