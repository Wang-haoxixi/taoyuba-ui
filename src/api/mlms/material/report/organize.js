import request from '@/router/axios'
const prefixUrl = '/mlms/orgreport'

export function getTableData (params) {
  return request({
    url: `${prefixUrl}/list`,
    method: 'post',
    data: params,
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

// 关联纪要
export function getSummaryList (obj) {
  return request({
    url: '/mlms/meeting/summary/list',
    method: 'get',
    params: obj,
  })
}

// 关联产品
export function getProductList (obj) {
  return request({
    url: '/cpms/product/page',
    method: 'get',
    params: obj,
  })
}
