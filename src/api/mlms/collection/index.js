import request from '@/router/axios'
const prefixUrl = '/mlms/catalogue'
const farelationUrl = '/mlms/farelation'

export function getList (params) {
  return request({
    url: `${prefixUrl}/tree`,
    method: 'get',
    params: params,
  })
}

// 根绝id获取实际数据
export function getListById (params) {
  return request({
    url: `${farelationUrl}/page`,
    method: 'get',
    params: params,
  })
}

// 获取全部
export function getAllList (params) {
  return request({
    url: `${farelationUrl}/all/page`,
    method: 'get',
    params: params,
  })
}

// 新增目录
export function catalogCreate (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

// 修改目录
export function catalogUpdate (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function catalogDelete (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}

// 取消收藏
export function farelationDelete (id) {
  let ids = typeof id === 'object' ? id : [id]
  return request({
    url: `${farelationUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}

// 移动即重新收藏
export function collectUpdate (row) {
  return request({
    url: `${farelationUrl}/update`,
    method: 'post',
    data: row,
  })
}
