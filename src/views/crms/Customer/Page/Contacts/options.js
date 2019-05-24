const columnsMap = [
  { label: '联系人职务', prop: 'contactPosition' },
  { label: '电话', prop: 'telephoneNo' },
]
const initForm = () => {
  return {
    contactName: '', //联系人姓名
    contactPosition: '', //联系人职务
    telephoneNo: '', //电话
    fax: '', //传真
    qq: '', //QQ
    wechat: '', //微信
    email: '', //邮箱
    cellphone: '', //手机
    address: '', //地址
    clientConcern: '', //客户关注
    other: '', //其他
    clientContactId: '',
    clientIds: [0],
  }
}
const cellPhone = (rules, value, callback) => {
  if (value !== '') {
    var reg = /^1[3456789]\d{9}$/
    if (!reg.test(value)) {
      callback(new Error('请输入有效的手机号码'))
    }
  }
  callback()
}
// const telPhone = (rules, value, callback) => {
//   if (value === '') {
//     callback(new Error('电话不可为空'))
//   } else {
//     if (value !== '') {
//       var reg = /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/
//       if (!reg.test(value)) {
//         callback(new Error('请输入有效的电话号码'))
//       }
//     }
//     callback()
//   }
// }
const fax = (rules, value, callback) => {
  if (value !== '') {
    var reg = /^(\d{3,4}-)?\d{7,8}$/
    if (!reg.test(value)) {
      callback(new Error('请输入有效的传真'))
    }
  }
  callback()
}
const rules = {
  contactName: [
    { required: true, message: '联系人姓名不能为空', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
  ],
  contactPosition: [
    { required: true, message: '联系人职务不能为空', trigger: 'blur' },
    { max: 20, message: '不能超过20个字符', trigger: 'blur' },
  ],
  // telephoneNo: [{ required: true, validator: telPhone, trigger: 'blur' }],
  cellphone: [{ validator: cellPhone, trigger: 'blur' }],
  address: [
    { message: '请填写地址', trigger: 'blur' },
    { max: 255, message: '长度不可超过255个字符', trigger: 'blur' },
  ],
  fax: [{ validator: fax, trigger: 'blur' }],
  qq: [{ max: 11, message: '昵称，电话或者qq号', trigger: 'blur' }],
  wechat: [{ max: 20, message: '长度不可超过20个字符', trigger: 'blur' }],
  email: [
    { message: '请输入邮箱地址', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change'],
    },
  ],
  clientConcern: [
    { max: 255, message: '长度不可超过255个字符', trigger: 'blur' },
  ],
  other: [{ max: 255, message: '长度不可超过255个字符', trigger: 'blur' }],
}
export { columnsMap, initForm, rules }
