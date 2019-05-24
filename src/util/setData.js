import {getDicAll} from '@/util/dic'
import mergeWith from 'lodash/mergeWith'
/**
* 数据格式
* 如：
* [
*   {
      label: '中文名称',
      prop: 'chName',
      span: 24,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      type: 'input',
      multiple: true,
      dicName: 'IS_NOT', 字典名
    }
* ]
* 
*/
export function setAvueData ({data = [], options = [], tableParam = {}, formParam = {}}) {
  let avueData = {
    table: {
      addBtn: false,
      editBtn: false,
      delBtn: false,
      header: false,
      column: [],
    },
    form: {
      labelWidth: '150',
      menuBtn: false,
      column: [],
    },
    detail: {
      option: [
        {
          column: [],
        },
      ],
    },
  }
  avueData.table = mergeWith(avueData.table, tableParam)
  avueData.form = mergeWith(avueData.form, formParam)

  let dicList = getDicAll().concat(options)

  for (let i = 0, len = data.length; i < len; i++) {
    avueData.table.column.push(getColumn(data[i], dicList, 'table'))
    avueData.form.column.push(getColumn(data[i], dicList, 'form'))
    avueData.detail.option[0].column.push(getColumn(data[i], dicList, 'detail'))
  }
  return avueData
}

function getColumn (data, options, type) {
  let column = {}
  if (type === 'table' || type === 'detail') {
    column.label = data.label
    column.prop = data.prop
    if (data.dicName) {
      column.type = 'dic'
      column.dicData = options[data.dicName]
    }
    if (type === 'detail') {
      column.span = data.span || 24
    }
  } else if (type === 'form') {
    let currentData = Object.assign({}, data)
    if (data.dicName) {
      column.dicData = options[data.dicName]
    }
    delete currentData.dicName
    column = mergeWith(column, currentData)
  }
  return column
}
