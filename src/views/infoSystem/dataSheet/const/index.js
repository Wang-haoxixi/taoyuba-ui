import {
  getDic,
  getDept,
} from '@/util/dic'

import { validatePositive } from '@/util/validate'

let limitLength = (rule, value, callback) => {
  if (validatePositive(value)) {
    callback()
  } else {
    callback(new Error())
  }
}

export const searchOption = [{
    label: '资源提供方',
    prop: 'deptId',
    type: 'select',
    data: getDept(),
  }, {
    label: '数据表名称',
    prop: 'nameCn',
  },
]

export const mainTableOption = {
  page: true,
  menu: false,
  index: true,
  header: false,
  selection: true,
  column: [{
      label: '部门',
      prop: 'deptId',
      type: 'dic',
      dicData: getDept(),
    },
    {
      label: '数据表英文名称',
      prop: 'nameEn',
    },
    {
      label: '数据表中文名称',
      prop: 'nameCn',
    },
    {
      label: '数据库类型',
      prop: 'dbType',
      type: 'dic',
      dicData: getDic('DB_TYPE'),
    },
    {
      label: '所属信息系统',
      prop: 'systemIdForShow',
    },
    {
      label: '是否生成目录',
      prop: 'buildCatalog',
      type: 'dic',
      dicData: getDic('IS_NOT'),
    },
    {
      label: '操作',
      prop: 'menu',
      solt: true,
      width: 250,
    },
  ],
}
export const mainFormOption = {
  menuBtn: false,
  labelWidth: '160',
  labelPosition: 'right',
  column: [{
    label: '所属部门',
    prop: 'deptId',
    type: 'select',
    dicData: getDept(),
    span: 12,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'change',
    }],
  }, {
    label: '数据表英文名称',
    prop: 'nameEn',
    span: 12,
    maxlength: 100,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'blur',
    }],
  }, {
    label: '数据表中文名称',
    prop: 'nameCn',
    maxlength: 100,
    span: 12,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'blur',
    }],
  }, {
    label: '所属数据库',
    prop: 'dbIdForShow',
    span: 12,
    readonly: true,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'blur',
    }],
  }, {
    label: '数据库类型',
    prop: 'dbType',
    type: 'select',
    dicData: getDic('DB_TYPE'),
    span: 12,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'change',
    }],
  }],
}

export const tableOption = {
  index:true,
  indexLabel:'序号',
  header: false,
  page: false,
  menu: false,
  selection: false,
  selectClearBtn: false,
  column: [{
    label: '字段名',
    prop: 'nameCn',
  }, {
    label: '字段中文',
    prop: 'nameEn',
  }, {
    label: '类型',
    prop: 'defaults',
  }, {
    label: '长度',
    prop: 'itemType',
  }, {
    label: '小数位',
    prop: 'isNull',
    type: 'dic',
    dicData: getDic('IS_NOT'),
  }, {
    label: '是否主键',
    prop: 'isKey',
    type: 'dic',
    dicData: getDic('IS_NOT'),
  }, {
    label: '是否为空',
    prop: 'isKey',
    type: 'dic',
    dicData: getDic('IS_NOT'),
  }, {
    label: '默认值',
    prop: 'isKey',
    type: 'dic',
    dicData: getDic('IS_NOT'),
  }, {
    label: '操作',
    prop: 'menu',
    solt: true,
    width: 150,
  }],
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
      type: 'dic',
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

export const elemFormOption = {
  menuBtn: false,
  labelWidth: '160',
  labelPosition: 'right',
  column: [{
    label: '数据字段英文名',
    prop: 'nameEn',
    span: 12,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'blur',
    }],
  }, {
    label: '数据字段中文名',
    prop: 'nameCn',
    span: 12,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'blur',
    }],
  }, {
    label: '数据类型',
    prop: 'type',
    span: 12,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'blur',
    }],
  }, {
    label: '数据长度',
    prop: 'length',
    span: 12,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'blur',
    }],
  }, {
    label: '小数位',
    prop: 'scale',
    type: 'select',
    dicData: getDic('ELEMENT_SCALE'),
    span: 12,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'change',
    }],
  }, {
    label: '是否为空',
    prop: 'scale',
    type: 'select',
    dicData: getDic('ELEMENT_SCALE'),
    span: 12,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'change',
    }],
  }, {
    label: '默认值',
    prop: 'scale',
    type: 'select',
    dicData: getDic('ELEMENT_SCALE'),
    span: 12,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'change',
    }],
  }, {
    label: '是否主键',
    prop: 'scale',
    type: 'select',
    dicData: getDic('ELEMENT_SCALE'),
    span: 12,
    rules: [{
      required: true,
      message: '不能为空',
      trigger: 'change',
    }],
  }],
}

export const fieldTableOption = {
  page: false,
  menu: false,
  index: true,
  header: false,
  selection: true,
  column: [
    { label:'英文名称', prop:'nameEn' },
    { label:'中文名称', prop:'nameCn' },
    { label:'数据类型', prop:'columnType', type: 'dic', dicData: getDic('DATA_TYPE') },
    { label:'数据长度', prop:'columnLength' },
    { label: '操作', prop: 'menu', solt: true },
  ],
}

const updateSpan = 24
export const fieldFormOption = {
  labelWidth: '150',
  menuBtn: false,
  column: [
    {
      label: '数据字段英文名',
      prop: 'nameEn',
      span: updateSpan,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
    },
    {
      label: '数据字段中文名',
      prop: 'nameCn',
      span: updateSpan,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
    },
    {
      label: '数据类型',
      prop: 'columnType',
      span: updateSpan,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('DATA_TYPE'),
    },
    {
      label: '字段长度',
      prop: 'columnLength',
      span: updateSpan,
      rules: [
        { required: true, message: '不能为空', trigger: 'blur' },
        { validator: limitLength, message: '请输入正整数', trigger: 'blur'},
      ],
    },
    {
      label: '小数位',
      prop: 'decimals',
      span: updateSpan,
      rules: [
        { required: true, message: '不能为空', trigger: 'blur' },
        { validator: limitLength, message: '请输入正整数', trigger: 'blur'},
      ],
    },
    {
      label: '是否为空',
      prop: 'isNull',
      span: updateSpan,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('IS_NOT'),
    },
    {
      label: '默认值',
      prop: 'defaults',
      span: updateSpan,
    },
    {
      label: '是否主键',
      prop: 'isKey',
      type: 'select',
      span: updateSpan,
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('IS_NOT'),
    },
  ],
}
