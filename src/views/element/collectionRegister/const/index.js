import {
  getDic,
  getDept,
} from '@/util/dic'

const validateSheetName = (rule, value, callback) => {
  let reg = /(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)/
  if (!reg.test(value)) {
    callback(new Error('您输入的表英文名称格式不正确'))
  } else {
    callback()
  }
}


export const searchOption = [{
    label: '状态',
    prop: 'collectStatus',
    type: 'select',
    data: getDic('COLLECT_STATUS'),
  }, {
    label: '信息资源提供方',
    prop: 'deptId',
    type: 'select',
    data: getDept(),
  }, {
    label: '信息资源名称',
    prop: 'nameCn',
    maxlength: 100,
  }, {
    label: '表英文名',
    prop: 'nameEn',
    maxlength: 100,
  },
]

export const mainTableOption = {
  page: true,
  menu: false,
  index: false,
  header: false,
  selection: false,
  column: [{
      label: '信息资源名称',
      prop: 'nameCn',
      maxlength: 100,
    }, {
      label: '表英文名',
      prop: 'nameEn',
      maxlength: 100,
    }, {
      label: '信息资源提供方',
      prop: 'deptId',
      type: 'dic',
      dicData: getDept(),
    }, {
      label: '状态',
      prop: 'collectStatus',
      solt: true,
      type: 'dic',
      dicData: getDic('COLLECT_STATUS'),
    }, {
      label: '操作',
      prop: 'menu',
      solt: true,
      width: 300,
    },
  ],
}
export const mainFormOption = {
  menuBtn: false,
  labelWidth: '160',
  labelPosition: 'right',
  column: [{
    label: '归集部门',
    prop: 'deptId',
    type: 'select',
    dicData: getDept(),
    disabled: true,
    span: 12,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'change',
    }],
  }, {
    label: '生成类型',
    prop: 'buildType',
    type: 'select',
    disabled: true,
    dicData: getDic('ELEMENT_BUILD_TYPE'),
    span: 12,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'change',
    }],
  }, {
    label: '表名',
    prop: 'nameCn',
    span: 12,
    readonly: true,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'blur',
    }],
    maxlength: 100,
  }, {
    label: '表英文名',
    prop: 'nameEn',
    span: 12,
    rules: [
      { required: true, message: '不能为空', trigger: 'blur' },
      { validator: validateSheetName, trigger: 'blur' },
    ],
    maxlength: 100,
  }, {
    label: '存量数据规模',
    prop: 'scale',
    type: 'select',
    dicData: getDic('ELEMENT_SCALE'),
    span: 12,
  }, {
    label: '对接方式',
    prop: 'buttMode',
    span: 12,
    type: 'select',
    dicData: getDic('ELEMENT_BUTTMODE'),
  }, {
    label: '归集更新频率',
    prop: 'updateCycle',
    span: 12,
    type: 'select',
    dicData: getDic('ELEMENT_RENEW_FREQUENCY'),
  }, {
    label: '非实时理由',
    prop: 'timeReason',
    span: 12,
    maxlength: 100,
  }, {
    label: '数据范围',
    prop: 'ranges',
    type: 'select',
    span: 12,
    dicData: getDic('ELEMENT_NING_DATA'),
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'change',
    }],
  }, {
    label: '文件存储地址',
    prop: 'address',
    span: 12,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'blur',
    }],
    maxlength: 100,
  }, {
    label: '表数据来源开发厂商',
    prop: 'developer',
    span: 12,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'blur',
    }],
    maxlength: 100,
  }, {
    label: '数据用途',
    prop: 'dataUsed',
    type: 'select',
    dicData: getDic('DATA_PURPOSE'),
    span: 12,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'change',
    }],
  }, {
    label: '材料类型',
    prop: 'materialType',
    type: 'select',
    span: 12,
    dicData: getDic('ELEMENT_MATERIAL_TYPE'),
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'change',
    }],
  }, {
    label: '联系人',
    prop: 'linkman',
    span: 12,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'blur',
    }],
    maxlength: 100,
  }, {
    label: '联系电话',
    prop: 'linkphone',
    span: 12,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'blur',
    }],
    maxlength: 100,
  }],
}



