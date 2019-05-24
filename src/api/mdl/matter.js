import request from '@/router/axios'

export function getMatterPage (query) {
  return request({
    url: '/mdl/matter/page',
    method: 'get',
    params: query,
  })
}

export function getMatterById (id) {
  return request({
    url: `/mdl/matter/${id}`,
    method: 'get',
  })
}

export function deleteMatter (ids) {
  return request({
    url: '/mdl/matter/delete',
    method: 'post',
    data: ids,
  })
}

export function deleteMatterById (id) {
  return request({
    url: `/mdl/matter/delete/${id}`,
    method: 'post',
  })
}
