import request from '@/router/request'

export function fetchList (query) {
  return request({
    url: '/admin/token/page',
    method: 'get',
    params: query,
  })
}

export function delObj (id) {
  return request({
    url: '/admin/token/delete/' + id,
    method: 'post',
  })
}
