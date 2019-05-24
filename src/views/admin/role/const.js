
function checkSpecificKey (str) {
  var specialKey = "[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"
  if (str !== undefined) {
    for (var i = 0; i < str.length; i++) {
      if (specialKey.indexOf(str.substr(i, 1)) != -1) {
        return false
      }
    }
  }
  return true
}

const Verification = (rule, value, callback) => {
  console.log("value: ", value)
  var reg = /(^\s+)|(\s+$)/g
  if(reg.test(value)){
    callback(new Error("不能使用空格"))
  }
  if (value === undefined || value.length < 3 ) {
    callback(new Error("长度在三个以上字符"))
  } else if (!checkSpecificKey(value)) {
    callback(new Error("不能使用特殊字符"))
  } else {
    callback()
  }
}

export const formOption = {
  selection: false,
  border:true,
  menu: false,
  header: false,
  column: [
    {
      prop: 'id',
      label: '序号',
      width: '120',
    },
    {
      prop: 'roleName',
      label: '角色名称',
      width: 'null',
    },
    {
      prop: 'roleCode',
      label: '角色标识',
      width: null,
    },
    {
      prop: 'roleDesc',
      label: '角色描述',
      width: null,
    },
    {
      prop: 'createTime',
      label: '创建时间',
      type: 'time',
    }, {
      label: '操作',
      prop: 'menu',
      solt: true,
      align: 'center',
    },
  ],
}

export const ruleOption = {
  roleName: [
    {
      required: true,
      message: '不能为空',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 20,
      message: '长度在 3 到 20 个字符',
      trigger: 'blur',
    },
    {
      validator: Verification, 
      trigger: ['blur','change'],
    },
  ],
  roleCode: [
    {
      required: true,
      message: '不能为空',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 20,
      message: '长度在 3 到 20 个字符',
      trigger: 'blur',
    },
    {
      validator: Verification, 
      trigger: ['blur','change'],
    },
  ],
  roleDesc: [
    {
      required: true,
      message: '不能为空',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 20,
      message: '长度在 3 到 20 个字符',
      trigger: 'blur',
    },
    {
      validator: Verification, 
      trigger: ['blur','change'],
    },
  ],
}

export const searchOption = [
  {label: '角色名称', prop: 'roleName'},
]
