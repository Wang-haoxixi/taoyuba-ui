import request from '@/router/request'

export function fetchList (query) {
  return request({
    url: '/admin/client/page',
    method: 'get',
    params: query,
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/client/create',
    method: 'post',
    data: obj,
  })
}

export function getObj (id) {
  return request({
    url: '/admin/client/' + id,
    method: 'get',
  })
}

export function delObj (id) {
  return request({
    url: '/admin/client/delete/' + id,
    method: 'post',
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/client/update',
    method: 'post',
    data: obj,
  })
}
