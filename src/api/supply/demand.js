import request from '@/router/request'

const prefixUrl = '/gvs/demand'
const materialUrl = '/gvs/material'
const itemUrl = '/gvs/item'
// 获取需求梳理的表格数据
export function getTableData (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}
// 获取单条数据详情
export function getMatterData (id) {
  return request({
    url: `${prefixUrl}/`+id,
    method: 'get',
  })
}
// 新增
export function postFormData (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
// 更新
export function putFormData (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}
// 删除
export function deleteData (id) {
  return request({
    url: `${prefixUrl}/logic_delete/`+id,
    method: 'post',
  })
}
// 提交
export function submitTj (id) {
  return request({
    url: `${prefixUrl}/submit/`+id,
    method: 'post',
  })
}
// 材料删除
export function deleteMaterialData (id) {
  return request({
    url: `${materialUrl}/logic_delete/`+id,
    method: 'post',
  })
}
// 数据项删除
export function deleteItemData (id) {
  return request({
    url: `${itemUrl}/logic_delete/`+id,
    method: 'post',
  })
}
// 获取部门
export function getDept () {
  return request({
    url: 'admin/dept/list',
    method: 'post',
  })
}
// 下载
export function getSupplyExcelExport () {
  return request({
    url: `/gvs/excel/export`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'arraybuffer',
  }).then(response => {
    // 处理返回的文件流
    const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = '需求梳理导出.xls'
    link.click()
  })
}