import request from '@/router/request'

export function fetchList (query) {
  return request({
    url: '/admin/relation/type/page',
    method: 'get',
    params: query,
  })
}

export function delObj (id) {
  return request({
    url: `/admin/relation/type/${id}`,
    method: 'delete',
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/relation/type',
    method: 'post',
    data: obj,
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/relation/type',
    method: 'put',
    data: obj,
  })
}
