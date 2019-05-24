// import {getDic} from '@/util/dic'

// var verificationUsername = (rule, value, callback) => {
//   // console.log(value.indexOf(/(^\s*)|(\s*$)/g,1))
//   var reg = /(^\s+)|(\s+$)/g
//   if(reg.test(value)){
//     callback(new Error("不能使用空格"))
//   }
//   if (!checkSpecificKey(value)) {
//     callback(new Error("不能使用特殊字符"))
//   } else if (value.length <=3 ) {
//     callback(new Error("长度在三个以上字符"))
//   }else{
//     callback()
//   }
// }
// 校验
function checkSpecificKey (str) {
  var specialKey = "[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"
  for (var i = 0; i < str.length; i++) {
    if (specialKey.indexOf(str.substr(i, 1)) != -1) {
      return false
    }
  }
  return true
}

export const searchOption = [
  { label: '用户名', prop: 'username'},
]

export const listQuery = {

}

export let tableOption = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  header: false,
  selection: true,
  menuWidth: '180px',
  indexLabel: '序号',
  index: false,
  align: 'center',
  border: false,
  column: [
    {
      prop: 'id',
      label: 'ID',
      width: '55',
    },
    {
      prop: 'username',
      label: '用户名',
      width: null,
    },
    {
      prop: 'deptName',
      label: '所属部门',
      width: null,
    },
    {
      prop: 'roleList',
      label: '角色',
      width: "180",
      solt: true,
    },
    {
      prop: 'modifiedTime',
      label: '修改时间',
      width: null,
      type: 'date',
    },
  ],
}



// mockColumnMap
const columnMap = [
  {
    prop: 'id',
    label: 'ID',
    width: '55',
  },
  {
    prop: 'username',
    label: '用户名',
    width: null,
  },
  {
    prop: 'deptName',
    label: '所属部门',
    width: null,
  },
  {
    prop: 'roleList',
    label: '角色',
    width: "180",
    type: 'SYSUSERROLELIST',
  },
  {
    prop: 'modifiedTime',
    label: '修改时间',
    width: null,
    type: 'date',
  },
]
var Verification = (rule, value, callback) => {
  // console.log(value.indexOf(/(^\s*)|(\s*$)/g,1))
  var reg = /(^\s+)|(\s+$)/g
  if(reg.test(value)){
    callback(new Error("不能使用空格"))
  }
  if (!checkSpecificKey(value)) {
    callback(new Error("不能使用特殊字符"))
  } else if (value.length <=3 ) {
    callback(new Error("长度在三个以上字符"))
  }else{
    callback()
  }
}
var PasswordVerification = (rule, value, callback) => {
  // console.log(value.indexOf(/(^\s*)|(\s*$)/g,1))
  var reg = /(^\s+)|(\s+$)/g
  if(reg.test(value)){
    callback(new Error("不能使用空格"))
  }
  if (!checkSpecificKey(value)) {
    callback(new Error("不能使用特殊字符"))
  } else if (value.length <= 5 || value.length >= 19) {
    callback(new Error("长度在6~20个字符"))
  }else{
    callback()
  }
}

export let userInfoConfig = {
  columnMap,
  defaultProps: {
    children: 'children',
    label: 'name',
    value: 'id',
  },
  isEdit: true,
  dialogDeptVisible: false,
  showFormInline: true,
  checkUsernameState: {
    state: true,
    const: '',
  },
  isDisabled: {
    0: false,
    1: true,
  },
  rules: {
    username: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
      },
      {
        validator: Verification,
        trigger: ['blur','change'],
      },
    ],
    newpassword1: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur',
      },
      {
        validator: PasswordVerification,
        trigger: ['blur','change'],
      },
    ],
    deptId: [
      {
        required: true,
        message: '请选择部门',
        trigger: 'change',
      },
    ],
    role: [
      {
        required: true,
        type: 'array',
        message: '请选择角色',
        trigger: 'blur',
      },
    ],
  },
  // names:{
  //   username:[
  //     {
  //       validator: verificationUsername,
  //       trigger: ['blur','change'],
  //     },
  //   ],
  // },
}
