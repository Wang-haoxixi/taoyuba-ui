'use strict'
import Vue from 'vue'
export default function treeToArray (data, expandAll, parent = null, level = 0) {
  let tmp = []
  Array.from(data).forEach(function (record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll)
    }
    const _level = level + 1
    Vue.set(record, '_level', _level)
    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent)
    }
    tmp.push(record)
    if (record.children && record.children.length > 0) {
      const children = treeToArray(record.children, expandAll, record, _level)
      record.childrenLength = children.length
      delete record.children
      tmp.push(...children)
    }
  })
  return tmp
}
/*
function treeToArray1 (data, level = 0) {
  return Array.from(data).map(function (record) {
    const _level = level + 1
    record._level = _level
    // Vue.set(record, "_level", _level);
    if (record.children && record.children.length > 0) {
      record.children = treeToArray(record.children, _level)
    }
    return record
  })
}
*/