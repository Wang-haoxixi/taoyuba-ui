// import { getCiphers } from "crypto";
import { getDic } from '@/util/dic'

const validateDatabaseName = (rule, value, callback) => {
  let reg = /(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)/
  if (!reg.test(value)) {
    callback(new Error('您输入的数据库名称格式不正确'))
  } else {
    callback()
  }
}
const validateSheetName = (rule, value, callback) => {
  let reg = /(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)/
  if (!reg.test(value)) {
    callback(new Error('您输入的表名称格式不正确'))
  } else {
    callback()
  }
}
const validateFieldName = (rule, value, callback) => {
  let reg = /(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)/
  if (!reg.test(value)) {
    callback(new Error('您输入的字段名称格式不正确'))
  } else {
    callback()
  }
}

// 表单
export const standardata = {
    page: true,
    menu: false,
    index: false,
    header: false,
    selection: true,
    column: [
      {
        label: "ID",
        prop: "id",
        width: 50,
        align: 'center',
      }, {
        label: "表名",
        prop: "tableName",
        rules: [
          { },

        ],
        maxlength: 50,
      }, {
        label: "表注释",
        prop: "tableNotes",
        maxlength: 100,
      }, {
        label: "引擎类型",
        prop: "tableEngine",
        type: 'dic',
        dicData: getDic('TABLE_ENGINE'),
      }, {
        label: "更新人",
        prop: "modifiedByForShow",
        maxlength: 50,
      }, {
        label: "更新时间",
        prop: "modifiedTime",
        maxlength: 50,
      }, {
        label: '操作',
        solt: true,
        prop: 'menu',
      },
    ],
}

export const standarTableOption = {
  page: true,
  menu: false,
  index: false,
  header: false,
  selection: false,
  column: [
    {
      label: '字段名称',
      prop: 'fieldName',
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'blur',
      }, {
        validator: validateFieldName,
        trigger: 'blur',
      }],
    }, {
      label: '类型',
      prop: 'fieldType',
      type: 'dic',
      dicData: getDic('FIELD_TYPE'),
    }, {
      label: '是否为空',
      prop: 'isNull',
      type: 'dic',
      dicData: getDic('IS_NOT'),
    }, {
      label: '是否主键',
      prop: 'isPrimaryKey',
      type: 'dic',
      dicData: getDic('IS_NOT'),
    }, {
      label: '注释',
      prop: 'fieldNotes',
      overHidden: true,
    }, {
      label: '菜单',
      prop: 'menu',
      solt: true,
    },
  ],
}

export const standardataFormOption = {
  menuBtn: false,
  labelWidth: '160',
  labelPosition: 'right',
  column: [
    {
      label: '表名称',
      prop: 'tableName',
      span: 24,
      maxlength: 100,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'blur',
      }, {
        validator: validateSheetName,
        trigger: 'blur',
      }],
    }, {
      label: '数据库引擎',
      type: 'select',
      dicData: getDic('TABLE_ENGINE'),
      prop: 'tableEngine',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'change',
      }],
    }, {
      label: '表注释',
      type: 'textarea',
      minRows: 8,
      maxRows: 8,
      prop: 'tableNotes',
      span: 24,
      maxlength: 255,
    },
  ],
}

export const dataBaseFormOption = {
  menuBtn: false,
  labelWidth: '160',
  labelPosition: 'right',
  column: [
    {
      label: '数据库名称',
      prop: 'dbName',
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'blur',
      }, {
        validator: validateDatabaseName,
        trigger: 'blur',
      }],
      maxlength: 100,
    }, {
      label: '数据库字符集',
      prop: 'dbCharacterSet',
      type: 'select',
      dicData: getDic('CHARACTER_SET'),
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'change',
      }],
    }, {
      label: '数据库类型',
      prop: 'dbType',
      type: 'select',
      dicData: getDic('DATABASE_FORMAT'),
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'change',
      }],
    }, {
      label: '注释',
      prop: 'dbNotes',
      maxlength: 100,
    },
  ],
}