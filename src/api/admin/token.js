import request from '@/router/request'

export function getList (query) {
  return request({
    url: '/admin/token/page',
    method: 'get',
    params: query,
  })
}

export function deleteToken (id) {
  return request({
    url: '/admin/token/delete/' + id,
    method: 'post',
  })
}
