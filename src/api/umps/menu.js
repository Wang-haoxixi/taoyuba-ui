import request from '@/router/request'
export function GetMenu () {
  return request({
    url: '/admin/menu/userMenu',
    method: 'get',
  })
}
export function GetMockMenu () {
  return request({
    url: '/admin/menu/userMockMenu',
    method: 'get',
  })
}
export function fetchTree (query) {
  return request({
    url: '/admin/menu/allTree',
    method: 'get',
    params: query,
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/menu/create',
    method: 'post',
    data: obj,
  })
}

// 验证
export function VerificationAddObj (obj) {
  return request({
    url: '/admin/menu/check',
    method: 'post',
    data: obj,
  })
}

export function checkId (obj) {
  return request({
    url: '/admin/menu/check',
    method: 'post',
    data: obj,
  })
}

export function getObj (id) {
  return request({
    url: '/admin/menu/' + id,
    method: 'get',
  })
}

export function delObj (id) {
  return request({
    url: '/admin/menu/delete/' + id,
    method: 'post',
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/menu/update',
    method: 'post',
    data: obj,
  })
}

// 回收箱列表
export function getPageRecycle (params) {
  return request({
    url: '/admin/menu/recycle_bin',
    method: 'get',
    params: params || {},
  })
}

// 回收箱还原
export function reductionRecycle (params) {
  return request({
    url: '/admin/menu/reduction',
    method: 'post',
    data: params || {},
  })
}

// 回收箱删除
export function deleteRecycle (params) {
  return request({
    url: '/admin/menu/real_delete',
    method: 'post',
    data: params || {},
  })
}
