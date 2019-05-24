import request from '@/router/request'

export function fetchList (query) {
  return request({
    url: '/admin/social/page',
    method: 'get',
    params: query,
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/social/create',
    method: 'post',
    data: obj,
  })
}

export function getObj (id) {
  return request({
    url: '/admin/social/' + id,
    method: 'get',
  })
}

export function delObj (id) {
  return request({
    url: '/admin/social/delete' + id,
    method: 'post',
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/social/update',
    method: 'post',
    data: obj,
  })
}
