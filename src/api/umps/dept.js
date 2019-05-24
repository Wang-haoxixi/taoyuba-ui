import request from '@/router/request'

export function getDeptTree (query) {
  return request({
    url: '/admin/dept/tree',
    method: 'get',
    params: query,
  })
}

export function postDept (obj) {
  return request({
    url: '/admin/dept/create',
    method: 'post',
    data: obj,
  })
}

export function getByCity (id) {
  return request({
    url: 'admin/dept/list/' + id,
    method: 'get',
  })
}

export function getDeptById (id) {
  return request({
    url: '/admin/dept/' + id,
    method: 'get',
  })
}

export function getDeptPage (params) {
  return request({
    url: '/admin/dept/deptPage',
    method: 'get',
    params: params,
  })
}

export function deleteDept (id) {
  return request({
    url: '/admin/dept/delete/' + id,
    method: 'post',
  })
}

export function putDept (obj) {
  return request({
    url: '/admin/dept/update',
    method: 'post',
    data: obj,
  })
}

export function checkName (obj) {
  return request({
    url: '/admin/dept/check',
    method: 'post',
    data: obj,
  })
}

// 回收箱列表
export function getPageRecycle (params) {
  return request({
    url: '/admin/dept/recycle_bin',
    method: 'get',
    params: params || {},
  })
}

// 回收箱还原
export function reductionRecycle (params) {
  return request({
    url: '/admin/dept/reduction',
    method: 'post',
    data: params || {},
  })
}

// 回收箱删除
export function deleteRecycle (params) {
  return request({
    url: '/admin/dept/real_delete',
    method: 'post',
    data: params || {},
  })
}
