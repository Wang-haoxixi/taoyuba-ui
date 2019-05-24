import request from '@/router/request'

export function getList (query) {
  return request({
    url: '/admin/log/logPage',
    method: 'get',
    params: query,
  })
}

export function deleteLog (id) {
  return request({
    url: '/admin/log/delete/' + id,
    method: 'post',
  })
}

export function deleteID (ids) {
  return request({
    url: '/admin/log/delete?id=' + ids,
    method: 'post',
  })
}
