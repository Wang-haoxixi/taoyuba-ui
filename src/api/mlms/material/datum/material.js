import request from '@/router/axios'
const prefixUrl = '/mlms/material'

export function getTableData (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}

// 供给邮件关联使用，与上面的链接一模一样
export function getMaterialList (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}

export function getTableDataOnlyMe (params) {
  return request({
    url: `${prefixUrl}/page/personal`,
    method: 'get',
    params: params,
  })
}

export function createData (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function updateData (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function deleteData (id) {
  let ids = typeof id === 'object' ? id : [id]
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}

export function getDataById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

// 文件下载浏览次数统计
export function downloadCount (id) {
  return request({
    url: `${prefixUrl}/getUpload/${id}`,
    method: 'get',
  })
}

// 获取优秀材料
export function getGreatMaterial (id) {
  return request({
    url: `${prefixUrl}/excellent/list/${id}`,
    method: 'get',
  })
}

// 获取材料的总数
export function getMaterialTotal (id) {
  return request({
    url: `${prefixUrl}/total/${id}`,
    method: 'get',
  })
}

// 重名验证
export function validateName (name) {
  return request({
    url: `${prefixUrl}/get/name/${name}`,
    method: 'post',
  })
}

// 判断用户有无联盟
export function getUnion () {
  return request({
    url: `${prefixUrl}/get/union`,
    method: 'post',
  })
}

// 更新版本
export function getVersion (obj) {
  return request({
    url: `${prefixUrl}/get/new/version`,
    method: 'post',
    data: obj,
  })
}
