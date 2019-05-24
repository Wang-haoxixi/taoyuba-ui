var validateNumber = (rule, value, callback) => {
  let reg = /(^\s+)|(\s+$)/g
  if(value.length < 3 ){
    callback(new Error("长度在三个字符以上"))
  }else if (!checkSpecificKey(value)) {
    callback(new Error("不能使用特殊字符"))
  }else if(reg.test(value)){
    callback(new Error("不能使用空格"))
  }else{
    callback()
  }
}
var validateKeyValue = (rule, value, callback) => {
  let reg = /(^\s+)|(\s+$)/g
  if (!checkSpecificKey(value)) {
    callback(new Error("不能使用特殊字符"))
  }else if(reg.test(value)){
    callback(new Error("不能使用空格"))
  }else{
    callback()
  }
}
var validatePrice = (rule, value, callback) => {
  let reg = /(^\s+)|(\s+$)/g
  if(reg.test(value)){
    callback(new Error("不能使用空格"))
  }else if (!checkSpecificKey(value)) {
    callback(new Error("不能使用特殊字符"))
  }else{
    callback()
  }
}

// 校验
function checkSpecificKey (str) {
  // console.log('str:',str)
  if(str !== undefined){
    var specialKey = "[`~!@#$%^&*|{}':;',\\[\\]./?~！#￥……&*——|{}【】‘；：”“'。，、？]‘'"
    for (var i = 0; i < str.length; i++) {
      if (specialKey.indexOf(str.substr(i, 1)) != -1) {
        return false
      }
    }
    return true
  }else{
    return false
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
      label: 'ID',
      width: '55',
    },
    {
      prop: 'number',
      label: '字典编码',
    },
    {
      prop: 'name',
      label: '字典名称',
    },
    {
      prop: 'system',
      label: '所属系统',
    },
    {
      prop: 'createTime',
      label: '创建时间',
      type: "date",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
    },
    {
      prop: 'updateTime',
      label: '更新时间',
      type: "date",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
    },
    {
      label: '操作',
      prop: 'menu',
      solt: true,
      align: 'center',
    },
  ],
}

export const columnMap = [
  {
    prop: 'id',
    label: 'ID',
    width: '55',
  },
  {
    prop: 'number',
    label: '字典编码',
  },
  {
    prop: 'name',
    label: '字典名称',
  },
  {
    prop: 'system',
    label: '所属系统',
  },
  {
    prop: 'createTime',
    label: '创建时间',
    type: 'time',
  },
  {
    prop: 'updateTime',
    label: '更新时间',
    type: 'time',
  },
]
export const dataConfig = {
  loading:false,
  dialogFormVisible: false,
  dialogFormChildVisible: false,
  importDialogShow: false,
  dialogStatus: '',
  importUrl: '',
  importTypeName: '',
  textMap: {
    update: '编辑',
    create: '创建',
  },
  rules:{
    number:[
      { validator: validateNumber, trigger: 'change' },
    ],
    name:[
      { validator: validateNumber, trigger: 'change' },
    ],
    key:[
      { required: true, message: '不能为空', trigger: 'blur' },
      { validator: validateKeyValue, trigger: 'change' },
    ],
    value:[
      { required: true, message: '不能为空', trigger: 'blur' },
      { validator: validatePrice, trigger: 'change' },
    ],
    sort:[
      { validator: validateKeyValue, trigger: 'change' },
    ],
  },
}

export const searchOption = [
  {label: '字典名称', prop: 'name'},
]
