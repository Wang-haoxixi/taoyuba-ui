const columnsMap = [
  { label: '联系人姓名', prop: 'contactName', width: '250' },
  {
    prop: 'contactPosition',
    label: '联系人职务',
  },
]

const initForm = () => {
  return {
    contactName: '', //联系人姓名
    contactPosition: '', //联系人职务
    telephoneNo: '', //电话
    clientIds: [], //对接客户
    cellphone: '', //手机
    fax: '', //传真
    qq: '', //qq
    wechat: '', //微信
    email: '', //邮箱
    address: '', //地址
    clientConcern: '', //客户关注
    other: '', //其他
    clientInfos: [],
    clientContactId: '',
  }
}
const initSearchForm = () => {
  return {
    contactName: '',
    clientName: '',
  }
}
// const telPhone = (rules, value, callback) => {
//   if (value === '') {
//     callback(new Error('电话不可为空'))
//   } else {
//     if (value !== '') {
//       var reg = /(^1[0-9]{10}$)|(^0\d{2,3}-?\d{7,8}$)/
//       if (!reg.test(value)) {
//         callback(new Error('请输入有效的电话号码'))
//       }
//     }
//     callback()
//   }
// }
const cellPhone = (rules, value, callback) => {
  if (value !== '') {
    var reg = /(^1[0-9]{10}$)|(^0\d{2,3}-?\d{7,8}$)/
    if (!reg.test(value)) {
      callback(new Error('请输入有效的电话号码'))
    }
  }
  callback()
}
const rules = {
  contactName: [
    { required: true, message: '请输入联系人姓名', trigger: 'blur' },
    { max: 20, message: '长度不可超过20个字符', trigger: 'blur' },
  ],
  contactPosition: [
    { required: true, message: '请输入联系人职务', trigger: 'blur' },
    { max: 255, message: '长度不可超过255个字符', trigger: 'blur' },
  ],
  // telephoneNo: [
  //   {
  //     required: true,
  //     validator: telPhone,
  //     trigger: 'blur',
  //   },
  // ],
  address: [
    { message: '请填写地址', trigger: 'blur' },
    { max: 255, message: '长度不可超过255个字符', trigger: 'blur' },
  ],
  clientInfos: [{ required: true, message: '请选择对应客户', trigger: 'blur' }],
  cellphone: [{ validator: cellPhone, trigger: 'blur' }],
  fax: [{ max: 255, message: '长度不可超过255个字符', trigger: 'blur' }],
  qq: [{ min: 5, max: 11, message: '长度为5-11位数字', trigger: 'blur' }],
  wechat: [{ max: 20, message: '长度不可超过20个字符', trigger: 'blur' }],
  email: [
    { message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
  ],
  clientConcern: [
    { max: 255, message: '长度不可超过255个字符', trigger: 'blur' },
  ],
  other: [{ max: 255, message: '长度不可超过255个字符', trigger: 'blur' }],
}
export { columnsMap, initForm, rules, initSearchForm }
