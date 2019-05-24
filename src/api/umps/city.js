import request from '@/router/request'

export function getCityTree (query) {
  return request({
    url: '/admin/city/tree',
    method: 'get',
    params: query,
  })
}

export function postCity (obj) {
  return request({
    url: '/admin/city/create',
    method: 'post',
    data: obj,
  })
}

export function getCityById (id) {
  return request({
    url: '/admin/city/' + id,
    method: 'get',
  })
}

export function getCityPage (params) {
  return request({
    url: '/admin/city/cityPage',
    method: 'get',
    params: params,
  })
}

export function deleteCity (id) {
  return request({
    url: '/admin/city/delete/' + id,
    method: 'post',
  })
}

export function putCity (obj) {
  return request({
    url: '/admin/city/update',
    method: 'post',
    data: obj,
  })
}

// 判断城市名是否重复
export function checkCity (params) {
  return request({
    url: '/admin/city/check',
    method: 'post',
    data: params,
  })
}
// 回收箱列表
export function getPageRecycle (params) {
  return request({
    url: '/admin/city/recycle_bin',
    method: 'get',
    params: params || {},
  })
}

// 回收箱还原
export function reductionRecycle (params) {
  return request({
    url: '/admin/city/reduction',
    method: 'post',
    data: params || {},
  })
}

// 回收箱删除
export function deleteRecycle (params) {
  return request({
    url: '/admin/city/real_delete',
    method: 'post',
    data: params || {},
  })
}