export const tableOption = {
  header: false,
  page: false,
  menu: false,
  selection: false,
  selectClearBtn: false,
  column: [{
    width: 50,
    align: 'center',
    label: '',
    prop: 'selection',
    solt: true,
  }, {
    label: '字段名',
    prop: 'nameCn',
  }, {
    label: '字段英文名',
    prop: 'nameEn',
  }, {
    label: '默认值',
    prop: 'defaults',
  }, {
    label: '字段类型',
    prop: 'itemTypeList',
    type: 'dic',
    dicData: getDic('DATA_TYPE'),
  }, {
    label: '字段长度',
    prop: 'itemLength',
  }, {
    label: '是否为空',
    prop: 'isNull',
    type: 'dic',
    dicData: getDic('IS_NOT'),
  }, {
    label: '是否主键',
    prop: 'isKey',
    type: 'dic',
    dicData: getDic('IS_NOT'),
  } ],
}


export const informationTableOption = {
  header: false,
  page: false,
  menu: false,
  selection: false,
  selectClearBtn: false,
  column: [{
      label: '信息资源名称',
      prop: 'name',
    },
    {
      label: '资源提供方',
      prop: 'deptIdForShow',
    },
    {
      label: '信息资源格式',
      prop: 'fmtList',
      type: 'cascader',
      dicData: getDic('FMT'),
    },
    {
      label: '目录状态',
      prop: 'status',
      type: 'dic',
      dicData: getDic('INFORMATION_STATUS'),
    },
    {
      label: '操作',
      prop: 'menu',
      solt: true,
    },
  ],
}

export const informationDetailOption = {
  option: [{
    column: [{
        label: '信息资源名称',
        prop: 'name',
        span: 12,
      },
      {
        label: '资源提供方',
        prop: 'deptIdForShow',
        span: 12,
      },
      {
        label: '所属目录资源分类',
        prop: 'resType',
        span: 12,
        type: 'dic',
      },
      {
        label: '信息资源代码',
        prop: 'number',
        span: 12,
      },
      {
        label: '信息资源摘要',
        prop: 'summ',
        span: 12,
      },
      {
        label: '所属系统名称',
        prop: 'surveyIdList',
        span: 12,
        type: 'dic',
      },
      {
        label: '信息资源格式',
        prop: 'fmtList',
        type: 'dic',
        span: 12,
        dicName: 'FMT',
      },
      {
        label: '主题分类',
        prop: 'topicType',
        type: 'dic',
        span: 12,
        dicName: 'TOPIC_TYPE',
      },
      {
        label: '重点领域分类',
        prop: 'areaTypeList',
        type: 'dic',
        span: 12,
        dicName: 'AREA_TYPE',
      },
      {
        label: '更新周期',
        prop: 'updCycle',
        span: 12,
        type: 'dic',
        dicName: 'UPD_CYCLE',
      },
      {
        label: '共享类型',
        prop: 'sharingType',
        span: 12,
        type: 'dic',
        dicName: 'SHARING_TYPE',
      },
      {
        label: '共享条件',
        prop: 'sharingCond',
        span: 12,
      },
      {
        label: '共享方式',
        prop: 'sharingModeList',
        span: 12,
        type: 'dic',
        dicName: 'SHARING_MODE',
      },
      {
        label: '是否向全社会开放',
        prop: 'isOpen',
        span: 12,
        type: 'dic',
        dicName: 'IS_NOT',
      },
      {
        label: '开放条件',
        prop: 'openCond',
        span: 12,
        visdiplay: false,
      },
      {
        label: '关联资源代码',
        prop: 'rescode',
        span: 12,
      },
      {
        label: '发布日期',
        prop: 'createTime',
        span: 12,
      },
      {
        label: '来源',
        prop: 'isExcelForShow',
        span: 12,
      },
    ],
  } ],
}

// export const informationTableOption = {
//   header: false,
//   page: false,
//   menu: false,
//   selection: false,
//   selectClearBtn: false,
//   column: [
//     {label:'中文名称', prop:'chName'},
//     {label:'英文名称', prop:'enName'},
//     {label:'数据类型', prop:'dataTypeList', type: 'dic', dicData: getDic('DATA_TYPE')},
//     {label:'数据长度', prop:'dataLength'},
//     {label:'共享类型', prop:'sharingModeList', type: 'dic', dicData: getDic('SHARING_TYPE')},
//     {label:'开放属性', prop:'isOpen', type: 'dic', dicData: getDic('IS_NOT')},
//   ],
// }
