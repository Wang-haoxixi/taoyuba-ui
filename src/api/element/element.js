import request from '@/router/request'
import exportDownload from '@/util/export'

export function getList (params) {
  return request.get('/directory/govresrc/page', {
    params: params,
  })
}

// 获取目录注册table
export function informationTableList (params) {
  return request({
    url: `/directory/govresrc/page`,
    method: 'get',
    params: params || {},
  })
}
// 目录注册table删除
export function deleteInformation ({id}) {
  return request({
    url: `/directory/govresrc/delete/${id}`,
    method: 'post',
  })
}
// 所属系统名称
export function getSysId () {
  return request({
    url: `/survey/system/vo/map`,
    method: 'get',
  })
}
// 资源提供方
export function getDeptId () {
  return request({
    url: `/admin/dept/list`,
    method: 'get',
  })
}
// 导出
export function getExport (params) {
  return exportDownload({url: `/directory/dirExcel/download_data`, data: params})
}
// 导出的数据
export function getExportData () {
  return request({
    url: `/directory/dirExcel/getFields`,
    method: 'get',
  })
}
// 目录注册新增保存
export function createInformation (params) {
  return request({
    url: `/directory/govresrc/create`,
    method: 'post',
    data: params || {},
  })
}

// 目录注册提交
export function submitInformation (params) {
  return request({
    url: `/directory/govresrc/update-status`,
    method: 'post',
    data: params || {},
  })
}
// 目录注册修改保存
export function updateInformation (params) {
  return request({
    url: `/directory/govresrc/update`,
    method: 'post',
    data: params || {},
  })
}

// 获取信息资源的信息项table
export function elementTableList (params) {
  return request({
    url: `/directory/govresrc/pageList`,
    method: 'get',
    params: params || {},
  })
}
// 获取信息项table
export function elementTableData (params) {
  return request({
    url: `/directory/govelement/page`,
    method: 'get',
    params: params || {}, //
  })
}
// 信息资源模板导出
export function getExportDemo (params) {
  return exportDownload({url: `/directory/govresrc/model_download`, data: params})
}

export function dupChecking (data) {
  return new Promise((resolve, reject)=>{
    request.post('/directory/govresrc/repeat', data).then(res=>{
      if (res.data.data === false) {
        reject()
      } else {
        resolve()
      }
    })
  })
}