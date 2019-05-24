import {getStore} from './store'
import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'

export function getDicAll () {
  return getStore({name: 'dicList'})
}

function getDeptAll () {
  return getStore({
    name: 'departmentList',
  })
}

export function getDic (name = '') {
  if (name === '') {
    console.warn('字典名不能为空')
    return
  }
  let dicList = getDicAll()
  return dicList[name]
}

export function getDept () {
  let deptList = getDeptAll()
  return deptList
}

export function setDicList (dicList) {
  if (!isPlainObject(dicList)) {
    console.warn('数据格式不正确，应为对象')
    return
  }
  let data = {}
  for (let key in dicList) {
    let arr = []
    xhDic(dicList[key], arr)
    data[key] = arr
  }
  return data
}

export function changeDicType (list) {
  let change = function (list) {
    for (var item of list) {
      item.value = parseInt(item.value)
      if (item.children) item.children = change(item.children)
    }
    return list
  }
  return change(list)
}

function xhDic (data, arr) {
  if (!isArray(data)) {
    console.warn('数据格式不正确，应为數組')
    return
  }
  for (let i = 0, len = data.length; i < len; i++) {
    var obj = {value: data[i].key, label: data[i].value}
    if (data[i].dictValueList && data[i].dictValueList.length > 0) {
      obj.children = []
      xhDic(data[i].dictValueList, obj.children)
    }
    arr.push(obj)
  }
}

// 根据部门的id获取整个部门对象
export function getDeptById (id) {
  for (let item of getDept()) {
    if (item.value === id) {
      return item
    }
  }
  return {}
}
