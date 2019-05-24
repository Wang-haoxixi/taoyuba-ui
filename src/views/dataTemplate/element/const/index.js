import {getDic} from '@/util/dic'



let validateEnglish = (rule, value, callback) => {
  let reg = /^[0-9a-zA-Z\s_]+$/g
  let blank_reg = /^\s/g
  if(value === ''){
    callback()
  }else if(blank_reg.test(value)){
    callback(new Error("首字母不能为空格"))
  }else if(!reg.test(value)){
    callback(new Error("只能输入英文和数字"))
  }else{
    callback()
  }
}


let validateNumber = (rule, value, callback) => {
  let reg = /^[0-9]+$/g
  if(value === ''){
    callback()
  }else if(!reg.test(value)){
    callback(new Error("只能输入数字"))
  }else{
    callback()
  }
}
export let column = [
  {
    label: '数据元中文名称',
    prop: 'dtEleChnNm',
    span: 12,
    maxlength: 50,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'blur',
    }],
  },
  {
    label: '数据元英文名称',
    prop: 'dtEleEgNm',
    span: 12,
    maxlength: 125,
    rules: [{
      validator: validateEnglish,
      trigger: 'blur',
    }],
  },
  {
    label: '定义说明',
    prop: 'defDesc',
    span: 24,
    type: 'textarea',
    maxlength: 200,
  },
  {
    label: '数据类型',
    prop: 'dtType',
    span: 12,
    type: 'select',
    dicData: getDic('MODEL_DATA_TYPE'),
  },
  {
    label: '数据长度',
    prop: 'dtLgth',
    span: 12,
    maxlength: 6,
    rules: [{
      validator: validateNumber,
      trigger: 'blur',
    }],
  },
  {
    label: '小数位',
    prop: 'deciPl',
    span: 12,
    maxlength: 6,
    rules: [{
      validator: validateNumber,
      trigger: 'blur',
    }],
  },
  {
    label: '领域分类',
    prop: 'dmnClsId',
    span: 12,
    type: 'select',
    dicData: [],
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'change',
    }],
  },
  {
    label: '引用标准',
    prop: 'stdDocId',
    span: 12,
    type: 'select',
    dicData: [],
    filterable: true,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'blur',
    }],
    change: function () {

    },
  },
  {
    label: '代码集',
    prop: 'cdCollId',
    span: 12,
    filterable: true,
    type: 'select',
    dicData: [],
  },
  {
    label: '数据集',
    prop: 'dtCollId',
    span: 12,
    type: 'select',
    filterable: true,
    dicData: [],
  },
  {
    label: '备注',
    prop: 'remrk',
    span: 12,
    maxlength: 200,
  },
]

export const tableOption = {
  selection: true,
  border: false,
  menu: false,
  header: false,
  column: [
    {
      label: '数据元中文名称',
      prop: 'dtEleChnNm',
    },
    {
      label: '领域分类',
      prop: 'dmnClsId',
      type: 'dic',
      dicData: [],
    },
    {
      label: '引用标准',
      prop: 'stdDocIdForShow',
    },
    {
      label: '操作',
      prop: 'menu',
      solt: true,
    },
  ],
}


// 查看
export const detailOption = {
  option: [
    {
      column,
    },
  ],
}

export const editOption = {
  menuBtn: false,
  labelWidth: 140,
  column,
}

export let searchOption = [
  { label: '数据元中文名称', prop: 'dtEleChnNm', placeholder: '请输入数据元名称' },
  { label: '领域分类', prop: 'dmnClsId', placeholder: '请输入领域分类名称', type: 'select', data: [] },
  { label: '引用标准', prop: 'stdDocId', placeholder: '请输入引用标准', type: 'select', data: [] },
]

export let form = {
  id: '',
  dtEleChnNm: '',
  dtEleEgNm: '',
  defDesc: '',
  dmnClsId: '',
  dtType: '',
  dtLgth: '',
  deciPl: '',
  stdDocId: '',
  cdCollId: '',
  dtCollId: '',
  remrk: '',
}
