import request from '@/router/request'

export function deleteClient (id) {
  return request.post(`/admin/client/delete/${id}`)
}

export function addObj (obj) {
  return request({
    url: '/admin/client/create',
    method: 'post',
    data: obj,
  })
}